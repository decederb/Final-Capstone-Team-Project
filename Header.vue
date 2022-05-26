!<template>
 
  <div class="header">
        <div class="inner_header">
            <div class="title_container">
                <h1>Guidr</h1>
                    <h4>Let us be your guide.</h4>
                        <ul class="navigation">
                            <a><li><a href="\">Home</a></li></a>
                            <a><li><a href="/itineraries">Itinerary</a></li></a>
                            <a><li><a href="\landmarks">Landmarks</a></li></a>
                            <a><li><a href="\login">Login</a></li></a>
                            <a><li><router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''">Logout</router-link></li></a>
                            
                        </ul>
                    </div>

        </div>
    </div>
</template> -->

<script>
export default {

}
</script>


 <style scoped>
/* // *{
//     margin: 0;
//     padding: 0;
//     list-style: none;
//     text-decoration: none;
// }
// .banner{
//     width: 100%;
//     height: 160px;
//     background-image: linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url("../assets/pncpark.png");
//     background-size:cover;
//     background-position:center;    
// }

// .navbar{
//     width: 85%;
//     margin: auto;
//     padding: auto;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
// }
// .navbar h1{
//      font-family: "Playfair Display," Times, serif;
//     font-size: 72px;
//     font-style: italic;
//     font-weight: bold;
//     color: #f2cd13;
   
// }
// .navbar #tagline{
//          font-family: "Playfair Display," Times, serif;
//          color:white;
// }
// #nav ul li{
//     list-style: none;
//     display: inline-block;
//     margin: 0 20px;
//     position: relative;
//     bottom: 13px;
//     font-family: "Cascadia Code";
// }
// #nav ul li a{
//     text-decoration: none;
//     color: #EBA92A;
//     text-transform: uppercase;
//     text-align: left;
// }
// #nav ul li::after{
//     content: '';
//     height: 3px;
//     width: 0;
//     background:#0e98dd;
//     position: absolute;
//     left: 0;
//     bottom: -8px;
//     transition: 0.5s;
// }
// #nav ul li:hover::after{
//     width: 100%;
// } */
*{
    padding: 0;
    list-style: none;
    text-decoration: none;
}
.header {
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    background-image:linear-gradient(rgba(0,0,0,0.70),rgba(0,0,0,0.60)), url('../assets/bridge.jpg');  
    background-position:center;
    background-size: cover;
    image-resolution:inherit;
}

.inner_header {
    display: flex;
}

.title_container h1 {
    font-family: "Playfair Display," Times, serif;
    font-size: 72px;
    font-style: italic;
    font-weight: bold;
    color: #f2cd13;
    text-align:start;
}
.title_container h4 {
    font-family: "Playfair Display," Times, serif;
    font-size: medium;
    font-style: italic;
    font-weight: normal;
    color:aliceblue;
    margin: 2px 10px 15px 14px ;
}
.title_container {
    height: 100%;
    display: table;
    float: left;
}

.navigation {
    float: left;
    height: 100%;
    color: #f2cd13;
    font-weight: bold;
    font-family: "Playfair Display," Times, serif;
    font-size: large;
}

.navigation a li{
     list-style: none;
     display: inline-block;
     margin: 0 10px;
     position: relative;
     bottom: -11px;
     font-family: "Cascadia Code";
 }
 .navigation a li a{
     text-decoration: none;
     color: #EBA92A;
     text-transform: uppercase;
     text-align: left;
 }
 .navigation a li::after{
     content: '';
     height: 3px;
     width: 0;
     background:#0e98dd;
     position: absolute;
     left: 0;
     bottom: -8px;
     transition: 0.5s;
 }
 .navigation a li:hover::after{
     width: 100%;
 } 
 </style>
