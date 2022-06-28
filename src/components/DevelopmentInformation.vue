<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <jumbotron-header title="개발자 정보"></jumbotron-header>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 text-center">
                <div class="card mb-3">
                    <div class="row g-0 d-flex align-items-center">
                        <div class="col-sm-4">
                            <a href="https://aion.plaync.com/legions/server/24/id/2548/home">
                                <img :src="developer.profile" alt="프로필 이미지" class="img-fluid rounded profile-image" />
                            </a>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-body">
                                <h5 class="card-title mb-4">
                                    {{developer.name}}
                                    <a href="https://aion.plaync.com/characters/server/24/id/129742/home" class="btn btn-outline-primary btn-small">
                                        보기
                                    </a>
                                </h5>
                                <p class="card-text">
                                    <span>#{{developer.server}} 서버</span>
                                    <span class="ms-1">#{{developer.legion}} 레기온</span>
                                    <span class="ms-1">#{{developer.class}}</span>
                                </p>
                                <p class="card-text">
                                    <a href="https://aion.plaync.com/characters/server/24/id/129742/board/guestbook">
                                        <small class="text-muted">문의사항은 방명록으로</small>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import JumbotronHeaderVue from './layout/JumbotronHeader.vue';
    export default {
        name: "DevelopmentInformation",
        components: {
            'jumbotron-header': JumbotronHeaderVue
        },
        data() {
            return {
                developer: null,
            };
        },
        created() {
            this.developer = require("@/assets/json/developer.json");
        },
    };
</script>
<style scoped>
    .profile-image {
        width:100%;
        margin: 0 auto;
    }
    @media screen and (max-width:576px){
        .profile-image {
            max-width:150px;
        }
        .card-text > span {
            display: block;
        }
    }
</style>