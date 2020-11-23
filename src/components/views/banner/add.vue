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
        <el-form-item
          prop="title"
          label="标题"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import {
  getBannerAdd,
  getBanneredit,
  getBannerinfo,
} from "../../../util/axios";
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
        title: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
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
      this.dialogVisible = true;
    },
    onRemove(file, fileList) {},
    onChange(file) {
      this.imageUrl = file.raw;
    },
    handleExceed(files, fileList) {
      // console.log(files,fileList);
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了${
          files.length + fileList.length
        }个文件`
      );
    },
    ...mapActions({
      getBannerlist: "banner/getBannerlistActions",
    }),
    add() {
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append("img", this.imageUrl);
      getBannerAdd(file).then((res) => {
        this.getBannerlist();
        this.$message.success(res.data.msg);
        this.cancel();
      });
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        title: "",
        img: "",
        status: 1,
      },
      this.fileList= [],
      this.imageUrl = "";
    },
    look(id) {
      getBannerinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
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
      getBanneredit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getBannerlist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      Bannerlist: "banner/getBannerlist",
    }),
  },
  mounted() {
    this.getBannerlist();
  },
};
</script>