<template>
    <section class="container">
        <h2 class="air-title">
            <span class="iconfont iconfeiji"></span>
            <i>酒店</i>
        </h2>

        <!-- 搜索广告栏 -->
        <el-row type="flex" justify="space-between">
            <!-- 搜索表单 -->
            <HotelSearch></HotelSearch>
        </el-row>

        <!-- 广告 -->
        <el-row type="flex" class="statement">
            <el-col :span="8">
                <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
                <span>青年旅社</span>
            </el-col>
            <el-col :span="8">
                <i class="iconfont iconbaozheng" style="color:green;"></i>
                <span>豪华酒店</span>
            </el-col>
            <el-col :span="8">
                <i class="iconfont icondianhua" style="color:#409EFF;"></i>
                <span>24小时在线服务</span>
            </el-col>
        </el-row>

        <h2 class="air-sale-title">
            <span class="iconfont icontejiajipiao"></span>
            <i>特价房</i>
        </h2>

        <!-- 特价房 -->
      <div class="hotel-list">
      <el-card v-for="hotel in hotels" :key="hotel.id">
        <div class="hotel-info">
          <img :src="hotel.imageUrl" alt="酒店图片">
          <h2>{{ hotel.name }}</h2>
          <p>价格 ￥{{ hotel.price }}</p>
          <p>评分:{{hotel.pingfen}}</p>
        </div>
        <el-button type="success" @click="reserve(hotel.id)">预订</el-button>
      </el-card>
    </div>
    </section>
</template>

<script>
import HotelSearch from "@/components/hotel/hotelSearch";

export default {
	data(){
		return {
			sales: [],
       hotels: [
        {
          id: 1,
          name: '商务宾馆',
          price: 100,
          pingfen:4.8,
          imageUrl: 'https://img0.baidu.com/it/u=1497433408,1355361073&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
        },
        {
          id: 2,
          name: '豪伦酒店',
          pingfen:4.6,
          price: 200,
          imageUrl: 'https://img1.baidu.com/it/u=1473038878,1105206410&fm=253&fmt=auto&app=138&f=JPEG?w=570&h=500'
        },
        {
          id: 3,
          name: '华莱酒店',
          pingfen:4.7,
          price: 180,
          imageUrl: 'https://img0.baidu.com/it/u=1604645664,2377030204&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500'
        },
         {
          id: 4,
          name: '阳光酒店',
          pingfen:4.8,
          price: 150,
          imageUrl: 'https://img1.baidu.com/it/u=2363578800,3776316513&fm=253&fmt=auto&app=120&f=JPEG?w=751&h=500'
        },
      ]
		}
	},
    components: {
        HotelSearch
	},
	mounted(){
		// 请求推荐机票列表
		this.$axios({
			url: "/hotels/options"
		}).then(res => {
			const {data} = res.data;
			this.sales = data;
		})
	},
  methods:{
     reserve(hotelId) {
      // 根据酒店id跳转到对应的预订页
      this.$router.push("/hotel/hotelMain");
    },
     queryDepartSearch(value, cb){
            if(value==""){
                return cb([])
            }
           this.$axios({
            url:'/airs/city',
            params:{
                name:value
            }
           }).then(res=>{
            console.log(99,res)
            let arr = res.data.data
            arr.forEach(item=>{
                item.value = item.name.replace('市','')
            })
            cb(arr)
           })
        },

}
}
</script>

<style scoped lang="less">
.air-sale {
    border: 1px #ddd solid;
    padding: 20px;
    margin-bottom: 50px;

    .air-sale-pic {
        > div {
            width: 225px;
            height: 140px;
            position: relative;
            overflow: hidden;

            img {
                width: 100%;
            }

            .layer-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.5);
                color: #fff;
                height: 30px;
                line-height: 30px;
                width: 100%;
                box-sizing: border-box;
                padding: 0 15px;
                font-size: 14px;

                span:last-child {
                    font-size: 18px;
                }
            }
        }
    }
}

.air-sale-group {
    margin-top: 20px;
    padding-top: 8px;
    border-right: 1px #eee solid;

    &:last-child {
        border-right: none;
    }

    .air-sale-row {
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;

        .air-sale-price {
            color: orange;
            font-size: 20px;
        }
    }
}

.container {
    width: 1000px;
    margin: 0 auto;
}

.air-title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: orange;

    span {
        font-size: 20px;
    }
}

.statement {
    margin: 15px 0;
    border: 1px #ddd solid;
    background: #f5f5f5;
    height: 58px;
    padding: 10px 0;
    box-sizing: border-box;

    > div {
        text-align: center;
        line-height: 38px;
        border-right: 1px #ddd solid;

        &:last-child {
            border-right: none;
        }

        * {
            vertical-align: middle;
        }

        i {
            font-size: 30px;
        }
    }
}

.air-sale-title {
    margin: 15px 0;
    font-size: 20px;
    font-weight: normal;
    color: #409eff;

    span {
        font-size: 20px;
    }
}
.hotel-list {
  display: flex;
  flex-wrap: wrap;
}
</style>