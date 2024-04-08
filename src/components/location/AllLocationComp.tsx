"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Link from 'next/link';

const AllLocationComp = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const brand = Cookies.get("name");

    const getAllLocations = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/location/getAllLocations?brand=${brand}`);
            if (res.status === 200) {
                setLocations(res.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        
        getAllLocations();
    }, [brand]);

    const deleteLocation = async (id: string) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/location/deleteLocation/${id}`);
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.data);
                getAllLocations();
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Locations
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Image
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Address
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {locations.map((location: any, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`grid grid-cols-3 ${index === location.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                                }`}
                            key={`${index}-${index}`}
                        >
                            <div className="flex items-center justify-start p-2.5 xl:p-5 text-[15px]">                           
                                <Image
                                    src={location.location_image}
                                    alt="location"
                                    width={100}
                                    height={100}
                                    className="h-10 w-10 rounded-md "
                                    />
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{location.address}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px] gap-x-2">
                                <button
                                    className="text-xl bg-danger text-[#fff] rounded-full p-2"
                                    onClick={() => deleteLocation(location._id)}
                                ><MdDelete /></button>
                                <Link href={`/location/edit/${location._id}`} className="text-xl bg-warning text-[#fff] rounded-full p-2"
                                ><MdModeEdit /></Link>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AllLocationComp;
