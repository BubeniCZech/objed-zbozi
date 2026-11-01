import { motion } from 'motion/react'
import { AppWindow, DoorOpen, Puzzle } from 'lucide-react'
import { useEffect, useState } from 'react'
import Breadcrumb from './components/Breadcrumb.jsx'
import Catalogs from './components/Catalogs.jsx'
import CountUp from './components/CountUp.jsx'
import ItemCard from './components/ItemCard.jsx'
import Navbar from './components/Navbar.jsx'
import OrderPanel from './components/OrderPanel.jsx'
import ParallaxBackground from './components/ParallaxBackground.jsx'
import ProductList from './components/ProductList.jsx'
import Toast from './components/Toast.jsx'
import { categories } from './data/items.js'
import { matchesItem } from './utils/search.js'
import { sendOrder } from './utils/sendOrder.js'
import { defaultTheme, themes } from './theme.js'

const categoryIcons = { okenni: AppWindow, dverni: DoorOpen, prislusenstvi: Puzzle }

// Všechny položky ze všech kategorií, každá si pamatuje svou kategorii (kvůli hledání na úvodní stránce).
const allItems = categories.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id })),
)

const productsByCode = Object.fromEntries(
  allItems.flatMap((item) =>
    item.products.map((product) => [product.code, { ...product, itemName: item.productName ?? item.name }]),
  ),
)

const HOME = { cat: null, id: null, order: false }

// Nadpis úvodního přehledu, stejný text je i první úrovní drobečkové navigace.
const HOME_TITLE = 'Sortiment'

function App() {
  const [search, setSearch] = useState('')
  // Po obnovení stránky se otevřená kategorie a položka vrátí z historie prohlížeče.
  const [categoryId, setCategoryId] = useState(() => window.history.state?.cat ?? null)
  const [selectedId, setSelectedId] = useState(() => window.history.state?.id ?? null)
  // draft = množství nastavená v seznamu produktů, order = hotová objednávka (kód → ks)
  const [draft, setDraft] = useState({})
  const [order, setOrder] = useState({})
  const [orderOpen, setOrderOpen] = useState(false)
  // stav odeslání objednávky: idle | sending | sent | error
  const [sendStatus, setSendStatus] = useState('idle')
  const [notice, setNotice] = useState(null)
  // Po otevření přehledu karty naskakují postupně jedna po druhé, při dalším scrollování už bez zpoždění.
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    if (!intro) return
    const timer = setTimeout(() => setIntro(false), 1800)
    return () => clearTimeout(timer)
  }, [intro])

  // Navigace přes History API: otevření položky nebo panelu objednávky přidá záznam
  // do historie, takže tlačítko Zpět v telefonu vrátí o krok v aplikaci
  // a nevyskočí rovnou z celé stránky.
  useEffect(() => {
    // Po obnovení stránky je panel zavřený, ale záznam v historii by mohl říkat opak.
    const state = window.history.state
    if (state?.order) window.history.replaceState({ ...state, order: false }, '')

    const onPopState = (e) => {
      const next = e.state ?? HOME
      if (next.id == null) setIntro(true)
      setCategoryId(next.cat ?? null)
      setSelectedId(next.id ?? null)
      setOrderOpen(Boolean(next.order))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (next) => {
    window.history.pushState(next, '')
    setCategoryId(next.cat)
    setSelectedId(next.id)
    setOrderOpen(next.order)
  }

  const openCategory = (cat) => {
    navigate({ cat, id: null, order: false })
    window.scrollTo(0, 0)
  }

  // `cat` se zadává při otevření z hledání na úvodní stránce, jinak platí aktuální kategorie.
  const openItem = (id, cat = categoryId) => {
    // Po přechodu z výsledků hledání se vyhledávací pole vyprázdní.
    setSearch('')
    navigate({ cat, id, order: false })
    window.scrollTo(0, 0)
  }

  const openOrder = () => navigate({ cat: categoryId, id: selectedId, order: true })

  const closeOrder = () => {
    if (window.history.state?.order) window.history.back()
    else setOrderOpen(false)
  }

  const showOverview = () => {
    if (window.history.state?.id != null) {
      window.history.back()
    } else {
      setIntro(true)
      setSelectedId(null)
    }
  }

  // Klik na logo: návrat na hlavní přehled a vymazání objednávky i rozpracovaných množství.
  const goHome = () => {
    setOrder({})
    setDraft({})
    setSearch('')
    setSendStatus('idle')
    setNotice(null)
    if (window.history.state?.cat != null || window.history.state?.id != null) {
      navigate(HOME)
    } else {
      setCategoryId(null)
      setSelectedId(null)
    }
    setIntro(true)
    window.scrollTo(0, 0)
  }

  // Odkaz „Kategorie“ v drobečkové navigaci: zpět na úvodní přehled z kterékoli úrovně.
  const showHome = () => {
    setIntro(true)
    navigate(HOME)
    window.scrollTo(0, 0)
  }

  const category = categories.find((c) => c.id === categoryId)
  // Na úvodní stránce se při hledání prohledávají položky ze všech kategorií.
  const searching = !category && search.trim() !== ''
  const showCategories = !category && !searching
  const entries = showCategories
    ? categories
    : (category ? category.items : allItems).filter((item) => matchesItem(item, search))
  const heading = category ? category.name : searching ? 'Výsledky hledání' : HOME_TITLE
  const headingTheme = themes[category?.id] ?? defaultTheme

  // Při psaní do hledání se vrátíme na přehled položek, ať jsou vidět výsledky.
  const changeSearch = (value) => {
    setSearch(value)
    if (value && selectedId !== null) showOverview()
  }
  const selectedItem = (category?.items ?? allItems).find((item) => item.id === selectedId)

  const orderLines = Object.entries(order).map(([code, qty]) => ({
    ...productsByCode[code],
    qty,
  }))
  const orderCount = orderLines.reduce((sum, line) => sum + line.qty, 0)

  const changeDraft = (code, qty) =>
    setDraft((prev) => ({ ...prev, [code]: qty }))

  const handleSend = async () => {
    setSendStatus('sending')
    try {
      const method = await sendOrder(orderLines)
      // Přes EmailJS odešlo hned, přes mailto: musí uživatel e-mail odeslat sám.
      if (method === 'emailjs') {
        setOrder({})
        setSendStatus('sent')
      } else {
        setSendStatus('idle')
      }
    } catch {
      setSendStatus('error')
    }
  }

  const addToOrder = () => {
    setSendStatus('idle')
    const added = Object.entries(draft)
      .filter(([, qty]) => qty > 0)
      .map(([code, qty]) => ({ ...productsByCode[code], qty }))
    if (added.length === 0) return

    setNotice({ id: Date.now(), lines: added })
    setOrder((prev) => {
      const next = { ...prev }
      for (const [code, qty] of Object.entries(draft)) {
        if (qty > 0) next[code] = (next[code] ?? 0) + qty
      }
      return next
    })
    setDraft({})
  }

  const changeOrderQuantity = (code, qty) =>
    setOrder((prev) => {
      const { [code]: _removed, ...rest } = prev
      return qty > 0 ? { ...rest, [code]: qty } : rest
    })

  return (
    <div className="min-h-screen">
      <ParallaxBackground />
      <Navbar
        search={search}
        onSearchChange={changeSearch}
        orderCount={orderCount}
        onCartClick={openOrder}
        onLogoClick={goHome}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {selectedItem ? (
          <>
            <Breadcrumb
              crumbs={[
                { label: HOME_TITLE, onClick: showHome },
                { label: category.name, onClick: () => openCategory(category.id) },
                { label: selectedItem.name },
              ]}
            />
            <ProductList
              item={selectedItem}
              draft={draft}
              ordered={order}
              onDraftChange={changeDraft}
              onAddToOrder={addToOrder}
            />
          </>
        ) : (
          <>
            {category && (
              <Breadcrumb crumbs={[{ label: HOME_TITLE, onClick: showHome }, { label: category.name }]} />
            )}
            <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-bold tracking-wide">
              <span className={`h-7 w-1 rounded-full ${headingTheme.bar}`} aria-hidden="true" />
              {/* Nadpis se odkryje zleva doprava a jeho barevný přechod se pomalu přelévá. */}
              <motion.span
                key={heading}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`animate-shimmer bg-linear-to-r bg-size-[200%_100%] ${headingTheme.gradient} bg-clip-text text-transparent`}
              >
                {heading}
              </motion.span>
              <span className={`font-sans text-sm font-semibold ${headingTheme.count}`}>
                [<CountUp value={entries.length} />]
              </span>
            </h2>
            {entries.length === 0 ? (
              <p className="text-slate-400">Nic nenalezeno.</p>
            ) : (
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(max(16rem,calc((100%-1.5rem)/3)),1fr))] gap-3">
                {entries.map((entry, index) => {
                  const Icon = categoryIcons[entry.id]
                  return (
                    <motion.li
                      key={`${entry.categoryId ?? ''}${entry.id}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: intro ? index * 0.06 : 0 }}
                      className="@container"
                    >
                      {showCategories ? (
                        <ItemCard
                          item={entry}
                          badge={<Icon className="size-5" aria-hidden="true" />}
                          count={entry.items.length}
                          theme={themes[entry.id]}
                          onSelect={openCategory}
                        />
                      ) : (
                        <ItemCard
                          item={entry}
                          theme={themes[entry.categoryId ?? categoryId]}
                          onSelect={(id) => openItem(id, entry.categoryId ?? categoryId)}
                        />
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            )}
            {showCategories && <Catalogs />}
          </>
        )}
      </main>

      <Toast notice={notice} onClose={() => setNotice(null)} />

      <OrderPanel
        open={orderOpen}
        lines={orderLines}
        onClose={closeOrder}
        onQuantityChange={changeOrderQuantity}
        onClear={() => setOrder({})}
        onSend={handleSend}
        status={sendStatus}
      />
    </div>
  )
}

export default App
