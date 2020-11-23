<template>
  <div>
    <el-container>
      <el-header
        ><i>XXX大型后台管理系统</i>
        <el-button type="primary" size="mini" @click="quit">退出</el-button
        ><span>{{ getUserInfo.username }}</span></el-header
      >
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "@/common/nav";
import { mapGetters } from "vuex";
export default {
  components: {
    vNav,
  },
  methods: {
    quit() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("userInfo");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
};
</script>

<style lang="stylus" scoped>
.el-aside {
  min-height: 90vh;
  background: rgb(84, 92, 100);
}

.el-header {
  background: #ff7d00;
  text-align: center;
  vertical-align: top;
}

.el-button {
  margin: 16px 0;
  float: right;
}

span {
  float: right;
  margin: 18px 10px;
  color: #CAFF45;
}

i {
  font: 20px / 56px '微软雅黑';
}
</style>