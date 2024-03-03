import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AddServiceComp from '../../../components/service/AddServiceComp';

export const metadata: any = {
    title: "Add Service",
};
const AddService = () => {
    return (
        <DefaultLayout>
            <AddServiceComp />
        </DefaultLayout>
    );
};

export default AddService;