<template>
    <!-- <div class="loader-wrapper" v-show="loading"> -->
        <pulse-loader :loading="loading" v-if="mode == 'pulse'"></pulse-loader>
        <ring-loader :loading="loading" v-if="mode == 'ring'"></ring-loader>
        <bounce-loader :loading="loading" v-if="mode=='bounce'"></bounce-loader>
        <grid-loader :loading="loading" v-if="mode=='grid'"></grid-loader>
        <grid-loader :loading="loading" v-if="mode=='grid'"></grid-loader>
        <clip-loader :loading="loading" v-if="mode=='clip'"></clip-loader>
        <rise-loader :loading="loading" v-if="mode=='rise'"></rise-loader>
        <beat-loader :loading="loading" v-if="mode=='beat'"></beat-loader>
        <sync-loader :loading="loading" v-if="mode=='sync'"></sync-loader>
        <rotate-loader :loading="loading" v-if="mode=='rotate'"></rotate-loader>
        <fade-loader :loading="loading" v-if="mode=='fade'"></fade-loader>
        <pacman-loader :loading="loading" v-if="mode=='pacman'"></pacman-loader>
        <square-loader :loading="loading" v-if="mode=='square'"></square-loader>
        <skew-loader :loading="loading" v-if="mode=='skew'"></skew-loader>
        <moon-loader :loading="loading" v-if="mode=='moon'"></moon-loader>
        <dot-loader :loading="loading" v-if="mode=='dot'"></dot-loader>
    <!-- </div> -->
</template>
<script>
    import PulseLoaderVue from "vue-spinner/src/PulseLoader.vue";
    import RingLoaderVue from "vue-spinner/src/RingLoader.vue";
    import BounceLoaderVue from "vue-spinner/src/BounceLoader.vue";
    import GridLoaderVue from "vue-spinner/src/GridLoader.vue";
    import ClipLoaderVue from "vue-spinner/src/ClipLoader.vue";
    import RiseLoaderVue from "vue-spinner/src/RiseLoader.vue";
    import BeatLoaderVue from "vue-spinner/src/BeatLoader.vue";
    import SyncLoaderVue from "vue-spinner/src/SyncLoader.vue";
    import RotateLoaderVue from "vue-spinner/src/RotateLoader.vue";
    import FadeLoaderVue from "vue-spinner/src/FadeLoader.vue";
    import PacmanLoaderVue from "vue-spinner/src/PacmanLoader.vue";
    import SquareLoaderVue from "vue-spinner/src/SquareLoader.vue";
    import SkewLoaderVue from "vue-spinner/src/SkewLoader.vue";
    import MoonLoaderVue from "vue-spinner/src/MoonLoader.vue";
    import DotLoaderVue from "vue-spinner/src/DotLoader.vue";

    export default {
        name:"AjaxLoader",
        props:{
            loading:{
                type:Boolean,
                required:false,
                default:false
            },
            mode:{
                type:String,
                required:false,
                default:"pulse"
            }
        },
        data(){
            return {};
        },
        components:{
            "pulse-loader":PulseLoaderVue,
            "ring-loader":RingLoaderVue,
            "bounce-loader":BounceLoaderVue,
            "grid-loader":GridLoaderVue,
            "clip-loader":ClipLoaderVue,
            "rise-loader":RiseLoaderVue,
            "beat-loader":BeatLoaderVue,
            "sync-loader":SyncLoaderVue,
            "rotate-loader":RotateLoaderVue,
            "fade-loader":FadeLoaderVue,
            "pacman-loader":PacmanLoaderVue,
            "square-loader":SquareLoaderVue,
            "skew-loader":SkewLoaderVue,
            "moon-loader":MoonLoaderVue,
            "dot-loader":DotLoaderVue,
        }
    }
</script>
<style scoped>
    .loader-wrapper {
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
    .loader-wrapper > .v-spinner, v-spinner {
        position: fixed !important;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
</style>