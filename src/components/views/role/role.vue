<template>
  <div>
    <v-bread></v-bread>
    <el-button @click="isAdd" type="primary" plain>添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add @cancel="cancel" ref="diaRole" :isInfo="isInfo"></v-add>
  </div>
</template>

<script>
import vBread from "@/common/el_bread";
import vList from "./list";
import vAdd from "./add";
export default {
  components: {
    vBread,
    vList,
    vAdd,
  },
  data() {
    return {
      isInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  methods: {
    isAdd() {
      this.isInfo.isShow = true;
      this.isInfo.isAdd = true;
    },
    cancel(e) {
      this.isInfo.isShow = e;
    },
    edit(e) {
      this.isInfo.isShow = true;
      this.isInfo.isAdd = false;
      this.$refs.diaRole.look(e);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-bottom: 10px;
}
</style>