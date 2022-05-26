import axios from "axios";

axios.defaults.headers.baseUrl = "http://open.mapquestapi.com/geocoding/v1/reverse?key=";
const apiKey = "vNj7LQqlWKQ3rKFZ9xF5zFZfUeQbGFMi";

export default {


    getLatLng(landmark){
        return axios.get(apiKey + "&location=" + landmark.latitude + "," + landmark.longitude + "&includeNearestIntersection=true");
    }

};