import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AddSchedule from '../../../components/schedule/AddSchedule';

export const metadata: any = {
    title: "Add Schedule",
};
const AddService = () => {
    return (
        <DefaultLayout>
            <AddSchedule />
        </DefaultLayout>
    );
};

export default AddService;