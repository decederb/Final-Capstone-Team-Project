import axios from "axios";


export default {
    

    getAll() {
        return axios.get('/itineraries');
    },

    addItinerary(itinerary) {
        return axios.post('/itinerary', itinerary)
    },

    updateItinerary(itinerary) {
        return axios.put(`/itinerary/${itinerary.itineraryID}`, itinerary);
    },

    getItinerary(itineraryID) {
        return axios.get(`/itinerary/${itineraryID}`)
    },

    deleteItinerary() {
        
        return axios.delete(`/itinerary`)
    }

    
}