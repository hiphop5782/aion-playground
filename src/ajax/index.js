//axios regist for global use
import axios from 'axios';
import store from '@/store';

import moment from "moment";
let lastAccess = moment().valueOf();
axios.interceptors.request.use(
    config=>{
        let currentAccess = moment().valueOf();
        //작업발생간격 0.25초 이상만 로딩화면 출력(적용테스트중)
        if(currentAccess - lastAccess >= 250) {
            store.commit("loadingStart");
        }
        lastAccess = currentAccess;
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