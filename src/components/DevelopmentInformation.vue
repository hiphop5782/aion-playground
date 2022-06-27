<template>
<div class="container-fluid">
    <div class="row mt-4">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
           <jumbotron-header title="개발자 정보"></jumbotron-header>
        </div>
    </div>
</div>
</template>
<script>
import JumbotronHeaderVue from './layout/JumbotronHeader.vue';
export default {
    name:"DevelopmentInformation",
    components:{
        'jumbotron-header' : JumbotronHeaderVue
    },
};
</script>
<style>

</style>