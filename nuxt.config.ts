// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: [
        "assets/scss/themes/dark/app-dark.scss",
        "assets/scss/app.scss",
        "assets/scss/iconly.scss",
    ],


    plugins: [
        {src: '~/plugins/bootstrap.client', mode: 'client'},
    ],
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/google-fonts',
        '@nuxtjs/color-mode',
        '@nuxt/ui',
    ],
    colorMode: {
        classPrefix: 'theme-',
        classSuffix: ''
    },
    googleFonts: {
        families: {
            'Nunito': true,
        },
    },

    runtimeConfig: {
        public: {
            service_rekam_medis: 'http://103.101.224.67:8081/api/v1',
        }
    }
})
