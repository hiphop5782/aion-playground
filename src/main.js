import { createApp } from 'vue'

import router from './router/index.js'

import App from './App.vue'
//import { apply } from 'core-js/fn/reflect'

import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/litera/bootstrap.min.css";

import Axios from "axios";
import VueAxios from 'vue-axios';

createApp(App)
    .use(router)
    .use(VueAxios, Axios)
.mount('#app');