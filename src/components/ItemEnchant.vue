<template>
<div class="container-fluid">
    <div class="row mt-4">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
           <jumbotron-header title="아이템 강화 시뮬레이션" contents="인게임 확률과 동일하게 설정되어 있습니다"></jumbotron-header>
        </div>
    </div>
    
</div>
</template>
<script>
import JumbotronHeaderVue from './layout/JumbotronHeader.vue';
export default {
    name:"ItemEnchant",
    compmonent:{
        'jumbotron-header':JumbotronHeaderVue
    },
};
</script>
<style>

</style>