<template>
  <el-container type="flex">
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
    </el-aside>
  </el-container>
</template>

<script>
import fetch from "node-fetch";
export default {

};
fetch("https://v1.hitokoto.cn")
  .then((response) => response.json())
  .then((data) => {
    const hitokoto = document.querySelector("#hitokoto_text");
    hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`;
    hitokoto.innerText = data.hitokoto;
  })
  .catch(console.error);
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
            Padding: 6px;
            margin: 0 20px;
            flex:1;
            height:12vh;
            border-bottom-style :solid;
            a{
                height:12vh;
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
                    color:#fff!important;
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
</style>