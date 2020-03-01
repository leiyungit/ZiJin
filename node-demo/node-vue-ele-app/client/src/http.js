import axios from "axios";
import Router from "./router";
import {
   Message, Loading
} from 'element-ui';

let loading;
// 加载动画
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading() {
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(
    config => {
        startLoading();
        if(localStorage.eleToken){
            config.headers.Authorization=localStorage.eleToken;
        }
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);
// 响应拦截
axios.interceptors.response.use(
    response=>{
        endLoading();
        return response;
    },
    error=>{
        endLoading();
        Message.error(error.response.data);
        // 错误状态码
        const{ status} =  error.response;
        if(status == 401){
            Message.error("token失效，请重新登录！");
            localStorage.removeItem('eleToken');
            Router.push("/login");

        }
        return Promise.reject(error);
    }
);

export default axios;