"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import useAuth from './../../hooks/useAuth';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";
import Cookies from 'js-cookie';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const role = Cookies.get("role");
  
  useEffect(() => {
    if (role === "brand" || role === "superAdmin") {
      console.log("User is authorized");
      setIsAuthorized(true);
      setLoading(false)
    }
    else{
      setLoading(false)
    router.push("/auth/signin");
  }
  },[isAuthorized])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (       
    
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
    </div >
            )
}
    </>
  );
}
