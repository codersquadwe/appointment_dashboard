'use client';

import instance from '@/axios/axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { MdDelete } from "react-icons/md";

const AllProfessionalComp = () => {
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(false);
    const brand = Cookies.get('name');

    useEffect(() => {
        const getProfessionals = async () => {
            try {
                setLoading(true);                
                const res = await instance.get(`/professional/getAllProfessionals?brand=${brand}`);
                if(res.status === 200) {
                    setProfessionals(res.data.data);
                    setLoading(false);
                }
                console.log(res.data.data);
                
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
            
        }
        getProfessionals();
    }, [brand])
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Professionals
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            No.
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Image
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Name
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Brand
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {professionals.map((prof: any, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === professionals.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                <p className="text-black dark:text-white">{key+1}</p>
                            </div>
                            
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 rounded-full">
                            <Image src={prof.image} alt="Brand" width={48} height={48} className="rounded-full" />
                           
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {prof.name}
                            </p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{prof.brand}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <button className="text-xl bg-danger text-[#fff] rounded-full p-4"><MdDelete /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProfessionalComp;