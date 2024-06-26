"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineDesignServices } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { SiGooglemeet } from "react-icons/si";
import { PiBagSimpleBold } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeOutline, IoNewspaperOutline } from "react-icons/io5";
import { FiGift } from "react-icons/fi";
import Cookies from 'js-cookie'


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const role = Cookies.get("role")
  const pathname = usePathname();
  console.log(role)

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"https://i.ibb.co/jkySZ4S/Slotify-removebg-preview.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            {role == "brand" && (
              <ul className="mb-6 flex flex-col gap-1.5">

                {/* <!-- Menu Item Dashboard --> */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/" ||
                              pathname.includes("dashboard")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <RxDashboard />
                          Dashboard
                        </Link>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                <li>
                  <Link
                    href="/appointments"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("tables") &&
                      "bg-graydark dark:bg-meta-4"
                      }`}
                  >
                    <SiGooglemeet />

                    Appointments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customAppointment"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("customAppointments") && "bg-graydark dark:bg-meta-4"
                      }`}
                  >
                    <RxPerson />
                    Custom Appointment
                  </Link>
                </li>
                {/* <!-- Menu Item Profile --> */}

                {/* category */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/category" || pathname.includes("category")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/category" ||
                              pathname.includes("category")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <HiOutlineDocumentText />
                          Category
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/category/addCategory"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/category/add-category" &&
                                  "text-white"
                                  }`}
                              >
                                Add Category
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/category/allCategories"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/category/allCategories" &&
                                  "text-white"
                                  } `}
                              >
                                All Categories
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* service */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/service" || pathname.includes("service")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/service" ||
                              pathname.includes("service")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <MdOutlineDesignServices />
                          Service
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/service/addService"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/service/addService" &&
                                  "text-white"
                                  }`}
                              >
                                Add Service
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/service/allServices"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/service/allServices" &&
                                  "text-white"
                                  } `}
                              >
                                All Services
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Professional */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/professionals" || pathname.includes("professionals")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/professionals" ||
                            pathname.includes("professionals")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <PiBagSimpleBold />
                          Professional
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/professionals/addProfessional"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/professionals/addProfessional" &&
                                  "text-white"
                                  }`}
                              >
                                Add Professional
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/professionals/allProfessionals"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/professionals/allProfessionals" &&
                                  "text-white"
                                  } `}
                              >
                                All professionals
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* schedule */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/schedule" || pathname.includes("schedule")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/schedule" ||
                            pathname.includes("schedule")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <IoTimeOutline />
                          Schedule
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/schedule/addSchedule"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/schedule/addSchedule" &&
                                  "text-white"
                                  }`}
                              >
                                Add Schedule
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/schedule/allSchedules"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/schedule/allSchedules" &&
                                  "text-white"
                                  } `}
                              >
                                All Schedules
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* location */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/location" || pathname.includes("location")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/location" ||
                            pathname.includes("location")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <FaLocationDot />
                          Location
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/location/addLocation"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/location/addLocation" &&
                                  "text-white"
                                  }`}
                              >
                                Add Location
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/location/allLocations"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/location/allLocations" &&
                                  "text-white"
                                  } `}
                              >
                                All Locations
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>

                {/* gift */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/gift" || pathname.includes("gift")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/gift" ||
                            pathname.includes("gift")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <FiGift />
                          Gift
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/gift/addGift"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/gift/addGift" &&
                                  "text-white"
                                  }`}
                              >
                                Add Gift
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/gift/allGifts"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/gift/allGifts" &&
                                  "text-white"
                                  } `}
                              >
                                All Gifts
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* newsletter */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/newsletter" || pathname.includes("newsletter")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <Link
                          href="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/newsletter" ||
                            pathname.includes("newsletter")) &&
                            "bg-graydark dark:bg-meta-4"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <IoNewspaperOutline />
                          Newsletter
                          {open ? <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current`} />
                            : <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`} />}
                        </Link>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && "hidden"
                            }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <Link
                                href="/newsletter/addEmail"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/newsletter/addEmail" &&
                                  "text-white"
                                  }`}
                              >
                                Add Email
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/newsletter/allEmails"
                                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/newsletter/allEmails" &&
                                  "text-white"
                                  } `}
                              >
                                All Emails
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>


              </ul>
            )}
            {role === "professional" && (
              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <Link
                    href="/appointments"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("tables") &&
                      "bg-graydark dark:bg-meta-4"
                      }`}
                  >
                    <SiGooglemeet />

                    Appointments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customAppointment"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("customAppointments") && "bg-graydark dark:bg-meta-4"
                      }`}
                  >
                    <RxPerson />
                    Custom Appointment
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
