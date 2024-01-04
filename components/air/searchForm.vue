<template>
  <div class="search-form">

      <!-- 头部tab切换 -->
      <el-row type="flex" class="search-tab">
          <span v-for="(item, index) in tabs" :key="index"
          @click="handleSearchTab(item, index)"
          :class="{active: index === currentTab}">
              <i :class="item.icon"></i>{{item.name}}
          </span>
      </el-row>

      <el-form class="search-form-content" ref="form" label-width="80px">
          <el-form-item label="出发城市">
              <!-- fetch-suggestions 返回输入建议的方法 -->
              <!-- select 点击选中建议项时触发 -->
              <el-autocomplete
              v-model="departCity"
              :fetch-suggestions="queryDepartSearch"
              placeholder="请搜索出发城市"
              @select="handleDepartSelect"
              class="el-autocomplete"
              ></el-autocomplete>
          </el-form-item>
          <el-form-item label="到达城市">
              <el-autocomplete
              v-model="destCity"
              :fetch-suggestions="queryDestSearch"
              placeholder="请搜索到达城市"
              @select="handleDestSelect"
              class="el-autocomplete"
              ></el-autocomplete>
          </el-form-item>
          <el-form-item label="出发时间">
              <!-- 规定日期形式: value-format="yyyy-MM-d" -->
              <!-- change 用户确认选择日期时触发 -->
              <el-date-picker
              v-model="departDate" type="date" 
              value-format="yyyy-MM-d"
              placeholder="请选择日期" 
              style="width: 100%;"
              @change="handleDate">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="">


              <el-button style="width:100%;" 
              type="primary" 
              icon="el-icon-search"
              @click="handleSubmit">
                  搜索
              </el-button>
          </el-form-item>
          <div class="reverse">
              <span @click="handleReverse">换</span>
          </div>
          <!-- <div class="test">999999</div> -->
      </el-form>  
    </div>
</template>

<script>
export default {
  data(){
      return {
          tabs: [

          ],
          currentTab: 0,
          departCity:"",
          destCity:"",
          departDate:"",
          departCode:"",
          destCode: "",
      }
  },
  methods: {
      // tab切换时触发
      handleSearchTab(item, index){
          console.log(item,index)
          if(item.name =="往返"){
              this.$alert('目前不支持往返，请使用单程选票！','提示',{
                  type: 'warning',
                  confirmButtonText:'确定'
              })
          }
      },
      
      // 出发城市输入框获得焦点时触发
      // value 是选中的值，cb是回调函数，接收要展示的列表
      queryDepartSearch(value, cb){
          if(value == ""){
              return cb([])
          }
          this.$axios({
              url: '/airs/city',
              params: {
                  name: value
              }
          }).then(res=>{
              console.log(99,res)
              let arr = res.data.data
              arr.forEach(item=>{
              item.value = item.name.replace('市' , '')
          })
          cb(arr)
      })
          // cb([
             // {value: 1},
             // {value: 2},
          //{value: 3},
          //]);
      },

      // 目标城市输入框获得焦点时触发
      // value 是选中的值，cb是回调函数，接收要展示的列表
      queryDestSearch(value, cb){
          this.queryDepartSearch(value,cb)
          //cb([
          //    {value: 1},
          //    {value: 2},
          //    {value: 3},
      //    ]);
      },
     
      // 出发城市下拉选择时触发
      handleDepartSelect(item) {
          this.departCode = item.sort
          
      },

      // 目标城市下拉选择时触发
      handleDestSelect(item) {
          this.destCode = item.sort
      },

      // 确认选择日期时触发
      handleDate(value){
         
      },

      // 出发和目标城市切换时触发
      handleReverse(){
          let start = this.departCity
          let startCode = this.departCode
          this.departCity = this.destCity
          this.departCode = this.destCode
          this.destCity = start
          this.destCode = startCode
      },

      // 提交表单是触发
      handleSubmit(){
          if(this.departCode==""){
              return this.$message({
                  message: '请选择出发城市',
                  type: 'warning',
              })
          }
          if(this.destCode==""){
              return this.$message({
                  message: '请选择到达城市',
                  type: 'warning',
              })
          }
          if(this.departDate==""){
              return this.$message({
                  message: '请选择出发日期',
                  type: 'warning',
              })
          }
           this.$router.push({
              path: '/air/flights',
              query: {
                  departCity: this.departCity,
                  departCode: this.departCode,
                  destCity: this.destCity,
                  destCode: this.destCode,
                  departDate: this.departDate,
              }
         }).then(()=>{
              window.location.reload()
         })
      },
  
  },
  mounted() {
     
  }
}
</script>

<style scoped lang="less">
//.test::after{
//   content: '伪对象的内容';
//  display: block;
//}
.search-form{
  border-top:none;
  width:950px;
  height:350px;
  box-sizing:border-box;  
}

.search-tab{
span{
  display: block;
  flex:1;
  text-align: center;
  height:48px;
  line-height: 42px;
  box-sizing: border-box;
  border-top:3px #eee solid;
  background:#eee;
}

.active{
  border-top-color: orange;
  background:#fff;
}

i{
  margin-right:5px;
  font-size: 18px;

  &:first-child{
    font-size:16px;
  }
}
}

.search-form-content{
padding:15px 50px 15px 15px;
position: relative;

.el-autocomplete{
  width: 100%;
}
}

.reverse{
position:absolute;
top: 35px;
right:15px;

&:after,&:before{
    display: block;
    content: "";
    position: absolute;
    left:-35px;
    width:25px;
    height:1px;
    background:#ccc;
}

&:after{
    top:0;
  }

  &:before{
    top:60px;
  }

span{
  display: block;
  position:absolute;
  top: 20px;
  right:0;
  font-size:12px;
  background: #999;
  color:#fff;
  width:20px;
  height:20px;
  line-height: 18px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;

  &:after,&:before{
    display: block;
    content: "";
    position: absolute;
    left:10px;
    width:1px;
    height:20px;
    background:#ccc;
  }

  &:after{
    top:-20px;
  }

  &:before{
    top:20px;
  }
}
}
</style>