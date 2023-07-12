import { createRouter, createWebHistory } from "vue-router";


const router = createRouter ({
   history: createWebHistory (),
   routes:[
    { path: "/", component: () => import("../views/Home/Home.vue")},
    { path: "/register", component: () => import("../views/Home/Register.vue") },
    { path: "/login", component: () => import("../views/Home/Login.vue")},
    { path: "/feed", component: () => import("../views/Home/Feed.vue") },   
    { path: "/cart", component: () => import("../views/Home/Cart.vue") },
    { path: "/contact", component: () => import("../views/Home/Contact.vue") },   
    { path: "/checkout", component: () => import("../views/Home/Checkout.vue") },   
    { path: "/about", component: () => import("../views/Home/About.vue") },   
    { path: "/orders", component: () => import("../views/Home/Order.vue") },   
    { path: "/order-details/:id", component: () => import("../views/Home/OrderDetails.vue") },   
    { path: "/category/:id", component: () => import("../views/Home/Category.vue") },   
    { path: "/product/:id", component: () => import("../views/Home/Product.vue") },   
    
    //DASHBOARD
    { path: "/dashboard", component: () => import("../views/dashboard/Dashboard.vue") },   
    
    //CATEGORY CRUD   
    { path: "/dashboard/category/list-categories", component: () => import("../views/dashboard/categories/ListCategory.vue")},   
    { path: "/dashboard/category/create-category", component: () => import("../views/dashboard/categories/CreateCategory.vue")},   
    { path: "/dashboard/category/edit-category/:id", component: () => import("../views/dashboard/categories/EditCategory.vue") },   
    //PRODUCT CRUD
    { path: "/dashboard/product/list-products", component: () => import("../views/dashboard/products/ListProduct.vue")},   
    { path: "/dashboard/product/create-product", component: () => import("../views/dashboard/products/CreateProduct.vue")},   
    { path: "/dashboard/product/edit-product/:id", component: () => import("../views/dashboard/products/EditProduct.vue") },   
    //ORDER CRUD
    { path: "/dashboard/order/list-orders", component: () => import("../views/dashboard/orders/ListOrder.vue")},    
    { path: "/dashboard/order/edit-order/:id", component: () => import("../views/dashboard/orders/EditOrder.vue") },   
    //USER CRUD
    { path: "/dashboard/users/list-users", component: () => import("../views/dashboard/users/ListUsers.vue")},   
    { path: "/dashboard/users/edit-user/:id", component: () => import("../views/dashboard/users/EditUsers.vue") },  
    //MESSAGE/CONTACT CRUD
    { path: "/dashboard/messages/list-messages", component: () => import("../views/dashboard/messages/ListMessage.vue")},   
    { path: "/dashboard/messages/message-details/:id", component: () => import("../views/dashboard/messages/MessageDetails.vue") },  
  ],
 });
 
export default router;
