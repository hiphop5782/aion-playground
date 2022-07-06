<template>
    <input type="text" class="form-control rounded border border-primary" v-model="keyword" @input="keyword = $event.target.value" @click="searchOperation">
    <ul class="list-group" :style="styleObject">
        <li class="list-group-item" v-for="(data, index) in filterList" :key="index" @click="selectData(index);">
            <div :class="{'unique-item':data.grade == '유일', 'hero-item':data.grade == '영웅'}">
                <span>[{{data.grade}}]</span>
                &nbsp;
                <span>{{data.name}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
import _ from "lodash";
import ChosungSearch from "hangul-chosung-search-js";

export default {
    name : "ItemSearchBar",
    props:{
        dataList:Array,
    },
    emits:["select-item"],
    data(){
        return {
            keyword:"",
            filterList:[],
            click:false,
        };
    },
    watch:{
        keyword:_.throttle(function(){
            this.searchOperation();
        }, 350),
    },
    computed:{
        styleObject(){
            return {
                zIndex : this.filterList.length > 0 ? 9999999 : -1
            };
        },
    },
    methods:{
        searchOperation(){
            if(!this.keyword) {
                this.clearKeyword();
                return;
            }
            if(this.click){
                this.click = false;
                return;
            }

            this.filterList = this.dataList.filter(this.search);
        },
        search(data){
            if(ChosungSearch.isSearch(this.keyword, data.name, true)){//true : 띄어쓰기까지 고려
                return true;
            }
            return false;
        },
        clearKeyword(){
            this.keyword = "";
        },
        selectData(index){
            this.click = true;
            this.keyword = this.filterList[index].name;
            this.$emit("select-item", this.filterList[index]);
            this.filterList = [];
        },
    },
    created(){
        
    },
}
</script>
<style scoped>
    .list-group {
        position:absolute;
        top:100%;
        left:0;
        right:0;
        height:60vh;
        overflow-y: auto;
        padding-right: calc(var(--bs-gutter-x) * .5);
        padding-left: calc(var(--bs-gutter-x) * .5);
        cursor:pointer;
    }
    .list-group::-webkit-scrollbar {
        width:1px;
    }
    .list-group::-webkit-scrollbar-thumb {
        background-color: white;
    }
    .list-group-item {
        background-color:var(--bs-dark);
    }
    .list-group-item > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-group-item:hover {
        background-color:var(--bs-light);
    }
    .list-group-item:hover > div {
        color:var(--bs-dark);
    }
    .unique-item {
        color:#ffc103;
    }
    .hero-item {
        color:#ff8033;
    }
</style>