<template>
    <v-app>

    <!------------------------------------ CONTETNT-------------------------->  
        <div class="content">
        <!------------------- all-teams ------------------------->
          <v-card class="all-teams">
            <v-card-title class="text-center justify-center py-6">
                <h2>
                    تیم ها
                </h2>
            </v-card-title>
                
            <dynamic-table
                :headers="teamsHeaders"
                :items="teams"
                :items-per-page="10"
            >
            </dynamic-table>
          </v-card>

        <!------------------- best-teams ------------------------->
          <v-card class="best-teams">
            <v-card-title class="text-center justify-center py-6">
                <h2>
                    بهترین تیم ها
                </h2>
            </v-card-title>
                
            <dynamic-table
                :headers="teamsHeaders"
                :items="teams"
                sortBy="point"
                :items-per-page="10"
            >
            </dynamic-table>
          </v-card>

        <!------------------- new-teams ------------------------->
          <v-card class="new-teams">
            <v-card-title class="text-center justify-center py-6">
                <h2>
                    جدیدترین تیم ها
                </h2>
            </v-card-title>
                
            <dynamic-table
                :headers="teamsHeaders"
                :items="teams"
                sortBy="team.creatred_at"
                :items-per-page="10"
            >
            </dynamic-table>
          </v-card>
        </div>

    </v-app>
</template>

<script>
import DynamicTable from '@/components/DynamicTable'
import { splitTime } from '~/helpers/core'
export default {
    name:"FifaTeams",
    components:{DynamicTable},

    data() {
        return{
            teamsHeaders: [
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
            teams:[]
        }
    },
    async fetch() {
        await this.$services.scoreTable.fifa().then((res) => {
        this.teams=[]
        res.data.forEach(item => {
            item.team.creatred_at=splitTime(item.team.creatred_at,"time")
            this.teams.push(item)
        })

    })
    }
}
</script>


<style lang="scss" scoped>
.content {
    display: grid;
    gap: 10px;
}
.all-teams,.best-teams {
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
}
.new-teams {
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
.all-teams, .best-teams, .new-teams  {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>