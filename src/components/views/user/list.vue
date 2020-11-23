<template>
  <div>
    <el-table :data="Userlist" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status==1">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.uid)">编辑</el-button>
            <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="Usersize"
      :total="Usercount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserdelete } from "../../../util/axios";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getUserlist: "user/getUserlistActions",
      getUsercount: "user/getUsercountActions",
      getUserpage: "user/getUserpageActions",
    }),
    currentChange(e) {
      this.getUserpage(e);
    },
    del(uid) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserdelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserlist();
              this.getUsercount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(uid){
      this.$emit('edit',uid)
    }
  },
  mounted() {
    this.getUserlist();
    this.getUsercount();
  },
  computed: {
    ...mapGetters({
      Userlist: "user/getUserlist",
      Usercount: "user/getUsercount",
      Usersize: "user/getUsersize",
    }),
  },
};
</script>


<style lang="stylus" scoped>
.el-pagination {
  float: right;
  margin-top: 10px;
}
</style>