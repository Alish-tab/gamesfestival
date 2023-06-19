<template>
    <v-app>

        <div class="content">
            <v-card
                class="information"
                >
                <v-card-title>اطلاعات ثبت شده</v-card-title>
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-content>
                            <v-list-item-title>نام تیم :{{username}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                            <v-list-item-title>ایمیل :{{eamil}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                </v-card>
                <v-card
                    class="achivement"
                    >
                    <v-card-title>دست آوردها</v-card-title>
                    <div 
                    class="achivement-item" 
                    v-for="(achivement,index) in achivements" 
                    :key="index"
                    :style="achivement.rank===1 ? 'border-right:4px solid gold': ''"
                    >

                        <span>تورنمت: {{achivement.tournament}}</span>
                        <span>
                            مقام: {{achivement.reward}}
                            <v-icon v-if="achivement.rank===1">mdi-podium-gold</v-icon>
                            <v-icon v-else-if="achivement.rank===2">mdi-podium-silver</v-icon>
                            <v-icon v-else-if="achivement.rank===3">mdi-podium-bronze</v-icon>
                        </span>
                    </div>
                </v-card>
            </div>
        <v-card
            class="edit-menu"
            >
            <v-list>
                <v-list-item-group>
                <v-list-item
                    v-for="item in items"
                    :key="item.id"
                    @click="openOverlay(item.id)"
                >
                    <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>

            <v-overlay
                :absolute="true"
                :value="overlay"
                :opacity="1"
                v-if="overlayId==='editName'"
            >
                <v-text-field
                    v-model="username"
                    label="نام کاربری"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-btn
                color="success"
                @click="overlay = false"
                >
                edit name
                </v-btn>
            </v-overlay>
            <v-overlay
                :absolute="true"
                :value="overlay"
                :opacity="1"
                v-if="overlayId==='editPassword'"
            >
                <v-text-field
                    v-model="password"
                    label="رمزعبور"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="تکرار رمزعبور"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-btn
                color="success"
                @click="overlay = false"
                >
                editPassword
                </v-btn>
            </v-overlay>
            <v-overlay
                :absolute="true"
                :value="overlay"
                :opacity="1"
                v-if="overlayId==='editEmail'"
            >
                <v-text-field
                    v-model="eamil"
                    label="ایمیل"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-btn
                color="success"
                @click="overlay = false"
                >
                editEmail
                </v-btn>
            </v-overlay>
            <v-overlay
                :absolute="true"
                :value="overlay"
                :opacity="1"
                v-if="overlayId==='editPhone'"
            >
                <v-text-field
                    v-model="username"
                    label="شماره تلفن"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-btn
                color="success"
                @click="overlay = false"
                >
                editPhone
                </v-btn>
            </v-overlay>
    </v-app>
</template>

<script>
export default {
    name:"ProfilePage",

    data() {
        return{
            items: [
                {
                    id:"editName",
                    icon: 'mdi-rename',
                    text: 'تغییر نام کاربری',
                },
                {
                    id:"editPassword",
                    icon: 'mdi-lock-reset',
                    text: 'تغییر رمز عبور',
                },
                {
                    id:"editEmail",
                    icon: 'mdi-email-edit-outline',
                    text: 'تغییر ایمیل',
                },
                {
                    id:"editPhone",
                    icon: 'mdi-phone-refresh-outline',
                    text: 'تغییر شماره تلفن اعضا',
                },
            ],
            overlay: false,
            overlayId:"",
            username:"",
            eamil:"",
            password:"",
            achivements:[
                {
                    tournament:"زمستان 1401",
                    rank:3,
                    reward:"سوم"
                },
                {
                    tournament:"پاییز 1401",
                    rank:1,
                    reward:"قهرمان"
                },
                {
                    tournament:"بهار 1401",
                    rank:2,
                    reward:"نایب قهرمان"
                }
            ]
        }
    },

    methods:{
        openOverlay(id){
            this.overlayId=id
            this.overlay=true
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
}
.information,.achivement{
    display: inline-block;
    width: 45%;
    margin: 10px auto;
}
.achivement-item{
    margin: 10px;
    padding: 10px;
    display: flex;
    gap: 40px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
}
.edit-menu{
    display: flex;
    width: 40%;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    margin: 10px auto;
}
@media(max-width: 1024px) {
.content{
    display: block;
}
.information,.achivement, .edit-menu {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}
.edit-menu{
    margin: 50px auto;
}
}
</style>