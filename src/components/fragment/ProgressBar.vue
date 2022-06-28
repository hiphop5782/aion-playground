<template>
<div class="progress-wrapper">
    <div class="progress">
        <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated" role="progressbar"
            :area-valuenow="progress" :area-valuemin="minvalue" :area-valuemax="maxvalue" :style="styleObject">
            <span v-if="labelVisibleCheck" >{{percent}} %</span>
        </div>
    </div>
    <h6 class="text-center mt-2 result">{{labelText}}</h6>
</div>
</template>
<script>
export default {
    name:"ProgressBar",
    props:{
        messages:{
            type:Object,
            required:false,
            default(){
                return {
                    begin:"준비",
                    step:"진행중",
                    end:"완료"
                };
            },
        },
        labelVisible:{
            type:Boolean,
            default:false,
            required:false,
        },
        duration:{
            type:Number,
            default:2,
            required:false,
        },
        delay:{
            type:Number,
            default:0,
            required:false,
        },
    },
    emits:[
        "start", "progress", "finish"
    ],
    data(){
        return {
            progress:0,
            minvalue:0,
            maxvalue:100,
        };
    },
    computed:{
        percent(){
            return this.progress * 100 / this.maxvalue;
        },
        styleObject(){
            return {
                width:this.percent+"%"
            };
        },
        labelVisibleCheck(){
            return this.labelVisible && this.progress > this.minvalue;
        },
        range(){
            return this.maxvalue - this.minvalue;
        },
        delayMillis(){
            return this.delay * 1000;
        },
        durationMillis(){
            return this.duration * 1000;
        },
        labelText(){
            if(this.progress == this.minvalue)
                return this.messages.begin;
            else if(this.progress == this.maxvalue)
                return this.messages.end;
            else   
                return this.messages.step;
        },
    },
    methods:{
        start(){
            this.clear();
            setTimeout(this.step, this.delayMillis);
            this.$emit("start");
        },
        finish(){
            this.$emit("finish");
        },
        clear(){
            this.progress = this.minvalue;
        },
        step(){
            this.progress ++;
            this.$emit("progress");
            if(this.progress < this.maxvalue){
                setTimeout(this.step, this.durationMillis / this.range);
            }
            else {
                setTimeout(this.finish, this.durationMillis / this.range);
            }
        },
    },
    mounted(){
        
    },
}
</script>
<style scoped>
    .progress-wrapper {
        background-color: white;
    }
    .progress-wrapper > .progress > .progress-bar {
        transition: none;
    }
</style>