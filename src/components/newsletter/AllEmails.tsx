"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Link from 'next/link';

const AllLocationComp = () => {
    const [emails, setEmails] = useState<any[]>([]);
    const brand = Cookies.get("email");

    const getAllEmails = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/newsletter/getAllEmails?brand=${brand}`);
            if (res.status === 200) {
                setEmails(res.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllEmails();
    }, [brand]);
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Subscribed Emails
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                        #
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Email
                        </h5>
                    </div>
                </div>

                {emails.map((email: any, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`grid grid-cols-3 ${index === email.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                                }`}
                            key={`${index}-${index}`}
                        >
                            <div className="flex items-center justify-start p-2.5 xl:p-5 text-[15px]">
                                  <p className="text-black dark:text-white">{index+1}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                                <p className="text-black dark:text-white">{email.email}</p>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AllLocationComp;
