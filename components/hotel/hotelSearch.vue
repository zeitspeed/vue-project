<template>
  <div class="hotel-page">
    <div class="header">
      <el-autocomplete
    v-model="searchText"
    :fetch-suggestions="querySearchAsync"
    placeholder="输入酒店/地点/关键词"
    @select="search" >搜索
    </el-autocomplete>
       <ul>
      <li v-for="result in searchResults" :key="result.id">{{ result.title }}</li>
     </ul>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
       searchResults: [],
       jiudian:[],
        timeout:  null,
     
    };
  },
  methods: {
     async search() {
    if (this.searchText.trim() === '') {
      return;
    }

    try {
      this.isLoading = true; // 开始加载状态
      // const response = await this.$axios.get(`/hotels`, {
      //   params: {
      //     city: this.searchText
      //   }
      // });
      const response = await this.$axios({
        url: '/airs/city',
        params: {
          city: this.searchText
        }
      })
      this.searchResults = response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      this.isLoading = false; // 结束加载状态
    }
  },
   reserve(hotelId) {
      // 根据酒店id跳转到对应的预订页
      this.$router.push("/hotel/hotelMain");
    },
     querySearchAsync(queryString, cb) {
        var jiudian = this.jiudian;
        var results = queryString ? jiudian.filter(this.createStateFilter(queryString)) : jiudian;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
  },
   
  
};
</script>

<style>
.hotel-page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}




.hotel-list .el-card {
  width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.hotel-info img {
  width: 200px;
  height: 200px;
}
</style>