import axios from "axios";


axios.defaults.headers.baseURL = "http://localhost:9000"

export default {
    
    getLandmarks(){
        return axios.get('/landmarks');
    },

    getLandmark(landmarkId){
        return axios.get(`/landmarks/${landmarkId}/details`);
    },

    getLandmarksByType(venueType){
        return axios.get(`/landmarks/${venueType}`);
    },

    createItinerary(itinerary){
        return axios.post('/itinerary', itinerary);
    },

    addLandmarkToItinerary(landmarkId){
        return axios.post(`/landmarks/${landmarkId}`);
    },

    getLandmarksInItinerary(){
        return axios.get('/itinerary/landmarks');
    },
    
};