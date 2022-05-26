<template>
  <div>
      <my-header></my-header>
      <label for="search-filter">Choose venue types: </label>
      <select name="venue-types"  v-model="filter">
          <option value="1">Entertainment</option>
          <option value = "2">Restaurants</option>
          <option value = "3">Breweries</option>
          <option value = "4">Bars</option>
          <option value = "5">Shopping</option>
          <option value = "6">Parks</option>
          <option value = "7">Historical Landmarks</option>
          <option value = "8">Museums</option>
      </select>
      <div 
      class="landmark"
      v-for="landmark in filterLandmarks"
      v-bind:key="landmark.landmarkId">
     <router-link  v-bind:to="{name: 'landmark' , params: {id: landmark.landmarkId}}"> <h3>{{landmark.landmarkName}}</h3> </router-link>
      </div> 
      <myfooter></myfooter> 
  </div>
</template>

<script>
import landmarkService from '../services/LandmarkService';
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue'

export default {
    components:{
        'my-header':Header,
        'myfooter' :Footer,
    },

    data(){
        return {
            landmarks: [],
            filter: ''
        };
    },

    created(){
        landmarkService.getLandmarks().then(response => {
            this.landmarks = response.data;
        });
    },

    computed: {
        filterLandmarks(){
            if (this.filter == ''){
                return this.landmarks
            }
           return this.landmarks.filter((landmark) => {
                if(landmark.venueTypeId == this.filter){
                    return landmark;
                }
            });
        }
    }

};
</script>

<style>

</style>