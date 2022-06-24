import { createApp } from 'vue'

import router from './router/index.js'
import store from "./store";

import App from './App.vue'
//import { apply } from 'core-js/fn/reflect'

import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/litera/bootstrap.min.css";

import FontAwesomeIcon from './font-awesome/index.js';

import { createMetaManager } from 'vue-meta';

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .use(store)
    .use(createMetaManager())
    .mount('#app');