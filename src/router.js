import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import About from "./pages/About.vue";
import Accounts from "./pages/Accounts.vue";
import Location from "./pages/Location.vue";
import Vehicle from "./pages/Vehicle.vue";
// import NewVehicle from "./pages/NewVehicle.vue";
import NewLocation from "./pages/NewLocation.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "reset-password", path: "/reset-password", component: ResetPassword },
    { name: "about-us", path: "/about-us", component: About },
    { name: "accounts", path: "/accounts", component: Accounts },
    { name: "location", path: "/location", component: Location },
    { name: "vehicles", path: "/vehicles", component: Vehicle },
    { name: "newlocation", path: "/newlocation", component: NewLocation }

  ]
});
