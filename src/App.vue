<template>
  <div>
   <router-view></router-view>
 </div>
</template>

<script>
  export default{
      components:{
       
      }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}


a {
  color: #42b983;
}
.block{
  width:1000px;
  border-radius: 5px;
  margin: 15px auto;
  background-color: white;
}
.content{
  background: #f8f8f9;
  padding: 20px 0;
}
.block-title{
  border-bottom: 1px solid #e9eaec;
  padding: 14px 5px;
  line-height: 1;
}
.block label{
  color:#1c2438;
}
.block .ivu-row{
  margin-bottom: 10px;
}
</style>
