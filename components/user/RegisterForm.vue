<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item prop="username" class="form-item">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username">
                </el-input>
            </el-form-item>

            <el-form-item  prop="captcha" class="form-item">
                <el-input 
                placeholder="验证码"
                v-model="form.captcha" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="nickname" class="form-item">
                <el-input 
                placeholder="你的名字"
                v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item prop="password" class="form-item">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item prop="checkPassword" class="form-item">
                <el-input 
                placeholder="确认密码" 
                type="password"
                v-model="form.checkPassword">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    }
        return {
            // 表单数据
            form: {
            username: "",   // 登录用户名/手机
            password: "",    // 登录密码
            checkPassword: "", // 确认密码
            nickname: "",	// 昵称
            captcha: ""		// 手机验证码
        },
            // 表单规则
            rules: {
            username: [{ 
                required: true, 
                message: '请输入用户名', 
                trigger: 'blur' 
            }],
            password: [{ 
                required: true, 
                message: '请输入密码', 
                trigger: 'blur' 
            }],
            checkPassword: [{ 
                validator: validatePass, // 密码校验插件
                trigger: 'blur' 
            }],
            nickname: [{ 
                required: true, 
                message: '请输入昵称', 
                trigger: 'blur' 
            }],
            captcha: [{ 
                required: true, 
                message: '请输入验证码', 
                trigger: 'blur' 
            }],
        },
        }
    },
mounted () {
    console.log(47,this.$refs.form)
   },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
    if(!this.form.username){
        this.$confirm('手机号码不能为空', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
        return;
    }

    if(this.form.username.length !== 11){
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
            tel: this.form.username
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


        // 注册
        handleRegSubmit(){
    this.$refs.form.validate((valid) => {
        if (valid) {
            // 注册提交
            console.log('校验通过')
            const {checkPassword, ...props} = this.form;
            this.$axios({
                url: `/accounts/register`,
                method: "POST",
                data:props
            }).then(res => {
                console.log(res.data);
            })
        }else{
            console.log("校验不通过")
        } 
    });
},
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
