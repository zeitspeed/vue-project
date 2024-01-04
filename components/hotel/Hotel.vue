<template>  
    <div>  
      <div class="image-container">
      <h2>{{ hotel.name }}</h2>  
      <p>地址：{{ hotel.address }}</p>  
      <p>评分：{{ hotel.rating }}</p>  
      <p>价格：{{ hotel.price }}元/晚</p>  
      <img :src="hotel.imageUrl" alt="酒店图片" class="fixed-size-image">
      <!-- 添加其他酒店信息 -->  
    </div>
    </div>  
  </template>  
    
  <script>  
  export default {  
    props: {  
      hotel: {  
        type: Object,  
        required: true  
      }  
    }  
  }  
  </script>
  
  <style scoped>  
  .image-container {  
    width: 300px; /* 你可以根据需要调整容器宽度 */  
    height: 200px; /* 你可以根据需要调整容器高度 */  
  }  
    
  .fixed-size-image {  
    width: 100%; /* 使图片宽度等于容器宽度 */  
    height: 100%; /* 使图片高度等于容器高度 */  
    object-fit: cover; /* 保持图片的长宽比，同时填充容器 */  
  }  
  </style>