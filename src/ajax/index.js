//axios regist for global use
import axios from 'axios';
import store from '@/store';

let requestFlag = false;
axios.interceptors.request.use(
    config=>{
        if(!requestFlag) {
            requestFlag = true;
            setTimeout(()=>{
                if(requestFlag) {
                    store.commit("loadingStart");
                    requestFlag = false;
                }
            }, 500);
        }
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