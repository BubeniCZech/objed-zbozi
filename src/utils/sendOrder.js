import emailjs from '@emailjs/browser'
import { productSubtitle, productTitle } from './productTitle.js'

// Příjemce pro záložní odeslání přes `mailto:`. Při odesílání přes EmailJS se adresa
// příjemce nastavuje přímo v šabloně na webu EmailJS.
export const ORDER_EMAIL = 'conflictboy@hotmail.cz'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const emailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

const SUBJECT = 'Objednávka zboží'

const totalPieces = (lines) => lines.reduce((sum, line) => sum + line.qty, 0)

const escapeHtml = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  )

// Prostý text (záložní varianta a mailto:).
function buildMessage(lines) {
  return [
    'Nová objednávka',
    '',
    ...lines.flatMap((line, index) => [
      `${index + 1}. ${productTitle(line)}`,
      ...(productSubtitle(line) ? [`   ${productSubtitle(line)}`] : []),
      `   Objednací číslo: ${line.code}`,
      `   Množství: ${line.qty} ks`,
      '',
    ]),
    `Celkem: ${totalPieces(lines)} ks`,
  ].join('\n')
}

// Hezky formátovaná tabulka pro e-mail. V šabloně EmailJS se vkládá jako {{{message_html}}}.
// Stavěno pro Outlook (Word renderer): jen tabulky, atributy bgcolor / width, odsazení
// pouze na buňkách <td>, žádné zaoblené rohy ani inline-block, aby to vypadalo všude stejně.
function buildHtml(lines) {
  const total = totalPieces(lines)
  const sentAt = new Date().toLocaleString('cs-CZ', { dateStyle: 'long', timeStyle: 'short' })
  const font = "font-family:'Segoe UI',Arial,Helvetica,sans-serif;"
  const mono = "font-family:Consolas,'Courier New',monospace;"
  const th = `padding:8px 16px;font-size:10px;line-height:14px;letter-spacing:1px;text-transform:uppercase;color:#64748b;${font}`

  // Řádek: nahoře název produktu, pod ním jeho id, vpravo počet kusů.
  const rows = lines
    .map((line) => {
      const td = `padding:10px 16px;border-bottom:1px solid #e2e8f0;vertical-align:middle;`
      return `
          <tr>
            <td style="${td}${font}">
              <p style="margin:0;font-size:13px;line-height:18px;font-weight:bold;color:#0f172a;">${escapeHtml(productTitle(line))}</p>
              <p style="margin:0;font-size:12px;line-height:18px;font-weight:bold;color:#059669;${mono}">${productSubtitle(line) ? `<span style="font-weight:normal;color:#64748b;${font}">${escapeHtml(productSubtitle(line))}</span>&nbsp; ` : ''}${escapeHtml(line.code)}</p>
            </td>
            <td align="right" width="70" style="${td}${font}white-space:nowrap;font-size:14px;line-height:18px;font-weight:bold;color:#0f172a;">${line.qty}&nbsp;ks</td>
          </tr>`
    })
    .join('')

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f5f9" style="background-color:#f1f5f9;border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:20px 10px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:600px;background-color:#ffffff;border:1px solid #e2e8f0;border-collapse:collapse;">
        <tr><td height="4" bgcolor="#10b981" style="height:4px;line-height:4px;font-size:0;background-color:#10b981;">&nbsp;</td></tr>
        <tr>
          <td bgcolor="#0f172a" style="background-color:#0f172a;padding:18px 16px;${font}">
            <p style="margin:0;font-size:10px;line-height:14px;letter-spacing:2px;text-transform:uppercase;color:#34d399;">Objednávka zboží</p>
            <p style="margin:0;font-size:20px;line-height:28px;font-weight:bold;color:#ffffff;">Nová objednávka</p>
            <p style="margin:0;font-size:11px;line-height:16px;color:#94a3b8;">${escapeHtml(sentAt)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr bgcolor="#f1f5f9" style="background-color:#f1f5f9;">
                <td align="left" style="${th}border-bottom:1px solid #e2e8f0;">Produkt</td>
                <td align="right" width="70" style="${th}border-bottom:1px solid #e2e8f0;">Počet</td>
              </tr>${rows}
              <tr bgcolor="#ecfdf5" style="background-color:#ecfdf5;">
                <td style="padding:12px 16px;border-top:2px solid #10b981;font-size:12px;line-height:18px;font-weight:bold;color:#065f46;${font}">Celkem <span style="font-weight:normal;color:#047857;">· položek: ${lines.length}</span></td>
                <td align="right" style="padding:12px 16px;border-top:2px solid #10b981;font-size:15px;line-height:18px;font-weight:bold;color:#065f46;white-space:nowrap;${font}">${total}&nbsp;ks</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-size:11px;line-height:16px;color:#94a3b8;${font}">Odesláno z aplikace pro objednávání zboží.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

// Odeslání objednávky. Vrací 'emailjs' (e-mail odešel přímo z aplikace)
// nebo 'mailto' (EmailJS není nastavené, otevřel se e-mailový klient a uživatel
// ho musí odeslat sám). Při chybě EmailJS vyhodí výjimku.
export async function sendOrder(lines) {
  const message = buildMessage(lines)

  if (!emailJsConfigured) {
    window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
      SUBJECT,
    )}&body=${encodeURIComponent(message.replaceAll('\n', '\r\n'))}`
    return 'mailto'
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      subject: SUBJECT,
      // Pro šablonu, která v předmětu používá {{from_name}}.
      from_name: SUBJECT,
      message,
      message_html: buildHtml(lines),
      total: totalPieces(lines),
    },
    { publicKey: PUBLIC_KEY },
  )
  return 'emailjs'
}
