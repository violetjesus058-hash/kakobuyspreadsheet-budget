import { defineConfig } from 'vitepress'

const hostname = 'https://kakobuyspreadsheet-budget.com'
const siteTitle = 'Kakobuy Spreadsheet Budget Finder'
const siteDescription = 'Browse Kakobuy Spreadsheet budget data by category, price range, and brand through an independent navigation directory.'

function pageUrl(relativePath) {
  const cleanPath = relativePath === 'index.md'
    ? '/'
    : `/${relativePath.replace(/\.md$/, '').replace(/\/index$/, '')}`
  return `${hostname}${cleanPath}`
}

export default defineConfig({
  title: siteTitle,
  description: siteDescription,
  lang: 'en-US',
  cleanUrls: 'with-subfolders',

  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtm.js?id=GTM-5M5VQ9MW' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    `],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['meta', { name: 'google-site-verification', content: 'EnHLB-w90YQehCBgwxYRUVhmDEotaHdd9hx4cwuVWeM' }],
    ['script', {}, `
      (function() {
        function sendTracking(eventName) {
          if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, {
              event_category: 'directory_navigation',
              event_label: eventName,
              value: 1.0
            });
          }
        }
        function bindTracking() {
          document.querySelectorAll('a.cta-spreadsheet, a.hero-action, a.wide-cta, a.text-button').forEach(function(el) {
            if (!el.dataset.tracked) {
              el.dataset.tracked = '1';
              el.addEventListener('click', function() { sendTracking('external_directory_click'); });
            }
          });
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindTracking);
        else bindTracking();
        new MutationObserver(bindTracking).observe(document.body, { childList: true, subtree: true });
      })();
    `],
  ],

  transformHead({ pageData }) {
    const url = pageUrl(pageData.relativePath)
    const title = pageData.frontmatter.title || siteTitle
    const description = pageData.frontmatter.description || siteDescription
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: `${hostname}/favicon.png` }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  themeConfig: {
    logo: '/favicon.png',
    siteTitle,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Clothing', link: 'https://productsite-8wf.pages.dev/?view=styles&category=clothing&platform=kakobuy' },
      { text: 'Shoes', link: 'https://productsite-8wf.pages.dev/?view=styles&category=shoe&platform=kakobuy' },
      { text: 'Pants', link: 'https://productsite-8wf.pages.dev/?view=styles&category=pants&platform=kakobuy' },
      { text: 'Accessories', link: 'https://productsite-8wf.pages.dev/?view=styles&category=ACC&platform=kakobuy' },
      { text: 'Budget Guides', link: '/under-10-finds' },
      { text: 'Brands', link: '/#featured-brands' },
      { text: 'All Finds', link: 'https://productsite-8wf.pages.dev/?view=styles&platform=kakobuy' },
    ],
    sidebar: false,
    outline: false,
  },

  sitemap: {
    hostname,
  },
})
