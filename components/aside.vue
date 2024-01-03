<template>
    <el-aside
      type="flex"
      width="300px"
      style="background-color: rgb(241, 237, 235)"
      align="middle"
    >
      <div class="logo">
        <nuxt-link to="/">
          <img
            src="../static/img/main.png"
            alt=""
          />
        </nuxt-link>
      </div>
      <el-row type="flex" class="yiyan" id="hitokoto">
        <nuxt-link to="#" id="hitokoto_text"></nuxt-link>
      </el-row>
      <el-row type="flex" class="navs"  >
        <nuxt-link to='/post' display="block">游记</nuxt-link>
      </el-row>
      <div class="zhanwei"></div>
      <el-row type="flex" align="middle">
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img
                :src="
                  $axios.defaults.baseURL +
                  $store.state.user.userInfo.user.defaultAvatar
                "
              />
              {{ $store.state.user.userInfo.user.nickname }}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 不存在用户信息展示登录注册链接 -->
        <nuxt-link v-else to="/user/login" class="account-link">
          登录 / 注册
        </nuxt-link>
      </el-row>
    </el-aside>
</template>

<script>
import fetch from "node-fetch";
export default {
  methods: {
    // 用户退出
    handleLogout() {
      this.$store.commit("user/SET_UserInfo", {
        token: "",
        user: {},
      });
    },
  },
  mounted(){
    fetch("https://v1.hitokoto.cn")
    .then((response) => response.json())
    .then((data) => {
      const hitokoto = document.querySelector("#hitokoto_text");
      hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`;
      hitokoto.innerText = data.hitokoto;
    })
    .catch(console.error);
  }
}
</script>

<style scoped lang="less">
// logo
.logo {-
  width: auto;
  // padding-top:10px;
}
//一言API
.yiyan{
            display:block;
            Padding: 20px;
            // margin: 0 20px;
            flex:1;
            height:14vh;
            border-bottom-style :solid;
            a{
                height:14vh;
                box-sizing: border-box;
                color:#000000;
                font-size: large;
                text-decoration:none;//取消下划线
                font-style: italic;
              }
}
// 文字
.navs{      
            display:block;
            flex:1;
            height:15vh;
            line-height:15vh;
            &:hover,&:focus, &:active {
                    color:#000000;
                    background:#e3c2c2;
                }
            a{
                height:15vh;
                box-sizing: border-box;
                color:#000000;
                font-size: xx-large;
                text-decoration:none;//取消下划线
            }
        }
//占位块
.zhanwei{
    height:30vh;
}

.message {
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell {
      margin-right: 2px;
      font-size: 18px;
    }
  }
  
.el-dropdown-link {
    border-top-style :solid;
    display:block;
    flex:1;
    line-height:15vh;
    height: 15vh;
    &:hover {
      img {
        border-color: #409eff;
      }
    }
    a {
      display: block;
      height:15vh;
      box-sizing: border-box;
      color:#000000;
      font-size: xx-large;
      text-decoration:none;//取消下划线
    }

    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px #fff solid;
      border-radius: 50px;
    }
  }
  .account-link {
    border-top-style :solid;
    display:block;
    flex:1;
    line-height:15vh;
    height: 15vh;
    font-size:xx-large;
    color: #000000;
    text-decoration:none;//取消下划线
    a {
      display: block;
      height:15vh;
      box-sizing: border-box;
      color:#000000;
      font-size: xx-large;
    }
    &:hover,&:focus, &:active {
                    color:#000000;
                    background:#e3c2c2;
    }
  }
</style>