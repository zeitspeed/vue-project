<template>
  <div class="custom-page">
    <mainv></mainv>
  </div>
</template>
<script>
import mainv from "../components/mainv/mainv.vue";
export default {
  name: "IndexPage",
  components: { mainv },
};
</script>
<style>
.custom-page {
  width: 100%;
  height: 100vh;
}
</style>