import { AdminRoutes } from "./Navigation/admin";
import { SellerRoutes } from "./Navigation/sellers";

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
        name: "adminSettings",
        component: () => import("pages/Admin/Settings")
      }
    ]
  },
  {
    path: "/admin/addProduct",
    name: "addProduct",
    beforeEnter: guardAuth,
    component: () => import("pages/Admin/AddProduct")
  },
  {
    path: "/admin/editproduct/:id",
    name: "editProduct",
    beforeEnter: guardAuth,
    component: () => import("pages/Admin/AddProduct")
  },

  {
    path: "/seller",
    component: () => import("layouts/MainLayout.vue"),
    props: { routes: SellerRoutes },
    beforeEnter: guardAuth,
    children: [
      {
        path: "/seller",
        name: "orders",
        component: () => import("pages/Seller/Orders")
      },
      {
        path: "/seller/comments",
        name: "сomments",
        component: () => import("pages/Seller/Comments")
      },
      {
        path: "/settings",
        name: "sellerSettings",
        component: () => import("pages/Seller/Settings")
      }
    ]
  },

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
