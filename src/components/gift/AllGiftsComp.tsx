'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { MdDelete, MdModeEdit } from "react-icons/md";
import Link from 'next/link';
import instance from '../../axios/axios';

const AllGiftsComp = () => {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(false);
    const brand = Cookies.get('email');

    const getGifts = async () => {
        try {
            setLoading(true);
            const res = await instance.get(`/gift/getAllGifts?brand=${brand}`);
            if (res.status === 200) {
                setGifts(res.data.data);
                setLoading(false);
            }
            console.log(res.data.data);

        } catch (e) {
            console.log(e);
            setLoading(false);
        }

    }
    useEffect(() => {

        getGifts();
    }, [brand])

    const deleteGift = async (id: string) => {
        try {
            const res = await instance.delete(`/gift/deleteGift/${id}`);
            if (res.status === 200) {
                console.log(res.data.data);
                getGifts();
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                All Gifts
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
                            Sender
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Receiver
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Amount
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {gifts.map((gift: any, key) => (
                    <div
                        className={`grid grid-cols-5 sm:grid-cols-5 ${key === gifts.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                <p className="text-black dark:text-white">{key + 1}</p>
                            </div>

                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {gift.sender}
                            </p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{gift.receiver}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">${gift.price}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px] gap-x-2">
                            <button
                                onClick={() => deleteGift(gift._id)}
                                className="text-xl bg-danger text-[#fff] rounded-full p-2"
                            ><MdDelete /></button>
                            <Link className="text-xl bg-warning text-[#fff] rounded-full p-2"
                                href={`/gift/edit/${gift._id}`}
                            ><MdModeEdit /></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllGiftsComp;