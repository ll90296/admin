<template>
  <div>
    <el-table
      row-key="id"
      default-expand-all
      :data="Memberlist"
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
            <el-button type="primary" @click="edit(item.row.uid,item.row.password)"
              >编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      getMemberlist: "member/getMemberlistActions",
    }),
    //编辑传id
    edit(uid,pwd) {
      this.$emit("edit", uid,pwd);
    },
  },
  computed: {
    ...mapGetters({
      Memberlist: "member/getMemberlist",
    }),
  },
  mounted() {
    this.getMemberlist();
  },
};
</script>


<style lang="stylus" scoped>
.cateImg
  width 100px 
</style>