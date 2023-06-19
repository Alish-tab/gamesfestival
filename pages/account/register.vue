<template>
  <v-app>

    <div class="content">
      <img src="@/assets/images/logo.svg" alt="logo" style="max-height: 170px; max-width: 170px"/>
    <!----------------------------form-------------------------->
    
    <div>
      <v-form>
          <v-text-field
            v-model="team.name"
            label="نام تیم"
            dense
            single-line
            outlined
            requierd
          ></v-text-field>

        <v-select
          v-model="select"
          label="در کدام بازی شرکت میکنید؟"
          :items="games"
          single-line
          outlined
          dense
        ></v-select>

          <v-text-field
            v-model="team.email"
            type="email"
            label="ایمیل"
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
          <v-text-field
            v-model="team.confirmPassword"
            type="password"
            label="تکرار رمز عبور"
            dense
            single-line
            outlined
            requierd
          ></v-text-field>
        </v-form>
      </div>
      <v-btn color="#B5838D" dark to="/account/login">تایید</v-btn>
      <p style="display: block; margin-top:20px">اکانت دارید؟
        <v-btn color="#FFB4A2" text to="/account/login">ورود</v-btn>
        </p>
    </div>
      
  </v-app>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return {
      team:{
        name:'',
        password: '',
      },
      select: null,
      games: [
        'fifa',
        'cs-go',
        'dota'
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.content{
  height: 700px;
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