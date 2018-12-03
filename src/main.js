import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Block from './component/Block.vue';
import Overview from './component/Overview.vue';
import Transaction from './component/Transaction.vue';
import Address from './component/Address.vue';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VueResource);

//Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype,'$host',{value:'http://api.fbcoin.one',writeable:false});
//Object.defineProperty(Vue.prototype,'$host',{value:'http://v2.api.yinhelian.cc'});
Vue.http.options.credentials = true;
const routes=[
            {name:'index',path:'/',component:Overview},
            {name:'block',path:'/block/:hash',component:Block},
            {name:'block-height',path:'/block-height/:height',component:Block},
            {name:'tx',path:'/transaction/:txid',component:Transaction},
            {name:'address',path:'/address/:addr',component:Address},
            // {path:'*',redirect:'/'}
        ];

const router=new VueRouter({mode:'hash',routes });

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
new Vue({
  el: '#app',
  router,
  render: h=>h(App)
})
