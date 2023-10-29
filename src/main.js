import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import RegisterVue from "./components/RegisterMain.vue";
import LoginVue from "./components/LoginMain.vue";
import HomeVue from "./components/HomeMain.vue";

const routes = [
  { path: "/register", component: RegisterVue, name: "register" },
  { path: "/login", component: LoginVue, name: "login" },
  { path: "/", component: HomeVue, name: "home", meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
