import React from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import EditServiceComp from '../../../../components/service/EditServiceComp';

export const metadata: any = {
    title: "Edit Service",
};
const EditService = () => {
    return (
        <div>
            <DefaultLayout>
                <EditServiceComp />
            </DefaultLayout>
        </div>
    );
};

export default EditService;