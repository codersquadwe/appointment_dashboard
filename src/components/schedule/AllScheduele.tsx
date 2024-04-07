"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Link from 'next/link';
import instance from '@/axios/axios';

const AllScheduele = () => {
    const [profs, setProfs] = useState<any[]>([]);
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
    useEffect(() => {
        
        getAllProf();
    }, []);

    const deleteSchedule = async (id: string) => {
        try {
            const res = await instance.delete(`/professional/deleteProfessional/${id}`);
            if (res.status === 200) {
                console.log(res.data.data);
                getAllProf();
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Schedule
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
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
                            Actions
                        </h5>
                    </div>
                     

                </div>

                {profs.map((prof: any, key) => (
                    <React.Fragment key={key}>
                        {prof.available_slots?.map((slot: any, index: number) => (
                            <div
                                className={`grid grid-cols-4 ${index === prof.available_slots.length - 1
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
                                <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px] gap-x-2">
                                    <button
                                        onClick={() => deleteSchedule(prof._id)}
                                        className="text-xl bg-danger text-[#fff] rounded-full p-2"
                                    ><MdDelete /></button>
                                    <Link className="text-xl bg-warning text-[#fff] rounded-full p-2"
                                        href={`/schedule/edit/${prof._id}`}
                                    ><MdModeEdit /></Link>
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
