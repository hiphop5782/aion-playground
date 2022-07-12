//axios regist for global use
import axios from 'axios';
import store from '@/store';

axios.interceptors.request.use(
    config=>{
        store.commit("loadingStart");
        return config;        
    }, 
    error=>{
        store.commit("loadingFinish");
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response=>{
        store.commit("loadingFinish");
        return response;
    }, 
    error=>{
        store.commit("loadingFinish");
        return Promise.reject(error);
    }
);

export default axios;