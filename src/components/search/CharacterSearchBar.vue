<template>
    <div class="position-relative">
        <input type="text" class="form-control rounded" v-model="keyword" @input="keyword = $event.target.value" @click="searchOperation">
        <ul class="list-group" :style="styleObject">
            <li class="list-group-item" v-for="(data, index) in filterList" :key="index" @click="selectData(index);">
                <div>
                    <span>[{{data.serverName}}]</span>
                    &nbsp;
                    <span v-html="data.charName" class="character-name"></span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import _ from "lodash";
import axios from "axios";

export default {
    name : "CharacterSearchBar",
    props:{
        
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

            axios.get(this.$store.state.host+"/usersearch/"+this.keyword)
            .then(resp=>{
                this.filterList = resp.data.documents;
            });
        },
        clearKeyword(){
            this.keyword = "";
        },
        selectData(index){
            this.click = true;
            const name = this.filterList[index].name;
            this.$emit("select-item", this.filterList[index]);
            this.filterList = [];
            this.keyword = name;
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
        /* padding-right: calc(var(--bs-gutter-x) * .5); */
        /* padding-left: calc(var(--bs-gutter-x) * .5); */
        cursor:pointer;
    }
    .list-group::-webkit-scrollbar {
        width:1px;
    }
    .list-group::-webkit-scrollbar-thumb {
        background-color: white;
    }
    .list-group-item {
        background-color:var(--bs-light);
        color:var(--bs-dark);
    }
    .list-group-item:hover {
        background-color:var(--bs-dark);
        color:var(--bs-light);
    }
    /* .list-group-item > div > .character-name {
        color:var(--bs-warning);
    } */
    .list-group-item > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>