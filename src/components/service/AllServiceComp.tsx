"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import instance from '@/axios/axios';

const AllServiceComp = () => {
    const [services, setServices] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

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
        getAllServices();
    }, []);


    const getCategoryNameById = (categoryId: string) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : 'Unknown';
    };



    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Services
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
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
                </div>

                {services.map((service: any, index) => (
                    <React.Fragment key={index}>
                            <div
                                className={`grid grid-cols-3 ${index === service.available_slots.length - 1
                                    ? ""
                                    : "border-b border-stroke dark:border-strokedark"
                                    }`}
                            key={`${index}-${index}`}
                            >
                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{service.title}</p>
                                </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{getCategoryNameById(service.category)}</p>
                            </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{service.price}</p>
                                </div>
                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{service.min_time} - {service.max_time}</p>
                                </div>
                            </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AllServiceComp;
