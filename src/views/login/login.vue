<template>
<div class="login-container">
    <div class="login-wrap">
        <span class="login-title">欢迎登录ECT后台管理系统</span>
        <el-input class="margin" v-model="userName" placeholder="请输入用户名"></el-input>
        <el-input class="margin" type="password" v-model="pwdValue" placeholder="请输入密码"></el-input>
        <el-input class="margin posi" v-model="code" placeholder="请输入下方验证码"></el-input>
        <img class="img-code" :src="codeImg" @click="getCode">
        <div class="btn">
            <el-button type="primary" @click="loginIn">登录</el-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            pwdValue: '',
            userName: '',
            codeImg: '',
            code: '',
            codeID: ''
        }
    },
    created() {
        this.getCode()
    },
    methods: {
        getCode() { // 获取验证码
            this.$axios({
                url: '/captcha',
                method: 'GET'
            }).then(res => {
                this.codeImg = res.data.Data.img
                this.codeID = res.data.Data.id
            })
        },
        loginIn() { // 登录
            this.$axios({
                url: '/login',
                method: 'POST',
                data: {
                    Name: this.userName,
					Password: this.pwdValue,
					CodeID: this.codeID,
					Code: this.code
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log(111);
                    this.$store.commit('set_token', res.data.Data.Token)
                    this.$router.push({path: '/'})
                } else {
                    this.getCode()

                }
            }).catch(err => {
                this.$message.error(err)
                this.getCode()
                console.log(err);
            })
        },
    }
}
</script>

<style lang="css" scoped>
    .login-container {
        width: 100%;
        height: 100vh;
        background-image: url(~@/assets/bg.jpg);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
    .login-title {
        display: block;
        font-size: 20px;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 20px;
    }
    .login-wrap {
        width: 300px;
    }
    .margin {
        margin: 10px 0;
    }
    .img-code {
        display: block;
        width: 200px;
        height: 60px;
        margin-top: 10px;
    }
    .btn {
        margin-top: 40px;
        text-align: center;
    }
</style>
