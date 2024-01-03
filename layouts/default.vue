<template>
  <div>
    <el-container class="custom-page">
      <Aside></Aside>
      <nuxt/>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/aside.vue";
export default {
  components: { Aside }
};

</script>

<style>
.custom-page {
  height: 100vh;
}
</style>