"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowDown } from "react-icons/io";
import instance from '../../axios/axios';
import Select from "react-select";

type Inputs = {
    client_name: string
    client_email: string
    professional: string
    services: string[]
    date: string
    time: string
    total_price: number
    paid: number
}

const CustomAppointment: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const token = Cookies.get('token');
    const brand = Cookies.get("name");
    const [selectedProfessional, setSelectedProfessional] = useState<string>("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [services, setServices] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState("");

    const [professionals, setProfessionals] = useState([]);
    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await instance.get(`/service/getAllServices?brand=${brand}`);
                if (res.status === 200) {
                    setServices(res.data.data)
                    console.log(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getProfessionals = async () => {
            try {
                const res = await instance.get(`/professional/getAllProfessionals?brand=${brand}`);
                console.log(res)
                if (res.status === 200) {
                    setProfessionals(res.data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getServices();
        getProfessionals();
    }, [brand]);

    useEffect(() => {
        // If a professional is selected, fetch available slots for that professional
        if (selectedProfessional && selectedDate) {
            fetchProfessionalSlots(selectedProfessional);
        }
    }, [selectedProfessional, selectedDate]);

    const fetchProfessionalSlots = async (professional: any) => {
        try {
            const response = await instance.get(`/professional/getSingleProf/${professional._id}`);
            console.log(response.data.data);
            const { available_days } = response.data.data;
            if (response.data.data.available_days) {
                console.log(selectedDate)
                const slots: any = available_days.find((day: { date: string; }) => day.date === selectedDate)?.available_slots || [];
                console.log(slots)
                setAvailableSlots(slots);
            } else {
                setAvailableSlots([]);
            }
        } catch (error) {
            console.error('Error fetching professional slots:', error);
            // Handle error
        }
    };

    const onAddAppointment = async (data: Inputs) => {
        try {
            const res = await instance.post(`/appointment/createAppointment`, data, {
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

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Custom Appointment</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Custom Appointment
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onAddAppointment)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Client Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter client name"
                                {...register("client_name", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Client Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter client email"
                                {...register("client_email", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <div className="relative z-20 bg-white dark:bg-form-input  mb-4.5">
                                <select
                                    value={selectedProfessional}
                                    onChange={(e) => {
                                        setSelectedProfessional(e.target.value);
                                        changeTextColor();
                                    }}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                                        }`}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select Professional
                                    </option>
                                    {professionals.map((prof: any) => (
                                        <option key={prof._id} value={prof._id} className="text-body dark:text-bodydark"> {prof.name}</option>
                                    ))}
                                </select>

                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <IoIosArrowDown />
                                </span>
                            </div>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select Services
                            </label>
                            <Select
                                options={services.map((service: any) => ({ label: service.title, value: service._id }))}
                                isMulti
                                value={selectedServices.map(
                                    serviceId => (
                                        { label: services.find((service: any) => service._id === serviceId)?.title, 
                                        value: serviceId }))}
                                onChange={(selectedOptions) => setSelectedServices(selectedOptions.map(option => option.value))}
                                className={`border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary dark:border-form-strokedark`}
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select Date
                            </label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className=" mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select Time Slot
                            </label>
                        <div className="relative z-20 bg-white dark:bg-form-input mb-4.5">
                             
                                <select
                                 {...register("time", { required: true })}
                                    // {...register("category", { required: true })}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                                        }`}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select Time Slot
                                    </option>
                                    {availableSlots.map((slot: any) => (
                                        <option key={slot} value={slot} className="text-body dark:text-bodydark"> {slot}</option>
                                    ))}
                                </select>

                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <IoIosArrowDown />
                                </span>
                            </div>
                            </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Total Price
                            </label>
                            <input
                                type="number"
                                {...register("total_price", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Amount Paid
                            </label>
                            <input
                                type="number"
                                {...register("paid", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Add Appointment
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CustomAppointment;
