import { createStore } from "vuex";

export default createStore({
    state: {
        loading:false,
    },
    getters: {
        isLoading(state){
            return state.loading;
        },
    },
    mutations: {
        loadingStart(state){
            state.loading = true;
        },
        loadingFinish(state){
            state.loading = false;
        },
    }
});