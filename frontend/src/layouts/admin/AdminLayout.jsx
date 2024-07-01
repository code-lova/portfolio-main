import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

    return(
        <main className="flex max-container">
            <Sidebar />
            <div className="flex-1 p-6 my-4">
                <Outlet />
            </div>
      </main>
    );
}

export default AdminLayout;
