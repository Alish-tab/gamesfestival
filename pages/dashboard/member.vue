<template>
    <v-app>

<!------------------------------------ CONTETNT-------------------------->

        <div class="content">
            <v-card class="future-matches">
              <v-card-title class="text-center justify-center py-6">
                <h2>
                  مسابقات اینده تیم
                </h2>
              </v-card-title>
              <match-card 
                :cards="futureMatches"
                cardMode="normal"          
              ></match-card>
            </v-card>
            <v-card class="score-table">
                <v-card-title class="text-center justify-center py-6">
                        <h2>
                        جدول امتیازات
                        </h2>
                    </v-card-title>
                <score-table
                  :items="items"
                  :game="0"
                ></score-table>
            </v-card>
            <v-card class="live-matches">
              <v-card-title class="text-center justify-center py-6">
                  <h2>
                    مسابقات زنده
                  </h2>
                </v-card-title>
  
                <match-card 
                  :cards="liveMatches"
                  cardMode="live"          
                ></match-card>
            </v-card>
        </div>

    </v-app>
</template>

<script>
import ScoreTable from '@/components/ScoreTable'
import MatchCard from "~/components/MatchCard";
export default {
    name:"MemberDashboard",
    components:{ScoreTable,MatchCard},
    computed:{
      isAuthenticated() {
        if(this.$store.getters.isAuthenticated===false){
          this.$router.push({path:"/"})
        }
      },
    },
    data(){
      return {
        liveMatches:[],
        futureMatches:[],
        items:[]
      }
    },
    async fetch() {
      await this.$services.matches.match().then((res)=>{
            this.liveMatches=[]
            res.data.forEach(element => {
                if(element.status==="In Process"){
                    if(element.game==="fifa"){
                        this.liveMatches.push(element)
                    }
                }else if(element.status==="In Queue"){
                  if(element.game==="fifa"){
                    this.futureMatches.push(element)
                  }
                }
            })
        }).catch((err) =>{
            console.log(err)
        })

        await this.$services.scoreTable.fifa().then((res) => {
          this.items=[]
          res.data.forEach(item => {
              this.items.push(item)
          })

        })
    }
}
</script>

<style lang="scss" scoped>

.content {
    display: grid;
    grid-template-areas:'score-table score-table live-matches live-matches'
    'weekly-matches weekly-matches  new-teams new-teams';
    gap: 10px;
}

.future-matches,.score-table{
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
}

.live-matches {
  display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 2;
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
.live-matches,.score-table, .future-matches {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>