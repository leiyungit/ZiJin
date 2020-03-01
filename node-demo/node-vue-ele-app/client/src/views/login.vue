<template>
  <div class="login">
    <div class="from_contions">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form
          :model="loginUser"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >
          
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
         
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  name: "login",
  data() {
    
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        password: [
          {required:true,message:"用户密码不能为空", trigger:"change"},
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email:[{type:"email",required:true,message:"邮箱格式不正确",trigger:"blur"}],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
          .post("api/users/login", this.loginUser)
          .then(ref => {
            console.log(ref)
            this.$message({
              message:'登录成功',
              type:'success'
            });
            const {token} = ref.data;
            localStorage.setItem('eleToken',token);
            // 解析token
            const decoded=jwt_decode(token);
            //console.log(decoded);

            //token存储到vuex中
            this.$store.dispatch('setAuthenticated',!this.isEmpty(decoded));
            this.$store.dispatch('setUser',decoded);

            this.$router.push('/index');
          });
         } else {
          console.log("error submit!!");
          return false;
        }
        
        
      });
    },
    isEmpty(value){
        return(
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
    }
  }
};
</script>


<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../assets/bg.jpg) no-repeat center;
  background-size: 100% 100%;
}
.from_contions {
  width: 360px;
  height: 210px;
  position: absolute;
  text-align: center;
  top: 15%;
  left: 34%;
}
.from_contions .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>



