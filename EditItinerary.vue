<template>
  <div>
    <header>
      <h1>Edit your Itinerary</h1>
      <edit-form v-bind:itineraryID="parseInt($route.params.itineraryID)" />
    </header> 
  </div>
</template>

<script>

import EditForm from '../components/Edit/EditForm.vue';
export default {
  components: { EditForm },

};
</script>

<style>

</style>