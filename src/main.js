import { createApp } from 'vue';

import router from './router/index.js';

import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/litera/bootstrap.min.css";

import store from "./store";

import FontAwesomeIcon from './font-awesome/index.js';

import App from './App.vue';

import axios from './ajax';

const app = createApp(App);

app.config.globalProperties.$http = axios;
app.config.globalProperties.$host = "http://api.sysout.co.kr/ap";

app.component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app');