'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../axios/axios';
import { useParams } from 'next/navigation';
import Loader from '../common/Loader';
type Inputs = {
    sender: string;
    receiver: string;
    price: number;
    brand: string;
}
const EditGiftComp: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const [singeGift, setSingeGift] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');
    const brand = Cookies.get("email");
    const id = useParams().id; // Ensure id is a string

    useEffect(() => {
        const getSingleGift = async () => {
            setLoading(true);
            try {
                const res = await instance.get(`/gift/getSingleGift/${id}`, {
                    headers: {
                        authorization: `${token}`,
                    },
                });
                console.log(res);
                if (res.status === 200) {
                    setSingeGift(res.data.data);
                    setLoading(false);
                }
            } catch (e) {
                console.log(e)
                setLoading(false);
            }
        }    
        
        getSingleGift();
    }, [id, token])
        const onEditGift = async (data: any) => {
        try {
            const res = await instance.patch(`/gift/updateGift/${id}`,
                {
                    sender: data.sender ? data.sender : singeGift.sender,
                    receiver: data.receiver ? data.receiver : singeGift.receiver,
                    price: data.price ? data.price : singeGift.price,
                    brand: brand,
                }, {
                headers: {
                    authorization: `${token}`,
                },
            });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.data);
                toast.success(res.data.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Edit Gift</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Edit Gift
                    </h3>
                </div>
                {loading && <Loader />}
                <form action="#" onSubmit={handleSubmit(onEditGift)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Sender Email
                            </label>
                            <input
                                type="email"
                                defaultValue={singeGift.sender}
                                placeholder="Enter sender email"
                                {...register("sender")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Receiver Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter receiver email"
                                defaultValue={singeGift.receiver}
                                {...register("receiver")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Gift amount
                            </label>
                            <input
                                type="number"
                                defaultValue={singeGift.price}
                                placeholder="Enter gift amount"
                                {...register("price")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Edit Gift
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditGiftComp;