import axios from 'axios'
import store from '../store'
import {
  getToken
} from '@/utils/auth';
import router from '../router/index';
import Common from '../../static/js/common.js';
import Vue from 'vue'
import SignRequest from '@/utils/SignRequest'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const timeStamp = Date.parse(new Date()) / 1000;

  config.headers['Token'] = SignRequest.getToken() ? SignRequest.getToken() : ''; // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers['Sign'] = SignRequest.getSign(config.url, timeStamp);
  config.headers['MethodName'] = config.url;
  config.headers['Content-Type'] = "application/json ; charset=utf-8";
  config.headers['TimeStamp'] = timeStamp;

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.Code == '100') {
      // 请求成功
      return response.data
    } else {
      // 请求失败
      Common.showMsg(res.Message);
      return Promise.reject('error')
    }

  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("beforeLoginUrl");
      localStorage.beforeLoginUrl = window.location.href;
      Common.showMsg('请登录',function(){
        //跳转登录页面
        router.push('/login');
      })
    }

    return Promise.reject(error)
  }
)

export default service