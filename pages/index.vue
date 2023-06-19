<template>
  <v-app>

        <div class="content">

        <!------------------- live-matches ------------------------->
          <v-card class="live-matches">
            <v-card-title class="text-center justify-center py-6">
                        <h2>
                        مسابقات زنده
                        </h2>
                    </v-card-title>
                
                    <v-tabs
                        v-model="liveMatchTab"
                        background-color="transparent"
                        grow
                    >
                        <v-tab
                        v-for="tab in liveMatchTabs"
                        :key="tab"
                        >
                        {{ tab }}
                        </v-tab>
                    </v-tabs>
                
                    <v-tabs-items v-model="liveMatchTab">
                      <v-tab-item
                        v-for="tab in liveMatchTabs"
                        :key="tab"
                      >
                        <v-card
                            flat
                        >
                            <match-card 
                              :cards="liveMatches"
                              cardMode="live"          
                            ></match-card>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
            
          </v-card>

        <!------------------- score-table ------------------------->
          <v-card class="score-table">
            <v-card-title class="text-center justify-center py-6">
                <h2>
                جدول امتیازات
                </h2>
              </v-card-title>
              <v-card>      
                <v-tabs
                    v-model="ScoreTab"
                    background-color="transparent"
                    grow
                >
                    <v-tab
                        v-for="tab in ScoreTabs"
                        :key="tab"
                    >
                        {{ tab }}
                    </v-tab>
                </v-tabs>
                        
                <v-tabs-items v-model="ScoreTab">
                    <v-tab-item
                        v-for="tab in ScoreTabs"
                        :key="tab"
                        >
                        <v-card
                            flat
                        >
                            <v-card-text>
                                <score-table
                                    :items="scoreTableItems"
                                    :game="ScoreTab"
                                >
                                </score-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
              </v-card>
              
            </v-card>

      <!------------------- weekly-matches ------------------------->
                <v-card class="weekly-matches">
                    <v-card-title class="text-center justify-center py-6">
                        <h2>
                        مسابقات هفته فعلی
                        </h2>
                    </v-card-title>
                
                    <v-card>
                        <v-tabs
                            v-model="weeklyMatchTab"
                            background-color="transparent"
                            grow
                        >
                            <v-tab
                            v-for="tab in weeklyMatchTtabs"
                            :key="tab"
                            >
                            {{ tab }}
                            </v-tab>
                        </v-tabs>
                    
                        <v-tabs-items v-model="weeklyMatchTab">
                            <v-tab-item
                            v-for="tab in weeklyMatchTtabs"
                            :key="tab"
                            >
                            <v-card
                                flat
                            >
                                <match-card 
                                :cards="weeklyMatches"
                                cardMode="normal"          
                                ></match-card>
                            </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-card>

        <!------------------------new teams------------------------>
                <v-card class="new-teams">
                    <v-card-title class="text-center justify-center py-6">
                        <h2>
                        جدیدترین تیم ها
                        </h2>
                    </v-card-title>
                
                    <v-card>
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
                                <v-card-text>
                                <dynamic-table
                                    :headers="headers"
                                    :items="newTeams"
                                    :items-per-page="itemsPerPage"
                                    :sortBy="'team.creatred_at'"
                                >
                                </dynamic-table>
                                </v-card-text>
                            </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-card>
        </div>
  </v-app>
</template>

<script>
import ScoreTable from '@/components/ScoreTable'
import MatchCard from "~/components/MatchCard";
import DynamicTable from '@/components/DynamicTable'
import { splitTime } from '~/helpers/core'
export default {
  name: 'IndexPage',
  components:{ScoreTable,MatchCard,DynamicTable},

  data() {
    return {
      ScoreTab: null,
      ScoreTabs:['FIFA','CS-GO','DOTA'],
      scoreTableItems:[],
      liveMatchTab: null,
      liveMatchTabs:['FIFA','CS-GO','DOTA'],
      liveMatches:[],
      weeklyMatchTab: null,
      weeklyMatchTtabs:['FIFA','CS-GO','DOTA'],
      weeklyMatches:[],
      teamTab: null,
      teamTabs:['FIFA','CS-GO','DOTA'],
      headers: [
                {
                    text: 'نام تیم',
                    align: 'start',
                    sortable: false,
                    value: 'team.name',
                },
                { text: 'تعداد اعضا', value: 'team.number_of_player' },
                { text: 'امتیاز', value: 'point' },
                { text: 'زمان تشکیل تیم', value: 'team.creatred_at' },
            ],
      newTeams:[],
      itemsPerPage:10,
    }
  },
  async fetch() {
    await this.$services.matches.match().then((res)=>{
        res.data.forEach(element => {
            if(element.status==="In Process"){
                console.log(element.game)
                this.liveMatches=[]
                if(element.game==="fifa"){
                    this.liveMatches.push(element)
                }
            }else if(element.status==="In Queue"){
                this.weeklyMatches=[]
                if(element.game==="fifa"){
                    this.weeklyMatches.push(element)
                }
            }
        })
    }).catch((err) =>{
        console.log(err)
    })

    await this.$services.scoreTable.fifa().then((res) => {
        /* console.log(res.data) */
        this.scoreTableItems=[]
        res.data.forEach(item => {
            this.scoreTableItems.push(item)
        })

    })

    await this.$services.scoreTable.fifa().then((res) => {
        this.newTeams=[]
        res.data.forEach(item => {
            item.team.creatred_at=splitTime(item.team.creatred_at,"time")
            this.newTeams.push(item)
        })

    })
  },

  watch:{
    ScoreTab:{
        handler: function(val,oldval) {

            this.scoreTableItems=[]
            if(val===0){
                this.$services.scoreTable.fifa().then((res) => {
                    /* console.log(res.data) */
                    res.data.forEach(item => {
            this.scoreTableItems.push(item)
        })
                })
            }else if(val===1) {
                this.$services.scoreTable.csgo().then((res) => {
                    /* console.log(res.data) */
                    res.data.forEach(item => {
            this.scoreTableItems.push(item)
        })
                })
            }else if(val===2) {
                this.$services.scoreTable.dota().then((res) => {
                    /* console.log(res.data) */
                    res.data.forEach(item => {
            this.scoreTableItems.push(item)
        })
                })
            }
        }
    },
    liveMatchTab:{
        handler: function (val,oldval) {
            this.liveMatches=[]
            if(val===0){
                this.$services.matches.match().then((res)=>{
                    res.data.forEach(element => {
                        if(element.status==="In Process"){
                            if(element.game==="fifa"){
                                this.liveMatches.push(element)
                            }
                        }
                    })
                }).catch((err) =>{
                    console.log(err)
                })
            }else if(val===1) {
                this.$services.matches.match().then((res)=>{
                    res.data.forEach(element => {
                        if(element.status==="In Process"){
                            if(element.game==="csgo"){
                                this.liveMatches.push(element)
                            }
                        }
                    })
                }).catch((err) =>{
                    console.log(err)
                })
            }else if(val===2) {
                this.$services.matches.match().then((res)=>{
                    res.data.forEach(element => {
                        if(element.status==="In Process"){
                            if(element.game==="dota"){
                                this.liveMatches.push(element)
                            }
                        }
                    })
                }).catch((err) =>{
                    console.log(err)
                })
            }
        }
    },
    weeklyMatchTab:{
        handler: function (val,oldval) {
            this.weeklyMatches=[]
            if(val===0){
                this.$services.matches.match().then((res)=>{
                    res.data.forEach(element => {
                        if(element.status==="In Queue"){
                            if(element.game==="fifa"){
                                this.weeklyMatches.push(element)
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
                                this.weeklyMatches.push(element)
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
                                this.weeklyMatches.push(element)
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
                        item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                        this.newTeams.push(item)
                    })
                            })
                        }else if(val===1) {
                            this.$services.scoreTable.csgo().then((res) => {
                                res.data.forEach(item => {
                                    item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                                    this.newTeams.push(item)
                                })
                            })
                        }else if(val===2) {
                            this.$services.scoreTable.dota().then((res) => {

                                res.data.forEach(item => {
                                    item.team.creatred_at=splitTime(item.team.creatred_at,"time")
                                    this.newTeams.push(item)
                                })
                })
            }
        }
    },
  },
  methods:{
    splitTime
  }
}
</script>


<style lang="scss" scoped>

.content {
    display: grid;
    gap: 10px;
}
.score-table,.live-matches {
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
}
.weekly-matches, .new-teams {
    display: inline-block;
    margin: 50px 20px 10px 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 2;
    grid-row-end: 3;    
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
.live-matches,.score-table, .weekly-matches, .new-teams  {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>