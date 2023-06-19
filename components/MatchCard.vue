<template>
    <v-app>
        <div class="card" v-if="cardMode==='normal'">
            <v-card class="card-item" v-for="(card,index) in cards" :key="index">
                <div class="card-team1">{{card.team_A.name}}</div>
                <div class="text-center">
                    <span class="card-time">{{splitTime(card.time,"time")}}</span>
                    <span class="card-date">{{splitTime(card.time,"date")}}</span>
                    <div class="admin-access" v-if="$store.state.user==='admin'">
                        <v-btn text fab small color="#B5838D" @click="openOverlay(card.id)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn text fab small color="#B5838D" @click="deleteMatch(card.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="card-team2">{{card.team_B.name}}</div>
            </v-card>
            <v-overlay
                :absolute="true"
                :value="overlay"
            >
                <v-text-field
                    v-model="newmatch.team_A.name"
                    label="تیم اول"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-text-field
                    v-model="newmatch.team_A.id"
                    label="id تیم اول"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-text-field
                    v-model="newmatch.team_B.name"
                    label="تیم دوم"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-text-field
                    v-model="newmatch.team_B.id"
                    label="id تیم دوم"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-text-field
                    v-model="date"
                    label="تاریخ برگزاری"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-text-field
                    v-model="time"
                    label="ساعت برگزاری"
                    dense
                    single-line
                    outlined
                    requierd
                ></v-text-field>
                <v-btn
                color="success"
                @click="editMatch(id,newmatch)"
                >
                تایید
                </v-btn>
            </v-overlay>
        </div>
        <div class="card" v-if="cardMode==='done'">
            <v-card class="card-item" v-for="(card,index) in cards" :key="index">
                <div class="card-team1">{{card.team_A.name}}</div>
                <div class="text-center">
                    <span :class="classObject(card,'team1Score')">
                        {{card.score_A}} - 
                    </span>
                    <span :class="classObject(card,'team2Score')">{{card.score_B}}</span>
                </div>
                <div class="card-team2">{{card.team_B.name}}</div>
            </v-card>
        </div>
        <div class="card" v-else-if="cardMode==='live'">
            <v-card class="card-item" v-for="(card,index) in cards" :key="index">
                <div class="card-team1">{{card.team_A.name}}</div>
                <div class="text-center">
                    <span>{{card.score_A}} - </span>
                    <span>{{card.score_B}}</span>
                    <span style="display:block; color: green; margin: 0 auto">live
                        <v-progress-linear
                            indeterminate
                            color="green"
                        ></v-progress-linear>
                    </span>
                </div>
                <div class="card-team2">{{card.team_B.name}}</div>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import { splitTime } from '~/helpers/core'
export default {
    name:"MatchCard",
    props:{
        cards:{
            type:Array,
            required: true
        },
        cardMode:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            overlay:false,
            id:0,
            time:'',
            date:'',
            newmatch:{
                team_A: {
                    id:'',
                    name: "",
                },
                team_B: {
                    id:'',
                    name: "",
                },
                time:`${this.date}T${this.time}Z`
            },
        }
    },

    methods: {
    splitTime,
    classObject (card, score) {
        if (score === 'team1Score' && card.score_A>card.score_B) {
            return 'win'
        } else if(score === 'team1Score' && card.score_A<card.score_B){
            return 'lose'
        }
        else if (score === 'team2Score' && card.score_A<card.score_B) {
            return 'win'
        } else if(score === 'team2Score' && card.score_A>card.score_B){
            return 'lose'
        }
    },
    deleteMatch(id){
        this.$services.matches.deleteMatch(id).then((res) => {
            console.log('deleted')
            location.reload()
        })
    },
    editMatch(id,newmatch){
        this.$services.matches.editMatch(id,newmatch).then((res) => {
            console.log('edit')
            this.overlay=false
            location.reload()
        }).catch(error => {
            this.overlay=false
            console.log(error)
        })
    },
    openOverlay(id) {
        this.overlay=true 
        this.id=id
    }
}
 
}
</script>

<style lang="scss" scoped>
.card {
    width: 90%;
    margin: 20px auto;
    

    .card-item{
        padding: 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }

    .card-team1, .card-team2 {
        width: 90px;
        text-align: center;
    }

    .card-time{
         display: block;
         direction: ltr;
    }
    .card-date{
         text-align: center;
    }
    .admin-access{
        display: block;
    }
    .win{
        color: green;
    }
    .lose{
        color: red;
    }
}
</style>