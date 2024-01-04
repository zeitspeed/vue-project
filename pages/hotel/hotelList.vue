<template>
  <div class="hotel-grid" > 
  <div class="hotel-list" v-for="(hotel, index) in hotels" :key="index" >
        <Hotel :hotel="hotel" />
    <!-- 这里可以根据传入的搜索关键词进行搜索并显示相应的酒店列表 -->
  </div>
  </div>
</template>

<script>
import Hotel from "@/components/hotel/Hotel.vue"; // 引入Hotel组件 

export default {
  // 使用Vue Router的动态路由参数来获取搜索关键词
  created() {
    const keyword = this.$route.params.keyword;
    // 根据关键词进行搜索，并显示相应酒店列表
    // ...
  },
  components: {
    Hotel, // 注册Hotel组件
  },  
  data() {
    return {
      hotels: [
        {
          id: 1,
          name: "白云酒店",
          address: "广州",
          rating: 4.5,
          price: 800,
          imageUrl:
            "https://img.zcool.cn/community/0118ed5542e5370000019ae92371ea.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: 2,
          name: "黑天鹅酒店",
          address: "广州",
          rating: 5.0,
          price: 1000,
          imageUrl: "https://img.zcool.cn/community/0118ed5542e5370000019ae92371ea.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          id: 1,
          name: "和平酒店",
          address: "上海",
          rating: 4.5,
          price: 800,
          imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ziQm1W9JKkipjisiavVW2wHaE8?rs=1&pid=ImgDetMain",
        },
        {
          id: 2,
          name: "青云酒店",
          address: "上海",
          rating: 5.0,
          price: 1200,
          imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ziQm1W9JKkipjisiavVW2wHaE8?rs=1&pid=ImgDetMain",
        },
        {
          id: 1,
          name: "天上人间酒店",
          address: "北京",
          rating: 4.5,
          price: 1600,
          imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ziQm1W9JKkipjisiavVW2wHaE8?rs=1&pid=ImgDetMain",
        },
        {
          id: 2,
          name: "京都酒店",
          address: "北京",
          rating: 5.0,
          price: 1000,
          imageUrl: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ziQm1W9JKkipjisiavVW2wHaE8?rs=1&pid=ImgDetMain",
        },
        // 添加其他酒店数据...
      ],
    };
  },
};
</script>

<style scoped>
/* 样式可以根据需求进行调整 */
.hotel-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
.hotel-grid {  
  width:95%;
  height: 100vh;
  display: grid;  
  grid-template-columns: repeat(3, 1fr);  
  gap: 10px; /* 根据需要调整间隔 */  
}
</style>