<template>
  <div class="userlist">
    <template>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="identity" label="账户类型" width="120"></el-table-column>
        <el-table-column prop="avatar" label="头像"></el-table-column>
        <el-table-column prop="date" label="日期" width="250"></el-table-column>
        
        
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  name: "userlist",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$axios
        .get("api/users")
        .then(res => {
          console.log(res);
          this.tableData = res.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style scoped>
.userlist {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>