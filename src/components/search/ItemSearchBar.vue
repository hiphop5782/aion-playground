<template>
    <input type="text" class="form-control rounded border border-primary" v-model="keyword" @input="keyword = $event.target.value" @click="searchOperation" @keyup.esc="clearFilterList">
    <ul class="list-group" :style="styleObject">
        <li class="list-group-item" v-for="(data, index) in filterList" :key="index" @click="selectData(index);">
            <div :class="calculateItemGradeClass(data.grade)">
                <span>[{{data.grade}}]</span>
                &nbsp;
                <span>{{data.name}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
import _ from "lodash";
import Hangul from "hangul-js";
//import ChosungSearch from "hangul-chosung-search-js";

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
            filterLimit:20,
        };
    },
    watch:{
        keyword:_.throttle(function(after, before){
            if(!after) {
                this.clearKeyword();
                return;
            }
            if(this.click){
                this.click = false;
                return;
            }

            //Hangul.search(after, before)가 0이면 검색어 입력중, -1이면 검색어 제거
            
            if(Hangul.search(after, before) == 0){
                this.filterOperation();
            }
            else {
                this.searchOperation();
            }
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
            this.clearFilterList();

            //검색어가 초성인 경우와 아닌 경우를 구분해서 처리
            let count = 0;
            for(let i=0; i < this.dataList.length; i++) {
                const idx = Hangul.isConsonantAll(this.keyword) ?
                                    Hangul.search(this.dataList[i].chosung, this.keyword)
                                    :Hangul.search(this.dataList[i].name, this.keyword);

                if(idx == 0) {
                    this.filterList.push(this.dataList[i]);
                    if(++count >= this.filterLimit) break;
                }
            }

            if(count < this.filterLimit){
                for(let i=0; i < this.dataList.length; i++) {
                    const idx = Hangul.isConsonantAll(this.keyword) ?
                                        Hangul.search(this.dataList[i].chosung, this.keyword)
                                        :Hangul.search(this.dataList[i].name, this.keyword);

                    if(idx > 0) {
                        this.filterList.push(this.dataList[i]);
                        if(++count >= this.filterLimit) break;
                    }
                }
            }
        },
        filterOperation(){
            this.filterList = this.filterList.filter((item)=>{
                if(Hangul.isConsonantAll(this.keyword)) {
                    return Hangul.search(item.chosung, this.keyword) >= 0;
                }
                else {
                    return Hangul.search(item.name, this.keyword) >= 0;
                }
            });

            if(this.filterList.length < this.filterLimit) {
                let count = this.filterList.length;
                for(let i=0; i < this.dataList.length; i++) {
                    const idx = Hangul.isConsonantAll(this.keyword) ?
                                        Hangul.search(this.dataList[i].chosung, this.keyword)
                                        :Hangul.search(this.dataList[i].name, this.keyword);

                    if(idx > 0) {
                        this.filterList.push(this.dataList[i]);

                        if(++count >= this.filterLimit) break;
                    }
                }
            }
        },
        clearKeyword(){
            this.keyword = "";
            this.clearFilterList();
        },
        clearFilterList(){
            this.filterList = [];
        },
        selectData(index){
            this.click = true;
            this.keyword = this.filterList[index].name;
            this.$emit("select-item", this.filterList[index]);
            this.filterList = [];
        },
        calculateItemGradeClass(grade){
            switch(grade) {
                case "유일": return "unique-item";
                case "영웅": return "epic-item";
                case "신화": return "mythic-item";
                case "궁극": return "finality-item";
            }
        },
    },
    created(){
        //초성 배열을 별도로 준비
        this.dataList.forEach((data, index)=>{
            data.index = index;
            data.chosung = Hangul.d(data.name, true)
                                                        .map(arr=>arr[0])
                                                        .join("")
                                                        .replace(" ", "");
        });
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
    .epic-item {
        color:#ff8033;
    }
    .mythic-item {
        color:#dd43ef;
    }
    .finality-item {
        color:#e14141;
    }
</style>