<template>
<div>
 <div class="searchdiv">
  <div class='info'>
     <ul>
         <li><h2>当前区块总数</h2>
         <p>{{info.height}}</p><small>难度值:{{info.difficulty}}</small></li>
     </ul>
  </div>
  <div class="searchs">
    <p><input type="text" class="searchinput" placeholder="输入区块高度、区块Hash、交易编号查询、交易记录
"  v-model="keyword" @keyup.enter="search"/>
    <i><img src="../assets/images/search.png" @click="search"  /></i></p>
  </div>
 </div>
  <div class="info1" style="margin-bottom:20px;">
      <h2>最新区块</h2>
      <Table stripe :columns="blockColumns" :data="blocks"></Table>
  </div>
  <div class="info1" style="margin-bottom:20px">
      <h2>最新交易</h2>
      <Table stripe :columns="txColumns" :data="transactions"></Table>
  </div>
</div>
</template>
<style>
.searchdiv {
  width: 100%;
  height: 260px;
  background: url(../assets/images/earth.png) center center;
  overflow: hidden;
  position: relative;
}
input {
  outline: none;
}
.info {
  width: 240px;
  height: 80px;
  top: 12px;
  margin-left: -130px;
  position: absolute;
  left: 50%;
}
.info ul li {
  width: 250px;
  height: 80px;
  float: left;
  text-align: center;
}
.info ul li h2 {
  color: #dddee1;
  font-size: 16px;
}
.info ul li p {
  color: #fff;
  font-size: 30px;
}
.searchs {
  position: absolute;
  left: 50%;
  width: 540px;
  margin-left: -270px;
  height: 50px;
  top: 51%;
  border-radius: 30px;
  border: 2px solid #ddd;
}
.searchs p {
  color: #fff;
  font-size: 16px;
}
.searchinput {
  width: 490px;
  height: 50px;
  border: none;
  background: none;
  border-radius: 30px;
  text-indent: 1rem;
  color: #fff;
}
.searchs img {
  vertical-align: middle;
}
a {
  color: #706eee;
}
* {
  margin: 0 auto;
  padding: 0;
}
.info_t {
  width: 1200px;
  height: 50px;
  line-height: 50px;
}
.titles {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  font-size: 15px;
  background: #f0f0f0;
  overflow: hidden;
}
.titles ul li {
  width: 280px;
  float: left;
  color: #333;
  margin-left: 10px;
}
.info1 {
  width: 1200px;
  margin: 0 auto;
}
.info1 ul li {
  width: 276px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
}
.info1 .infotitls:nth-child(2n + 2) {
  background: #f9f9fc;
}
.info1 h2 {
  line-height: 80px;
}
.info1 h2 span {
  float: right;
  width: 111px;
  height: 80px;
  line-height: 80px;
  cursor: pointer;
}
</style>
<script>
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
export default {
  data() {
    return {
      info:{},
      keyword: "",
      blockColumns: [
            {
                title: '高度',
                key: 'height',
                render: (h, params) => {
                    return h('div', [
                        h('a', {attrs:{href: '#/block/'+params.row.hash}},params.row.height)
                    ]);
                }
            },
            {
                title: '大小',
                key: 'size'
            },
            {
                title: '生成时间',
                key: 'time'
            },
            {
                title: '哈希值',
                key: 'hash',
                render: (h, params) => {
                    return h('div', [
                        h('a', {attrs:{href: '#/block/'+params.row.hash}},params.row.hash)
                    ]);
                }
            }
        ],
        blocks:[],
        txColumns: [
            {
                title: '交易编号',
                key: 'txid',
                render: (h, params) => {
                    return h('div', [
                        h('a', {attrs:{href: '#/transaction/'+params.row.txid}},params.row.txid)
                    ]);
                }
            },
            {
                title: '交易时间',
                key: 'time'
            },
            {
                title: '交易输出',
                key: 'amount'
            }
        ],
        transactions:[]
    };
  },
  methods: {
    search: function() {
      var height = new Number(this.keyword);
     
      if (isNaN(height)) {
        if(this.keyword.charAt(0)==='F'){
            this.$router.push({ name: "records", params:{ adr: this.keyword }});
        }
        else{
             if (this.keyword.substr(0, 5) == "00000") {
              this.$router.push({ name: "block", params: { hash: this.keyword } });
            } else {
              this.$router.push({ name: "tx", params: { txid: this.keyword } });
            }
        }
      } else {
        this.$router.push({
          name: "block-height",
          params: { height: this.keyword }
        });
      }
    }
  },
  created(){
     this.$http.get(this.$host + "/api/overview").then(
      res => {
        this.info = res.body.data;
      },
      err => {
        console.log(err);
      }
    );
    this.$http.get(this.$host + "/api/latest-transaction").then(
      res => {
        this.transactions = res.body.data;
        //console.log(res.body.data)
      },
      err => {
        console.log(err);
      }
    );
    this.$http.get(this.$host + "/api/latest-block").then(
      res => {
        var blocks = res.body.data;
        this.blocks = blocks;
      },
      err => {
        console.log(err);
      }
    );
  },
  mounted() {
     var $this = this;
    var socket = new SockJS(this.$host+'/blockchain-websocket');
    var stompClient = Stomp.over(socket);
    stompClient.debug = false;
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/transaction', function(r) {
            var resp = JSON.parse(r.body);
            if(resp != null){
                $this.transactions.unshift(resp);
            }
            if($this.transactions.length > 10){
                $this.transactions = $this.transactions.slice(0,10);
            }
        });
        stompClient.subscribe('/topic/block', function(r) {
            var resp = JSON.parse(r.body);
            if(resp != null){
                $this.blockCount ++;
                $this.blocks.unshift(resp);
            }
            if($this.blocks.length > 10){
                $this.blocks = $this.blocks.slice(0,10);
            }
        });
    });
  }
};
</script>