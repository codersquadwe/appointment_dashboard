'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdModeEdit } from "react-icons/md";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Cookies from 'js-cookie';
import EditModal from "./EditModal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MySwal = withReactContent(Swal);

const AllAppointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [profs, setProfs] = useState<any[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null); 
    const brand = Cookies.get("name");
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/service/getAllServices?brand=${brand}`);
                if (res.status === 200) {
                    setServices(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getAppointments = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/appointment/getAllAppointments`);
                if (res.status === 200) {
                    setAppointments(res.data.data);
                }
            } catch (e) {
                console.log(e)
            }
        }


        const getAllProf = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/professional/getAllProfessionals/`);
                if (res.status === 200) {
                    setProfs(res.data.data);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getServices()
        getAllProf()
        getAppointments()

    }, [brand])


    const getProfessionalName = (professionalId: any) => {
        const professional: any = profs.find(prof => prof._id === professionalId);
        return professional ? professional.name : '';
    };

    const getServiceName = (serviceIds: string[]) => {
        const serviceNames = serviceIds.map(serviceId => {
            const service: any = services.find(service => service._id === serviceId);
            return service ? service.title : '';
        });
        return serviceNames.join(', '); // Concatenate service names with comma separator
    };

    const handleCancel = async (appointmentId: string) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/appointment/cancelAppointment/${appointmentId}`);
            if (response.status === 200) {
                setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (appointmentId: string) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result:any) => {
            if (result.isConfirmed) {
                handleCancel(appointmentId);
                MySwal.fire(
                    'Deleted!',
                    'Your appointment has been deleted.',
                    'success'
                );
            }
        })
    };


    const handleUpdate = async (updatedAppointment:any) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/updateAppointment/${updatedAppointment._id}`, updatedAppointment);
        console.log(response)
        if (response.status === 200) {
            // Update the appointments state with the updated appointment
            setIsVisible(false)
            toast.success("Appointment Updated")
            setAppointments(appointments.map(appointment => appointment._id === updatedAppointment._id ? updatedAppointment : appointment));
            // Close the modal here
        
        }
    } catch (error) {
        console.log(error);
    }
};
 const handleEdit = (appointment: any) => {
    setIsVisible(true)
        setSelectedAppointment(appointment);
        // Open the edit modal here
    };


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Appointments
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Date
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Time
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Professional
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Client Email
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Services
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Total
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Paid
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Actions
                        </h5>
                    </div>
                </div>

                {appointments.map((appoint: any, key) => (
                    <div
                        className={`grid grid-cols-8 ${key === appointments.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-black dark:text-white">{appoint.date}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-black dark:text-white">{appoint.time}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-black dark:text-white">{getProfessionalName(appoint.professional)}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-black dark:text-white">{appoint.client_email}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-black dark:text-white">{getServiceName(appoint.service)}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-black dark:text-white">${appoint.total_price}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px]">
                            <p className="text-meta-5">${appoint.paid}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5 text-[15px] gap-x-2">
                            <button
                                className="text-xl bg-danger text-[#fff] rounded-full p-2"
                                onClick={() => handleDelete(appoint._id)}><MdDelete /></button>
                            <button className="text-xl bg-warning text-[#fff] rounded-full p-2" 
                            onClick={() => handleEdit(appoint)}
                             ><MdModeEdit /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isVisible && 
            <EditModal
            selectedAppointment={selectedAppointment}
            handleUpdate={handleUpdate}
            professionals={profs}
            services={services}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            />}
               <ToastContainer />
        </div>
    );
};

export default AllAppointments;
