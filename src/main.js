import { createApp } from 'vue'

import router from './router/index.js'

import App from './App.vue'
//import { apply } from 'core-js/fn/reflect'

const app = createApp(App);
app.use(router);
app.mount('#app');