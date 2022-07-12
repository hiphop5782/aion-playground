import { createStore } from "vuex";

export default createStore({
    state: {
        loading:false,
        display:true,
    },
    getters: {
        isLoading(state){
            return state.display && state.loading;
        },
    },
    mutations: {
        loadingStart(state){
            state.loading = true;
        },
        loadingFinish(state){
            state.loading = false;
        },
        hide(state){
            state.display = false;
        },
        show(state){
            state.display = true;
        },
    }
});