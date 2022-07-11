//vue router 4
import {createWebHashHistory, createRouter} from 'vue-router';

import CharacterSearch from "../components/CharacterSearch.vue";
import MagicStoneEnchant from "../components/MagicStoneEnchant.vue";
import ItemEnchant from "../components/ItemEnchant.vue";
import ItemExtraction from "../components/ItemExtraction.vue";
import DevelopmentInformation from "../components/DevelopmentInformation.vue";
import {nextTick} from "vue";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/', 
            component:CharacterSearch,
            meta:{
                title:"캐릭터검색"
            },
        },
        {
            path:'/item-extract', 
            component:ItemExtraction,
            meta:{
                title:"아이템추출",
            },
        },
        {
            path:'/item-enchant', 
            component:ItemEnchant,
            meta:{
                title:"아이템강화",
            },
        },
        {
            path:'/magicstone-enchant', 
            component:MagicStoneEnchant,
            meta:{
                title:"마석강화",
            },
        },
        {
            path:'/dev-info', 
            component:DevelopmentInformation,
            meta:{
                title:"개발자",
            },
        }
    ],
});

/*
    title 설정 추가
    기본 타이틀 - 페이지 타이틀이 붙도록 변경
*/
const DEFAULT_TITLE = "아이온놀이터";
router.afterEach((to/*, from*/)=>{
    nextTick(()=>{
        let title = DEFAULT_TITLE;
        if(to.meta.title)
            title += "-" + to.meta.title;
        document.title = title;
    });
});

export default router;
