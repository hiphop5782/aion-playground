//vue router 4
import {createWebHashHistory, createRouter} from 'vue-router';

import CharacterSearch from "../components/CharacterSearch.vue";
import MagicStoneEnchant from "../components/MagicStoneEnchant.vue";
import ItemEnchant from "../components/ItemEnchant.vue";
import ItemExtraction from "../components/ItemExtraction.vue";
import DevelopmentInformation from "../components/DevelopmentInformation.vue";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/', component:CharacterSearch},
        {path:'/item-extract', component:ItemExtraction},
        {path:'/item-enchant', component:ItemEnchant},
        {path:'/magicstone-enchant', component:MagicStoneEnchant},
        {path:'/dev-info', component:DevelopmentInformation}
    ],
});

export default router;
