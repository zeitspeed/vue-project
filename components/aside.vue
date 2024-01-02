<template>
  <el-container type="flex">
    <el-aside
      type="flex"
      width="300px"
      style="background-color: rgb(255, 255, 233)"
      line-height="60px"
      align="middle"
      box-shadow="0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" 
    >
      <div class="logo">
        <nuxt-link to="/">
          <img
            src="../static/img/main.png"
            alt=""
          />
        </nuxt-link>
      </div>
      <el-row type="flex" class="navs" id="hitokoto">
        <a href="#" id="hitokoto_text"></a>
      </el-row>
      <el-row type="flex" class="navs" >
        <a href='' display="block">游记</a>
      </el-row>
    </el-aside>
  </el-container>
</template>

<script>
import fetch from "node-fetch";
export default {};
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
// 文字，一言API
.navs{      
            display:block;
            Padding: 6px;
            margin: 0 20px;
            margin-top: 100px;
            border-bottom-style :solid;
            flex:1;
            height:100px;
            // justify-content: center;//实现水平居中
            // align-items: middle;//实现垂直居中
            // border-style: solid;
            // line-height:100px;
            // flex-direction: row;      /* 主轴x */
            // justify-content: center; 
            a{
                height:100px;
                padding:0 0px;
                box-sizing: border-box;
                color:#000000;
                font-size: large;
                text-decoration:none;//取消下划线
                font-style: italic;
                &:hover,&:focus, &:active {
                    border-bottom:5px #85ebeb solid;
                    color:#000000;
                }
            }

            /deep/ .nuxt-link-exact-active{
                background:#85ebeb;
                color:#fff!important;
            }
        }
</style>