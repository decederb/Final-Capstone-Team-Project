<template>
 <div id>
  <h1 class="viewItinerary"> View my itinerary</h1>
        <router-link
        tag="button"
        class="btn viewItinerary"
        :to="{ name: 'ViewItinerary', params: {itineraryId: this.itineraryId} }"
        
      >View My Itinerary</router-link>
      </div>
</template>

<script>
export default {

}
</script>

<style>