import axios from "axios";


//axios.defaults.headers.baseUrl = "http://open.mapquestapi.com/directions/v2/optimizedroute?key=vNj7LQqlWKQ3rKFZ9xF5zFZfUeQbGFMi";
//const apiKey = "vNj7LQqlWKQ3rKFZ9xF5zFZfUeQbGFMi";

const http = axios.create({
    baseURL: "",
});

export default {

    createRouteTwo(locations){
        return http.post("http://open.mapquestapi.com/directions/v2/optimizedroute?key=vNj7LQqlWKQ3rKFZ9xF5zFZfUeQbGFMi",locations);
    },

    createRoute(locations){
        const options = {
            method: 'POST',
            body: JSON.stringify(locations),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        // send POST request
        return fetch("http://open.mapquestapi.com/directions/v2/optimizedroute?key=vNj7LQqlWKQ3rKFZ9xF5zFZfUeQbGFMi", options)
            .then(res => res.json());
        
    }

};