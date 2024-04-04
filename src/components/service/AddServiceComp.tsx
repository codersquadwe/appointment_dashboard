'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowDown } from "react-icons/io";
import { IMGBB_API, IMGBB_KEY } from '../../../config';
import instance from "@/axios/axios";

type Inputs = {
    title: string
    category: string
    description: string
    price: number
    image: string
    min_time: number
    max_time: number
}
const AddServiceComp: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const token = Cookies.get('token');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectedOptionBrand, setSelectedOptionBrand] = useState<string>("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [img, setImg] = useState('')
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const brand = Cookies.get("name");

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
    }, [])

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
    const onAddService = async (data: any) => {
        try {
            const res = await instance.post(`/service/createService`,
                {
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    category: selectedOption,
                    image: img,
                    brand: brand,
                    min_time: data.min_time,
                    max_time: data.max_time
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

    useEffect(() => {
        if (selectedFile !== null) {
            saveImage();
        }
    }, [selectedFile]);
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Add Service</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add Service
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onAddService)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Service Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter service name"
                                {...register("title", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Service Price
                            </label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                {...register("price", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5 grid grid-cols-2 items-center gap-x-4 w-full">
                             <div >
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Minimum Time (in minutes)
                            </label>
                            <input
                                type="number"
                                placeholder="Enter minimum time"
                                {...register("min_time", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Maximum Time (in minutes)
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter maximum time"
                                    {...register("max_time", { required: true })}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <div className='mb-4.5'>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select Category
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <select
                                    value={selectedOption}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        changeTextColor();
                                    }}
                                    // {...register("category", { required: true })}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                                        }`}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select Category
                                    </option>
                                    {categories.map((category: any) => (
                                        <option key={category._id} value={category._id} className="text-body dark:text-bodydark"> {category.name}</option>
                                    ))}
                                </select>

                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <IoIosArrowDown />
                                </span>
                            </div>
                        </div>
                        <div className='mb-4.5'>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Service Image
                            </label>
                            <input
                                type="file"
                                onChange={(e: any) => setSelectedFile(e.target.files[0])}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                rows={6}
                                placeholder="Description"
                                {...register("description", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Add Service
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddServiceComp;