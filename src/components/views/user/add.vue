<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加管理员' : '编辑管理员'"
      center
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      ref="fromDiauser"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button type="primary" v-if="isInfo.isAdd" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUseradd, getUseredit, getUserinfo } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isInfo"],
  data() {
    return {
      value: 1,
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色！", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
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
    ...mapActions({
      getRolelist: "role/getRoleListActions",
      getuserlist: "user/getUserlistActions",
      getUsercount: "user/getUsercountActions",
    }),
    add() {
      console.log(this.form);
      getUseradd(this.form).then((res) => {
        this.getuserlist();
        this.getUsercount();

        this.$message.success(res.data.msg);
        this.cancel();
      });
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    look(uid) {
      getUserinfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
        }
      });
    },
    update() {
      getUseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getuserlist();
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      rolelist: "role/getRolelist",
    }),
  },
  mounted() {
    this.getRolelist();
    this.getUsercount();
  },
};
</script>