<template>
  <div >
    <h1> {{itinerary.name}} </h1> 
    <p> {{itinerary.itineraryID}} </p>
    <router-link tag="button" :to="{ name: 'EditItinerary', params: {itineraryID: $route.params.itineraryID} }"
    class="btn editItinerary" >Edit Itinerary</router-link>
    <button class="btn deleteItinerary" v-on:click="deleteItinerary">Delete Itinerary</button>
    <div class="status-message error" v-show="errorMsg !== ''"> {{errorMsg}} </div> 

  </div>
</template>

<script>
import ItinerariesService from "../services.ItinerariesService";
export default {
    name: "itinerary-detail",
    components: {

    },
    data(){
        return{
        errorMsg: "",
    };
    },
    methods: {
    retrieveItinerary() {
        ItinerariesService
        .getItinerary(this.$route.params.itineraryID)
        .then(response => {
          this.$store.commit("SET_CURRENT_ITINERARY", response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            alert(
              "Itinerary not available. This itinerary may have been deleted or you have entered an invalid itinerary ID."
            );
            this.$router.push("/itineraries");
          }
        });
    },
    deleteItinerary() {
      if (confirm("Are you sure you want to delete this itinerary? This action cannot be undone.")) {
        ItinerariesService
        .deleteItinerary(this.itineraryID)
        .then(response => {
            if (response.status === 200) {
              alert("Itinerary deleted");
              this.$router.push(`/itineraries`);
            }
          })
          .catch(error => {
            if (error.response) {
              this.errorMsg =
                "Error deleting itinerary. Response received was '" +
                error.response.statusText +
                "'.";
            } else if (error.request) {
              this.errorMsg =
                "whoops! Error deleting itinerary. Server could not be reached.";
            } else {
              this.errorMsg =
                "ooops...Error deleting itinerary. Request could not be created.";
            }
          });
      }
    },
  },
  created() {
    this.retrieveItinerary();
  },
  computed: {
    itinerary() {
      return this.$store.state.itinerary;
    }
  }
};
</script>

<style>
.btn.editCard {
  color: rgb(255, 255, 255);
  background-color: #47c2e0;
  border-color: #181208;
  margin-bottom: 10px;
}
.btn.deleteCard {
  color: rgb(51, 51, 9);
  background-color: #ef031a;
  border-color: #ef031a;
  margin-bottom: 10px;
}
</style>

