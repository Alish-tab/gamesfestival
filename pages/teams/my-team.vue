<template>
    <v-app>

<!------------------------------------ CONTETNT-------------------------->  
        <div class="content">



        <!------------------- team info ------------------------->
            <v-card class="team-info">
                <v-card-title class="text-center justify-center py-6">
                    <h2>
                        مشخصات تیم
                    </h2>
                </v-card-title>
                   
                <dynamic-table
                    :headers="teamHeaders"
                    :items="teamInfo"
                    :items-per-page="10"
                >
                </dynamic-table>

            </v-card>


        <!------------------- tournaments ------------------------->
            <v-card class="tournaments">
                <v-card-title class="text-center justify-center py-6">
                    <h2>
                        تورنومت ها
                    </h2>
                </v-card-title>
                   
                <dynamic-table
                    :headers="tournamentsHeaders"
                    :items="tournaments"
                    :items-per-page="10"
                >
                </dynamic-table>

            </v-card>
        </div>
    </v-app>
</template>

<script>
import DynamicTable from '@/components/DynamicTable'
import ScoreTable from '@/components/ScoreTable'
export default {
    name:"MatchesPage",
    components:{ScoreTable,DynamicTable},

    data() {
        return{
            teamHeaders: [
                {
                    text: 'نام عضو',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'نقش در تیم', value: 'role', sortable: false },
                { text: 'شماره پیراهن', value: 'number' },
                { text: 'بهترین بازیکن بازی (MVP)', value: 'mvp' },
            ],
            teamInfo:[
                {
                    name:"علی شریف تبار",
                    role:"کاپیتان",
                    number:8,
                    mvp:2,
                },
                {
                   name:"علی شریف تبار",
                    role:"جانشین کاپیتان",
                    number:5,
                    mvp:4,
                },
                {
                    name:"علی شریف تبار",
                    role:"عضو عادی",
                    number:8,
                    mvp:2,
                },
                {
                    name:"علی شریف تبار",
                    role:"عضو عادی",
                    number:8,
                    mvp:2,
                },
                {
                    name:"علی شریف تبار",
                    role:"عضو عادی",
                    number:8,
                    mvp:2,
                },
                {
                    name:"علی شریف تبار",
                    role:"عضو عادی",
                    number:8,
                    mvp:2,
                },
                {
                    name:"علی شریف تبار",
                    role:"عضو عادی",
                    number:8,
                    mvp:2,
                },
            ],
            tournamentsHeaders: [
                {
                    text: 'نام تورنومت',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'تعداد تیم', value: 'teamNumber' },
                { text: 'وضعیت', value: 'status',sortable: false },
                { text: 'جایگاه تیم', value: 'rank' },
            ],
            tournaments:[
                {
                    name:"402تورنومت بهار",
                    teamNumber:28,
                    rank:2,
                    status:"درحال برگذاری",
                },
                {
                    name:"تورنومت زمستان401",
                    teamNumber:24,
                    rank:5,
                    status:"پایان یافته",
                },
                {
                    name:"تورنومت پاییز401",
                    teamNumber:16,
                    rank:1,
                    status:"پایان یافته",
                },
                {
                    name:"تورنومت تابستان401",
                    teamNumber:20,
                    rank:3,
                    status:"پایان یافته",
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-areas:'game-rules game-rules game-rules game-rules'
    'score-table score-table  tournaments tournaments';
    gap: 10px;
}
.team-info,.tournaments {
    display: inline-block;
    margin: 50px 20px 0 20px;
    width: 587px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
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
.team-info,.tournaments {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>