<template>
  <div>
    <el-table
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      :data="Catelist"
      border
      style="width: 100%"
    >
      <el-table-column prop="pid" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <div>
            <img class="cateImg" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
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
            <el-button type="primary" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <p></p>
            <el-button type="danger" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCatedelete } from "@/util/axios";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      getCatelist: "cate/getCatelistActions",
    }),
    //删除
    del(id) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCatedelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getCatelist();
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
    //编辑传id
    edit(id) {
      this.$emit("edit", id);
    },
  },
  computed: {
    ...mapGetters({
      Catelist: "cate/getCatelist",
    }),
  },
  mounted() {
    this.getCatelist();
  },
};
</script>


<style lang="stylus" scoped>
.cateImg
  width 100px 
</style>