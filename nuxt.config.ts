export default defineNuxtConfig({
  devtools: { enabled: true },
  rootDir: "./src",
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
  },
})
