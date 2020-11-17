<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加商品' : '编辑商品'"
      center
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      ref="fromDiauser"
      @opened="createEditor"
    >
      <el-form ref="rules" :model="form" :rules="rules">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            @change="cateChange(false)"
            placeholder="请选择"
          >
            <el-option
              v-for="cateItem in Catelist"
              :key="cateItem.id"
              :label="cateItem.catename"
              :value="cateItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              :label="cateChild.catename"
              v-for="cateChild in cateChildren"
              :key="cateChild.id"
              :value="cateChild.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="goodsname"
          label="商品名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格" :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="price"
          label="市场价格"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
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
        <el-form-item
          label="商品规格"
          prop="specsid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsid" @change="specsChange(false)">
            <el-option
              :key="item.id"
              v-for="item in Specslist"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-select multiple v-model="form.specsattr" placeholder="请选择">
            <el-option
              v-for="list in specsArr"
              :key="list"
              :label="list"
              :value="list"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <!-- <quill-editor
          ref="myQuillEditor"
          v-model="form.description"
          :options="editorOption"
        /> -->

        <el-form-item label="商品描述:" :label-width="formLabelWidth">
          <div id="editor"></div>
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
import { getGoodsadd, getGoodsedit, getGoodsinfo } from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";

// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

// import { quillEditor } from "vue-quill-editor";

import E from "wangeditor";
export default {
  // components: {
  //   quillEditor,
  // },
  props: ["isInfo"],
  data() {
    return {
      // editorOption: {},
      editor: null,
      dialogImageUrl: "",
      dialogVisible: false, //预览
      imageUrl: "",
      fileList: [],
      value: 1,
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1, //状态1正常2禁用
      },
      cateChildren: [],
      specsArr: [],
      formLabelWidth: "120px",
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        market_price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
    };
  },
  methods: {
    //富文本
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    cateChange(n) {
      console.log(n);
      let cateI = this.Catelist.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.cateChildren = this.Catelist[cateI].children;

      if (!n) {
        this.form.second_cateid = "";
      }
    },
    specsChange(n) {
      // console.log(this.form);
      // console.log(n);
      let specsI = this.Specslist.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.specsArr = this.Specslist[specsI].attrs;

      if (!n) {
        this.form.specsattr = [];
      }
    },
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
      getgoodsList: "goods/getgoodsListActions",
      SpecslistActions: "specs/getSpecslistActions",
      CatelistActions: "cate/getCatelistActions",
      goodsCountActions: "goods/getgoodsCountActions",
    }),
    add() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      this.form.description = this.editor.txt.html();
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append("img", this.imageUrl);
      getGoodsadd(file).then((res) => {
        this.getgoodsList();
        this.goodsCountActions();
        this.$message.success(res.data.msg);
        this.cancel();
      });
    },
    cancel() {
      this.$emit("cancel", false);
      (this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品 1是 2否
        ishot: 1, //是否热卖推荐1是 2否
        status: 1, //状态1正常2禁用
      }),
        (this.fileList = []),
        (this.cateChildren = []),
        (this.specsArr = []),
        this.$refs["rules"].resetFields();
    },
    look(id) {
      getGoodsinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.form = res.data.list;
          this.form.id = id;
          this.fileList = [{ url: `${this.$imgUrl}${this.form.img}` }];
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          this.cateChange(true);
          this.specsChange(true);
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
      getGoodsedit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getgoodsList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getgoodsList",
      Specslist: "specs/getSpecslist",
      Catelist: "cate/getCatelist",
    }),
  },
  mounted() {
    this.getgoodsList();
    this.SpecslistActions();
    this.CatelistActions();
    this.goodsCountActions();
  },
};
</script>