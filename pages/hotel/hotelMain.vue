<template>
  <div class="hotel-booking">
   
    <h2>预订酒店</h2>
    

    <div class="">
      
      <label for="guest-name">入住人姓名:</label>
      <input id="guest-name" type="text" v-model="guestName" />

      <label for="check-in-date">入住日期:</label>
      <input id="check-in-date" type="date" v-model="checkInDate" />

      <label for="check-out-date">离店日期:</label>
      <input id="check-out-date" type="date" v-model="checkOutDate" />

      <label for="room-type">房间类型:</label>
      <select id="room-type" v-model="roomType">
        <option value="single">单人间</option>
        <option value="double">标准间</option>
        <option value="deluxe">豪华间</option>
      </select>

      <label for="guests">入住人数:</label>
      <input id="guests" type="number" min="1" v-model="guests" />

      <button @click="bookHotel" class="book-button">预订</button>
    </div>
    
    <div v-if="bookingConfirmation" class="confirmation">
      <p>预订成功！</p>
      <p>入住人：{{ guestName }}</p>
      <p>入住日期：{{ checkInDate }}</p>
      <p>离店日期：{{ checkOutDate }}</p>
      <p>房间类型：{{ roomType }}</p>
      <p>入住人数：{{ guests }}</p>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      guestName: '',
      checkInDate: '',
      checkOutDate: '',
      roomType: 'single',
      guests: 1,
      bookingConfirmation: false,
      
     
    };
  },
  methods: {
    bookHotel() {
      // 假设这里是预订酒店的逻辑，可以发送预订请求或调用后端API等

      // 这里我们只是简单将bookingConfirmation设置为true来显示预订成功的确认信息
      this.bookingConfirmation = true;
    },
  },
};
</script>

<style scoped>
.book-button {
  height: 36px;
  padding: 0 10px;
  background-color: blue;
  color: rgb(236, 245, 248);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.hotel-booking {
  max-width: 800px;
 height: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  
  
}

</style>