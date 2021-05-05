import { AdminRoutes } from "./Navigation/admin";

function guardAuth(to, from, next) {
  let isAuth = false;
  if (sessionStorage.getItem("accessToken")) isAuth = true;
  else isAuth = false;

  isAuth ? next() : next("/");
}

const routes = [
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    props: { routes: AdminRoutes },
    beforeEnter: guardAuth,
    children: [
      {
        path: "/admin",
        name: "addShoes",
        component: () => import("pages/Admin/AddShoes")
      },
      {
        path: "/admin/employees",
        name: "employees",
        component: () => import("pages/Admin/Employees")
      },
      {
        path: "/admin/shoes",
        name: "shoes",
        component: () => import("pages/Admin/Shoes")
      }
    ]
  },

  {
    path: "/seller",
    name: "seller",
    component: () => import("pages/Seller/Seller")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/",
    component: () => import("pages/Login.vue")
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
