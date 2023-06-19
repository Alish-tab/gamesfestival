<template>
    <v-app>

<!------------------------------------ CONTETNT-------------------------->  
        <div class="content">

        <!------------------- live-matches ------------------------->
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

        <!------------------- fuature-matches ------------------------->
            <v-card class="fuature-matches">
                <v-card-title class="text-center justify-center py-6">
                    <h2>
                        مسابقات آینده
                    </h2>
                </v-card-title>
                   
                <match-card 
                    :cards="fuatureMatches"
                    cardMode="normal"          
                ></match-card>

            </v-card>

        <!------------------- done-matches ------------------------->
            <v-card class="done-matches">
                <v-card-title class="text-center justify-center py-6">
                    <h2>
                        مسابقات برگذار شده
                    </h2>
                </v-card-title>
                   
                <match-card 
                    :cards="doneMatches"
                    cardMode="done"          
                ></match-card>

            </v-card>
        </div>
    </v-app>
</template>

<script>
import MatchCard from "~/components/MatchCard";
export default {
    name:"MatchesPage",
    components:{MatchCard},

    data() {
        return{
            liveMatches:[],
            fuatureMatches:[],
            doneMatches:[],
        }
    },
    async fetch() {
        await this.$services.matches.match().then((res)=>{
            res.data.forEach(element => {
                if(element.status==="In Process"){
                    if(element.game==="csgo"){
                        this.liveMatches.push(element)
                    }
                }else if(element.status==="In Queue"){
                    if(element.game==="csgo"){
                        this.fuatureMatches.push(element)
                    }
                }else if(element.status==="done"){
                    if(element.game==="csgo"){
                        this.doneMatches.push(element)
                    }
                }
            })
        }).catch((err) =>{
            console.log(err)
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
.fuature-matches,.live-matches {
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
}
.done-matches {
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
.live-matches,.done-matches, .fuature-matches {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>