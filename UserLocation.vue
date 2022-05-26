<template>
  <div>
    <section class="ui two column centered grid" style="position:relative;z-index:1;">
        <div class="column">
            <form class="ui segment large form">
                <div class="ui message red" v-show="error">{{ error }}</div>
                <div class="ui segment">
                    <div class="field">
                        <div class="ui right icon input large" :class="{ loading:spinner }">
                            <input
                                type="text"
                                placeholder="Enter your location"
                                v-model="address"
                                id="autocomplete"
                                />
                            <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                        </div>
                    </div>
                    <button class="ui button">Go!</button>
                </div>
            </form>
        </div>
    </section>

    <section id="map">

    </section>
  </div>
</template>

<script>

import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {

    data(){
        return {
            address: "",
            error: "",
            spinner: false
        }
    },


    methods: {
        locatorButtonPressed(){

            this.spinner = true;

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.getAddressFrom(
                            position.coords.latitude, 
                            position.coords.longitude
                        );
                        
                        this.showUserLocationOnTheMap(
                            position.coords.latitude, 
                            position.coords.longitude
                        );

                    },
                    error => {
                        this.error = error.error_message;
                        this.spinner = false;
                        //console.log(error.message);
                    }
                );
            } else {
                this.spinner = false;
                console.log("Your browser does not support geolocation");
            }
        },
        getAddressFrom(lat, long){
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + 
            "," 
            + long 
            + "&key=AIzaSyAf0lca5QyoVKl9ZjVY46xTYoZh0e6pjY0").then(response => {
                if(response.data.error_message) {
                    this.error = response.data.error_message;
                    console.log(response.data.error.message);
                } else {
                    this.address = response.data.results[0].formatted_address;
                    //console.log(response.data.results[0].formatted_address);
                }
                this.spinner = false;
            })
            .catch(error => {
                this.spinner = false;
                this.error = error.message;
                console.log(error.message);
            });
        },
        showUserLocationOnTheMap(latitude, longitude){
            // Create a map object
            let map = new VueGoogleMaps.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: new VueGoogleMaps.maps.LatLng(latitude, longitude),
                mapTypeId: VueGoogleMaps.maps.mapTypeId.ROADMAP
            });
            // Add Marker
            new VueGoogleMaps.maps.Marker({
                position: new VueGoogleMaps.maps.LatLng(latitude, longitude),
                map: map
            })

        }
    }
}
</script>



<style>
.ui.button {
    background-color: #ff5a5f;
    color: white;
}

.dot.circle.link.icon {
     background-color: #ff5a5f;
    color: white;
}

.pac-icon {
    display: none;
}

.pac-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

.pac-item:hover {
    background-color: #ececec;
}

.pac-item-query {
    font-size: 16px;
}

#map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

}
</style>