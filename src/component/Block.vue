<template>
  <div class="content">
     <div class='block'>
         <Card>
            <p slot="title">区块信息</p>
            <Row>
                <Col span="4"><label>哈希值</label></Col>
                <Col span="20">
                {{block.hash}}
                </Col>
            </Row>
             <Row>
                <Col span="4"><label>高度</label></Col>
                <Col span="20">
                {{block.height}}
                </Col>
            </Row>
            <Row>
                <Col span="4"><label>区块大小</label></Col>
                <Col span="20">
                {{block.size}}
                </Col>
            </Row>
            <Row>
                <Col span="4"><label>生成时间</label></Col>
                <Col span="20">
                {{block.time}}
                </Col>
            </Row>
           
            <Row>
                <Col span="4"><label>交易笔数</label></Col>
                <Col span="20">
                {{block.tx.length}}
                </Col>
            </Row>
         </Card>
    </div>
    <div class="block">
        <Card>
            <p slot="title">交易记录</p>
            <div class="cranction">
                <ul>
                    <li v-for="tx in block.tx">
                        <b>交易编号</b> &nbsp; &nbsp; &nbsp;
                        <router-link :to="{name:'tx',params:{txid:tx}}">
                        <span>{{tx}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </Card>
       </div>
      </div>
  </div>
</template>
<style>
.backg {
  width: 100%;
  height: 300px;
  background: #ececec;
  margin-top: 120px;
  background: url(../assets/images/earth.png) center center;
}
.backg h2 {
  line-height: 300px;
  text-align: center;
  font-size: 25px;
  color: #fff;
}
.backinfo {
  width: 100%;
  padding-bottom: 50px;
  background: #ececec;
}
.infomations {
  width: 1200px;
  height: 600px;
  background: #fff;
  margin: 0 auto;
}
.infomations h1 {
  line-height: 65px;
  font-size: 18px;
  border-bottom: 2px solid #ddd;
  text-indent: 1rem;
}
.infoul {
  margin: 0 auto;
  width: 1200px;
  height: 240px;
  border-bottom: 2px solid #ddd;
}
.infoul ul li {
  width: 550px;
  height: 60px;
  line-height: 60px;
  font-size: 15px;
}
.jyjl {
  width: 1200px;
}
.cranction {
  font-size: 20px;
  width: 100%;
  text-indent: 0.5rem;
}
.cranction h2 {
  font-size: 18px;
  color: #706eee;
  margin: 10px 0;
}
.cranction ul li {
  width: 100%;
  height: 65px;
  line-height: 65px;
  font-size: 20px;
}
</style>
<script >
export default {
  data() {
    return {
      block: {tx:[]}
    };
  },
  created: function() {
     var url;
      if(this.$route.params.hash){
        url = this.$host + "/api/block/" + this.$route.params.hash;
      }
      else{
          url = this.$host + "/api/block/" + this.$route.params.height
      }
      this.$http.get(url)
        .then(
        res => {
            if(res.body != null){
                this.block = res.body;
            }
            else{
                this.$Message.error('该区块不存在');
            }
        },
        err => {
          this.$Message.error('查询失败');
        }
      );
  },
  filters: {
    dateFormat: function(time) {
      return new Date(time * 1000).toString();
    }
  },
  mounted() {
     
  }
};
</script>