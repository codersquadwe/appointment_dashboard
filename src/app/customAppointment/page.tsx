import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import CustomAppointment from '../../components/appointment/CustomAppointment';
export const metadata: any = {
    title: "Custom Appointment",
};
const CustomAppointmentPage: React.FC = () => {
    return (
        <div>
            <DefaultLayout>
                <CustomAppointment/>
            </DefaultLayout>
        </div>
    );
};

export default CustomAppointmentPage;