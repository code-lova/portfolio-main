import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import FrontEndLayout from "../layouts/frontend/FrontEndLayout";
import Home from "../components/frontend/Home";
import PublicRoutes from "./PublicRoutes";
import AdminProtectedRoutes from "./AdminProtectedRoutes";

const Dashboard = lazy(() => import("../components/admin/Dashboard"));
const Login = lazy(() => import("../components/auth/Login"));
const Register = lazy(() => import("../components/auth/Register"));
const Page403 = lazy(() => import("../components/error/Page403"));
const Page404 = lazy(() => import("../components/error/Page404"));
const Project = lazy(() => import("../components/admin/project/Project"));
const AddProject = lazy(() => import("../components/admin/project/AddProject"));
const Category = lazy(() => import("../components/admin/category/Category"));
const AddCategory = lazy(
  () => import("../components/admin/category/AddCategory"),
);
const EditCategory = lazy(
  () => import("../components/admin/category/EditCategory"),
);
const EditProject = lazy(
  () => import("../components/admin/project/EditProject"),
);
const Blog = lazy(() => import("../components/admin/blog/Blog"));
const Addblog = lazy(() => import("../components/admin/blog/Addblog"));
const Blogcategory = lazy(
  () => import("../components/admin/blog/blogcategory/Blogcategory"),
);
const Editblogcategory = lazy(
  () => import("../components/admin/blog/blogcategory/Editblogcategory"),
);
const Addblogcategory = lazy(
  () => import("../components/admin/blog/blogcategory/Addblogcategory"),
);
const Editblog = lazy(() => import("../components/admin/blog/Editblog"));
const Settings = lazy(() => import("../components/admin/Settings"));
const Switch = lazy(() => import("../components/admin/Switch"));
const Forgotpassword = lazy(() => import("../components/auth/Forgotpassword"));
const Resetpassword = lazy(() => import("../components/auth/Resetpassword"));

const RouteFallback = () => (
  <div className="font-mono font-bold text-xl">
    <p className="text-center mt-20 text-coral-red">Loading...</p>
  </div>
);

const Routers = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/admin" element={<AdminProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Project />} />
          <Route path="edit-project/:id" element={<EditProject />} />
          <Route path="create-project" element={<AddProject />} />

          <Route path="category" element={<Category />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />

          <Route path="blog-category" element={<Blogcategory />} />
          <Route path="add-blog-category" element={<Addblogcategory />} />
          <Route path="edit-blog-category/:id" element={<Editblogcategory />} />

          <Route path="blog" element={<Blog />} />
          <Route path="create-blog" element={<Addblog />} />
          <Route path="edit-blog/:id" element={<Editblog />} />

          <Route path="settings" element={<Settings />} />
          <Route path="switch" element={<Switch />} />
        </Route>

        <Route path="/" element={<FrontEndLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<PublicRoutes component={Login} />} />
        <Route
          path="/register"
          element={<PublicRoutes component={Register} />}
        />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} />

        <Route path="*" element={<Page404 />} />
        <Route path="403" element={<Page403 />} />
        <Route path="404" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
