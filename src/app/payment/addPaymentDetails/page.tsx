import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AddPaymentComp from '../../../components/payment/AddPaymentComp';

export const metadata: any = {
    title: "Add Payment Details",
}
const AddPaymentDetails = () => {
    return (
        <div>
            <DefaultLayout>
                <AddPaymentComp />
            </DefaultLayout>
        </div>
    );
};

export default AddPaymentDetails;