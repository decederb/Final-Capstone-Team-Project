<template>
  <div class="Itineraries">

     <h1> View a sample itinerary route: </h1>

     <button @click="viewAList">View a list</button>
        <div>{{$store.state.itineraries}} </div>

         code below for getting itinerary list from schema 
         <tr class="itinerary" v-for="itinerary in $store.state.itineraries"
        v-bind:key="itinerary.itineraryId"> 
        <h1> Name: {{ itinerary.name }} </h1> 
        <p>  Itinerary ID: {{ itinerary.itineraryId }}    </p>
        <p>long: {{itinerary.longitude}} lat: {{itinerary.latitude}} </p>
        <p> Date: {{date}} </p>  
        
         </tr> 

      

  </div>
</template>

<script>
import itinerariesService from '../services/ItinerariesService.js'
export default {
  name: "itineraries-list",
  components: {

  },
  data() {
    return {
      allItineraries: []
    }
  },

  methods: {
    findAllItineraries() {
        itinerariesService.getAll().then((response) => {
          this.allItineraries = response.data;
        })
    },
    computed:{
      filtereditineraries(){
        
      }
    }

  }

}
</script>

<style>

</style>