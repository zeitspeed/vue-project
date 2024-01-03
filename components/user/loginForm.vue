<template>
    <div class="login-form">
      <el-form ref="loginform" :model="formData" :rules="rules">
          <el-form-item prop="username">
              <el-input v-model="formData.username" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input v-model="formData.password"  placeholder="请输入密码"></el-input>
          </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
          <el-button type="text">忘记密码 </el-button>
      </el-row>
      <el-button class="login-btn" type="primary" @click="loginFn">登录</el-button>
    </div>
  </template>
  
  <script>
  export default {
      data(){
          return{
          formData:{
              username: '',
              password: '',
          },
          rules:{
              username:[
                  { required: true, message: '请输入手机号码', trigger:'blur'},
                  { pattern: /^1[3-9]\d{9}$/, message: ' 手机号格式不正确', trigger:'blur'}
              ],
              password:[
                  {required: true, message: '请输入密码', trigger:'blur'}
              ]
          }
      }
  },
  mounted () {
      console.log(47,this.$refs.loginform)
     },
     methods:{
      loginFn(){
          this.$refs.loginform.validate( (valid)=>{
              console.log(valid)
              if(valid){
                  console.log('校验通过')
                  this.$axios({
                      url: '/accounts/login' ,
                      method: 'post',
                      data: props
                  }).then(res=>{
                      console.log('登录成功',res)
                      this.$store.commit('user/SET_UserInfo', res.data)
                      this.$router.replace('/')
                  })
              }else{
                  console.log('校验失败')
              }
          })
      }
  
     } 
     }
  </script>
  
  <style scoped lang="less">
  .login-form{
      padding: 20px;
  }
  .login-btn{
      width: 100%;
  }
  
  </style>