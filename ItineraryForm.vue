<template>
  <form v-on:submit.prevent="submitForm" class="itineraryForm" >
    <div class="status-message error" v-show="errorMsg !== ''">{{errorMsg}}</div>
    
    <div class="form-group">
      <label for="name">Itinerary Name:</label>
      <input id="name" type="text" class="form-control"  v-model="itinerary.name" autocomplete="off" />
    </div>
 
    <div class="form-group">
      <label for="itineraryID">itinerary ID:</label>
      <input id="itineraryID" type="text" class="form-control"  v-model="itinerary.itineraryID" autocomplete="off" />
    </div>

    <div class="form-group">
      <label for="date">date:</label>
      <textarea id="date" class="form-control" v-model="itinerary.date"></textarea>
    </div>

    <button class="btn btn-submit">Submit</button>
    <button class="btn btn-cancel" v-on:click.prevent="cancelForm" type="cancel">Cancel</button>
  </form>
</template>

<script>

import itinerariesService from '../services/ItinerariesService';

export default {
  name: "itinerary-form",
  props: {
    itineraryID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      itinerary: {
        itineraryID: "",
        name: "",
        userId: "",
        startingLongitude: "",
        startingLatitude: "",
        date: ""
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
        itinerariesService
          .addItinerary(newItinerary)
          .then(response => {
            if (response.status === 201) {
              // this.$store.commit('SET_ALL_ITINERARIES', ?this.itineraryID)
              alert("Itinerary added");
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
        itinerariesService
          .updateItinerary(newItinerary)
          .then(response => {
            if (response.status === 200) {
              this.$store.commit('UPDATE_ITINERARY_STATUS', this.itineraryID);
              alert("Itinerary updated");
              this.$router.push(`/itineraries`);
            }
          })
          .catch(error => {
            this.handleErrorResponse(error, "updating");
          });
      }
    },
    cancelForm() {
      this.$router.push(`/itineraries`);
    },
    handleErrorResponse(error, verb) {
      if (error.response) {
        this.errorMsg =
          "Error " + verb + " itinerary. Response received was '" +
          error.response.statusText +
          "'.";
      } else if (error.request) {
        this.errorMsg =
          "Error " + verb + " itinerary. Server could not be reached.";
      } else {
        this.errorMsg =
          "Error " + verb + " itinerary. Request could not be created.";
      }
    }
  },
  created() {
    if (this.itineraryID != 0) {
      itinerariesService
        .getItinerary(this.itineraryID)
        .then(response => {
          this.itinerary = response.data;
          
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            alert(
              "The Itinerary is not available. It may have been deleted or you have entered an invalid itinerary ID."
            );
            this.$router.push("/itineraries");
          }
        });
    } else {
      this.isLoading = false;
    }
  }
};
</script>


<style>
.itineraryForm {
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
  color: #1b7ddf;
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
.btn-submit {
  color: #fff;
  background-color: #159703;
  border-color: #040407;
}
.btn-cancel {
  color: #fff;
  background-color: #f5071e;
  border-color: #b10113;
}
.status-message {
  display: block;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
}
.status-message.success {
  background-color: #90ee90;
}
.status-message.error {
  background-color: #f8f2d4;
}
</style>