<template>
  <div>
    <el-container>
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
</style>