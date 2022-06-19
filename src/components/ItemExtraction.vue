<template>
<div class="container-fluid">
    <div class="mt-3 p-4 text-light bg-dark rounded">
        <h2>강화석 추출 시뮬레이션</h2>
        <p>
            확률은 인게임과 다르니 재미로만 즐겨주시기 바랍니다.
        </p>
    </div>

</div>
</template>
<script>
export default {
    name:"ItemExtraction",
    data(){
        return {
            selectedItem: null,
            itemList:[],

            progress: 0,
            resultStone: null,
            record:[],
        };
    },
};
</script>
<style>

</style>