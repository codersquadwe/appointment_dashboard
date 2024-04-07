import React from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import EditServiceComp from '../../../../components/service/EditServiceComp';
import { useRouter } from 'next/router';

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