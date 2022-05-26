!<template>
  <div class="land">
    <div id="details">
    <h3>{{ landmark.name }}</h3>
    <p>{{ landmark.description }}</p>
    <h4>{{ landmark.hoursOfOperation }}</h4>
    <button v-on:click.prevent="addLandmarkToItinerary">
      Add To Itinerary
    </button>
    </div>
     <img :src="landmark.images">
  </div>
</template>

<script>
import landmarkService from "../services/LandmarkService";
export default {
  name: "landmark-details",
  data() {
    return {
      landmark: {
        landmarkId: 0,
        name: "",
        description: "",
        hoursOfOperation: "",
        typeId: 0,
        familyFriendly: "",
        images:"",
      },
    };
  },

  created() {
    landmarkService.getLandmark(this.$route.params.id).then((response) => {
      this.landmark.name = response.data.landmarkName;
      this.landmark.description = response.data.description;
      this.landmark.hoursOfOperation = response.data.hoursOfOperation;
      this.landmark.typeId = response.data.venueTypeId;
      this.landmark.familyFriendly = response.data.familyFriendly;
      this.landmark.images=response.data.images;
    });
  },

  methods: {
    addLandmarkToItinerary() {
      landmarkService
        .addLandmarkToItinerary(this.$route.params.id)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push("/landmarks");
          }
        });
    },
  },
};
</script>

<style scoped>
.land{
  display: grid;
  grid-template-row: 40% 10%;
}
#details{
  display: grid;
}
/* #pic{
  display: grid;
 image-resolution: 200dpi;
} */
img{
 display:flex;
 width: 50%;
 height: 500px;
 align-items: center;
}

</style>