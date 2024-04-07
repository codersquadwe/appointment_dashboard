"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import instance from '@/axios/axios';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

const AllServiceComp = () => {
    const [services, setServices] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const token = Cookies.get("token");
    const getAllServices = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/service/getAllServices/`);
            if (res.status === 200) {
                setServices(res.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res: any = await instance.get(`/category/getAllCategories`);
                console.log(res)
                if (res.status === 200) {
                    setCategories(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
        getAllServices();
       
    }, []);


    const getCategoryNameById = (categoryId: string) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : 'Unknown';
    };

    const deleteService = async (id: string) => {
        try {
            const res = await instance.delete(`/service/deleteService/${id}`, {
                headers: {
                    authorization: `${token}`,
                },
            });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.data);
                getAllServices();
                toast.success(res.data.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Services
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Title
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Category
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Price
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Time
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {services.map((service: any, index) => (
                    <React.Fragment key={index}>
                            <div
                                className={`grid grid-cols-5 ${index === service.length - 1
                                    ? ""
                                    : "border-b border-stroke dark:border-strokedark"
                                    }`}
                            key={`${index}-${index}`}
                            >
                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white text-center">{service.title}</p>
                                </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{getCategoryNameById(service.category)}</p>
                            </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">${service.price}</p>
                                </div>
                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{service.min_time}min - {service.max_time}min</p>
                            </div>
                            <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px] gap-x-2">
                                <button
                                    onClick={() => deleteService(service._id)}
                                    className="text-xl bg-danger text-[#fff] rounded-full p-2"
                                    ><MdDelete /></button>
                                <Link className="text-xl bg-warning text-[#fff] rounded-full p-2"
                                    href={`/service/edit/${service._id}`}                                    
                                ><MdModeEdit /></Link>
                            </div>
                            </div>
                    </React.Fragment>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AllServiceComp;
