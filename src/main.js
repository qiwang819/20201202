import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './router/permission'
import './plugins/element.js'
import i18n from './plugins/i18n.js'
import './assets/css/common.css'
//eventBus
import './utils/eventbus'
//访问前验证是否本地存储
import jwt from 'jwt-decode'

import './plugins/MyComponents.js'
//引入全局组件
//import ElementTable from './components/element-table/index.js'

import {initProject} from './utils/init'

initProject()
//Vue.use(ElementTable)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
