import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./assets/main.css";
const firebaseConfig = {
    apiKey: "AIzaSyA_lxQO-l3BJrExWV-DukVEBTqYpcPQJOE",
    authDomain: "fir-auth-48e63.firebaseapp.com",
    databaseURL: "https://fir-auth-48e63.firebaseio.com",
    projectId: "fir-auth-48e63",
    storageBucket: "fir-auth-48e63.appspot.com",
    messagingSenderId: "330897515",
    appId: "1:330897515:web:b9831e1983bf9bb30ab92e",
    measurementId: "G-X51TQF68ZP",
};
const firebaseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(firebaseApp);
const app = createApp(App);

app.use(router);

app.mount("#app");
