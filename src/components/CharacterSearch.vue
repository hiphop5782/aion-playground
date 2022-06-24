<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div class="mt-3 p-4 text-light bg-dark rounded">
                    <h2>아이온 캐릭터 검색</h2>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <label class="form-label">캐릭터 이름</label>
                <character-search-bar @select-item="selectItem"></character-search-bar>
            </div>
        </div>

        <div class="row mt-4" v-if="user">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <a href="#" class="btn btn-outline-primary btn-lg align-bottom"
                    @click="goHomepage(user.serverId, user.characterId);">{{user.characterName}}</a>
                <a href="#" class="btn btn-outline-dark btn-small ms-1 align-bottom">{{user.serverName}}</a>
                <a href="#" class="btn btn-outline-dark btn-small ms-1 align-bottom">{{user.jobName}}</a>
                <a href="#" class="btn btn-outline-dark btn-small ms-1 align-bottom"
                    @click.prevent="goGuild(user.serverId, user.guildId);">{{user.guildName}}</a>
                <a href="#" class="btn btn-outline-dark btn-small ms-1 align-bottom">{{userDetail.character_abyss.rankName}}</a>
            </div>
        </div>

        <div class="row mt-4" v-if="userDetail">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div class="row">
                    <div class="col-md-6">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center fw-bold"
                                    v-for="(item, index) in userDetail.character_equipments" :key="index">
                                <span :class="item.quality">
                                    <img :src="item.image" width="24">
                                    {{item.name}}
                                </span>
                                <span class="badge rounded-pill fw-bold" :class="calculateEnchantcount(item.enchantCount)" v-show="item.enchantCount > 0">+{{item.enchantCount}}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md-3">
                        <ul class="list-group">
                            <li v-if="isPhysicalClass(user.jobName) || isHybridClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                물리 공격력
                                <span class="badge rounded-pill fw-bold" :class="calculatePhysical(userDetail.character_stats.totalStat.physicalRight)">
                                    {{userDetail.character_stats.totalStat.physicalRight}}
                                </span>
                            </li>
                            <li v-if="isPhysicalClass(user.jobName) || isHybridClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                명중
                                <span class="badge rounded-pill fw-bold" :class="calculateAccuracy(userDetail.character_stats.totalStat.accuracyRight)">
                                    {{userDetail.character_stats.totalStat.accuracyRight}}
                                </span>
                            </li>
                            <li v-if="isPhysicalClass(user.jobName) || isHybridClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                물리 치명타
                                <span class="badge rounded-pill fw-bold" :class="calculateCritical(userDetail.character_stats.totalStat.criticalRight)">
                                    {{userDetail.character_stats.totalStat.criticalRight}}
                                </span>
                            </li>
                            <li v-if="isMagicalClass(user.jobName) || isHybridClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                마법 증폭력
                                <span class="badge rounded-pill fw-bold" :class="calculateMagicalBoost(userDetail.character_stats.totalStat.magicalBoost)">
                                    {{userDetail.character_stats.totalStat.magicalBoost}}
                                </span>
                            </li>
                            <li v-if="isMagicalClass(user.jobName) || isHybridClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                마법 적중
                                <span class="badge rounded-pill fw-bold" :class="calculateMagicalAccuracy(userDetail.character_stats.totalStat.magicalAccuracy)">
                                    {{userDetail.character_stats.totalStat.magicalAccuracy}}
                                </span>
                            </li>
                            <li v-if="isMagicalClass(user.jobName) || isHybridClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                마법 치명타
                                <span class="badge rounded-pill fw-bold" :class="calculateMagicalCritical(userDetail.character_stats.totalStat.magicalCriticalRight)">
                                    {{userDetail.character_stats.totalStat.magicalCriticalRight}}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                생명력
                                <span class="badge bg-light text-danger rounded-pill fw-bold">
                                    {{userDetail.character_stats.totalStat.hp}}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                정신력
                                <span class="badge bg-light text-primary rounded-pill fw-bold">
                                    {{userDetail.character_stats.totalStat.mp}}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                마법 저항
                                <span class="badge rounded-pill fw-bold" :class="calculateMagicResist(userDetail.character_stats.totalStat.magicResist)">
                                    {{userDetail.character_stats.totalStat.magicResist}}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                회피
                                <span class="badge rounded-pill fw-bold" :class="calculateDodge(userDetail.character_stats.totalStat.dodge)">
                                    {{userDetail.character_stats.totalStat.dodge}}
                                </span>
                            </li>
                            <li v-if="!isTwohandClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                방패 방어
                                <span class="badge rounded-pill fw-bold" :class="calculateBlock(userDetail.character_stats.totalStat.block)">
                                    {{userDetail.character_stats.totalStat.block}}
                                </span>
                            </li>
                            <li v-if="isTwohandClass(user.jobName)" class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                무기 방어
                                <span class="badge bg-light rounded-pill fw-bold">
                                    {{userDetail.character_stats.totalStat.parry}}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                PvP 공격력
                                <span class="badge bg-primary rounded-pill fw-bold">
                                    ??%
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                PvP 방어력
                                <span class="badge bg-primary rounded-pill fw-bold">
                                    ??%
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                    
                    <div class="col-md-3">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center fw-bold" v-for="(stigma, index) in userDetail.character_stigma" :key="index">
                                <span :class="stigma.quality">{{stigma.name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import CharacterSearchBar from "./search/CharacterSearchBar.vue";
    import axios from "axios";

    export default {
        name: "CharacterSearch",
        components: {
            'character-search-bar': CharacterSearchBar
        },
        data() {
            return {
                user: null,
                userDetail: null,
            };
        },
        watch: {},
        methods: {
            async selectItem(user) {
                const [userRequest] = await Promise.all([
                    axios.get(this.$store.state.host+"/userinfo/" + user.serverId + "/" + user
                    .charId),
                ]);
                const [userDetailRequest] = await Promise.all([
                    axios.get(this.$store.state.host+"/userdetail/" + user.serverId + "/" + user.charId),
                ]);
                   
                this.user = userRequest.data;
                this.userDetail = userDetailRequest.data;
            },
            goHomepage(serverId, characterId) {
                const url = 'https://aion.plaync.com/characters/server/' + serverId + '/id/' + characterId + '/home';
                window.open(url, "homepage", "width=500, height=400, noopener=true,noreferrer=true");
            },
            goGuild(serverId, guildId) {
                const url = "https://aion.plaync.com/legions/server/" + serverId + "/id/" + guildId + "/home";
                window.open(url, "guildpage", "width=500, height=400, noopener=true,noreferrer=true");
            },
            //마법증폭력 충족도 계산
            calculateMagicalBoost(value){
                if(value >= 2400) return "bg-danger"
                else if(value >= 2100) return "bg-warning";
                return "bg-light";
            },
            //마법적중 충족도 계산
            calculateMagicalAccuracy(value){
                if(value >= 1650) return "bg-danger"
                else if(value >= 1450)  return "bg-warning";
                return "bg-light";
            },
            //마법치명 충족도 계산
            calculateMagicalCritical(value){
                if(value >= 100) return "bg-danger";
                else if (value >= 75) return "bg-warning";
                return "bg-light";
            },
            //물리공격 충족도 계산
            calculatePhysical(value){
                if(value >= 600) return "bg-danger";
                else if(value >= 550) return "bg-warning";
                return "bg-light";
            },
            //물리치명 충족도 계산
            calculateCritical(value){
                if(value >= 650) return "bg-danger";
                else if(value >= 500) return "bg-warning";
                return "bg-light";
            },
            //명중 충족도 계산
            calculateAccuracy(value){
                if(value >= 2300) return "bg-danger";
                else if(value >= 2100) return "bg-warning";
                return "bg-light";
            },
            //마법저항 충족도 계산
            calculateMagicResist(value){
                if(value >= 2000) return "bg-danger";
                else if(value >= 1800) return "bg-warning";
                return "bg-light";
            },
            //방패방어 충족도 계산
            calculateBlock(value){
                if(value >= 2600) return "bg-danger";
                else if(value >= 2300) return "bg-warning";
                return "bg-light";
            },
            //강화 충족도 계산
            calculateEnchantcount(value){
                if(value >= 13) return "bg-danger";
                else if(value >= 10) return "bg-warning";
                return "bg-light";
            },
            calculateDodge(value){
                if(value >= 2200) return "bg-danger";
                else if(value >= 1900) return "bg-warning";
                return "bg-light";
            },

            //타입 판정
            isMagicalClass(classType){
                switch(classType){
                    case "마도성": case "정령성": case "치유성":
                        return true;
                }
                return false;
            },
            isPhysicalClass(classType){
                switch(classType){
                    case "수호성": case "검성":
                        return true;
                }
                return false;
            },
            isHybridClass(classType){
                switch(classType){
                    case "궁성": case "살성": case "호법성":
                        return true;
                }
                return false;
            },
            isTwohandClass(classType){
                switch(classType){
                    case "마도성": case "정령성": case "궁성": case "호법성":
                        return true;
                }
                return false;
            },
        },
        created() {
            
        },
    };
</script>
<style>
    .list-group > .list-group-item {
        font-size: 0.90em;
    }
    @media screen and (max-width:768px){
        .list-group > .list-group-item {
            font-size: 1.2em;
        }
    }
    .epic {
        color:rgb(255, 128, 51);
    }
    .unique {
        /* color:rgb(255, 193, 3); */
        color:#e8af00;
    }
    .legend {
        color:rgb(64, 167, 206);
    }
    .rare {
        color:rgb(84, 175, 81);
    }
</style>