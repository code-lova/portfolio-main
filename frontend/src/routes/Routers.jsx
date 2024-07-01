import React from "react";
import { Routes, Route } from "react-router-dom";
import FrontEndLayout from "../layouts/frontend/FrontEndLayout";
import Home from "../components/frontend/Home";
import Dashboard from "../components/admin/Dashboard";
import PublicRoutes from "./PublicRoutes";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Page403 from "../components/error/Page403";
import Page404 from "../components/error/Page404";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import Project from "../components/admin/project/Project";
import AddProject from "../components/admin/project/AddProject";
import Category from "../components/admin/category/Category";
import AddCategory from "../components/admin/category/AddCategory";
import EditCategory from "../components/admin/category/EditCategory";
import EditProject from "../components/admin/project/EditProject";
import Blog from "../components/admin/blog/Blog";
import Addblog from "../components/admin/blog/Addblog";
import Blogcategory from "../components/admin/blog/blogcategory/Blogcategory";
import Editblogcategory from "../components/admin/blog/blogcategory/Editblogcategory";
import Addblogcategory from "../components/admin/blog/blogcategory/Addblogcategory";
import Editblog from "../components/admin/blog/Editblog";
import Settings from "../components/admin/Settings";
import Switch from "../components/admin/Switch";
import Forgotpassword from "../components/auth/Forgotpassword";
import Resetpassword from "../components/auth/Resetpassword";

const Routers = () => {
  return (
    <Routes>

      <Route path="/admin" element={<AdminProtectedRoutes />} >
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="projects" element={<Project />} />
        <Route path="edit-project/:id" element={<EditProject />}/>
        <Route path="create-project" element={<AddProject />}/>

        <Route path="category"element={<Category />}/>
        <Route path="add-category" element={<AddCategory />}/>
        <Route path="edit-category/:id" element={<EditCategory />} />


        <Route path="blog-category" element={<Blogcategory />}/>
        <Route path="add-blog-category" element={<Addblogcategory />}/>
        <Route path="edit-blog-category/:id" element={<Editblogcategory />}/>


        <Route path="blog" element={<Blog />}/>
        <Route path="create-blog" element={<Addblog />}/>
        <Route path="edit-blog/:id" element={<Editblog />}/>

        <Route path="settings" element={<Settings />}/>
        <Route path="switch" element={<Switch />}/>
      </Route>


      <Route path="/" element={<FrontEndLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<PublicRoutes component={Login} />} />
      <Route path="/register" element={<PublicRoutes component={Register} />} />
      <Route path="/forgotpassword" element={<Forgotpassword />}/>
      <Route path="/reset-password/:token" element={<Resetpassword />}/>


      <Route path="*" element={<Page404 />} />
      <Route path="403" element={<Page403 />}/>
      <Route path="404" element={<Page404 />}/>
      
    </Routes>
  );
};

export default Routers;
