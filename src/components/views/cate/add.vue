<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      center
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      ref="fromDiauser"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in Catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-change="onChange"
            :auto-upload="false"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
import { getCateAdd, getCateedit, getCateinfo } from "../../../util/axios";
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
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        pid: [{ required: true, message: "请选择所属分类！", trigger: "blur" }],
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
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
    onPreview(file) {
      console.log(file);
      this.dialogVisible = true;
    },
    onRemove(file, fileList) {},
    onChange(file) {
      console.log(file);
      this.imageUrl = file.raw;
    },
    handleExceed(files, fileList) {
      // console.log(files,fileList);
      this.$message.warning(`当前限制选择 1 个文件，本次选择了${files.length+fileList.length}个文件`)
    },
    ...mapActions({
      getCatelist: "cate/getCatelistActions",
      getuserlist: "user/getUserlistActions",
    }),
    add() {
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append("img", this.imageUrl);
      getCateAdd(file).then((res) => {
        this.getCatelist();
        this.$message.success(res.data.msg);
        this.cancel();
      });
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
      this.fileList=[],
      this.imageUrl = "";
    },
    look(id) {
      getCateinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.fileList = [{ url: `${this.$imgUrl}${this.form.img}` }];
        }
      });
    },
    update() {
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      this.imageUrl = this.imageUrl ? this.imageUrl : this.form.img;
      file.append("img", this.imageUrl);
      getCateedit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getCatelist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
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