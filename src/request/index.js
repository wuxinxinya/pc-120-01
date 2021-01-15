import axios from 'axios'
import Vue from 'vue'
var instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/'
})

Vue.prototype.$http = instance
