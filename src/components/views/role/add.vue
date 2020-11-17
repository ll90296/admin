<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="isInfo.isAdd ? '添加角色' : '编辑角色'"
      center
      :before-close="cancel"
      :visible.sync="isInfo.isShow"
    >
      <el-form :model="form" :rules="rules" ref="fromRole">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            v-model="form.menus"
            :data="menuList"
            default-expand-all
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="add" v-if="isInfo.isAdd" type="primary"
          >添 加</el-button
        >
        <el-button @click="update" v-else type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoleadd, getRoleinfo,getRoleedit } from "../../../util/axios";
export default {
  props: ["isInfo"],
  data() {
    return {
      value: true,
      defaultProps: {
        children: "children",
        label: "title",
      },
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称！", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
      this.form= {
        rolename: "",
        menus: "",
        status: 1,
      }
      this.$refs.tree.setCheckedKeys([])
    },
    ...mapActions({
      getMenulist: "menu/getmenulistActions",
      getRolelist: "role/getRoleListActions",
    }),
    add() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join()
      getRoleadd(this.form).then((res) => {
        console.log(this.form);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getRolelist();
        }
      });
    },
    look(id) {
      getRoleinfo({ id }).then((res) => {
        console.log(res);
        this.form = res.data.list
        this.form.menus = this.$refs.tree.setCheckedKeys(
          this.form.menus.split(',')
        );
        this.form.id = id;
      });
    },
    update() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join()
        getRoleedit(this.form).then(res=>{
          if(res.data.code==200){
            this.$message.success(res.data.msg)
            this.cancel()
            this.getRolelist()
          }
        })
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenulist",
    }),
  },
  mounted() {
    this.getMenulist();
  },
};
</script>