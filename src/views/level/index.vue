<template>
  <div class="app-container">
    <el-button type="success" @click="dialogVisible = true">添加等级</el-button>
    <el-dialog
      title="添加等级"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-row>
          <span>等级名称</span>
          <el-input placeholder="请输入等级名称" v-model="nameInput"></el-input>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), addLevel(nameInput)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="levelId" width="80"> </el-table-column>
      <el-table-column
        prop="levelName"
        label="等级"
        width="600"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="el-icon-delete"
            @click="del(scope.row)"
            type="text"
            size="medium"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLevel } from "@/api/level";
import { delOneLevel } from "@/api/level";
import { addOneLevel } from "@/api/level";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      nameInput:" "
    };
  },
  methods: {
    getData() {
      getLevel().then((res) => {
        //   console.log(res);
        this.tableData = res.data.map(function (item, index, list) {
          return {
            levelId: item.jrid,
            levelName: item.levelname,
          };
        });
      });
    },
    del(row) {
      delOneLevel({ levelId: row.levelId }).then((res) => {
        console.log(res);
        this.getData();
      });
    },
    addLevel(name) {
      addOneLevel({levelName:name}).then((res)=>{
        console.log(res);
        this.getData();
        // this.nameInput = "";
        
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
</style>