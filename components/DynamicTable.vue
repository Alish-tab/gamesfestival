<template>
    <v-app id="inspire" ltr>
        <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :sort-by="sortBy"
        :sort-desc="true"
        >
            <template v-slot:[`item.status`]="{ item }" v-if="tableMode==='admin'">
                <v-chip
                :color="getColor(item.status)"
                dark
                >
                {{ item.status }}
                </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }" v-if="tableMode==='admin'">
                <v-icon
                    v-if="item.status==='غیر فعال'"
                    class="mr-2"
                    @click="editStatus(item)"
                >
                    mdi-check
                </v-icon>
                <v-icon
                    v-else-if="item.status==='فعال'"
                    class="mr-2"
                    @click="editStatus(item)"
                >
                    mdi-airplane
                    
                </v-icon>
                <v-icon
                    v-else-if="item.status==='تعلیق'"
                    class="mr-2"
                    @click="editStatus(item)"
                >
                    mdi-close
                </v-icon>
                <v-icon
                    @click="downloadFile(item)"
                >
                    mdi-file-document
                </v-icon>
            </template>
            
        </v-data-table>
        
    </v-app>
</template>

<script>
export default {
    name:"DynamicTable",
    props:{
        headers:{
            type:Array,
            required:true,
        },
        items:{
            type:Array,
        },
        itemsPerPage:{
            type:Number,
            required:true,
        },
        sortBy:{
            type:String,
        },
        tableMode:{
            type:String
        }

    },
    watch:{
        items:{
            handler: function(val){
                this.items=val
            }
        }
    },
    methods:{
        getColor(status){
            if(status==="فعال") return 'green'
            else if (status==="غیر فعال") return 'red'
            else return 'yellow'
        },
        editStatus(item) {
            if(item.status==="فعال") return item.status='تعلیق'
            else if (item.status==="غیر فعال") item.status='فعال'
            else return item.status='غیر فعال'
        },
        downloadFile(item) {
            console.log(item.actions)
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>