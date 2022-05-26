<template>
  <div>
    <h2>Route to landmarks</h2>
    <div>
      <table>
        <tr>
          <th>Start Location</th>
          <th><GmapAutocomplete @place_changed="originPoint" /></th>
          <th style="width: 50%;"><button class="btn" @click="addMarker(0)"></button></th>
        </tr>
        <tr>
          <th>End Location</th>
          <th><GmapAutocomplete @place_changed="setPlace" /></th>
          <th style="width: 50%;"><button class="btn" @click="addMarker(1)">Add</button></th>
        </tr>
      </table>
    </div>
    <br />
    <GmapMap :zoom="12" :center="center" style="width: 100%; height: 400px">
      <DirectionsRenderer
        travelMode="DRIVING"
        :origin="startLocation"
        :destination="endLocation"
        :waypoints="waypoint"
        :optimizeWaypoints="true"
      />
    </GmapMap>
  </div>
</template>
<script>
import DirectionsRenderer from "@/services/DirectionsRenderer";


export default {
  components: {
    DirectionsRenderer
  },
  props: ['Landmarks', 'Itineraries'], 
  data() {
    return {
      center: {lat: 40.4406, lng: -79.9959},
      currentPlace: null,
      markers: [],
      places: [],
      startLocation: null,
      endLocation: null,
      waypoints: [],
      originPlace: null,
      destinationPlaces: []
    };
  },
  created(){
    this.Landmarks.forEach(landmark => {
      const obj = {
        lat: landmark.latitude,
        lng: landmark.longitude
      };
      this.waypoints.push({location: obj, stopover: true});
      
    });

    const startLocal = {
      lat: this.Itineraries.startingLatitude,
      lng: this.Itineraries.startingLongitude
    };
    this.startLocation = startLocal;

    const endLocal = {
      lat: this.Itineraries.startingLatitude,
      lng: this.Itineraries.startingLongitude
    };
    this.endLocation = endLocal;
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    homePoint(originPoint){
      this.originPlace = originPoint;
    },
    addMarker() {
      const userName = document.getElementById("user").value;
      if (this.currentPlace || this.destinationPlaces.length){
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      const userItinerary = {
        name: userName,
        ItineraryLandmarksList: marker,
      };
      this.markers.push({position: marker});
      this.path.push({ lat: marker.lat, lng: marker.lng});
      this.destinationPlaces.push({userItinerary});
      this.center = marker;
      this.currentPlace = null;
      this.endLocation = marker;
      this.waypoints.push({
          location: { lat: marker.lat, lng: marker.lng },
          stopover: true,
        });
      }
    },
    // addService(){

    //   const newDirections = {
        
    //         origin: LatLng | String | google.maps.Place,
    //         destination: LatLng | String | google.maps.Place,
    //         travelMode: TravelMode,
    //         transitOptions: TransitOptions,
    //         drivingOptions: DrivingOptions,
    //         unitSystem: UnitSystem,
    //         waypoints[]: DirectionsWaypoint,
    //         optimizeWaypoints: Boolean,
    //         provideRouteAlternatives: Boolean,
    //         avoidFerries: Boolean,
    //         avoidHighways: Boolean,
    //         avoidTolls: Boolean,
    //         region: String
    //       };

    //          DirectionsService
    //         .route(newDirections);
    // }
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.pac-target-input {
  padding: 10px;
  width: 100%;
}
.btn {
  margin-left: 20px;
  padding: 10px 20px;
  background-color: #ff5a5f;
}
</style>