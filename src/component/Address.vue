<template>
    <div class="content">
       <div class="block" style='background:#f8f8f8'>
            <Row type="flex" justify="start" class="code-row-bg">
              <Col span="24" class="head_adr"> <span style="font-size:25px">地址 : </span> {{ad.addres}}</Col>
          </Row>
           <Row type="flex" justify="start" class="code-row-bg">
              <Col span="24" style="font-size:18px">基本信息</Col>
          </Row>
           <Card style="margin-top:5px">
                <Row type="flex" justify="center" class="code-row-bg data_adr">
                    <Col span="24">
                        <Row style="border-bottom:1px solid #ebebeb;">
                            <Col span="5">账户余额</Col>
                            <Col span="15" offset="4" class="txt_right big_txt"><span style='color:#14d6c1'>{{ad.all}}</span> GCC</Col>
                        </Row>
                    </Col>
                    <Col span="24">
                         <Row >
                            <Col span="11" style="border-bottom:1px solid #ebebeb;margin-bottom:0">
                                 <Row>
                                    <Col span="11">交易数量</Col>
                                    <Col span="11" offset="2" class='txt_right'>{{ad.time}}次</Col>
                                </Row> 
                            </Col>
                            <Col span="11" offset="2" style="border-bottom:1px solid #ebebeb;">
                                  <Row>
                                    <Col span="11">总接收</Col>
                                    <Col span="11" offset="2" class='txt_right'><span style="color:#21e5b9">{{ad.allaccept}}</span> GCC</Col>
                                </Row>  
                            </Col>
                        </Row> 
                    </Col>
                    <Col span="24">
                          <Row >
                            <Col span="11" style="border-bottom:1px solid #ebebeb;margin-bottom:0">
                                 <Row>
                                    <Col span="11">第一笔交易时间</Col>
                                    <Col span="11" offset="2" class='txt_right'>{{ad.firstime}}</Col>
                                </Row> 
                            </Col>
                            <Col span="11" offset="2" style="border-bottom:1px solid #ebebeb;">
                                  <Row>
                                    <Col span="11">总发送</Col>
                                    <Col span="11" offset="2" class='txt_right'> <span style="color:#9b321b">{{ad.allsend}}</span> GCC</Col>
                                </Row>  
                            </Col>
                        </Row>
                    </Col>
                </Row>
           </Card>
            <Row type="flex" justify="start" class="code-row-bg">
              <Col span="24" style="font-size:18px;padding-top:20px">交易明细 &nbsp; &nbsp; <span style="font-size:15px"> 共{{ad.time}}笔</span></Col>
           </Row>
            <div style="padding-top:10px" v-for="item in record">
                <Card >
                    <p slot="title" style="coLor:#000;font-size:16px;font-weight:400"> 
                     <router-link :to="{path:'/transaction/:',query: {txid: item.transaction.txid}}"> {{item.transaction.txid}}</router-link> &nbsp;&nbsp;&nbsp;&nbsp;
                    <span style="font-size:14px;">{{item.time}}</span> 
                       &nbsp;&nbsp;&nbsp;&nbsp; 
                      <span v-if="item.amount>0" style='color:#21e5b9;font-size:16px;'>{{item.amount}}fbc</span>
                      <span v-else style='color:#9b321b'>{{item.amount}}fbc</span>
                    </p>
                    <p>
                         <Row>
                            <Col span="11" >
                               <Row v-for=" ite in item.transaction.inputs">
                                  <Col span="18"> <span @click="reducedata(ite.address)" style="color:#21e5b9;cursor:pointer">{{ite.address}}</span></Col>
                                  <Col span="6" class="txt_right">{{ite.amount}} fbc</Col>
                              </Row>
                            </Col>
                            <Col span="2" style='text-align:center;color:#3863a4'>>></Col>
                            <Col span="11">
                             <div>
                               <Row v-for=" val in item.transaction.outputs">
                                  <Col span="18"><span @click="reducedata(val.address)"  style="color:#9b321b;cursor:pointer"> {{val.address}}</span></Col>
                                  <Col span="6" class="txt_right">{{val.amount}} fbc</Col>
                                </Row>
                             </div>
                            </Col>
                        </Row> 
                   </p>
                </Card>
            </div>
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
.block .ivu-row{ margin-bottom: 0}

.head_adr{ height: 80px;background: linear-gradient(-90deg, #00c1cd,#22e6b9);
                         background: -webkit-linear-gradient(-90deg, #00c1cd,#22e6b9);
                         background: -o-linear-gradient(-90deg,#00c1cd,#22e6b9); 
                        background: -moz-linear-gradient(-90deg, #00c1cd,#22e6b9);
margin-bottom:20px;line-height: 80px;font-size :18px;text-indent: 1rem;color:#fff}
.clearfix {
  *+height: 1%;
}
.data_adr { padding: 20px  5px 10px 5px;}
.data_adr .ivu-col-span-24{ height: 40px;height: 40px; line-height: 40px;font-size: 10px}
.c_h {
  width: 100%;
  background: #ddd;
  margin-top: 120px;
  padding-bottom: 30px;
}
.txt_right{text-align: right}
.big_txt{ font-size: 25px}
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
      ad:{
        all:'',
        allaccept:'',
        allsend:'',
         addres:'',
         time:'',
         firstime:''
      },
  
              record:[]  
            }
         },
  created(){
     this.init(this.$route.params.addr);
           },
           methods:{
             sum(str){
               let summary = 0;  
                for(var i = 0; i < str.length; i++){  
                summary += parseFloat(str[i]);  
              } 
              return summary.toFixed(5);;
             },

             reducedata(ev){
                 this.$router.push({ name: "records", params:{ adr: ev }});
                 this.init(this.$route.params.addr);
             },

          init(loca){
            
            this.ad.addres=loca;
            if(loca){
              this.$http.get(this.$host + "/api/address-transaction/" + loca).then(res=>{
                  // console.log(res);
                    this.record=res.body.data;
                    this.ad.time=res.body.data.length;
                    this.ad.firstime=res.body.data[this.ad.time-1].time;
                    //账户余额
                  console.log(res.body.data)
                  let allarr=[];
                  for(var k in this.record) {
                      allarr.push(this.record[k].amount) 
                                    }  
                  this.ad.all= this.sum(allarr);  
                //总接受
                let accept=[];
                  for(var k in this.record) {
                      if(this.record[k].amount>0){
                        accept.push(this.record[k].amount) 
                      }
                                    }    
                this.ad.allaccept= this.sum(accept);
                //总发送
                let  send=[];
                for(var k in this.record) {
                      if(this.record[k].amount<0){
                        send.push(this.record[k].amount) 
                      }
                                    } 
                  this.ad.allsend = Math.abs(this.sum(send));
              })
               }
             }
           }
    }
</script>