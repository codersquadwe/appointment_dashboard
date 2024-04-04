"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AllScheduele = () => {
    const [profs, setProfs] = useState<any[]>([]);

    useEffect(() => {
        const getAllProf = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/professional/getAllProfessionals/`);
                if (res.status === 200) {
                    setProfs(res.data.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getAllProf();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Schedule
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Date
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Professional
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Time
                        </h5>
                    </div>
                </div>

                {profs.map((prof: any, key) => (
                    <React.Fragment key={key}>
                        {prof.available_slots?.map((slot: any, index: number) => (
                            <div
                                className={`grid grid-cols-3 ${index === prof.available_slots.length - 1
                                    ? ""
                                    : "border-b border-stroke dark:border-strokedark"
                                    }`}
                                key={`${key}-${index}`}
                            >
                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                    <p className="text-black dark:text-white">{slot.date}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                    <p className="text-black dark:text-white">{prof.name}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                    <p className="text-black dark:text-white">{slot.slots.join(', ')}</p>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AllScheduele;
