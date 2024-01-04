<template>
  <section class="custom-page">
    <no-ssr>
      <el-amap
        vid="amap"
        :plugin="plugin"
        :zoom="13"
        class="amap-demo"
        :center="center"
        :events="events"
      >
        <!-- <el-amap-marker
          v-for="(marker, index) in markers"
          :position="marker.position"
          :key="index"
          :vid="index"
          :events="marker.events"
         
        >
        </el-amap-marker> -->
        <el-amap-info-window
          :position="currentWindow.position"
          :content="currentWindow.content"
          :visible="currentWindow.visible"
          :events="currentWindow.events"
          :offset="[8, -32]"
        >
        </el-amap-info-window>
        <!-- <el-amap-circle
          :center="circle.center"
          :radius="circle.radius"
          :fill-opacity="0.5"
          fill-color="#ffb5b3"
          stroke-color="#ffb5b3"
        ></el-amap-circle> -->
        <el-amap-polyline :path="polyline.path"></el-amap-polyline>
      </el-amap>
    </no-ssr>
  </section>
</template>

<script>
import * as _ from "lodash";
export default {
  data() {
    let self = this;
    return {
      center: [121.59996, 31.197646],
      events: {
        // init(map) {
        //   let markers = _.cloneDeep(self.markers);
        //   markers.forEach((item, index) => {
        //     AMapUI.loadUI(["overlay/SimpleMarker"], function (SimpleMarker) {
        //       item = new SimpleMarker({
        //         iconLabel: {
        //           innerHTML: index,
        //           style: {
        //             color: "#fff",
        //           },
        //         },
        //         iconStyle: "#1995f5",
        //         map: map,
        //         position: item.position,
        //       });
        //     });
        //   });
        // },
      },
      lng: 0,
      lat: 0,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            click: (o) => {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.$nextTick();
                }
              });
            },
          },
          buttonPosition: "LT",
        },
      ],
      currentWindow: {
        position: [116.405994, 39.915378],
        content: '<div class="red">Hi! I am here!</div>',
        events: {},
        visible: true,
      },
      markers: [
        {
          position: [121.59996, 31.197646],
          // content: "这是第一个信息窗体",
          events: {
            click: () => {
              this.$router.push({ path: "/single/250" });
            },
          },
          visible: true,
          clickable: true,
        },
        {
          position: [182.59996, 32.197646],
          // content: "这是第一个信息窗体",
          events: {
            click: () => {
              this.$router.push({ path: "/single/250" });
            },
          },
          visible: true,
          clickable: true,
        },
      ],
      // circle: {
      //   center: [121.59996, 31.197646],
      //   radius: 6000,
      // },
      polyline: {
        path: [
          [121.59996, 31.1976461],
          [121.5389385, 31.197646],
        ],
      },
    };
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style>
.custom-page {
  width: 100%;
  height: 100vh;
}
</style>
