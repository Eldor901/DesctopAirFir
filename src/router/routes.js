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
        component: () => import("pages/Admin/Products")
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
      },
      {
        path: "/admin/settings",
        name: "settings",
        component: () => import("pages/Admin/Settings")
      }
    ]
  },
  {
    path: "/admin/addProduct",
    name: "addProduct",
    component: () => import("pages/Admin/AddProduct")
  },
  {
    path: "/admin/editproduct/:id",
    name: "editProduct",
    component: () => import("pages/Admin/AddProduct")
  },

  {
    path: "/seller",
    name: "seller",
    component: () => import("pages/Seller/Seller")
  },
  // Always leave this as last one,
  // but you can also remove it

  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue")
  },

  {
    path: "/",
    redirect: { name: "login" }
  },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
