import { createApp } from 'vue'

import router from './router/index.js'

import App from './App.vue'
//import { apply } from 'core-js/fn/reflect'

import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/litera/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.mount('#app');