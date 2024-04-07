'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowDown } from "react-icons/io";
import { IMGBB_API, IMGBB_KEY } from '../../../config';
import instance from './../../axios/axios';
import { useParams } from 'next/navigation';

type Inputs = {
    brand: string
    address: string
    map_link: string
    location_image: string
}
const EditLocationComp: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const token = Cookies.get('token');
    const [selectedFile, setSelectedFile] = useState(null);
    const [singleLocation, setSingleLocation] = useState<any>({});
    const [img, setImg] = useState('')
    const brand = Cookies.get("name");
    const id = useParams().id; // Ensure id is a string
    
    const saveImage = async () => {
        try {
            const formData: any = new FormData();
            formData.append("image", selectedFile);

            const postToImgBB = await axios.post(`${IMGBB_API}?key=${IMGBB_KEY}`, formData);
            console.log(postToImgBB)
            if (postToImgBB.status === 200) {
                setImg(postToImgBB.data.data.url);
                return postToImgBB.data.data.url
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const getSingleLocation = async () => {
            try {
                const res = await instance.get(`/location/getSingleLocation/${id}`, {
                    headers: {
                        authorization: `${token}`,
                    },
                });
                console.log(res);
                if (res.status === 200) {
                   setSingleLocation(res.data.data);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getSingleLocation();
    }, [id, token]);
    const onUpdateLocation = async (data: any) => {
        try {
            const res = await instance.patch(`/location/updateLocation/${id}`,
                {
                    brand: brand,
                    address: data.address ? data.address : singleLocation.address,
                    map_link: data.map_link ? data.map_link : singleLocation.map_link,
                    location_image: img ? img : singleLocation.location_image
                }, {
                headers: {
                    authorization: `${token}`,
                },
            });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data);
                toast.success("Location updated successfully");
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (selectedFile !== null) {
            saveImage();
        }
    }, [selectedFile]);

    console.log(singleLocation)
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Edit Location</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Edit Location
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onUpdateLocation)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Address
                            </label>
                            <input
                                type="text"
                                defaultValue={singleLocation?.address}
                                placeholder="Enter address"
                                {...register("address")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className='mb-4.5'>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Location Image
                            </label>
                            <input
                                type="file"
                                onChange={(e: any) => setSelectedFile(e.target.files[0])}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Map Link
                            </label>
                            <input
                                type="url"
                                defaultValue={singleLocation?.map_link}
                                placeholder="Enter map link"
                                {...register("map_link")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Edit Location
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditLocationComp;