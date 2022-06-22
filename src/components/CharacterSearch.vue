<template>
<div class="container-fluid">
    <div class="mt-3 p-4 text-light bg-dark rounded">
        <h2>아이온 캐릭터 검색</h2>
    </div>
    
    <div class="row mt-4">
        <div class="col">
            <label class="form-label">캐릭터 이름</label>
            <input type="text" class="form-control rounded" v-model="keyword">
        </div>
    </div>

</div>
</template>
<script>
import _ from "lodash";
import axios from "axios";

export default {
    name:"CharacterSearch",
    data(){
        return {
            keyword:"",
        };
    },
    watch:{
        keyword:_.throttle(function(val){
            if(!val) return;
            
        }, 500),
    },
    created(){
        console.log(axios);
    },
};
</script>
<style>

</style>