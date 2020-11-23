<template>
  <div>
    <el-table :data="Specslist" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag type="info" v-for="attrName in item.row.attrs" :key="attrName">{{attrName}}</el-tag>
          </div>
        </template>
      </el-table-column>
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
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="Specssize"
      :total="Specscount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSpecsdelete } from "../../../util/axios";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getSpecslist: "specs/getSpecslistActions",
      getSpecscount: "specs/getSpecscountActions",
      getSpecsPage: "specs/getSpecsPageActions",
    }),
    currentChange(e) {
      this.getSpecsPage(e);
    },
    del(id) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsdelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecslist();
              this.getSpecscount();
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
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.getSpecslist();
    this.getSpecscount();
  },
  computed: {
    ...mapGetters({
      Specslist: "specs/getSpecslist",
      Specscount: "specs/getSpecscount",
      Specssize: "specs/getSpecssize",
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