<template>
  <div class="home">
     <my-header></my-header>
     <div id="main"> 
    <div id="wrap1">
             <h1>Guidr in Pittsburgh</h1>
    <p>Welcome to Guidr, your city tour guide to Pittsburgh!  The city of Pittsburgh has around 302,000 residents with well over a million in the surrounding metropolitan areas.  There are over ninety different neighborhoods, three professional sports teams, and countless bars and restaurants. It is the birth place of The Big Mac, Heinz ketchup, and Andy Warhol.  We hope you enjoy this city as much as we do and look forward to your travel adventures and stories.
</p>
    </div>
    <div id="wrap2">
      <div id="bus">
        <a href="/itineraries">
        <p> "Pittsburgh has a wide variety of public transit options." </p></a>
      </div>
    </div>
    <div id="wrap3">
        
        <div id="slide">
          <slidebar></slidebar>
        </div>
    </div>
    <div id="wrap4">
        <div id="map"> <gmap-map
        :zoom="14"    
        :center="center"
        style="width:100%;  height: 380px; radius: 20px"></gmap-map></div>
    </div>
     </div> 
  <div><myfooter></myfooter></div>
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue'
import Slidebar from '../components/Slidebar.vue'
// import GoogleMap from '../components/GoogleMap.vue'
export default {
  name: "home",
  components: {
    'my-header':Header,
    'myfooter':Footer,
    'slidebar':Slidebar  
  },
   data() {
    return {
      center: { 
        lat: 40.4406,
        lng:  -79.9959
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null
    };
  },
 
  mounted() {
    this.locateGeoLocation();
  },
 
  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    }
  }
};


</script>


<style scoped>
  /* .home{
    background-color: #153438;
  } */
 #main{
  background-color: #1C3948;
  height: 70vh;
  padding: 10px;
  display: flex;
}
#wrap1{
  background-color:#EBA92A;;
  height: 380px;
  width: 300px;
  margin-top: 19px;
  margin-left: 15px;
  border-radius: 10px;
  position:relative;
}
#wrap1 h1{
  color:#1C3948
}

#wrap1 p {
        display: flex;
        width: 90%;
        height: 100px;
        margin: auto;
        text-anchor: bottom;
        padding-top: 30px;
        padding-left: 10px;
        font-family: "Helvetica";
        color: #4684a3;
}
#wrap2{
  /* background-color:hsl(0, 0%, 97%); */
  height: 380px;
  width: 300px;
  margin-top: 19px;
  margin-left: 10px;
  border-radius: 10px;
  position:relative;
  background-image: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('../assets/bus.jpg');
  background-position: center;

} 
#wrap2 bus{
  background-image: linear-gradient(rgba(0,0,0,0.70),rgba(0,0,0,0.60)), url('../assets/bus.jpg');
}
#wrap3{
  background-color: hsl(0, 0%, 97%);;
  height: 380px;
  width: 300px;
  margin-top: 19px;
  margin-left: 10px;
  border-radius: 10px;
  position:relative;
  
}
#wrap4{
  background-color: hsl(0, 0%, 97%);;
  height: 380px;
  width: 300px;
  margin-top: 19px;
  margin-left: 10px;
  border-radius: 10px;
  position:relative;
}
#main p{
  position:absolute;
}

</style>