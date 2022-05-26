<template>
  <form v-on:submit.prevent="submitForm" class="editForm" > 
    <my-header></my-header>

    <div class="form-group">
    
    <strong name="editForm" 
     >EDIT your itinerary here  ... -OR-... DELETE it below:</strong>

    <itinerary-form /> 

    <itinerary-landmarks-list />

    <strong name="editForm" 
     >DELETE here:</strong>

     <div class="form-group">
      <label for="name">Itinerary Name:</label>
      <input id="name" type="text" class="form-control"  v-model="itinerary.name" autocomplete="off" />
    </div>


    <!-- <div class="form-group">
      <label for="date">date:</label>
      <textarea id="date" class="form-control" v-model="itinerary.date"></textarea>
    </div> -->

    

    <!-- <button class="btn btn-submit">Submit</button> -->
    <button class="btn btn-cancel" v-on:click.prevent="cancelForm" type="cancel">Cancel</button>
    
    <button class="btn deleteItinerary" v-on:click="deleteItinerary">Delete Itinerary</button>
    <div class="status-message error" >  </div> 
    </div>
     

    

    
  </form>
</template>

<script>
import ItineraryLandmarksList from '../ItineraryLandmarksList.vue';
import ItinerariesService from '@/services/ItinerariesService';
import Header from "@/components/Header.vue";
import itineraryForm from '@/components/ItineraryForm.vue';
export default {
    name: "edit-form", 
    props: {
    itineraryID: {
      type: Number,
      default: 0
    }
    },
    components: {
        ItineraryLandmarksList,
        'my-header':Header,
         itineraryForm,
         
          
    },
    data() {
        return {
            itinerary: {
                name: "",
                userId: "",
                longitude: "",
                latitude: "",
                date: ""
            },
            landmarks: [],
            landmark: {
                landmarkId: 0,
                name: "",
                description: "",
                hoursOfOperation: "",
                typeId: 0,
                familyFriendly: "",
            },
            errorMsg: "",
        };
    },

    methods: {

      submitForm() {
      const newItinerary = {
        landmarkId: Number(this.$route.params.landmarkID),
        name: this.itinerary.name,
        userId: this.itinerary.userId,
        startingLongitude: this.itinerary.startingLongitude,
        startingLatitude: this.itinerary.startingLatitude,
        date: this.itinerary.date
      };

      if (this.itineraryID === "") {
        // add
        ItinerariesService
          .addItinerary(newItinerary)
          .then(response => {
            if (response.status === 201) {
              this.$router.push(`/itineraries`);
            }
          })
          .catch(error => {
            this.handleErrorResponse(error, "adding");
          });
      } else {
        // update
        newItinerary.itineraryID = this.itineraryID;
        newItinerary.userId = this.itinerary.userId;
        newItinerary.date = this.itinerary.date;
        ItinerariesService
          .updateItinerary(newItinerary)
          .then(response => {
            if (response.status === 200) {
              this.$router.push(`/itineraries`);
            }
          })
          .catch(error => {
            this.handleErrorResponse(error, "updating");
          });
      }
    },
    
    //   retrievelandmarks() {
    //     ItineraryLandmarksList
    //     .getLandmarks(this.$route.params.landmarkID)
    //     .then(response => {
    //       this.;
    //     })
    //     .catch(error => {
    //       if (error.response && error.response.status === 404) {
    //         alert(
    //           "Landmark not available. This landmark may have been deleted or you have entered an invalid landmark ID."
    //         );
    //         this.$router.push("/itineraries");
    //       }
    //     });
    // },
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
      cancelForm() {
        this.$router.push(`/itineraries`);
      },
      deleteItinerary() {
        if (confirm("Are you sure you want to delete this itinerary? This action cannot be undone.")) {
          ItinerariesService
          .deleteItinerary(this.itineraryID)
          .then(response => {
            if (response.status === 200) {
              this.$store.commit('DELETE_ITINERARY', this.itineraryID);
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
    }
  },
  created() {
    this.retrieveItinerary();
  },
  
  
};
</script>

<style>
.editForm {
  padding: 10px;
  margin-bottom: 10px;
}
.form-group {
  margin-bottom: 10px;
  margin-top: 10px;
}
label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
.form-control {
  display: block;
  width: 80%;
  height: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
textarea.form-control {
  height: 75px;
  font-family: Arial, Helvetica, sans-serif;
}
select.form-control {
  width: 20%;
  display: inline-block;
  margin: 10px 20px 10px 10px;
}
.btn.editCard {
  color: #fff;
  background-color: #508ca8;
  border-color: #508ca8;
  margin-bottom: 10px;
}
.btn.deleteCard {
  color: #fff;
  background-color: #ef031a;
  border-color: #947902;
  margin-bottom: 10px;
}
</style>