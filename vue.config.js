module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: 'Knight\ App',
    themeColor: '#3aa9ff',
    msTileColor: '#3aa9ff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      swDest: "service-worker.js"
      // ...other Workbox options...
    }
  }
};
