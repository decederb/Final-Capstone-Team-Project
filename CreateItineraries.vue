<template>
 <div id>
  <h1 class="addItinerary"> Create an itinerary</h1>
        <router-link
        tag="button"
        class="btn addNewItinerary"
        :to="{ name: 'AddItinerary', params: {itineraryId: this.itineraryId} }"
        
      >Add New Itinerary</router-link>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>