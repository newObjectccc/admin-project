"use strict";

import Vue from 'vue';
import { Loading, Message } from 'element-ui'
import axios from "axios";

// 用于保存loading, message实例以方便调用 close 方法
let loadingView = null;
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: 'https://www.ectlife.com/admin', // 'https://www.ectlife.com/admin',// process.env.baseURL || process.env.apiUrl || ""
    timeout: 10 * 1000, // Timeout
    withCredentials: false, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        loadingView = Loading.service({
            lock: true,
            text: 'loading...'
        });
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        loadingView.close();
        Message.success('操作成功！')
        // Do something with response data
        return response;
    },
    function(error) {
        loadingView.close();
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
    console.log('options', options)
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
