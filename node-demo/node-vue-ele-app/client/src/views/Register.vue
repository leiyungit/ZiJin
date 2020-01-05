<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
      </div>
       <el-form
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registerUser.pass" aria-placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerUser.checkPass" aria-placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </section>
   
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
     var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
       registerUser: {
          name: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '用户名不能为空', trigger: "change" }
          ]
        }
    };
  },
  methods: {
    submitForm(formName) {}
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>



