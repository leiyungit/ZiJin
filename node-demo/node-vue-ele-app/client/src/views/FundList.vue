<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_date">
        <el-form-item>
          <el-date-picker v-model="search_date.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>--</el-form-item>
        <el-form-item>
          <el-date-picker v-model="search_date.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight" >
          <el-button 
          type="primary" 
          size="small" 
          icon="view" 
          v-if="user.identity == 'admin' || user.identity == 'manage'"
          @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" border max-height="450">
        <!--max-height="450" -->
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="250" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="150" align="center"></el-table-column>
        <el-table-column prop="descride" label="收支描述" width="170" align="center"></el-table-column>
        <el-table-column prop="income" label="收入" width="150" align="center">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="150" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" width="150" align="center">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="200" align="center"></el-table-column>
        <el-table-column prop="operation" align="center" fixed="right" width="180" label="操作" v-if="user.identity == 'admin' || user.identity == 'manage'">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.page_index"
              :page-sizes="pagination.page_sizes"
              :page-size="pagination.page_size"
              :layout="pagination.layout"
              :total="pagination.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <DialogFound :dialog="dialog" :formData="formData" @update="getProfiles()"></DialogFound>
  </div>
</template>
<script>
import DialogFound from "../components/DialogFound.vue";
export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData:[],
      search_date: {
        startTime: "",
        endTime: ""
      },
      dialog: { show: false },
      formData: {},
      pagination: {
        total: 0,
        page_index: 1,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfiles();
  },
  computed:{
      user(){
          return this.$store.getters.user;
      }
  },
  methods: {
    getProfiles() {
      this.$axios
        .get("api/profiles")
        .then(res => {
          this.allTableData = res.data;
          this.filterTableData=res.data;
          // 设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //   this.pagination = {
      //     total: this.allTableData.length,
      //     page_index: 1,
      //     page_sizes: 5
      //   }; 这是错误的写法，重写了对象
      this.pagination.index = 1;
      this.pagination.total = this.allTableData.length;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        option: "edit",
        title: "修改资金信息"
      };
      this.formData = {
        type: row.type,
        descride: row.descride,
        date: row.date,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        _id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message({ message: "删除成功" });
        this.getProfiles();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        option: "add",
        title: "添加资金信息"
      };
      this.formData = {
        type: "",
        descride: "",
        date: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      };
    },
    handleSizeChange(page_size) {
      this.pagination.page_index = 1;
      this.pagination.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page_index) {
      // 当前页
      let index = this.pagination.page_size * (page_index - 1);
      let nums = this.pagination.page_size * page_index;
      // 容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
      }
      this.tableData = tables;
    },
    handleSearch() {
      if(!this.search_date.startTime || !this.search_date.endTime){
          this.$message({type:"warning", message:"请选择时间区间"});
          this.getProfiles();
          return;
      }
      const sTime = this.search_date.startTime.getTime();
      const eTime = this.search_date.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item=>{
          let date=new Date(item.date);
          let time=date.getTime();
          return time>=sTime && time <=eTime;
      });
      //分页加载
      this.setPaginations();
    }
  }
};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>