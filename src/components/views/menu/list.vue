<template>
  <div>
    <el-table
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      :data="menu"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
import { getMenudelete } from "@/util/axios";
export default {
  methods: {
    ...mapActions({
      getMenulist: "menu/getmenulistActions",
    }),
    //删除
    del(id) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          getMenudelete({id}).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //重新触发调取列表
              this.getMenulist()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑传id
    edit(id){
      this.$emit('edit',id)
    }
  },
  computed: {
    ...mapGetters({
      menu: "menu/getMenulist",
    }),
  },
  mounted() {
    this.getMenulist();
  },
};
</script>