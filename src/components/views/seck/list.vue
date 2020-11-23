<template>
  <div>
    <el-table :data="Secklist" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item"> 
          <div>
            <el-button type="primary" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { getSeckdelete } from "../../../util/axios";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      getSecklist: "seck/getSecklistActions",
    }),
    del(id) {
      this.$confirm("确定删除该角色吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          getSeckdelete({id}).then((res) => {
            this.$message.success(res.data.msg)
            this.getSecklist()
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  computed: {
    ...mapGetters({
      Secklist: "seck/getSecklist",
    }),
  },
  mounted() {
    this.getSecklist();
  },
};
</script>