<template>
    <v-app>

<!------------------------------------ CONTETNT-------------------------->  
        <div class="content">

        <!------------------- game-rules ------------------------->
          <v-card class="game-rules">
            <v-card-title class="text-center justify-center py-6">
                <h2>
                    قوانین بازی
                </h2>
            </v-card-title>
                <v-list-item ten-line>
                    <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-6">
                        قوانین کلی
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        
                    <p>در این بازی تیم ها حداقل از 4 نفر و حداکثر از 7 نفر میتوانند تشکیل شده باشند.</p>
                    <p>این بازی به صورت لیگ برگذار شده و بازی ها رفت 
                        و برگشت دارند و بعد از اتمام بازی ها قهرمان تورنومت مشخص میشود.</p>
                    <p>کسب امتیاز در این بازی به صورت زیر است:</p>
                    <p>برد: 5 امتیاز</p>
                    <p>مساوی: 1 امتیاز</p>
                    <p>باخت: بدون امتیاز</p>
                    <p>* درصورت برابر بودن امتیاز ها، تیمی که تعداد راند های بیشتری را برده است بالاتر
                         قرار میگیرد و اگر در این مولفه نیز برابر بودند نتایج بازی مستقیم دو تیم منظور میشود.</p>
                    </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
          </v-card>

        <!------------------- score-table ------------------------->
            <v-card class="score-table">
                <v-card-title class="text-center justify-center py-6">
                    <h2>
                        جدول امتیازات
                    </h2>
                </v-card-title>
                   
                <score-table
                    :items="scoreTableItems"
                    :game='1'
                >
                </score-table>

            </v-card>

        <!------------------- tournaments ------------------------->
            <v-card class="tournaments">
                <v-card-title class="text-center justify-center py-6">
                    <h2>
                        تورنومت ها
                    </h2>
                </v-card-title>
                   
                <dynamic-table
                    :headers="headers"
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
            scoreTableItems:[],
            headers: [
                {
                    text: 'نام تورنومت',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'تعداد تیم', value: 'teamNumber' },
                { text: 'وضعیت', value: 'status',sortable: false },
                { text: 'قهرمان', value: 'champion', sortable: false },
            ],
            tournaments:[
                {
                    name:"402تورنومت بهار",
                    teamNumber:28,
                    champion:"",
                    status:"درحال برگذاری",
                },
                {
                    name:"تورنومت زمستان401",
                    teamNumber:24,
                    champion:"esb2",
                    status:"پایان یافته",
                },
                {
                    name:"تورنومت پاییز401",
                    teamNumber:16,
                    champion:"esb2",
                    status:"پایان یافته",
                },
                {
                    name:"تورنومت تابستان401",
                    teamNumber:20,
                    champion:"esb2",
                    status:"پایان یافته",
                },
            ],
        }
    },
    async fetch() {
        await this.$services.scoreTable.csgo().then((res) => {
            res.data.forEach(item => {
                this.scoreTableItems.push(item)
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-areas:'game-rules game-rules game-rules game-rules'
    'score-table score-table  tournaments tournaments';
    gap: 10px;
}
.game-rules {
    display: block;
    margin: 50px 20px 0 20px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
}
.score-table,.tournaments {
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
p{
    font-size: 17px;
}
@media(max-width: 1024px) {
.content {
    display: block;
    &:last-child{
        margin-bottom: 20px;
    }
}
.game-rules,.score-table, .tournaments  {
    display: block;
    width: 90vw;
    margin: 50px auto 0 auto;
}

}
</style>