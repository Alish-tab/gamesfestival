<template>
   <div>
     <apexchart width="100%" type="area" :options="chartOptions" :series="series"></apexchart>
   </div>
</template>

<script>
import apexchart from 'vue-apexcharts'
export default {
    components:{apexchart},
    props:{
      date:{
        type:Array,
        required:true,
      },
      views:{
        type:Array,
        required:true,
      },
    },
    data: function() {
      return {
        chartOptions: {
          xaxis: {
            categories: this.date,
          }
        },
        series: [{
          name: 'بازدید ها',
          data: this.views,
        }]
      }
    },
};
</script>