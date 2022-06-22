<template>
<div class="container-fluid">
    <div class="mt-3 p-4 text-light bg-dark rounded">
        <h2>마석 강화 시뮬레이션</h2>
        <p>성공 확률 - 유일 70%, 영웅 60%</p>
    </div>
    
    <div class="row mt-3">
        <label class="col-form-label col-md-3">
            아이템 선택
        </label>
        <div class="col-md-9 position-relative">
            <item-search-bar :data-list="itemList" @select-item="selectItem"></item-search-bar>

            <!-- <div class="datalist">
                <div class="datalist-item row" v-for="(item, index) in itemList" :key="index" @click="keyword = index">
                    <div class="col-3">{{item.grade}}</div>
                    <div class="col-9">{{item.name}}</div>
                </div>
            </div> -->

            <!--             
            <select class="form-select" v-model="keyword">
                <option value="">선택하세요</option>
                <option v-for="(item, index) in itemList" :value="index" :key="index">{{item.name}}</option>
            </select>
             -->
        </div>
    </div>

    <div class="row mt-3" v-if="choice != null">
        <label class="col-form-label col-md-3">
            소켓 선택
        </label>
        <div class="col-md-9 d-flex">
            <!-- <select v-model.number="socketCount" class="form-control">
                <option value="">선택하세요</option>
                <option v-for="count in availableSocketCountList" :key="count">{{count}}</option>
            </select> -->
            <label v-for="count in availableSocketCountList" :key="count" class="flex-grow-1">
                <input type="radio" class="form-check-input" v-model.number="socketCount" :value="count"> {{count}}소켓
            </label>
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
        <div class="col-md-6 d-flex flex-wrap align-items-center mb-3 stone-item-wrapper">
            <div class="stone-item" v-for="(stone, index) in stoneList" :key="index">
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
        <div class="col-md-10 offset-md-1 result-wrapper">
            (
                <span style="color:black;">
                총 {{result.total}} 회 시도
                </span>
                / 
                <span style="color:blue;">
                성공 {{result.success}} 회
                </span> 
                /
                <span style="color:red">
                실패 {{result.fail}} 회
                </span>
            )
        </div>
    </div>
    <div class="button-wrapper" v-if="selectFinish">
        <button class="btn btn-danger" @click="multipleEnchantProgress(10);" :disabled="isEnchantFinished">10회</button>
        <button class="btn btn-danger" @click="multipleEnchantProgress(100);" :disabled="isEnchantFinished">100회</button>
        <button class="btn btn-danger" @click="multipleEnchantProgress(1000);" :disabled="isEnchantFinished">1000회</button>
        <button class="btn btn-secondary" @click="clearEnchantProgress();">초기화</button>
        <button class="btn btn-primary" @click="startEnchantProgress(3);" :disabled="isEnchantFinished">{{enchantButtonLabel}}</button>
    </div>

    <div class="row mt-4 progress-wrapper" style="height:60px">
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
import ItemSearchBar from "./search/ItemSearchBar.vue";

export default {
    name:"MagicStoneEnchant",
    components:{ItemSearchBar},
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
            },

            choice : null,

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
         choiceItemName(){
            if(!this.choice) return "";
            return "["+this.choice.grade+"] " + this.choice.name;
         },
         isEnchantFinished(){
            return this.enchant && this.enchant.success == this.socketCount;
         },
         enchantButtonLabel(){
            return this.isEnchantFinished ? "완료" : "강화";
         },
         enchantStone(){
            return this.stoneList[this.enchant.stone];
         },
         availableSocketCountList(){
            if(!this.choice) return null;
            switch(this.choice.grade){
                case "유일": return [4, 5, 6];
                case "영웅": return [5, 6];
            }
            return null;
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

            if(result){

                if(!this.socketList[this.enchant.success])
                    throw "강화 완료";

                if(!this.socketList[this.enchant.success].result){
                    this.socketList[this.enchant.success].name = this.enchantStone.name;
                    this.socketList[this.enchant.success].result = true;
                }
                this.enchant.result = true;
                this.enchant.success++;
                this.result.success++;

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

            this.result.total++;
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
        selectItem(item){
            this.choice = item;
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
        choice(){
            this.socketCount = this.availableSocketCountList[0];
        },
    },
    created:function(){
        this.itemList.push(...require("@/assets/json/weapon.json"));
        this.itemList.push(...require("@/assets/json/armor.json"));
        this.stoneList.push(...require("@/assets/json/magicstone.json"));
    },
    mounted:function(){
        
       
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
    .stone-item-wrapper {
        overflow-y: auto;
    }
    .stone-item-wrapper::-webkit-scrollbar {
        width:1px;
    }
    .stone-item-wrapper > .stone-item {
        width:50%;
    }
    .stone-item-wrapper > .stone-item > label {
        cursor:pointer;
    }
    .button-wrapper {
        margin : 10px 0px;
        display: flex;
        flex-direction: row;
        justify-content: end;
    }
    .button-wrapper > button:not(:first-child){
        margin: 0 0 0 10px;
    }
    .progress-wrapper{
        background-color: white;
    }
    .result-wrapper {
        text-align: center;
    }
    @media screen and (max-width:640px){
        .stone-item-wrapper {
            height:20vh;
        }
        .stone-item-wrapper > .stone-item {
            width:100%;
        }
        .button-wrapper {
            position: fixed;
            bottom:65px;
            right:0;
            display:flex;
            flex-direction: column;
        }
        .button-wrapper > button {
            width:85px;
        }
        .button-wrapper > button:not(:first-child) {
            margin: 10px 0 0 0;       
        }
        .progress-wrapper {
            position: fixed;
            left:0;
            right:0;
            bottom: 0;
            height:10px;
        }
        .result-wrapper {
            text-align: left;
        }
    }
</style>