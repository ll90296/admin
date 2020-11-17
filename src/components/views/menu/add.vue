<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" ref="fromDialog" :rules="rules">
        <el-form-item label="菜单名称" required :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" required :label-width="formLabelWidth">
          <el-select v-model="form.pid" @change="changeMenu">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menu"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" disabled :label="1">目录</el-radio>
          <el-radio v-model="form.type" disabled :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          v-if="form.type === 1"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.icon">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.icon" autocomplete="off"></el-input> -->
        </el-form-item>

        <el-form-item label="菜单地址" v-else :label-width="formLabelWidth">
          <el-select v-model="form.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#eee"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="isInfo.isAdd" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update('fromDialog')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuAdd, getMenuinfo, getMenuedit } from "@/util/axios";
import { indexRoutes } from "@/router";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["isInfo"],
  data() {
    return {
      indexRoutes,
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
      form: {
        title: "",
        pid: 0,
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getmenulistActions",
    }),
    reset() {
      this.form = {
        title: "",
        pid: 0,
        type: 1,
        icon: "",
        url: "",
        status: 1,
      };
    },
    add() {
      getMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getMenuList();
        }
      });
    },
    look(id) {
      getMenuinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          this.$message.success(res.data.msg);
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuedit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
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
    changeMenu() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset()
    },
  },
  computed: {
    ...mapGetters({
      menu: "menu/getMenulist",
    }),
  },
};
</script>

<style lang="stylus" scoped>
.el-dialog__header {
  text-align: center !important;
}
</style>