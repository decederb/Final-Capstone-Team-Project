<template>
  <div>
      <my-header></my-header>
      
     <div id="head"> <h1>Here is your itinerary!</h1>
     </div>         
      <itinerary-landmarks-list />
      <myfooter></myfooter>
  </div>
</template>

<script>
import ItineraryLandmarksList from '../components/ItineraryLandmarksList.vue';
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue'


export default {
    components: {
        ItineraryLandmarksList,
        'my-header':Header,
        'myfooter':Footer
        
    },

};
</script>

<style>
#head{
    font-family: "Playfair Display";
    color: #EBA92A;
    margin-left: 10px;
}

</style>