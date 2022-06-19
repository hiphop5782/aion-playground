<template>
<div class="container-fluid">
    <div class="mt-3 p-4 text-light bg-dark rounded">
        <h2>마석 강화 시뮬레이션</h2>
    </div>
    
    <div class="row mt-3">
        <label class="col-form-label col-md-3">
            아이템 선택
        </label>
        <div class="col-md-9">
            <!--
            <input type="text" class="form-control" v-model="keyword" @input="keyword = $event.target.value">
            -->
            <select class="form-select" v-model="keyword">
                <option value="">선택하세요</option>
                <option v-for="(item, index) in itemList" :value="index" :key="index">{{item.name}}</option>
            </select>
        </div>
    </div>

    <div class="row mt-3">
        <label class="col-form-label col-md-3">
            소켓 선택
        </label>
        <div class="col-md-9">
            <select v-model.number="socketCount" class="form-control">
                <option value="">선택하세요</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
        </div>
    </div>

    <div class="row mt-3" v-if="selectFinish">
        <div class="col-md-6 mb-3">
            <div class="item-wrapper">
                <div class="item-name" :class="{unique:choice.grade == '유일', hero:choice.grade == '영웅'}">
                    <span class="enchant-level"></span>
                    {{choice.name}}
                </div>
                <div class="item-type">종류
                    <span v-for="n in 10" :key="n">&nbsp;</span>
                    {{choice.subType}}
                </div>
                <div class="item-level">{{choice.level}}레벨 이상 사용 가능</div>
                <hr>
                <div class="text">강화 레벨
                <span v-for="n in 10" :key="n">&nbsp;</span>
                0
                </div>
                <hr>
                <div class="text">마석 강화(60레벨 이하의 마석만 강화 가능)</div>
                <div class="socket-wrapper d-flex flex-wrap mt-3">
                    <div class="item-slot mt-2 d-flex" v-for="(socket, index) in socketList" :key="index">
                        <img class="stone-image" src="@/assets/image/item_magicstone_equip.png" v-if="socket.result">
                        <img class="stone-image" src="@/assets/image/item_magicstone_empty.png" v-else>
                        <div class="stone-name">{{socket.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-flex flex-wrap align-items-center mb-3">
            <div class="stone-item col-6" v-for="(stone, index) in stoneList" :key="index">
                <label class="d-block">
                    <input type="radio" name="stone" :value="index" class="d-none" v-model="enchant.stone">
                    <div>
                        <img class="stone-image" src="@/assets/image/item_magicstone_equip.png">
                        <span class="ms-2">{{stone.name}}</span>
                    </div>
                </label>
            </div>
        </div>
    </div>

    <div class="row mt-3" v-if="selectFinish">
        <div class="col-md-10 offset-md-1 text-center">
            (
                <span style="color:black;">
                총 {{result.total}} 
                </span>
                / 
                <span style="color:blue;">
                성공 {{result.success}}
                </span> 
                /
                <span style="color:red">
                실패 {{result.fail}}
                </span>
            )
        </div>
    </div>
    <div class="row mt-1" v-if="selectFinish">
        <div class="col-md-10 offset-md-1 text-center">
            <button class="btn btn-outline-secondary" @click="clearEnchantProgress();">초기화</button>
            <button class="btn btn-outline-warning ms-1" @click="startEnchantProgress(3);" :disabled="isEnchantFinished">{{enchantButtonLabel}}</button>
        </div>
    </div>
    <div class="row mt-1" v-if="selectFinish">
        <div class="col-md-10 offset-md-1 text-center">
            <button class="btn btn-outline-danger ms-1" @click="multipleEnchantProgress(10);">10연속</button>
            <button class="btn btn-outline-danger ms-1" @click="multipleEnchantProgress(100);">100연속</button>
            <button class="btn btn-outline-danger ms-1" @click="multipleEnchantProgress(1000);">1000연속</button>
        </div>
    </div>

    <div class="row mt-4" style="height:60px">
        <div class="col-md-10 offset-md-1" v-if="enchant.progress">
            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{width: enchant.progress + '%'}"
                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h6 class="text-center mt-2 result" 
            :class="{success:enchant.progress == 100 && enchant.result, fail:enchant.progress == 100 && !enchant.result}">
                {{progressText}}
            </h6>
        </div>
    </div>
</div>
</template>
<script>
import Vue from "vue";
export default {
    name:"MagicStoneEnchant",
    data(){
        return {
            keyword:"",
            itemList : [],
            stoneList : [],

            socketCount:"",
            socketList:[],

            enchant:{
                stone:0,
                progress:0,
                result:false,
                success:0,
                clear(){
                    this.progress = 0;
                    this.success = 0;
                    this.result = false;
                },
            },
            
            result : {
                total:0,
                success:0,
                fail:0
            }
        };
    },
    computed:{
         selectFinish(){
            return this.choice != null && this.socketCount > 0;
         },
         progressText(){
            if(this.enchant.progress < 100)
                return "마석 강화 중";
            else if(this.enchant.result)
                return "마석 강화 성공";
            else
                return "마석 강화 실패";
         },
         choice(){
            return this.keyword >= 0 ? this.itemList[this.keyword] : null;
         },
         isEnchantFinished(){
            return this.enchant && this.enchant.success == this.socketCount;
         },
         enchantButtonLabel(){
            return this.isEnchantFinished ? "강화 완료" : "마석 강화";
         },
         enchantStone(){
            return this.stoneList[this.enchant.stone];
         },
    },
    methods:{
        clearEnchantProgress(){
            for(var i=0; i < this.socketCount; i++){
                this.socketList[i].name = "";
                this.socketList[i].result = false;
            }
            this.enchant.result = false;
            this.enchant.progress = 0;
            this.enchant.success = 0;

            this.result.total = 0;
            this.result.success = 0;
            this.result.fail = 0;
        },
        startEnchantProgress(second){
            if(this.enchant.success == this.socketCount) return;

            if(!this.enchantStone) return;

            this.enchant.progress = 0;

            var proc = () => {
                this.enchant.progress++;
                if (this.enchant.progress < 99) {
                    setTimeout(proc, second / 100);
                } else {
                    setTimeout(this.afterEnchantProgress,1000);
                }
            };

            setTimeout(proc, 100);
        },
        enchantProgress(){
            const successRate = this.calculateEnchantRate(this.choice.grade);
            return Math.floor(Math.random() * 100) < successRate;
        },
        afterEnchantProgress(){
            this.enchant.progress = 100;

            const result = this.enchantProgress(1);

            this.result.total++;
            if(result){

                if(!this.socketList[this.enchant.success].result){
                    Vue.set(this.socketList, this.enchant.success, {name:this.enchantStone.name, result:true});
                }
                Vue.set(this.enchant, "result", true);
                Vue.set(this.enchant, "success", this.enchant.success + 1);
                Vue.set(this.result, "success", this.result.success + 1);

                // if(this.socketList[this.socketList.length-1]){
                // }
            }
            else{
                for(let i=0; i < this.socketList.length; i++){
                    this.socketList[i].name = "";
                    this.socketList[i].result = false;
                }
                this.enchant.result = false;
                this.enchant.success = 0;
                this.result.fail++;
            }
        },
        calculateEnchantRate(grade){
            switch(grade){
                case "유일": return 70;
                case "영웅": return 60;
            }
            return 0;
        },
        multipleEnchantProgress(count){
            for(let i=0; i < count; i++){
                this.afterEnchantProgress();
            }
        },
    },
    watch:{
        socketCount(){
            this.socketList = [];
            for(let i=0; i < this.socketCount; i++) {
                this.socketList.push({name:"", result:false});
            }

            this.enchant.clear();
        },
    },
    created:function(){
        this.itemList.push(...require("@/assets/json/weapon.json"));
        this.itemList.push(...require("@/assets/json/armor.json"));
        this.stoneList.push(...require("@/assets/json/magicstone.json"));
    },
};
</script>
<style scoped>
    .item-wrapper {
        border:1px solid rgb(59, 79, 109);
        background-color:rgb(35, 42, 53);
        font-size:15px;
        padding:1em;
    }
    .item-wrapper > .item-name {
        font-size:2em;
    }
    .item-wrapper > .socket-wrapper > .item-slot {
        width:50%;
    }
    .item-wrapper > .item-name > .enchant-level {
        color:rgb(217, 185, 115);
    }
    .item-wrapper > .item-name.unique {
        color:rgb(255, 193, 3);
    }
    .item-wrapper > .item-name.hero {
        color:rgb(255, 128, 51);
    }
    .item-wrapper > .item-type , 
    .item-wrapper > .text {
        color:rgb(217, 215, 176);
        font-size:1.5em;
    }
    .item-wrapper > .item-level {
        color:rgb(217, 185, 115);
        font-size:1.5em;
    }
    .item-wrapper > hr {
        height:5px;
        background-color:rgb(72, 88, 113);
    }
    .item-wrapper .stone-name {
        display:flex;
        align-items:center;
        padding-left:0.5em;
        font-size:1.25em;
        color:rgb(217, 215, 176);
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    input[name=stone] ~ div {
        border:2px solid transparent;
    }
    input[name=stone]:checked ~ div {
        color:red;
        border:2px solid red;
    }
</style>