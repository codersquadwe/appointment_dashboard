'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowDown } from "react-icons/io";
import { IMGBB_API, IMGBB_KEY } from '../../../config';
import flatpickr from "flatpickr";
import { GoPlus } from "react-icons/go";
import { format } from 'date-fns';
import instance from '../../axios/axios';
import { useParams } from 'next/navigation';

type Inputs = {
    professional: string
    date: string
    slots: string[]
}
const EditSchedule: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>();
    const token = Cookies.get('token');
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [professionals, setProfessionals] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [slots, setSlots] = useState<string[]>([]);
    const [singleProf, setSingleProf] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false)
    const id = useParams().id; // Ensure id is a string
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const brand = Cookies.get("email");

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
    useEffect(() => {
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
        getProfessionals()
    }, [brand])

    const onEditSchedule = async (data: any) => {
        try {
            const updatedProfessional: any = professionals.find((prof: { _id: string; }) => prof._id === selectedOption);
            if (updatedProfessional) {
                // Check if there are existing slots for the selected date
                const existingSlotIndex = updatedProfessional.available_slots.findIndex((slot: any) => slot.date === selectedDate);
                if (existingSlotIndex === -1) {
                    // If no existing slots, create a new slot object
                    const newSlot: any = {
                        date: selectedDate,
                        slots: slots
                    };
                    // Add the new slot object to the available_slots array
                    const updatedAvailableSlots = [...updatedProfessional.available_slots, newSlot];
                    // Patch the updated professional data to the server
                    const res = await instance.patch(`/professional/updateProfessional/${selectedOption}`, {
                        available_slots: updatedAvailableSlots
                    }, {
                        headers: {
                            authorization: `${token}`,
                        },
                    });
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.data.message)
                    } else {
                        toast.error(res.data.message)
                    }
                } else {
                    // If existing slots, update the existing slot object with the new slots
                    const existingSlots = updatedProfessional.available_slots[existingSlotIndex].slots;
                    const updatedSlots = [...existingSlots, ...slots];
                    const updatedAvailableSlots = [...updatedProfessional.available_slots];
                    updatedAvailableSlots[existingSlotIndex].slots = updatedSlots;
                    // Patch the updated professional data to the server
                    const res = await instance.patch(`/professional/updateProfessional/${selectedOption}`, {
                        available_slots: updatedAvailableSlots
                    }, {
                        headers: {
                            authorization: `${token}`,
                        },
                    });
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.data.message)
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleAddSlot = () => {
        if (selectedTime.trim() !== "") {
            setSlots([...slots, selectedTime]);
            setSelectedTime(""); // Clear selected time after adding
        }
    }

    const handleDateChange = (date: Date) => {
        const formattedDate = format(date, 'mm/dd/yyyy'); // Format date to yyyy-MM-dd
        setSelectedDate(formattedDate); // Set the formatted date directly
    }

    // useEffect(() => {
    //     flatpickr(".form-datepicker", {
    //         mode: "single",
    //         static: true,
    //         monthSelectorType: "static",
    //         dateFormat: "M j, Y",
    //         prevArrow:
    //             '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    //         nextArrow:
    //             '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    //         onChange: function (selectedDates) {
    //             handleDateChange(selectedDates[0]);
    //         }, // Use a function to call handleDateChange with the selected date
    //     });
    // }, []);


    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Add Schedule</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Schedule
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onEditSchedule)}>
                    <div className="p-6.5">
                        <div className='mb-4.5'>
                            <div className="relative z-20 bg-white dark:bg-form-input  mb-4.5">
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

                            <div className="relative mb-4.5">
                                <input
                                    type="date"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    placeholder="yyyy/mm/dd"
                                    // data-class="flatpickr-right"

                                    {...register("date", { required: true })}
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />

                                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                                            fill="#64748B"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Time Field */}
                            <div className='mb-4.5 flex items-center gap-x-2 w-full'>
                                <input
                                    type="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />

                                {/* Plus icon to add slot */}
                                <button
                                    type="button"
                                    onClick={handleAddSlot}
                                    className=" bg-primary rounded p-3 text-2xl font-medium text-gray hover:bg-opacity-90 inline-block"
                                >
                                    <GoPlus />
                                </button>
                            </div>

                            {/* Display added slots */}
                            <div>
                                <h2 className="font-medium text-black dark:text-white">Selected Slots</h2>
                                <div className="flex flex-col gap-y-2">
                                    {slots.map((slot, index) => (
                                        <div key={index}>{slot}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Update Slot
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditSchedule;