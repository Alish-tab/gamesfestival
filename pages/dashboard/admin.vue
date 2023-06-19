<template>
    <v-app>

<!------------------------------------ CONTETNT-------------------------->
        <div class="content">
            <div class="view">

                <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h2>
                        بازدید ها
                        </h2>
                    </v-card-title>
                
                    <v-tabs
                        v-model="viewTab"
                        background-color="transparent"
                        grow
                    >
                        <v-tab
                        v-for="tab in viewTtabs"
                        :key="tab"
                        >
                        {{ tab }}
                        </v-tab>
                    </v-tabs>
                
                    <v-tabs-items v-model="viewTab" style="padding: 20px 40px">
                        <v-tab-item
                        v-for="tab in viewTtabs"
                        :key="tab"
                        >
                        <v-card
                            flat
                        >
                            <chart :date="activeDate" :views="activeViews"></chart>
                        </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </div>

        <!------------------------new teams------------------------>
            <div class="new-teams">
                <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h2>
                        جدیدترین تیم ها
                        </h2>
                    </v-card-title>
                
                    <v-tabs
                        v-model="teamTab"
                        background-color="transparent"
                        grow
                    >
                        <v-tab
                        v-for="tab in teamTabs"
                        :key="tab"
                        >
                        {{ tab }}
                        </v-tab>
                    </v-tabs>
                
                    <v-tabs-items v-model="teamTab">
                        <v-tab-item
                        v-for="tab in teamTabs"
                        :key="tab"
                        >
                        <v-card
                            flat
                        >
                            <DynamicTable
                                :headers="newTeamsHeaders"
                                :items="newTeams"
                                :items-per-page="10"
                                tableMode="admin"
                            ></DynamicTable>
                        </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </div>

        <!------------------- matches ------------------------->
            <div class="matches">
                <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h2>
                        مسابقات هفته فعلی
                        </h2>
                    </v-card-title>
                
                    <v-tabs
                        v-model="matchTab"
                        background-color="transparent"
                        grow
                    >
                        <v-tab
                        v-for="tab in matchTtabs"
                        :key="tab"
                        >
                        {{ tab }}
                        </v-tab>
                    </v-tabs>
                
                    <v-tabs-items v-model="matchTab">
                        <v-tab-item
                        v-for="tab in matchTtabs"
                        :key="tab"
                        >
                        <v-card
                            flat
                        >
                            <match-card 
                                :cards="futureMatches"
                                cardMode="normal"          
                            ></match-card>
                        </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </div>

        <!----------------------------- GAMES --------------------------------->

            <div class="games">
                <v-card>
                    <v-card-title class="text-center justify-center py-6">
                        <h2>بازی ها</h2>  
                    </v-card-title>
                
                    <DynamicTable
                        :headers="gamesHeaders"
                        :items="gamesItems"
                        :items-per-page="3"
                        tableMode="admin"
                    ></DynamicTable>
                </v-card>
            </div>
        </div>
    </v-app>
</template>

<script>
import DynamicTable from '@/components/DynamicTable'
import chart from '@/components/initialChart'
import MatchCard from "~/components/MatchCard";
import { splitTime } from '~/helpers/core'
export default {
    name:"AdminDashboard",
    components:{DynamicTable,chart,MatchCard},

    computed:{
        isAuthenticated() {
            if(this.$store.getters.isAuthenticated===false){
                this.$router.push({path:"/"})
            }
        },
    },

    data(){
      return {
        activeDate:this.dailyDate,
        activeViews:this.dailyViews,
        dailyDate:["04/10","04/11","04/12","04/13","04/15","04/16","04/17"],
        dailyViews:[30,40,35,50,49,60,70],
        weeklyDate:["03/20 - 03/27","03/28 - 04/03","04/04 - 04/11","04/11 - 04/18"],
        weeklyViews:[30,40,35,50],
        monthlyDate:["11","12","01","02","03","04","05"],
        monthlyViews:[30,40,35,50,49,60,70],
        viewTab: null,
        viewTtabs:['روزانه','هفتگی','ماهانه'],
        teamTab: null,
        teamTabs:['FIFA','CS-GO','DOTA'],
        matchTab: null,
        matchTtabs:['FIFA','CS-GO','DOTA'],
        gamesHeaders:[
                { text: 'id', sortable: false, value: 'id' },
                {
                    text: 'نام بازی',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'تعداد تیم ها', sortable: false, value: 'number_of_team' },
            ],
        gamesItems:[],
        newTeamsHeaders: [
            {
                    text: 'نام تیم',
                    align: 'start',
                    sortable: false,
                    value: 'team.name',
                },
                { text: 'تعداد اعضا', value: 'team.number_of_player' },
                { text: 'زمان تشکیل تیم', value: 'team.creatred_at' },
                { text: 'وضعیت تیم', value: 'status' },
                { text: 'دسترسی ادمین', value: 'actions', sortable: false },
        ],
        newTeams:[],
        futureMatches:[],

      }
    },
    async fetch() {
        await this.$services.scoreTable.fifa().then((res) => {
            this.newTeams=[]
            res.data.forEach(item => {
                if(item.point<9){
                    item.status="تعلیق"
                }else{
                    item.status="فعال"
                }
                item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                this.newTeams.push(item)
            })
        })

        await this.$services.matches.match().then((res)=>{
            this.futureMatches=[]
            res.data.forEach(element => {
                if(element.status==="In Queue"){
                    if(element.game==="fifa"){
                        this.futureMatches.push(element)
                    }
                }
            })
        }).catch((err) =>{
            console.log(err)
        })

        await this.$services.game.getGames().then((res) => {
            res.data.forEach(element => {
                this.gamesItems.push(element)
            })
        })
    },
    watch:{
        viewTab:{
            handler: function(val,oldval) {
                if(val===0) {
                    this.activeDate=this.dailyDate
                    this.activeViews=this.dailyViews
                }else if(val===1){
                    this.activeDate=this.weeklyDate
                    this.activeViews=this.weeklyViews
                }else if(val===2){
                    this.activeDate=this.monthlyDate
                    this.activeViews=this.monthlyViews
                }
            }
        },
        matchTab:{
            handler: function (val,oldval) {
                this.futureMatches=[]
                if(val===0){
                    this.$services.matches.match().then((res)=>{
                        res.data.forEach(element => {
                            if(element.status==="In Queue"){
                                if(element.game==="fifa"){
                                    this.futureMatches.push(element)
                                }
                            }
                        })
                    }).catch((err) =>{
                        console.log(err)
                    })
                }else if(val===1) {
                    this.$services.matches.match().then((res)=>{
                        res.data.forEach(element => {
                            if(element.status==="In Queue"){
                                if(element.game==="csgo"){
                                    this.futureMatches.push(element)
                                }
                            }
                        })
                    }).catch((err) =>{
                        console.log(err)
                    })
                }else if(val===2) {
                    this.$services.matches.match().then((res)=>{
                        res.data.forEach(element => {
                            if(element.status==="In Queue"){
                                if(element.game==="dota"){
                                    this.futureMatches.push(element)
                                }
                            }
                        })
                    }).catch((err) =>{
                        console.log(err)
                    })
                }
            }
        },
        teamTab:{
            handler: function(val,oldval) {
                this.newTeams=[]
                if(val===0){
                    this.$services.scoreTable.fifa().then((res) => {
                        res.data.forEach(item => {
                            if(item.point<9){
                                item.status="تعلیق"
                            }else{
                                item.status="فعال"
                            }
                            item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                            this.newTeams.push(item)
                        })
                    }).catch((err) =>{
                        console.log(err)
                    })
                }else if(val===1) {
                    this.$services.scoreTable.csgo().then((res) => {
                        res.data.forEach(item => {
                            if(item.point<9){
                                item.status="تعلیق"
                            }else{
                                item.status="فعال"
                            }
                            item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                            this.newTeams.push(item)
                        })
                    }).catch((err) =>{
                        console.log(err)
                    })
                }else if(val===2) {
                    this.$services.scoreTable.dota().then((res) => {
                        res.data.forEach(item => {
                            if(item.point<9){
                                item.status="تعلیق"
                            }else{
                                item.status="فعال"
                            }
                            item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                            this.newTeams.push(item)
                        })
                    }).catch((err) =>{
                        console.log(err)
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.content {
    display: grid;
    gap: 10px;
}

.view,.new-teams{
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
}

.matches,.games{
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 3;
    grid-row-end: 4;    
}


h2 {
  background: -webkit-linear-gradient(right,#FFB4A2, #B5838D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media(max-width: 1024px) {
.content {
    display: block;
    &:last-child{
        margin-bottom: 20px;
    }
}
.view, .games, .matches, .new-teams  {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>