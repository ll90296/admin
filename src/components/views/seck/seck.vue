<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" @click="isAdd" plain>添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add ref="dialog" :isInfo="isInfo" @cancel="cancel"></v-add>
  </div>
</template>

<script>
import vBread from "@/common/el_bread";
import vAdd from "./add";
import vList from "./list";
export default {
  components: {
    vBread,
    vAdd,
    vList,
  },
  methods: {
    isAdd() {
      this.isInfo.isShow = true;
      this.isInfo.isAdd = true;
    },
    cancel(e) {
      this.isInfo.isShow = e;
    },
    //编辑
    edit(e) {
      this.isInfo.isShow = true;
      this.isInfo.isAdd = false;
      console.log(e);
      this.$refs.dialog.look(e)
    },
  },
  data() {
    return {
      isInfo: {
        isShow: false,
        //添加
        isAdd: true,
      },
    };
  },
};
</script>


<style lang="stylus" scoped>
.el-button
  margin-bottom 10px
</style>