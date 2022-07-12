<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Aion Playground</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="(menu, index) in menuList" :key="index">
            <router-link class="nav-link" :to="menu.path">{{menu.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />

  <div class="spacer"></div>

  <ajax-loader :loading="isLoading"></ajax-loader>

</template>

<script>
  import { mapGetters } from 'vuex';
  import AjaxLoaderVue from './components/fragment/AjaxLoader.vue';

  export default {
    name: 'App',
    components:{
      'ajax-loader':AjaxLoaderVue
    },
    data(){
      return {
        menuList:[
          {name:"검색", path:"/"},
          {name:"추출", path:"/item-extract"},
          {name:"강화", path:"/item-enchant"},
          {name:"마석", path:"/magicstone-enchant"},
          {name:"개발자", path:"/dev-info"}
        ],
      };
    },
    computed:{
      ...mapGetters([
        'isLoading'
      ]),
    },
    methods:{
      
    },
    create() {

    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
  
  * {
    font-family: 'Noto Sans KR', sans-serif !important;
  }
  .spacer {
    height:200px;
  }
</style>