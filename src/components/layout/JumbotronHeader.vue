<template>
<div class="p-3 text-light bg-dark rounded">
    <h2>{{title}}</h2>
    <p v-if="contents">{{contents}}</p>
</div>
</template>
<script>
export default {
    name:"JumbotronHeader",
    props:{
        title:{
            type:String,
            required:true
        },
        contents:{
            type:String,
            required:false
        }
    }
}
</script>
<style scoped>

</style>