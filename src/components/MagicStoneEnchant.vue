<template>
<div class="container-fluid">
    <div class="row mt-4">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <jumbotron-header title="마석 강화 시뮬레이션" contents="인게임 수치와 동일하게 설정되어 있습니다"></jumbotron-header>
        </div>
    </div>
    
    <div class="row mt-3">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div class="row">
                <label class="col-form-label col-md-3">
                    아이템 선택
                </label>
                <div class="col-md-9 position-relative">
                    <item-search-bar :data-list="itemList" @select-item="selectItem"></item-search-bar>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3" v-if="choice != null">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div class="row">
                <label class="col-form-label col-md-3">
                    소켓 선택
                </label>
                <div class="col-md-9 d-flex">
                    <label v-for="count in availableSocketCountList" :key="count" class="flex-grow-1">
                        <input type="radio" class="form-check-input" v-model.number="socketCount" :value="count"> {{count}}소켓
                    </label>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3" v-if="selectFinish">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="item-wrapper">
                        <div class="item-name" :class="calculateItemGradeClass">
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
                        <div class="text">마석 강화({{usableStoneMaxLevel}}레벨 이하의 마석만 강화 가능)</div>
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
                            <input type="radio" name="stone" :value="index" class="d-none" v-model="enchantStoneIndex">
                            <div>
                                <img class="stone-image" src="@/assets/image/item_magicstone_equip.png">
                                <span class="ms-2">{{stone.name}}</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3" v-if="selectFinish">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 result-wrapper">
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

    <div class="row mt-3" v-if="selectFinish">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 result-wrapper">
            <div class="button-wrapper" v-if="selectFinish">
                <button class="btn btn-danger" @click="multipleEnchantProgress(10);" :disabled="isEnchantFinished">10회</button>
                <button class="btn btn-danger" @click="multipleEnchantProgress(100);" :disabled="isEnchantFinished">100회</button>
                <button class="btn btn-danger" @click="multipleEnchantProgress(1000);" :disabled="isEnchantFinished">1000회</button>
                <button class="btn btn-secondary" @click="clearEnchantProgress();">초기화</button>
                <button class="btn btn-primary" @click="startEnchantProgress(3);" :disabled="isEnchantFinished">{{enchantButtonLabel}}</button>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <progress-bar ref="progressBar" :messages="messages" @finish="enchantFinish"></progress-bar>
        </div>
    </div>
</div>
</template>
<script>
import ItemSearchBarVue from "./search/ItemSearchBar.vue";
import JumbotronHeaderVue from "./layout/JumbotronHeader.vue";
import ProgressBarVue from "./fragment/ProgressBar.vue";

export default {
    name:"MagicStoneEnchant",
    components:{
        'item-search-bar':ItemSearchBarVue,
        'jumbotron-header':JumbotronHeaderVue,
        'progress-bar':ProgressBarVue,
    },
    data(){
        return {
            keyword:"",
            itemList : [],
            stoneList : [],

            socketCount:"",
            socketList:[],

            enchantStoneIndex:0,
            enchantSuccessCombo:0,
            enchantResult:false,
            
            result : {
                total:0,
                success:0,
                fail:0
            },

            choice : null,

            messages:{
                begin:"준비",
                step:"마석 강화 중",
                end:"완료"
            },
        };
    },
    computed:{
         selectFinish(){
            return this.choice != null && this.socketCount > 0;
         },
         choiceItemName(){
            if(!this.choice) return "";
            return "["+this.choice.grade+"] " + this.choice.name;
         },
         enchantButtonLabel(){
            return this.isEnchantFinished ? "완료" : "강화";
         },
         enchantStone(){
            return this.stoneList[this.enchantStoneIndex];
         },
         isEnchantFinished(){
            return this.enchantSuccessCombo == this.socketCount;
         },
         availableSocketCountList(){
            if(!this.choice) return null;
            switch(this.choice.grade){
                case "유일": return [4, 5, 6];
                case "영웅": return [5, 6];
                case "신화": return [5, 6];
                case "궁극": return [6];
            }
            return null;
         },
         usableStoneMaxLevel() {
            if(!this.choice) return 0;
            return parseInt((this.choice.level + 19) / 10) * 10;
         },
         calculateItemGradeClass(){
            if(!this.choice) return null;
            switch(this.choice.grade){
                case "유일": return "unique";
                case "영웅": return "epic";
                case "신화": return "mythic";
                case "궁극": return "finality";
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

            this.result.total = 0;
            this.result.success = 0;
            this.result.fail = 0;

            this.enchantSuccessCombo = 0;
        },
        startEnchantProgress(){
            if(this.enchantSuccessCombo == this.socketCount) return;

            if(!this.enchantStone) return;

            this.$refs.progressBar.start();
        },
        enchant(){
            const successRate = this.calculateEnchantRate(this.choice.grade);
            return Math.floor(Math.random() * 100) < successRate;
        },
        enchantFinish(){
            const result = this.enchant();

            if(result){

                if(!this.socketList[this.enchantSuccessCombo])
                    throw "강화 완료";

                if(!this.socketList[this.enchantSuccessCombo].result){
                    this.socketList[this.enchantSuccessCombo].name = this.enchantStone.name;
                    this.socketList[this.enchantSuccessCombo].result = true;
                }

                this.enchantResult = true;
                this.enchantSuccessCombo++;
                this.result.success++;

                // if(this.socketList[this.socketList.length-1]){
                // }
            }
            else{
                for(let i=0; i < this.socketList.length; i++){
                    this.socketList[i].name = "";
                    this.socketList[i].result = false;
                }
                this.enchantResult = false;
                this.enchantSuccessCombo = 0;
                this.result.fail++;
            }

            this.result.total++;
        },
        calculateEnchantRate(grade){
            switch(grade){
                case "유일": return 70;
                case "영웅": return 60;
                case "신화": return 50;
                case "궁극": return 40;
            }
            return 0;
        },
        multipleEnchantProgress(count){
            for(let i=0; i < count; i++){
                this.enchantFinish();
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

            this.$refs.progressBar.clear();
        },
        choice(){
            this.socketCount = this.availableSocketCountList[0];
        },
    },
    created:function(){
        // this.itemList.push(...require("@/assets/json/weapon.json"));
        // this.itemList.push(...require("@/assets/json/armor.json"));
        this.itemList.push(...require("@/assets/json/weapon/sword.json"));
        this.itemList.push(...require("@/assets/json/weapon/dagger.json"));
        this.itemList.push(...require("@/assets/json/weapon/greatsword.json"));
        this.itemList.push(...require("@/assets/json/weapon/mace.json"));
        this.itemList.push(...require("@/assets/json/weapon/polearm.json"));
        this.itemList.push(...require("@/assets/json/weapon/bow.json"));
        this.itemList.push(...require("@/assets/json/weapon/staff.json"));
        this.itemList.push(...require("@/assets/json/weapon/spellbook.json"));
        this.itemList.push(...require("@/assets/json/weapon/orb.json"));
        this.itemList.push(...require("@/assets/json/weapon/aether_revolver.json"));
        this.itemList.push(...require("@/assets/json/weapon/aether_cannon.json"));
        this.itemList.push(...require("@/assets/json/weapon/stringed_instrument.json"));
        this.itemList.push(...require("@/assets/json/weapon/aether_key.json"));
        this.itemList.push(...require("@/assets/json/weapon/paint_rings.json"));

        this.itemList.push(...require("@/assets/json/armor/cloth-1.json"));
        this.itemList.push(...require("@/assets/json/armor/cloth-2.json"));
        this.itemList.push(...require("@/assets/json/armor/leather-1.json"));
        this.itemList.push(...require("@/assets/json/armor/leather-2.json"));
        this.itemList.push(...require("@/assets/json/armor/chain-1.json"));
        this.itemList.push(...require("@/assets/json/armor/chain-2.json"));
        this.itemList.push(...require("@/assets/json/armor/plate-1.json"));
        this.itemList.push(...require("@/assets/json/armor/plate-2.json"));
        this.itemList.push(...require("@/assets/json/armor/shield.json"));

        this.stoneList.push(...require("@/assets/json/magicstone.json"));
    },
    mounted:function(){
       
    },
};
</script>
<style scoped>
    .container-fluid {
        margin-bottom: 100px;
    }
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
    .item-wrapper > .item-name.epic {
        color:rgb(255, 128, 51);
    }
    .item-wrapper > .item-name.mythic {
        color:#dd43ef;
    }
    .item-wrapper > .item-name.finality {
        color:#e14141;
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
    .result-wrapper {
        text-align: center;
    }
    @media screen and (max-width:768px){
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
            height:60px;
        }
        .result-wrapper {
            text-align: left;
        }
    }
</style>