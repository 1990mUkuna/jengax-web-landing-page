// Shared helpers for the waiting-list Edge Functions.

export type Lang = 'fr' | 'en' | 'pt'

export const lang = (value: unknown): Lang =>
  value === 'en' || value === 'pt' ? value : 'fr'

const WELCOME: Record<Lang, { subject: string; lines: string[] }> = {
  fr: {
    subject: 'Bienvenue chez JengaX 👷🏾‍♂️',
    lines: [
      'Bienvenue chez JengaX 👷🏾‍♂️',
      "Merci d'avoir rejoint notre liste d'attente, votre inscription est confirmée.",
      "En attendant, préparez la liste de vos métiers et spécialités (carrelage, plomberie, maçonnerie…). Vous pourrez les ajouter à votre profil dès l'ouverture de l'application.",
      "📲 Enregistrez notre numéro WhatsApp sous « JengaX » : nous vous enverrons le lien de téléchargement dès que l'application sera prête.",
      "L'équipe JengaX — Construisez. De partout.",
    ],
  },
  en: {
    subject: 'Welcome to JengaX 👷🏾‍♂️',
    lines: [
      'Welcome to JengaX 👷🏾‍♂️',
      'Thank you for joining our waiting list, your signup is confirmed.',
      'In the meantime, prepare the list of your trades and specialties (tiling, plumbing, masonry…). You will be able to add them to your profile as soon as the app opens.',
      '📲 Save our WhatsApp number as "JengaX": we will send you the download link as soon as the app is ready.',
      'The JengaX team — Build it. From anywhere.',
    ],
  },
  pt: {
    subject: 'Bem-vindo(a) à JengaX 👷🏾‍♂️',
    lines: [
      'Bem-vindo(a) à JengaX 👷🏾‍♂️',
      'Obrigado por entrar na nossa lista de espera, a sua inscrição está confirmada.',
      'Entretanto, prepare a lista dos seus ofícios e especialidades (azulejo, canalização, alvenaria…). Poderá adicioná-los ao seu perfil assim que a aplicação abrir.',
      '📲 Guarde o nosso número de WhatsApp como «JengaX»: enviaremos o link de download assim que a aplicação estiver pronta.',
      'A equipa JengaX — Construa. De qualquer lugar.',
    ],
  },
}

const LAUNCH: Record<Lang, { subject: string; lines: string[]; ios: string; android: string }> = {
  fr: {
    subject: "L'application JengaX est prête 🎉",
    lines: [
      "Bonne nouvelle : l'application JengaX est prête à être téléchargée ! 🎉",
      "Merci d'avoir rejoint la liste d'attente. Téléchargez l'application, créez votre profil et ajoutez vos métiers et spécialités.",
      "L'équipe JengaX — Construisez. De partout.",
    ],
    ios: "Télécharger sur l'App Store",
    android: 'Télécharger sur Google Play',
  },
  en: {
    subject: 'The JengaX app is ready 🎉',
    lines: [
      'Good news: the JengaX app is ready to download! 🎉',
      'Thank you for joining the waiting list. Download the app, create your profile and add your trades and specialties.',
      'The JengaX team — Build it. From anywhere.',
    ],
    ios: 'Download on the App Store',
    android: 'Get it on Google Play',
  },
  pt: {
    subject: 'A aplicação JengaX está pronta 🎉',
    lines: [
      'Boas notícias: a aplicação JengaX está pronta para download! 🎉',
      'Obrigado por entrar na lista de espera. Descarregue a aplicação, crie o seu perfil e adicione os seus ofícios e especialidades.',
      'A equipa JengaX — Construa. De qualquer lugar.',
    ],
    ios: 'Descarregar na App Store',
    android: 'Disponível no Google Play',
  },
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const layout = (paragraphs: string[], buttons = '') => `<!doctype html>
<html><body style="margin:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <div style="background:#fff;border-radius:16px;padding:32px 28px">
      <p style="margin:0 0 24px;font-size:22px;font-weight:800">Jenga<span style="color:#E5383B">X</span></p>
      ${paragraphs.map((p, i) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;${i === 0 ? 'font-weight:700;font-size:17px' : ''}">${escape(p)}</p>`).join('')}
      ${buttons}
    </div>
    <p style="text-align:center;font-size:12px;color:#888;margin-top:16px">jengax.co · <a href="https://jengax.co/privacy" style="color:#888">Politique de confidentialité</a></p>
  </div>
</body></html>`

export function welcomeEmail(l: Lang) {
  const m = WELCOME[l]
  return { subject: m.subject, text: m.lines.join('\n\n'), html: layout(m.lines) }
}

export function launchEmail(l: Lang, iosUrl: string, androidUrl: string) {
  const m = LAUNCH[l]
  const btn = (href: string, label: string) =>
    href ? `<a href="${escape(href)}" style="display:inline-block;margin:0 8px 12px 0;padding:12px 20px;background:#E5383B;color:#fff;border-radius:100px;text-decoration:none;font-weight:700;font-size:14px">${escape(label)}</a>` : ''
  const links = [iosUrl && `${m.ios}: ${iosUrl}`, androidUrl && `${m.android}: ${androidUrl}`].filter(Boolean)
  return {
    subject: m.subject,
    text: [m.lines[0], m.lines[1], ...links, m.lines[2]].join('\n\n'),
    html: layout(m.lines, `<p style="margin:8px 0 16px">${btn(iosUrl, m.ios)}${btn(androidUrl, m.android)}</p>`),
  }
}

// Constant-time comparison of the shared webhook secret.
export function secretMatches(given: string | null, expected: string | undefined) {
  if (!given || !expected || given.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
