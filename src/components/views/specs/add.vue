<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      center
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      ref="fromDiauser"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arr"
          label="规格属性"
          :key="index"
          :label-width="formLabelWidth"
        >
          <el-input v-model="item.value" class="inputW"></el-input>
          <el-button @click="addAttr" v-if="index == 0">新增规格属性</el-button>
          <el-button @click="removeAttr(index)" type="danger" v-else
            >删除</el-button
          >
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
import { getSpecsadd, getSpecsedit, getSpecsinfo } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isInfo"],
  data() {
    return {
      arr: [
        {
          value: "",
        },
      ],
      form: {
        id: "",
        attrs: "",
        specsname: "",
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
      // getRolelist: "role/getRoleListActions",
      getSpecslist: "specs/getSpecslistActions",
      getSpecscount: "specs/getSpecscountActions",
    }),
    add() {
      this.form.attrs = this.arr.map((item) => item.value).join(",");
      getSpecsadd(this.form).then((res) => {
        this.getSpecslist();
        this.$message.success(res.data.msg);
        this.cancel();
        this.getSpecscount();
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
      this.arr=[
        {
          value: "",
        },
      ]
    },
    look(id) {
      getSpecsinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list[0];
          data.attrs.map((item, index) => {
            if (index == 0) {
              this.arr[0].value = item;
            } else {
              this.arr.push({ value: item });
            }
          });
          this.form = data;
        }
      });
    },
    update() {
      this.form.attrs = this.arr.map((item) => item.value).join(",");
      getSpecsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getSpecslist();
        }
      });
    },
    addAttr() {
      this.arr.push({
        value: "",
      });
    },
    removeAttr(i) {
      this.arr.splice(i, 1);
    },
  },
  computed: {
    ...mapGetters({
      Specslist: "specs/getSpecslist",
    }),
  },
  mounted() {
    // this.getRolelist();
    this.getSpecscount();
  },
};
</script>

<style lang="" scoped>
.inputW {
  width: 60%;
}
</style>