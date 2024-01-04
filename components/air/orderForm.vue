<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div 
                class="member-info-item" 
                v-for="(item, index) in users" 
                :key="index">
                    <el-form-item label="乘机人类型">
                        <el-input 
                        placeholder="姓名" 
                        v-model="item.username" 
                        class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1"  
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <span class="price">￥ {{allPrice}} </span>
                    <input type="hidden" :value="allPrice">
                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码" 
                        v-model="item.id"   
                        class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="身份证" 
                                           value="1" 
                                           :checked="true">
    							</el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div 
                class="insurance-item"
                v-for="(item, index) in data.insurances"
                :key="index">
                <el-checkbox 
             :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`" 
             @change="handleInsurance(item.id)"
             border>
                 </el-checkbox> 
                </div>
            </div>
        </div>


        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
        <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
        </el-form-item>

        <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
                <template slot="append">
    <el-button @click="handleSendCaptcha">发送验证码</el-button>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
        </el-form-item>
    </el-form>  
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
            // 接收机票信息
            data: {
                type: Object,
                default: ()=>({})
            },
            allPrice: {
            type: Number,
            default: 0
        }
        },
    data(){
        return {
            users: [{
                username: "",
                id: "",
            }],
        insurances: [], // 保险数据
        contactName: "", // 联系人名字
        contactPhone: "", // 联系人电话
        captcha: "000000", // 验证码
        invoice: false   // 发票
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users = [...this.users, 
        {
            username: "",
            id: "",
        }
    ];
    },
    computed: {
    // 计算总价格
    allPrice(){
        console.log(123)
        let price = 0;
        let len = this.users.length;

        price += this.data.seat_infos.org_settle_price * len;

        this.insurances.forEach(v => {
            price += this.data.insurances[v - 1].price * len;
        });

        price += this.data.airport_tax_audlet * len;
		
        // 触发设置总金额事件
        this.$emit("setAllPrice", price)

        return price;
    }
},
    handleInsurance(id){
    // 存在则去除
    if(this.insurances.indexOf(id) > -1){
        let arr = this.insurances.slice(0);
        arr.splice(this.insurances.indexOf(id), 1);
        this.insurances = arr;
    }else{ // 不存在添加到insurances
        this.insurances = [...new Set([...this.insurances, id])]
    }
},
        // 移除乘机人
        handleDeleteUser(index){
    this.users.splice(index, 1);
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
    if(!this.contactPhone){
        this.$confirm('手机号码不能为空', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
        return;
    }

    if(this.contactPhone.length !== 11){
        this.$confirm('手机号码格式错误', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
        return;
    }

    this.$axios({
        url: `/captchas`,
        method: "POST",
        data: {
            tel: this.contactPhone
        }
    }).then(res => {
        const {code} = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
    })
},
        // 提交订单
        handleSubmit(){
    const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id
    }
    this.$confirm('恭喜，订单提交成功！', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success'
    })
}
    }
}

</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
```
}