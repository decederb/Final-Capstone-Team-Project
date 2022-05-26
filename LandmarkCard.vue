<template>
  <div>
    <h2>{{ landmarkName }}</h2>
    <p>
      <strong>Address:</strong>
      {{ LandmarkDetails }} |
    </p>
    <textarea v-model="landmarkName" spellcheck="false" />
    <div class="back">
      <router-link :to="{ name: 'Home' }">Return to Landmark List</router-link>
    </div>
  </div>
</template>

<script>
import LandmarkService from '../services/LandmarkService.js';

export default {
  name: 'landmarks',
  data() {
    return {
      landmark: {
        id: null,
        name: '',
        details: '',
        venueType: '',
      }
    };
  },
  created() {
    LandmarkService.get(this.$route.params.id).then((response) => {
      this.landmark = response.data;
    });
  }
};
</script>

<style scoped>
textarea {
  width: 500px;
  height: 500px;
}
.back {
  margin-top: 20px;
}

a:link,
a:visited {
  color: rgb(22, 175, 81);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>