import Vue from 'vue'
import Trade from './Trade.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import jquery from 'jquery';
import kline from 'kline';


Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VueResource);

Object.defineProperty(Vue.prototype,'$host',{value:'http://api.fbcoin.one'});
//Object.defineProperty(Vue.prototype,'$host',{value:'http://api.fbcoin.one',writeable:false});
Vue.http.options.credentials = true;
const routes=[
        ];

const router=new VueRouter({mode:'hash',routes });

new Vue({
  el: '#app',
  router,
  render: h=>h(Trade)
})
