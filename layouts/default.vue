<template>
    <v-app>
        <!------------------------------------ TOP MENU -------------------------->
        <topmenu :tabs="adminMenu" v-show="userValue ==='admin' || isAuthenticated==='admin'">
            <div>
                <v-btn
                    text
                    x-large
                    color="#B5838D"
                    @click="logout"
                >
                    <v-icon>mdi-logout-variant</v-icon>
                    خروج
                </v-btn>
            </div>
        </topmenu>
        <topmenu :tabs="memberMenu" v-show="userValue ==='team' || isAuthenticated==='team'">
            <div>
                <v-btn
                    text
                    fab
                    to="/profile"
                >
                    <v-icon x-large color="#B5838D">mdi-account</v-icon>
                </v-btn>

                <v-btn
                    text
                    x-large
                    color="#B5838D"
                    @click="logout"
                >
                    <v-icon>mdi-logout-variant</v-icon>
                    خروج
                </v-btn>
            </div>
        </topmenu>

        <topmenu :tabs="menu" v-show="isAuthenticated===false && (userValue==='' || userValue===null)">
            <div>
                <v-btn
                text
                x-large
                color="#B5838D"
                to="/account/login"
                >
                <v-icon>mdi-login-variant</v-icon>
                ثبت تیم/ ورود
                </v-btn>
            </div>
        </topmenu>

        <v-main>
            <nuxt />
        </v-main>

    </v-app>
</template>

<script>
import topmenu from "~/components/Menu";
export default {
    name: 'DefaultLayout',
    components:{topmenu},
    
   computed:{
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },

    data(){
        return{
            menu:[
                {icon:"mdi-controller",title:"بازی ها",items:[
                    { title: 'FIFA', link:'/games/fifa' },
                    { title: 'CS-GO', link:'/games/cs-go' },
                    { title: 'DOTA', link:'/games/dota' },
                ],
                },
                {icon:"mdi-stadium",title:"مسابقات",items:[
                    { title: 'مسابقات FIFA', link:'/matches/fifa' },
                    { title: 'مسابقات CS-GO', link:'/matches/cs-go' },
                    { title: 'مسابقات DOTA', link:'/matches/dota' },
                ],
                },
                {icon:"mdi-account-group",title:"تیم ها",items:[
                    { title: 'تیم های FIFA', link:'/teams/fifa' },
                    { title: 'تیم های CS-GO', link:'/teams/cs-go' },
                    { title: 'تیم های DOTA', link:'/teams/dota' },
                ],
                },
            ],
            adminMenu:[
                {icon:"mdi-view-dashboard", title:"داشبورد", items:[],link:"/dashboard/admin"},
                {icon:"mdi-controller",title:"بازی ها",items:[
                    { title: 'FIFA', link:'/games/fifa' },
                    { title: 'CS-GO', link:'/games/cs-go' },
                    { title: 'DOTA', link:'/games/dota' },
                ],
                },
                {icon:"mdi-stadium",title:"مسابقات",items:[
                    { title: 'مسابقات FIFA', link:'/matches/fifa' },
                    { title: 'مسابقات CS-GO', link:'/matches/cs-go' },
                    { title: 'مسابقات DOTA', link:'/matches/dota' },
                ],
                },
                {icon:"mdi-account-group",title:"تیم ها",items:[
                    { title: 'تیم های FIFA', link:'/teams/fifa' },
                    { title: 'تیم های CS-GO', link:'/teams/cs-go' },
                    { title: 'تیم های DOTA', link:'/teams/dota' },
                ],
                },
            ],
            memberMenu:[
                {icon:"mdi-view-dashboard", title:"داشبورد", items:[],link:"/dashboard/member"},
                {icon:"mdi-controller",title:"بازی ها",items:[
                    { title: 'FIFA', link:'/games/fifa' },
                    { title: 'CS-GO', link:'/games/cs-go' },
                    { title: 'DOTA', link:'/games/dota' },
                ],
                },
                {icon:"mdi-stadium",title:"مسابقات",items:[
                    { title: 'مسابقات FIFA', link:'/matches/fifa' },
                    { title: 'مسابقات CS-GO', link:'/matches/cs-go' },
                    { title: 'مسابقات DOTA', link:'/matches/dota' },
                    /* { title: 'مسابقات من', link:'/matches/my-team' }, */
                ],
                },
                {icon:"mdi-account-group",title:"تیم ها",items:[
                    { title: 'تیم های FIFA', link:'/teams/fifa' },
                    { title: 'تیم های CS-GO', link:'/teams/cs-go' },
                    { title: 'تیم های DOTA', link:'/teams/dota' },
                    { title: 'تیم من', link:'/teams/my-team' },
                ],
                },
            ],
            userValue:'',
        }
    }, 
    watch:{
        "$store.state.user":{
            handler: function(val,oldval){
                this.userValue=val
            }
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout')
            setTimeout(() => {
                this.$router.push({path:"/"})
            },1000)
        }
    }
}
</script>
