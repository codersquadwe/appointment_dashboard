'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
    const [prof, setProf] = useState({});
    useEffect(() => {
        const getAppointments = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/appointment/getAllAppointments`);
                if (res.status === 200) {
                    console.log(res.data.data)
                    setAppointments(res.data.data);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getAppointments()

    }, [])
    const getSingleProf = async (id) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/professional/getSingleProf/${id}`);
            if (res.status === 200) {
                setProf(res.data.data);
            }
        } catch (e) {
            console.log(e)
        }
    }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Appointments
      </h4>

     <div className="flex flex-col">
                <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Date
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Time
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Professional
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Client Email
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Services
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Total
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Paid
                        </h5>
                    </div>
                </div>

                {appointments.map((appoint, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === appointments.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{appoint.date}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{appoint.time}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">Tilly Brook</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{appoint.appoint}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{appoint.services}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">${appoint.total}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-5">${appoint.paid}</p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  );
};

export default AllAppointments;
