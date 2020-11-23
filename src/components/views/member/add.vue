<template>
  <div>
    <el-dialog
      title="修改昵称"
      center
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      ref="fromDiauser"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMemberedit, getMemberinfo } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isInfo"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false, //预览
      imageUrl: "",
      fileList: [],
      value: 1,
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      pwd: "",
      formLabelWidth: "120px",
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      getMemberlist: "member/getMemberlistActions",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
    },
    look(uid, pwd) {
      this.pwd = pwd;
      getMemberinfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
        }
      });
    },
    update() {
      this.form.password = this.form.password ? this.form.password : this.pwd;
      getMemberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getMemberlist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
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