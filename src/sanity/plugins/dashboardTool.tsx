'use client'

import {HomeIcon} from '@sanity/icons'
import {definePlugin} from 'sanity'

const actions = [
  {
    title: 'Fond vidéo',
    description: 'Modifier les vidéos affichées derrière la section Nos services.',
    href: '/studio/structure/servicesBackground;services-background',
  },
  {
    title: 'Projets vidéo',
    description: 'Ajouter ou modifier les vidéos affichées sur le site.',
    href: '/studio/structure/project',
  },
  {
    title: 'Galerie photos',
    description: 'Ajouter ou modifier les photos de la galerie.',
    href: '/studio/structure/galleryImage',
  },
  {
    title: 'Paramètres du site',
    description: 'Mettre à jour email, téléphone, adresse et réseaux sociaux.',
    href: '/studio/structure/siteSettings;site-settings',
  },
  {
    title: 'Analytiques',
    description: 'Voir les visites et les pages les plus consultées.',
    href: '/studio/analytics',
  },
]

function DashboardTool() {
  return (
    <div style={{minHeight: '100%', background: '#0f0f0f', color: '#fff', padding: 32}}>
      <div style={{maxWidth: 1120, margin: '0 auto'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            border: '1px solid #2f2f2f',
            background: '#151515',
            padding: 28,
          }}
        >
          <div>
            <p style={{color: '#ffd60a', fontSize: 13, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase'}}>
              Administration
            </p>
            <h1 style={{fontSize: 42, lineHeight: 1, margin: '12px 0 10px'}}>Tableau de bord</h1>
            <p style={{color: '#b5b5b5', maxWidth: 620, lineHeight: 1.6, margin: 0}}>
              Bienvenue dans l’espace MH CinePro. Utilisez les raccourcis ci-dessous pour gérer le contenu du site.
            </p>
          </div>
          <div
            aria-label="MH CinePro"
            role="img"
            style={{
              width: 140,
              height: 110,
              backgroundImage: 'url(/images/logo_mh.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              flexShrink: 0,
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 16,
            marginTop: 24,
          }}
        >
          {actions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              style={{
                border: '1px solid #2f2f2f',
                background: '#151515',
                color: '#fff',
                padding: 20,
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <h2 style={{fontSize: 20, margin: '0 0 10px'}}>{action.title}</h2>
              <p style={{color: '#b5b5b5', lineHeight: 1.55, margin: 0}}>{action.description}</p>
            </a>
          ))}
        </div>

        <div style={{marginTop: 24, color: '#8f8f8f', fontSize: 13, lineHeight: 1.6}}>
          Les statistiques sont indicatives et servent à suivre l’activité générale du site. Aucune donnée personnelle
          des visiteurs n’est stockée.
        </div>
      </div>
    </div>
  )
}

export const dashboardTool = definePlugin({
  name: 'dashboard-tool',
  tools: [
    {
      name: 'dashboard',
      title: 'Tableau de bord',
      icon: HomeIcon,
      component: DashboardTool,
    },
  ],
})
