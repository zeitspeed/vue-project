<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data="infoData" @setAllPrice="setAllPrice"></OrderForm>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside :data="infoData" :allPrice="allPrice"></OrderAside>
            </div>
        </el-row>
    </div>
</template>
<script>
import OrderForm from '@/components/air/orderForm.vue';
import OrderAside from '@/components/air/orderAside.vue';
export default {
    components:{OrderForm, OrderAside},
    data(){
        return {
            infoData: {
                insurances: [],
                seat_infos:{}// 初始化保险数据
            },
            allPrice: 0
        }
},
methods: {
    setAllPrice(price){
        this.allPrice = price;
    }
},
mounted(){
        const {query} = this.$route;

        this.$axios({
            url: `airs/${query.id}`,
            params: {
                seat_xid: query.seat_xid
            }
        }).then(res => {
            this.infoData = res.data;
        })
    }
}

</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
```
