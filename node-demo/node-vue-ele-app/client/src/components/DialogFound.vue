<template>
  <div class="dialogFound">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form ref="form" 
            :model="formData" 
            :rules="form_rules" 
            label-width="120px" 
            style="margin:10px;width:auto;">
          <el-form-item label="收支类型:" prop="type">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option v-for="(formtype,index) in format_type_list" :key="index" :label="formtype" :value="formtype"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述:" prop="descride">
            <el-input v-model="formData.descride"></el-input>
          </el-form-item>
          <el-form-item label="收入:" prop="income">
            <el-input v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item label="支出:" prop="expend">
            <el-input v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item label="账户现金:" prop="cash">
            <el-input v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="dialog.show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogFound",
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      form_rules:{
          type: [
            { required: true, message: '请选择一个收支类型', trigger: 'change' }
          ],
          descride: [
            { required: true, message: '请输入收支描述', trigger: 'blur' },
          ],
          income: [
            { required: true, message: '收入不能为空', trigger: 'blur' },
          ],
          expend: [
            { required: true, message: '支出不能为空', trigger: 'blur' },
          ],
          cash: [
            { required: true, message: '账户现金不能为空', trigger: 'blur' },
          ]
      }
    };
  },
  methods:{
      onSubmit(form){
          this.$refs[form].validate(valid=>{
              if(valid){
                  console.log(this.formData)
                  const url=this.dialog.option=='add'?'add':`edit/${this.formData._id}`;
                  this.$axios.post(`/api/profiles/${url}`,this.formData)
                  .then(res=>{
                      this.$message({message:"保存成功",type:"success"});
                      this.dialog.show=false;
                      this.$emit("update");
                  })
              }
          })
         
      }
  }
};
</script>
<style scoped>
</style>