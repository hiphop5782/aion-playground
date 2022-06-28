<template>
<div class="container-fluid">
    <div class="row mt-4">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
           <jumbotron-header title="강화석 추출 시뮬레이션(미구현)" contents="확률은 인게임과 다르니 재미로만 즐겨주시기 바랍니다"></jumbotron-header>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div class="row">
                <label class="col-form-label col-md-3">
                    아이템 선택
                </label>
                <div class="col-md-9 position-relative">
                    <item-search-bar :data-list="itemList" @select-item="selectItem"></item-search-bar>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import JumbotronHeader from './layout/JumbotronHeader.vue';
import ItemSearchBar from './search/ItemSearchBar.vue';
export default {
    name:"ItemExtraction",
    components:{
        'jumbotron-header':JumbotronHeader,
        'item-search-bar':ItemSearchBar,
    },
    data(){
        return {
            selectedItem: null,
            itemList:[],

            progress: 0,
            resultStone: null,
            record:[],
        };
    },
    methods:{
        selectItem(item){
            console.log(item);
        },
    },
    created(){
        this.itemList.push(...require("@/assets/json/weapon.json"));
        this.itemList.push(...require("@/assets/json/armor.json"));
    },
};
</script>
<style>

</style>