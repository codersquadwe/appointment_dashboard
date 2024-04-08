'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowDown } from "react-icons/io";
import { IMGBB_API, IMGBB_KEY } from '../../../config';
import instance from '../../axios/axios';
import { useParams } from 'next/navigation';

type Inputs = {
    name: string
    email: string
    description: string
    image: string
}
const EditProfessionalComp: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const token = Cookies.get('token');
    const [selectedFile, setSelectedFile] = useState(null);
    const [img, setImg] = useState('')
    const [loading, setLoading] = useState(true);
    const brand = Cookies.get("email");
    const id = useParams().id; // Ensure id is a string
    const [singleProf, setSingleProf] = useState<any>({});
    const [users, setUsers] = useState<any>([]);
    const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await instance.get(`/user/getAllUsers`);
                if (res.status === 200) {
                    setUsers(res.data.data);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUsers();
    })
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
        const getSingleProfessional = async () => {
            try {
                setLoading(true);
                const res = await instance.get(`/professional/getSingleProf/${id}`, {
                    headers: {
                        authorization: `${token}`,
                    },
                });
                console.log(res);
                if (res.status === 200) {
                   setSingleProf(res.data.data);
                    setLoading(false);
                }
            } catch (e) {
                console.log(e)
                setLoading(false);
            }
        }
        getSingleProfessional();
    }, [id, token])
    const onEditProfessional = async (data: any) => {
        try {
            const res = await instance.patch(`/professional/updateProfessional/${id}`,
                {
                    name: data.name ? data.name : singleProf.name,
                    email: selectedProfessional ? selectedProfessional : singleProf.email,
                    description: data.description ? data.description : singleProf.description,
                    image: img ? img : singleProf.image,
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

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    
    useEffect(() => {
        if (selectedFile !== null) {
            saveImage();
        }
    }, [selectedFile]);
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Edit Professional</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Edit Professional
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onEditProfessional)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Professional Name
                            </label>
                            <input
                                type="text"
                                defaultValue={singleProf?.name}
                                placeholder="Enter professional name"
                                {...register("name")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <div className="relative z-20 bg-white dark:bg-form-input  mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Select Professional Email
                                </label>
                                <select
                                    value={selectedProfessional}
                                    onChange={(e) => {
                                        setSelectedProfessional(e.target.value);
                                        changeTextColor();
                                    }}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                                        }`}
                                >
                                    <option value="" selected disabled className="text-body dark:text-bodydark">
                                        {singleProf?.email}
                                    </option>
                                    {users.map((user: any) => (
                                        <option key={user._id} value={user.email} className="text-body dark:text-bodydark"> {user.email}</option>
                                    ))}
                                </select>

                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <IoIosArrowDown />
                                </span>
                            </div>
                        </div>
                        <div className='mb-4.5'>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Professional Image
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
                                defaultValue={singleProf?.description}
                                {...register("description")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Edit Professional
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditProfessionalComp;