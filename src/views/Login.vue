<template>
    <div class="login-container">
        <el-tabs 
            v-model="activeName" 
            @tab-click="handleClick" 
            type='border-card' 
            class="login-tabs"
            strech
        >
            <el-tab-pane label="用户登录" name="login">
                <el-form
                    ref="loginForm"
                    :model="user"
                    status-icon
                    :rules="rules"
                    class="login-form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            type="text"
                            v-model="user.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="user.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('loginForm')"
                            >登陆</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="register" >
                <el-form
                    ref="registerForm"
                    :model="user"
                    status-icon
                    :rules="rules"
                    class="login-form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input
                            type="text"
                            v-model="user.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="user.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surePassword">
                        <el-input
                            type="password"
                            v-model="user.surePassword"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitRegForm('registerForm')"
                            >注册</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import api from '../api'
import jwt from 'jwt-decode'
import {mapMutations} from 'vuex'

export default {
    name:'Login',
    data(){
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            }
            if (value.length <= 3) {
                callback(new Error("长度不够"));
            }
            callback();
        };
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        var validateSurePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        var validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱"));
            }
            callback();
        };
        return{
            activeName:'login',
            user:{
                username:'',
                password:'',
                surePassword:'',
                email:''
            },
            rules: {
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }],
                surePassword: [
                    { validator: validateSurePassword, trigger: "blur" },
                ],
                email: [{ validator: validateEmail, trigger: "blur" }],
            },
        }
    },
    methods:{
        ...mapMutations('loginModule',['setUser']),
        handleClick(tab){
            console.log(tab.name);
        },
        submitForm(){
            //console.log(this.user);
            api.getLogin({
                username:this.user.username,
                password:this.user.password
            })
            .then(res=>{
                if(res.status===200){
                    this.setUser({
                        username:jwt(res.data).username,
                        token:res.data
                    });
                    //写入本地数据
                    localStorage.setItem('ego',res.data);
                    this.$router.push('/');
                }
            })
            .catch((error) => {
                //console.log(error);
                //console.log(123);
                // this.$message({
                //     message: error.data.errors,
                //     type: "error",
                // });
                this.$message({
                    message: '账户名或密码错误',
                    type: 'error'
                });
            });
        },
        //注册
        submitRegForm(){
            api.getRegister({
                username: this.user.username,
                password: this.user.password,
                email: this.user.email,
            }).then(res=>{
                    if(res.status===200){
                        this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                }
            }).catch(error=>{
                 this.$message({
                    message: '注册失败',
                    type: 'error'
                });
            })
        }
    }
}
</script>


<style scoped lang="less">
.login-container {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    .login-form {
        padding: 40px 40px;
    }
    h3 {
        margin-top: 20px;
    }
    .login-tabs {
        border-radius: 5px;
    }
}
</style>