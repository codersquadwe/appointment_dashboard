import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AllScheduele  from '../../../components/schedule/AllScheduele';

export const metadata: any = {
    title: "All Schedule",
};
const AddService = () => {
    return (
        <DefaultLayout>
            <AllScheduele />
        </DefaultLayout>
    );
};

export default AddService;