<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <jumbotron-header title="아이템 강화 시뮬레이션" contents="인게임 확률과 동일하게 설정되어 있습니다"></jumbotron-header>
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

        <div class="row mt-3" v-if="selectFinish">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="item-wrapper">
                            <div class="item-name" :class="calculateItemGradeClass">
                                <span class="enchant-level"
                                    v-if="choice && choice.enchantLevel > 0">+{{choice.enchantLevel}}</span>
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
                                {{choice.enchantLevel}}
                            </div>
                            <hr>
                            <div class="text">마석 강화({{usableStoneMaxLevel}}레벨 이하의 마석만 강화 가능)</div>
                        </div>
                    </div>
                    <div class="col-md-6 d-grid align-items-center mb-3 stone-item-wrapper" v-if="stoneRange > 0">
                        <div class="stone-item" v-for="stone in stoneRange" :key="stone">
                            <label class="d-block w-100">
                                <input type="radio" name="stone" :value="choice.level + stone - 1" class="d-none"
                                    v-model="enchantStoneLevel">
                                <div>
                                    <img class="stone-image" :src="calculateStoneImageUrl(choice.level+stone-1)">
                                    <span class="ms-2">
                                        {{choice.level + stone - 1}}레벨 강화석
                                        &nbsp;
                                        ({{calculateEnchantRate(choice.level + stone - 1)}}
                                        <span v-show="supplyRate > 0">
                                            +{{supplyRate}}
                                        </span>
                                        <span v-show="supplyRate > 0" class="text-danger">
                                            = {{calculateEnchantRate(choice.level + stone - 1) + supplyRate}}
                                        </span>
                                        %)
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-2" v-if="selectFinish">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div class="row">
                    <div class="col-sm-2">보조제</div>
                    <div class="col-sm-10">
                        <div class="row">
                            <div class="col-md-3">
                                <label class="flex-grow-1">
                                    <input type="radio" class="form-check-input" v-model="supply" value=""> 사용안함
                                </label>
                            </div>
                            <div class="col-md-3">
                                <label class="flex-grow-1 ms-2">
                                    <input type="radio" class="form-check-input" v-model="supply" value="하급"> 하급(+5%)
                                </label>
                            </div>
                            <div class="col-md-3">
                                <label class="flex-grow-1 ms-2">
                                    <input type="radio" class="form-check-input" v-model="supply" value="중급"> 중급(+10%)
                                </label>
                            </div>
                            <div class="col-md-3">
                                <label class="flex-grow-1 ms-2">
                                    <input type="radio" class="form-check-input" v-model="supply" value="상급"> 상급(+15%)
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3" v-if="selectFinish">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 result-wrapper">
                <div class="row">
                    <div class="col-md-3 text-dark">
                        총 {{result.total}} 회 시도
                    </div>
                    <div class="col-md-3 text-primary">
                        성공 {{result.success}} 회
                    </div>
                    <div class="col-md-3 text-danger">
                        실패 {{result.fail}} 회
                    </div>
                    <div class="col-md-3 text-warning">
                        보조제 {{result.supplyCount}} 개
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <progress-bar ref="progressBar" :messages="messages" @finish="enchantFinishProgress"></progress-bar>
            </div>
        </div>

        <div class="row mt-3" v-if="selectFinish">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 result-wrapper">
                <div class="button-wrapper" v-if="selectFinish">
                    <button class="btn btn-danger" @click="multipleEnchantProgress(10);"
                        :disabled="isEnchantFinished">10회</button>
                    <button class="btn btn-danger" @click="multipleEnchantProgress(100);"
                        :disabled="isEnchantFinished">100회</button>
                    <button class="btn btn-danger" @click="multipleEnchantProgress(1000);"
                        :disabled="isEnchantFinished">1000회</button>
                    <button class="btn btn-secondary" @click="clearEnchantProgress();">초기화</button>
                    <button class="btn btn-primary" @click="startEnchantProgress(3);"
                        :disabled="isEnchantFinished">{{enchantButtonLabel}}</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import JumbotronHeader from './layout/JumbotronHeader.vue';
    import ItemSearchBar from './search/ItemSearchBar.vue';
    import ProgressBar from "./fragment/ProgressBar.vue";

    import _ from "lodash";

    import 'js-snackbar/snackbar.css';
    import { show, ACTION_TYPE } from 'js-snackbar';

    const images = require.context("../assets/image/", false, /\.png/);

    export default {
        name: "ItemEnchant",
        components: {
            'jumbotron-header': JumbotronHeader,
            'item-search-bar': ItemSearchBar,
            'progress-bar': ProgressBar,
        },
        data() {
            return {
                itemList: [],
                choice: null,

                stoneMaxLevel: 130,
                enchantStoneLevel: 0,
                enchantMaxRate: 80,
                enchantMinRate: 0,

                messages: {
                    begin: "준비",
                    step: "장비 강화 중",
                    end: "완료"
                },

                result: {
                    total: 0,
                    success: 0,
                    fail: 0,
                    supplyCount : 0,
                    clear() {
                        this.success = 0;
                        this.fail = 0;
                        this.total = 0;
                        this.supplyCount = 0;
                    },
                },

                socketCount: 0,

                supply: "",
            };
        },
        computed: {
            selectFinish() {
                return this.choice != null;
            },
            stoneRange() {
                if (!this.choice) return 0;
                return this.stoneMaxLevel - this.choice.level + 1;
            },
            usableStoneMaxLevel() {
                if (!this.choice) return 0;
                return parseInt((this.choice.level + 19) / 10) * 10;
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
            enchantButtonLabel() {
                return "강화";
            },
            isEnchantFinished() {
                return this.choice.enchantLevel === 15;
            },
            isEnchantReady() {
                return this.choice && this.enchantStoneLevel > 0;
            },
            supplyRate() {
                switch (this.supply) {
                    case "하급":
                        return 5;
                    case "중급":
                        return 10;
                    case "상급":
                        return 15;
                }
                return 0;
            },
            supplyUsed(){
                return this.supply !== "";
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
        methods: {
            selectItem(item) {
                this.choice = item;
            },
            getStableEnchantStoneLevel(grade) {
                switch (grade) {
                    case "유일":
                        return 20;
                    case "영웅":
                        return 30;
                }
            },
            calculateStoneImageUrl(level) {
                const idx = parseInt((level - 1) / 20);
                return images("./item_stone_" + idx + ".png");
            },
            calculateEnchantRate(level) {
                if (!this.choice) return 0;

                //유일은 10강이하 1렙당 2%, 11강이상 1/2
                if (this.choice.grade == "유일") {
                    const gap = level - this.choice.level;
                    let rate = gap * 2 + 20;
                    if (this.choice.enchantLevel >= 10) {
                        rate /= 2;
                    }
                    rate = Math.min(this.enchantMaxRate, rate);
                    rate = Math.max(this.enchantMinRate, rate);
                    return rate;
                }
                //영웅은 10강이하 1렙당 1.5%, 11강이상 1/2
                else if (this.choice.grade == "영웅") {
                    const gap = level - this.choice.level;
                    let rate = gap * 1.5 + 15;
                    if (this.choice.enchantLevel >= 10) {
                        rate /= 2;
                    }
                    rate = Math.min(this.enchantMaxRate, rate);
                    rate = Math.max(this.enchantMinRate, rate);
                    return rate;
                }
                return 0;
            },
            whenResized: _.throttle(() => {
                const origin = document.querySelector(".item-wrapper");
                const target = document.querySelector(".stone-item-wrapper");

                if (!origin || !target) return;

                let height = origin.scrollHeight;
                const width = document.querySelector("#app").scrollWidth;
                if (width <= 768) {
                    height /= 2;
                }
                target.style.height = height + "px";
            }, 250),
            moveToStonePosition() {
                if (!this.choice || !this.enchantStoneLevel) return;

                const range = this.stoneMaxLevel - this.choice.level + 1;
                const index = this.enchantStoneLevel - this.choice.level;
                const percent = index * 100 / range;

                const target = document.querySelector(".stone-item-wrapper");
                if (!target) return;
                const totalHeight = target.scrollHeight;
                const position = totalHeight * percent / 100;
                target.scrollTo(0, position);
            },
            startEnchantProgress() {
                if (!this.isEnchantReady) throw "인챈트 준비가 되지 않았습니다";

                this.$refs.progressBar.start();
            },
            clearEnchantProgress() {
                this.choice.enchantLevel = 0;
                this.result.clear();
            },
            multipleEnchantProgress(count) {
                if (count === undefined || typeof count !== "number") return;

                for (let i = 0; i < count; i++) {
                    const enchantResult = this.enchant();
                    this.calculateResult(enchantResult);
                }
            },
            calculateResult(enchantResult){
                this.result.total++;
                this.result.supplyCount += this.calculateSupplyCount();

                let itemLevel;
                if (enchantResult) {
                    itemLevel = Math.min(this.choice.enchantLevel + 1, 15);
                    this.result.success++;
                } else {
                    if(this.choice.enchantLevel >= 10){
                        itemLevel = Math.min(this.choice.enchantLevel - 1, 10);
                    }
                    else {
                        itemLevel = Math.max(this.choice.enchantLevel - 1, 0);
                    }
                    this.result.fail++;
                }
                this.choice.enchantLevel = itemLevel;
            },
            enchantFinishProgress() {
                const enchantResult = this.enchant();
                this.calculateResult(enchantResult);   
                if(enchantResult){
                    this.showEnchantSuccessToast();
                }             
                else {
                    this.showEnchantFailToast();
                }
            },
            enchant() {
                if (this.choice.enchantLevel == 15) throw "강화 종료";
                let rate = this.calculateEnchantRate(this.enchantStoneLevel);
                rate += this.supplyRate;
                const choice = Math.random() * 100;
                return choice <= rate;
            },
            showEnchantSuccessToast(){
                show({
                    text:"강화 성공",
                    actionType:ACTION_TYPE.NONE,
                    pos:"top-right",
                    backgroundColor:"var(--bs-primary)"
                });
            },
            showEnchantFailToast(){
                show({
                    text:"강화 실패",
                    actionType:ACTION_TYPE.NONE,
                    pos:"top-right",
                    backgroundColor:"var(--bs-danger)"
                });
            },
            calculateSupplyCount(){
                if(!this.choice) return 0;
                if(!this.supplyUsed) {
                    return 0;
                }
                
                if(this.choice.enchantLevel < 10) {
                    return 25;
                }
                else {
                    return 50;
                }
            }
        },
        watch: {
            choice() {
                this.socketCount = this.availableSocketCountList[0];
                this.enchantStoneLevel = this.choice.level + this.getStableEnchantStoneLevel(this.choice.grade);
                this.whenResized();
                setTimeout(() => {
                    this.moveToStonePosition();
                }, 250);
            },
        },
        created() {
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
        },
        mounted() {
            window.addEventListener("resize", this.whenResized);
        },
        beforeUnmount() {
            window.removeEventListener("resize", this.whenResized);
        },
        updated() {
            this.whenResized();
        },
    };
</script>
<style>
    .item-wrapper {
        border: 1px solid rgb(59, 79, 109);
        background-color: rgb(35, 42, 53);
        font-size: 15px;
        padding: 1em;
    }

    .item-wrapper>.item-name {
        font-size: 2em;
    }

    .item-wrapper>.socket-wrapper>.item-slot {
        width: 50%;
    }

    .item-wrapper>.item-name>.enchant-level {
        color: rgb(217, 185, 115);
    }

    .item-wrapper>.item-name.unique {
        color: rgb(255, 193, 3);
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

    .item-wrapper>.item-type,
    .item-wrapper>.text {
        color: rgb(217, 215, 176);
        font-size: 1.5em;
    }

    .item-wrapper>.item-level {
        color: rgb(217, 185, 115);
        font-size: 1.5em;
    }

    .item-wrapper>hr {
        height: 5px;
        background-color: rgb(72, 88, 113);
    }

    .item-wrapper .stone-name {
        display: flex;
        align-items: center;
        padding-left: 0.5em;
        font-size: 1.25em;
        color: rgb(217, 215, 176);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    input[name=stone]~div {
        border: 2px solid transparent;
    }

    input[name=stone]:checked~div {
        color: red;
        border: 2px solid red;
    }

    .stone-item-wrapper {
        overflow-y: auto;
    }

    .stone-item-wrapper::-webkit-scrollbar {
        width: 1px;
    }

    .stone-item-wrapper>.stone-item {
        width: 100%;
    }

    .stone-item-wrapper>.stone-item>label {
        cursor: pointer;
    }

    .button-wrapper {
        margin: 10px 0px;
        display: flex;
        flex-direction: row;
        justify-content: end;
    }

    .button-wrapper>button:not(:first-child) {
        margin: 0 0 0 10px;
    }

    .result-wrapper {
        text-align: center;
    }

    @media screen and (max-width:768px) {
        .button-wrapper {
            position: fixed;
            bottom: 65px;
            right: 0;
            display: flex;
            flex-direction: column;
        }

        .button-wrapper>button {
            width: 85px;
        }

        .button-wrapper>button:not(:first-child) {
            margin: 10px 0 0 0;
        }

        .progress-wrapper {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 60px;
        }

        .result-wrapper {
            text-align: left;
        }
    }
</style>