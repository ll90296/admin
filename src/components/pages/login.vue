<template>
    <div class="box">
      <el-form :rules="rules" ref="loginForm" :model="loginForm">
        <el-form-item label="账户" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { getUserlogin } from "../../util/axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getUserInfoActions"]),
    submitForm(loginForm) {
      // console.log(this.$refs[loginForm].validate)
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          getUserlogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserInfoActions(res.data.list);
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              this.$router.push("/home");
            } else {
              this.$message.success(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>

.box {
  width: 100vw;
  height: 100vh;
  background: #eee;

  .el-form {
    width: 300px;
    height: 200px;
    position:absolute;
    left: 50%;
    top: 50%;
    margin-top: -100px;
    margin-left: -150px;
  }
}
</style>