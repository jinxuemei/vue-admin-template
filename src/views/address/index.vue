<template>
  <div class="app-container">
    <div class="operation">
      <el-row>
        <el-button type="success" @click="dialogVisible = true"
          >添加地址</el-button
        >
        <el-dialog
          title="添加地址"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div class="input">
            <el-row>
              <span>地址名称</span>
              <el-input placeholder="请输入地址名称" v-model="nameInput"></el-input>
            </el-row>
            
            <span>经度</span>
            <el-input placeholder="请输入经度" v-model="longInput"></el-input>
            <span>纬度</span>
            <el-input placeholder="请输入纬度" v-model="latInput"></el-input>
          </div>
         
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false,add(nameInput,longInput,latInput)"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-row>
      <el-input placeholder="请输入地址" v-model="input" clearable> </el-input>
      <el-row>
        <el-button type="primary">搜索地址</el-button>
      </el-row>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <!-- <el-table-column prop="addressid"  width="80"> </el-table-column> -->
      <el-table-column prop="address" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="longitude" label="经度" width="180">
      </el-table-column>
      <el-table-column prop="latitude" label="纬度"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAddress } from "@/api/address";
import { DelOneAddress } from "@/api/address";
import { AddInof } from "@/api/address";
export default {
  data() {
    return {
      dialogVisible: false,
      input: " ",
      nameInput: " ",
      longInput: " ",
      latInput: " ",
      list: [],
      tableData: [],
    };
  },

  methods: {
    //获取数据
    getData() {
      getAddress().then((res) => {
        // console.log(res);
        this.list = res.data;
        // console.log(this.list);
        this.tableData = this.list.map(function (item, index, list) {
          return {
            addressid: item.addressid,
            address: item.addressname,
            longitude: item.latitude,
            latitude: item.longitude,
          };
        });
      });
    },

    //删除
    handleDelete(index, row) {
      // console.log(index,row);
      DelOneAddress({ addressid: row.addressid }).then((res) => {
        console.log(res);
        this.getData();
      });
    },
    //添加
    add(name,longi,lat) {
      AddInof({
        address:name,
        longitude:longi,
        latitude:lat
      }).then((res) => {
        // console.log(res);
        this.nameInput = "";
        this.longInput = "";
        this.latInput = ""
        this.getData();
      });
      // console.log(name,longi,lat);
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
.operation {
  display: flex;
  .input {
    el-input {
      padding-bottom: 20px;
    }
  }
}
</style>