import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "public",
      component: DefaultLayout,
      redirect: "/",
      children: [
        {
          path: "/",
          alias: ["/home"],
          name: "home",
          component: HomePage,
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/pages/AboutPage.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        authAdmin: true,
      },
      // children: [
      //   {
      //     path: "login",
      //     name: "login",
      //     component: () => import("@/pages/LoginPage.vue"),
      //     meta: {
      //       authAdmin: false,
      //     },
      //   },
      // ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
      meta: {
        authAdmin: false,
      },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.meta.authAdmin && !authStore.user.name) {
//     next("/login")
//     console.log(to.meta.authAdmin);
//   } else {
//     next()
//     console.log(to.meta.authAdmin, "any");
//   }
// })

export default router;
