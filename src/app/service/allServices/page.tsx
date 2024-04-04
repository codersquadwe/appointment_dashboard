import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AllServiceComp from '../../../components/service/AllServiceComp';

export const metadata: any = {
    title: "Add Service",
};
const AddService = () => {
    return (
        <DefaultLayout>
            <AllServiceComp />
        </DefaultLayout>
    );
};

export default AddService;