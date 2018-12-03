<template>
    <div class="content">
       <div class="block">
           <Card>
               <h3>交易编号 &nbsp; {{transaction.txid}}</h3>
           </Card>
       </div>
       <div class="block">
            <Card :bordered="false">
                <h2 slot="title">概况</h2>
                <Row>
                    <Col span="4"><label>交易结果</label></Col>
                    <Col span="20">
                    <p v-if="transaction.confirmations >= 3">
                      <Icon size="18" color="green" type="ios-checkmark"></Icon>
                      <span style="margin-left:4px;">交易成功</span>
                      </p>
                      <span v-else>待确认</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="4"><label>手续费</label></Col>
                    <Col span="20">
                    {{transaction.fee|toFixed}} GCC
                    </Col>
                </Row>
                <Row>
                    <Col span="4"><label>确认数</label></Col>
                    <Col span="20">
                    {{transaction.confirmations}}
                    </Col>
                </Row>
                <Row>
                    <Col span="4"><label>创建时间</label></Col>
                    <Col span="20">
                    {{transaction.time}}
                    </Col>
                </Row>
                <Row>
                    <Col span="4"><label>所属区块</label></Col>
                    <Col span="20">
                    <router-link :to="{name:'block',params:{'hash':transaction.blockHash}}">{{transaction.blockHash}}</router-link>
                    </Col>
                </Row>
                <h2 class="block-title">明细</h2>
                <Row :gutter="16" style="margin-top:10px;">
                    <Col span="11">
                        <ul v-if="transaction.inputs != ''"> &nbsp;
                          <li v-for="(item,key,index) in transaction.inputs">
                              <span style="color:#706eee"><router-link :to="{name:'address',params:{'addr':item.address}}">{{item.address}}</router-link></span>
                              <span style="float:right">{{item.amount|toFixed}} &nbsp;&nbsp;</span>
                          </li>
                        </ul>
                        <p v-else style="color:red; text-align:center;font-size:20px">
                          <span>coinbase</span>
                        </p>
                    </Col>
                    <Col span="1" style='padding-top:12px'><Icon size="32" type="arrow-right-c"></Icon></Col>
                    <Col span="11" style='padding-top: 20px;'>
                        <ul>
                           <li v-for="(item,key,index) in transaction.outputs">
                              <span style="color:#706eee"><router-link :to="{name:'address',params:{'addr':item.address}}">{{item.address}}</router-link></span>  <span style="float:right">{{item.amount|toFixed}} &nbsp;&nbsp;</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Card>
          </div>
       </div>
    </div>
</template>
<style>
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *+height: 1%;
}
.c_h {
  width: 100%;
  background: #ddd;
  margin-top: 120px;
  padding-bottom: 30px;
}
.c_header {
  height: 80px;
  margin: 0 auto;
}
.c_header h2 {
  line-height: 80px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
.c_body {
  margin: 0 auto;
  background: #fff;
  height: 600px;
  margin-top: 20px;
}
.c_main ul li {
  width: 500px;
  height: 60px;
  line-height: 60px;
  float: left;
  font-size: 15px;
}
.li_arrow {
  width: 80px;
  height: 80px;
  float: right;
}
.color_s {
  color: #999;
}
.c_main h2 {
  border-bottom: 2px solid #ddd;
  line-height: 60px;
  font-weight: bolder;
  text-indent: 10px;
  font-size: 20px;
}
.li_arrow img {
  ververtical-align: center;
  margin-top: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      transaction: {}
    };
  },
  mounted: function() {},
  filters: {
    toFixed: function(number) {
      return new Number(number).toFixed(6);
    }
  },
  created() {
    console.log(this.$route.query.txid)
    this.$http
      .get(this.$host + "/api/transaction/" + this.$route.params.txid, {})
      .then(
        res => {
          var resp = res.body;

        if(resp==''){
                this.$http .get(this.$host + "/api/transaction/" + this.$route.query.txid, {})
            .then( res => {
                var resp = res.body;
              
                if (resp != null) {
                  this.transaction = resp;
                console.log(this.transaction.inputs)
                } else {
                  this.$Message.error("交易不存在");
                }
              })
        } 
          if (resp != null) {
            this.transaction = resp;
           console.log(this.transaction.inputs)
          } else {
            this.$Message.error("交易不存在");
          }
        },
        err => {
           this.$Message.error("交易不存在");
        }
      );
  }
};
</script>
</script>