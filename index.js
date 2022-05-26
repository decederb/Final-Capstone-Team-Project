import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Landmarks from '../views/Landmarks'
import ItinerariesMenu from '../views/ItinerariesMenu.vue'
import Landmark from '../views/Landmark'
import Directions from '../components/Directions.vue'
import itineraryLandmark from '../views/ItineraryLandmarks'
import AddItinerary from '../views/AddItinerary'
import EditItinerary from '../views/EditItinerary'
import GoogleMap from '@/components/GoogleMap'
import MapQuestRoute from '@/components/MapQuestRoute'
import ViewItinerary from '../views/ViewItinerary'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/landmarks",
      name: "landmarks",
      component: Landmarks
    },
    {
      path: "/itineraries",
      name: "Itineraries",
      component: ItinerariesMenu,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/landmarks/:id',
      name: 'landmark',
      component: Landmark,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/directions',
      name: 'directions',
      component: Directions
    },
    {
      path: '/itinerary/landmarks',
      name: 'itineraryLandmarks',
      component: itineraryLandmark
    },
    {
      path: '/itinerary',
      name: 'AddItinerary',
      component: AddItinerary,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/itinerary/:itineraryID',
      name: 'EditItinerary',
      component: EditItinerary,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/itinerary/:itineraryID/view',
      name: 'ViewItinerary',
      component: ViewItinerary,
      meta : {
        requiresAuth: true
      }
    },
    {
      path: '/map',
      name: 'googlemap',
      component: GoogleMap
    },
    {
      path: '/m2',
      name: 'mapQuest',
      component: MapQuestRoute
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
