!<template>
  <div class="create-itinerary">
    <form v-on:submit.prevent="createItinerary">
      <label for="itineraryName">Name your Itinerary: </label><br />
      <input type="text" id="itineraryName" name="itineraryName" v-model="itineraryName" /><br />
      <label for="itineraryDate">Start Date: </label><br />
      <input
        type="text"
        id="itineraryDate"
        name="itineraryDate"
        placeholder="DD/MM/YYYY"
        v-model="itineraryDate"
      /><br/>
      <input type="submit" value="Submit"/>
    </form>
    <div>
      <map-quest-route :Itineraries="itinerary"/>
    </div>
  </div>
</template>

<script>
import landmarksService from '../services/LandmarkService'
import MapQuestRoute from './MapQuestRoute.vue';

export default {
  
  components: {
    MapQuestRoute
  },
  
  data() {
    return {
      itineraryName: "",
      itineraryDate: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };
  },
  created(){
      this.$getLocation({})
        .then(coordinates => {
            this.coordinates = coordinates;
        });
  },
  methods: {
      createItinerary(){

          const newItinerary= {
              itineraryName: this.itineraryName,
              startingLongitude: this.coordinates.lng,
              startingLatitude: this.coordinates.lat,
              itineraryDate: this.itineraryDate
          };
          landmarksService
          .createItinerary(newItinerary)
          .then((response) => {
              if(response.status === 201){
                  alert("Itinerary created:");
              }
          });
      }
  }
};
</script>

<style>
</style>