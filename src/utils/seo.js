const SITE_URL = 'https://cleans717.tw'
const SITE_NAME = '清清小森職人洗塵'

export function buildMetaInfo(route) {
  const title = route.meta.title || SITE_NAME
  const description =
    route.meta.description ||
    '清清小森提供 Dyson 戴森吸塵器深層清洗、零件更換與維修服務，可使用萬華面交、雙北到府收送或全台超商寄送。'
  const keywords =
    route.meta.keywords ||
    '清清小森,Dyson清洗,戴森清洗,Dyson維修,台北吸塵器清洗,萬華吸塵器清洗'
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`

  return {
    title,
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: description,
      },
      {
        vmid: 'keywords',
        name: 'keywords',
        content: keywords,
      },
      {
        vmid: 'robots',
        name: 'robots',
        content: 'index, follow, max-image-preview:large',
      },
      {
        vmid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        vmid: 'og:site_name',
        property: 'og:site_name',
        content: SITE_NAME,
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        vmid: 'og:url',
        property: 'og:url',
        content: canonicalUrl,
      },
      {
        vmid: 'og:locale',
        property: 'og:locale',
        content: 'zh_TW',
      },
      {
        vmid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: title,
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
    ],
    link: [
      {
        vmid: 'canonical',
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
  }
}
