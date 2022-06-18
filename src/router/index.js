//vue router 4
import {createWebHashHistory, createRouter} from 'vue-router';

import ItemExtraction from "../components/ItemExtraction.vue";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/extract', component:ItemExtraction},
    ],
});

export default router;