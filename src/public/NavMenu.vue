<template>
   <Row>
    <div class="header">
      <div class="logeimg">
          <a href='/'>
            <img src="../assets/images/loge.png" />
          </a>
        </div>
      <div class="logetitle">
            <ul>
            <li><a href="index.html">足球币</a></li>
            <li><a href="waller.html">钱包下载</a></li>
            <li style="color:#ffdf07"><a href="bowser.html" style="color:#ffdf07">区块浏览器</a></li>
          </ul>
      </div>
    </div>
    </Row>
</template>
<style>
.header{ position: absolute; width: 100%; height: 60px; top:30px;left:0;z-index: 100;}
.logeimg{ width: 340px;height: 52px;float: left; padding-left: 50px;}
.logetitle{ width:450px;height: 50px;float:right;margin-right: 80px;margin-top: 4px}
.logetitle ul li{ width: 100px; height: 52px;text-align:center;float:left;margin-left: 50px;line-height: 52px}
.logetitle ul li a{color:#56524c;    font-size: 20px;}
.logetitle ul li:first-child{margin-left:0}
.logetitle ul li a:hover{ color:#37e4f4}
.liactive{ border-bottom: 2px solid #37e4f4}

</style>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>