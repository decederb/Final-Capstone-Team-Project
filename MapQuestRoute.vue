<template>
  <div>
    <div id="head">
    </div>
      <button v-on:click="makeRoute">Make Route</button>
      <p>{{this.totalDistance}}</p>
        <div id="route" v-for="direction in directions" v-bind:key="direction">
      {{direction}}
  </div>
  </div>
</template>

<script>
import MapQuest from "../services/MapQuest";
//import ReverseGeo from "@/services/ReverseGeo";


export default {
  components: {
    
  },

  props: ["Locations"],

  data() {
    return {
      startLocation: null,
      endLocation: null,
      destinationPlaces: [],
      totalDistance: 0,
      directions: [],
      coordinates: {
        lat: 0,
        lng: 0,
      }
    };
  },

  created(){
      this.$getLocation({})
        .then(coordinates => {
            this.coordinates = coordinates;
        });
  },

  methods: {
    makeRoute() {
        const obj = {
            locations: this.Locations,
        };
      MapQuest.createRoute(obj).then((response =>{
          this.totalDistance = response.route.distance;

          response.route.legs.forEach(leg => {
              leg.maneuvers.forEach(maneuver =>{
                  this.directions.push(maneuver.narrative);
              });
          });
      })).catch(error =>{
          console.log(error);
      });
    }
  }
};
</script>

<style>
#route{
  color:black;
  font-weight:900;
  margin-left: 10px;
  text-align: center;
  font-size: large;
  padding: 3px;
  background-color: darkgrey;
}
button{
  margin-left: 10px;
}
p{
  margin-left: 10px;
}
</style>