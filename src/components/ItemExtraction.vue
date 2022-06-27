<template>
<div class="container-fluid">
    <div class="row mt-4">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
           <jumbotron-header title="강화석 추출 시뮬레이션" contents="확률은 인게임과 다르니 재미로만 즐겨주시기 바랍니다"></jumbotron-header>
        </div>
    </div>
</div>
</template>
<script>
import JumbotronHeaderVue from './layout/JumbotronHeader.vue';
export default {
    name:"ItemExtraction",
    compmonent:{
        'jumbotron-header':JumbotronHeaderVue
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
};
</script>
<style>

</style>