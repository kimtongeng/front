// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ['~/plugins/flowbite-datepicker.js'],
  routeRules: {
    '/': { redirect: '/dashboard' },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', "@nuxt/icon"],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  i18n: {
    lazy:true,
    strategy:"prefix_except_default",
    langDir:"locales",
    locales:[
      {
        code:"en",
        name:"English(US)",
        iso:"en-US",
        file:"en.js"
      },
      {
        code:"kh",
        name:"Khmer",
        iso:"KH",
        file:"kh.js"
      }
    ],
    defaultLocale: 'kh', // Set default locale

  }
})