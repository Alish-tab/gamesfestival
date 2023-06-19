<template>
  <v-app>

    <v-alert
      v-if="showAlert"
      :type="alertType"
    > {{alertMessage}} </v-alert>

    <div class="content">
        <img src="@/assets/images/logo.svg" alt="logo" style="max-height: 170px; max-width: 170px"/>
        <v-radio-group v-model="role" row>
        <v-radio label="ادمین" value="admin" color="#FFB4A2"></v-radio>
        <v-radio label="عضو تیم" value="team" color="#FFB4A2"></v-radio>
      </v-radio-group>

<!------------------------- admin --------------------->
    <div v-if="role==='admin'">
      <v-text-field
            v-model="admin.username"
            label="نام کاربری"
            dense
            single-line
            outlined
            requierd
          ></v-text-field>
      <v-text-field
            v-model="admin.password"
            type="password"
            label="رمز عبور"
            dense
            single-line
            outlined
            requierd
          ></v-text-field>
    </div>

<!------------------------- team --------------------->
    <div v-else-if="role==='team'">
      <v-text-field
            v-model="team.name"
            label="نام کاربری"
            dense
            single-line
            outlined
            requierd
          ></v-text-field>
      <v-text-field
            v-model="team.password"
            type="password"
            label="رمز عبور"
            dense
            single-line
            outlined
            requierd
          ></v-text-field>
      </div>
      <v-btn color="#B5838D" dark @click="login">وروود</v-btn>
      <p style="display: block; margin-top:20px">اکانت ندارید؟
        <v-btn color="#FFB4A2" text to="/account/register">ثبت نام</v-btn>
        </p>
    </div>

  </v-app>
</template>

<script>
export default {
  name:'Login',

  data() {
    return{
      role: 'team',
      admin:{
        username: '',
        password: '',
      },
      team:{
        name:'',
        password: '',
      },
      showAlert:false,
      alertType:"",
      alertMessage:"",
    }
  },
  methods:{
    login() {
        if(this.role==="admin"){
            this.showAlert=true
            this.$store.dispatch("logInUser",this.role)
            this.alertType="success"
            this.alertMessage="به داشبورد ادمین خوش آمدید."
            setTimeout(() => {
                this.$router.push({path:"/dashboard/admin"})
                this.showAlert=false
            },1000)
        }else if(this.role==="team"){
            this.showAlert=true
            this.$store.dispatch("logInUser",this.role)
             this.alertType="success"
            this.alertMessage="به داشبورد اعضا خوش آمدید."
            setTimeout(() => {
                this.$router.push({path:"/dashboard/member"})
                this.showAlert=false
            },1000)
        }else{
           this.showAlert=true
             this.alertType="error"
            this.alertMessage="خطایی رخ داده است!!"
             setTimeout(() => {
                this.showAlert=false
            },1000)
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  height: 600px;
  width: 700px;
  border: 2px solid #e4e4e7;
  margin: 30px auto;
  padding: 100px;
  text-align: center;

  img {
    margin-top: -50px;
    margin-bottom: 50px;
  }

}
.v-alert {
  display: block;
  position: absolute;
  top: 50px;
  left: 50px;
}
@media(max-width: 1024px) {
.content {
    height: 80vh;
    width: 80vw;
    padding: 20px;

    img {
    display: none;
  }
}

}
</style>