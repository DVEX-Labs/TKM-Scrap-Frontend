import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../Components/Admin/Header';
import Sidebar from '../Components/Admin/Sidebar';

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F4FAF5] font-roboto overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F9FBF9]">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout
