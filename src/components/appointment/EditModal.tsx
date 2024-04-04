import React, { useState, useEffect } from 'react';
import Select from "react-select";
import '../../css/style.css';
import { IoIosArrowDown } from "react-icons/io";
import instance from '@/axios/axios';

const EditAppointmentModal: React.FC<any> = ({ selectedAppointment, handleUpdate, professionals, services, setIsVisible, isVisible }) => {
    const [updatedAppointment, setUpdatedAppointment] = useState({ ...selectedAppointment });
        const [selectedServices, setSelectedServices] = useState<string[]>(updatedAppointment.service || []);
        const [selectedDate, setSelectedDate] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState<string>(updatedAppointment.time || "");
     const [selectedProfessional, setSelectedProfessional] = useState<string>(updatedAppointment.professional || "");
      const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUpdatedAppointment({ ...updatedAppointment, [name]: value });
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(updatedAppointment)
        handleUpdate(updatedAppointment);
    }; 
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


    console.log(selectedServices)
    console.log(updatedAppointment)
    return (
         <div className={`book-modal-wrapper ${isVisible ? 'visible' : ''}`}>
            <div className="backdrop" onClick={() => setIsVisible(false)}></div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 lg:md:h-[70vh] h-[80vh] lg:md:w-[50vw] w-[400px] overflow-auto p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-2.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Client Email</label>
                        <input
                            type="email"
                            name="client_email"
                            value={updatedAppointment.client_email}
                            onChange={handleChange}
                            disabled
                            readOnly
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-2.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Date</label>
                        <input
    type="date"
    name="date"
    value={updatedAppointment.date}
    onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, date: e.target.value })}
    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
/>
                    </div>
                    <div className="mb-4.5">
                        <div className="relative z-20 bg-white dark:bg-form-input  mb-4.5">
                             <label className="mb-3 block text-sm font-medium text-black dark:text-white">Select Professional</label>
                            <select
                                value={selectedProfessional}
                                onChange={(e) => setSelectedProfessional(e.target.value)}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                            >
                                <option value="" disabled className="text-body dark:text-bodydark">
                                    Select Professional
                                </option>
                                {professionals.map((prof: any) => (
                                    <option key={prof._id} value={prof._id} className="text-body dark:text-bodydark">
                                        {' '}
                                        {prof.name}
                                    </option>
                                ))}
                            </select>

                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                <IoIosArrowDown />
                            </span>
                        </div>
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Select Time Slot</label>
                        <div className="relative z-20 bg-white dark:bg-form-input mb-4.5">
                            <select
                                value={selectedSlot}
                                defaultValue={updatedAppointment.time}
                                onChange={(e) => setSelectedSlot(e.target.value)}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                                    isOptionSelected ? 'text-black dark:text-white' : ''
                                }`}
                            >
                                <option value="" selected className="text-body dark:text-bodydark">
                                 {updatedAppointment.time}
                                </option>
                                {availableSlots.map((slot: any) => (
                                    <option key={slot} value={slot} className="text-body dark:text-bodydark">
                                        {' '}
                                        {slot}
                                    </option>
                                ))}
                            </select>

                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                <IoIosArrowDown />
                            </span>
                        </div>
                    </div>
                    <div className="mb-2.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Services</label>
                        <Select
                            options={services.map((service: any) => ({ label: service.title, value: service._id }))}
                            isMulti
                            defaultValue={updatedAppointment.service}
                            value={selectedServices.map((serviceId) => ({
                                label: services.find((service: any) => service._id === serviceId)?.title,
                                value: serviceId,
                            }))}
                            onChange={(selectedOptions) => setSelectedServices(selectedOptions.map((option) => option.value))}
                            className={`border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white dark:focus:border-primary dark:border-form-strokedark`}
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Total Price</label>
                        <input
                            type="number"
                            name="total_price"
                            value={updatedAppointment.total_price}
                            onChange={handleChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Amount Paid</label>
                        <input
                            type="number"
                            name="paid"
                            value={updatedAppointment.paid}
                            onChange={handleChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    {/* Add other fields here */}
                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditAppointmentModal;
