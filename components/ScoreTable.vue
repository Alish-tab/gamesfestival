<template>

        <dynamic-table
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :sort-by="'point'"
    >
    </dynamic-table>

</template>

<script>
import DynamicTable from '@/components/DynamicTable'

export default {
    name:"ScoreTable",
    components:{DynamicTable},
    props:{
        game:{
            type:Number,
            required:true,
            default:null,
        },
        items:{
            type:Array,
            required:false
        }
    },
    data() {
        return {
            headers:[],
            itemsPerPage:10,
                    
        }
    },
    async fetch() {
        if(this.game===0){
                    this.headers.push(
                        {
                            text: 'نام تیم',
                            align: 'start',
                            sortable: false,
                            value: 'team.name',
                        },
                        { text: 'بازی', value: 'total_game' },
                        { text: 'امتیاز', value: 'point' },
                        { text: 'برد', value: 'wins' },
                        { text: 'مساوی', value: 'equals' },
                        { text: 'باخت', value: 'lose' },
                        { text: 'گل زده', value: 'goals' },
                        { text: 'گل خورده', value: 'recgoals' },
                    )

                    
                    
                }else if(this.game===1){
                    this.headers.push(
                         {
                            text: 'نام تیم',
                            align: 'start',
                            sortable: false,
                            value: 'team.name',
                        },
                        { text: 'بازی', value: 'total_game' },
                        { text: 'امتیاز', value: 'point' },
                        { text: 'برد', value: 'win' },
                        { text: 'مساوی', value: 'equal' },
                        { text: 'باخت', value: 'lose' },
                    )


                }else if(this.game===2){
                    this.headers.push(
                        {
                            text: 'نام تیم',
                            align: 'start',
                            sortable: false,
                            value: 'team.name',
                        },
                        { text: 'بازی', value: 'total_game' },
                        { text: 'امتیاز', value: 'point' },
                        { text: 'برد', value: 'win' },
                        { text: 'باخت', value: 'lose' },
                    )

                    

                }
                    
        
    },

}
</script>
