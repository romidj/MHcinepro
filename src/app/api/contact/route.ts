import {Resend} from 'resend'

import {client} from '@/sanity/lib/client'

type ContactPayload = {
  name?: unknown
  email?: unknown
  phone?: unknown
  subject?: unknown
  message?: unknown
}

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
    .replaceAll('\n', '<br />')
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const name = cleanText(body.name)
    const email = cleanText(body.email)
    const phone = cleanText(body.phone)
    const subject = cleanText(body.subject)
    const message = cleanText(body.message)

    if (!name || !email || !subject || !message) {
      return Response.json(
        {error: 'Veuillez remplir tous les champs obligatoires.'},
        {status: 400}
      )
    }

    if (!isValidEmail(email)) {
      return Response.json(
        {error: 'Veuillez saisir une adresse email valide.'},
        {status: 400}
      )
    }

    const settings = await client.fetch<{studioEmail?: string} | null>(
      `*[_id == "site-settings"][0]{studioEmail}`
    )
    const recipient = settings?.studioEmail?.trim()

    if (!recipient || !isValidEmail(recipient)) {
      console.error('Missing or invalid studioEmail in Sanity')
      return Response.json(
        {error: 'La destination email du studio est indisponible.'},
        {status: 500}
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY')
      return Response.json(
        {error: 'Le service email est momentanément indisponible.'},
        {status: 500}
      )
    }

    const resend = new Resend(resendApiKey)
    const {error} = await resend.emails.send({
      from: 'MH CinePro <contact@siteweb.mhcinepro.com>',
      to: [recipient],
      replyTo: email,
      subject: `Nouvelle demande — ${subject}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom complet:</strong> ${escapeHtml(name)}</p>
        <p><strong>Adresse email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Numéro de téléphone:</strong> ${phone ? escapeHtml(phone) : 'Non renseigné'}</p>
        <p><strong>Sujet du projet:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json(
        {error: 'Échec de l’envoi. Veuillez réessayer.'},
        {status: 502}
      )
    }

    return Response.json({success: true})
  } catch (error) {
    console.error('Contact API error:', error)
    return Response.json(
      {error: 'Une erreur est survenue. Veuillez réessayer.'},
      {status: 500}
    )
  }
}
