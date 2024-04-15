import React from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import EditProfessionalComp from '../../../../components/Professionals/EditProfessionalComp';

export const metadata: any = {
    title: "Edit Payment Details",
    description: "Edit Payment Details",
}

const EditPaymentDetails = () => {
    return (
        <div>
            <DefaultLayout>
                <EditProfessionalComp />
            </DefaultLayout>
        </div>
    );
};

export default EditPaymentDetails;