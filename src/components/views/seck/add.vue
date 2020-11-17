<template>
  <div>
    <el-dialog
      :title="isInfo.isAdd ? '添加秒杀' : '编辑秒杀'"
      center
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      ref="fromDiauser"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="title"
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-time-picker
            is-range
            v-model="timer"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            :label-width="formLabelWidth"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            @change="cateChange(false)"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in Catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            @change="secondChange(false)"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in cateChildren"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
  getSeckAdd,
  getSeckedit,
  getSeckinfo,
  getGoodslist,
} from "../../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isInfo"],
  data() {
    return {
      labelPosition: "right",
      dialogImageUrl: "",
      dialogVisible: false, //预览
      imageUrl: "",
      fileList: [],
      value: 1,
      timer: "",
      form: {
        // id: "",
        begintime: "", //开始时间
        endtime: "", //结束时间
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        img: "",
        status: 1,
      },
      cateChildren: [],
      secondList: [],
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
    cateChange(n) {
      let cateI = this.Catelist.findIndex(
        (item) => this.form.first_cateid == item.id
      );
      this.cateChildren = this.Catelist[cateI].children;

      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    secondChange(n) {
      getGoodslist({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.secondList = res.data.list;
        }
      });
      if (!n) {
        this.form.goodsid = "";
      }
    },
    ...mapActions({
      getSecklist: "seck/getSecklistActions",
      getCatelist: "cate/getCatelistActions",
    }),
    add() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      getSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getSecklist();
        }
      });
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        // id: "",
        begintime: "", //开始时间
        endtime: "", //结束时间
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        img: "",
        status: 1,
      };
      this.timer = "";
    },
    look(id) {
      getSeckinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          this.cateChange(true);
          this.secondChange(true);
        }
      });
    },
    update() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      
      getSeckedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.getSecklist();
          this.cancel();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      Secklist: "seck/getSecklist",
      Catelist: "cate/getCatelist",
    }),
  },
  mounted() {
    this.getSecklist();
    this.getCatelist();
  },
};
</script>