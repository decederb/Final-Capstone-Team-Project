!<template>
  <div>
    <div v-for="landmark in landmarks" v-bind:key="landmark.landmarkId">
      <h3>{{ landmark.landmarkName }}</h3>
    </div>
    <div>
      <map-quest-route :Locations="locations" />
    </div>
  </div>
</template>

<script>
import landmarkService from "../services/LandmarkService";
import MapQuestRoute from "./MapQuestRoute.vue";

export default {
  components: {
    MapQuestRoute,
  },

  data() {
    return {
      landmarks: [],
      locations: [],
    };
  },

  created() {
    landmarkService.getLandmarksInItinerary().then((response) => {
      this.landmarks = response.data;
      this.landmarks.forEach((landmark) => {
        const obj = {
          lng: landmark.longitude,
          lat: landmark.latitude,
        };
        this.locations.push({ latLng: obj });
      });
    });
  },
};
</script>

<style>
h3{
  margin-left: 10px;
  color: rgb(9, 114, 201);
}
</style>