<template>
  <div id="itineraries" class="itineraries">
    <my-header></my-header>

    <article>
    <h1>Itineraries Menu:</h1>
    
      
        <p class="description"></p>
        <div class="well-display">
      
          
          <create-itineraries />
            <view-my-itinerary />
          <edit-itinerary />   
        
        </div>
    </article>
      
  </div>
</template>

<script>

import ViewMyItinerary from '../components/ViewMyItinerary.vue'; 
import CreateItineraries from "../components/CreateItineraries.vue";
import EditItinerary from "../components/EditItineraries.vue";
import Header from "@/components/Header.vue";
 
export default {
  name: "itineraries",

  components: { 
    'my-header':Header,
    
    CreateItineraries,
    EditItinerary,
    ViewMyItinerary,
  }
};
</script>

<style>
  .itineraries {
    display: flex;
    flex-direction: column;
  }
  .well-display {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .well-display div {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .well-display h1 {
    padding: 20px;
  }
  .container-fluid{
    background-color: #153438;
  }
  .btn {
    background-color: #EBA92A;
    border: none;
    font-size: 10px;
    font-family: "Cascadia Code";
    margin-left: 1px;
    margin-top: 5px;
    margin-right: 5px;
    padding: 3px;
    border-radius: 3px;
  }
  article {
    background-color: #1C3948;
  }

  
</style>