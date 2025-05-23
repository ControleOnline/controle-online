// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      "../../modules/controleonline/ui-common/src/api",
      "../../modules/controleonline/ui-common/src/vue/boot/i18n",
      "../../modules/controleonline/ui-common/src/vue/boot/custom",
      "../../modules/controleonline/ui-common/src/vue/boot/methods",
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      "../../modules/controleonline/ui-layout/css/app.scss",
      "../../modules/controleonline/ui-layout/css/colors/theme.scss",
      "../../modules/controleonline/ui-layout/css/colors/light.scss",
      "../../modules/controleonline/ui-layout/css/colors/dark.scss",
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      cssAddon: true,
      iconSet: "material-icons", // Quasar icon set
      lang: "pt-BR", // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: "auto",

      components: [
        "QLayout",
        "QHeader",
        "QDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QBtn",
        "QIcon",
        "QList",
        "QItem",
        "QItemSection",
        "QItemLabel",
        "QCard",
        "QCardSection",
        "QCardActions",
        "QSeparator",
        "QForm",
        "QInput",
        "QField",
        "QImg",
        "QTable",
        "QTh",
        "QTr",
        "QTd",
        "QBadge",
        "QDialog",
        "QSelect",
        "QRating",
        "QMarkupTable",
        "QSpace",
        "QStepper",
        "QStep",
        "QStepperNavigation",
        "QBtnToggle",
        "QBtnDropdown",
        "QBanner",
        "QInnerLoading",
        "QFile",
        "QVideo",
        "QCarousel"
      ],

      notify: {
        position: "top-right",
        multiLine: true,
        timeout: 4000,
      },

      directives: ["Ripple", "ClosePopup"],

      // Quasar plugins
      plugins: ["Notify", "LocalStorage", "SessionStorage", "Loading"],
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    // supportIE: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: "history", // available values: 'hash', 'history'

      // rtl: false, // https://quasar.dev/options/rtl-support
      // showProgress: false,
      // gzip: true,
      // analyze: true,
      env: require("./config/env").APP_ENV,

      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,
      // chainWebpack(chain) {
      //   chain.module
      //     .rule('css')
      //     .oneOf('normal')
      //     .use('css-loader')
      //     .tap(options => {
      //       // Ajuste as opções do css-loader aqui
      //       options.url = false; // ou true, dependendo do que você precisa
      //       return options;
      //     });
      // },
      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {},
      chainWebpack(chain) {},
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 3003,
      open: false, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ["fadeIn", "fadeOut"],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {
        exclude: [/\.htaccess$/], // Excluir o arquivo icon.png do pré-carregamento
      }, // only for GenerateSW
      manifest: {
        name: "Controle Online",
        short_name: "Controle Online",
        description: "Controle Online",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "images/icon.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "images/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icon.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "images/icon.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: "com.controleonline.app",
      hideSplashscreen: true, // Esconder a tela de splash automaticamente
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "controleonline",
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  };
};
