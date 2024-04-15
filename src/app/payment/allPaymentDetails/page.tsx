import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AllPaymentsComp from '../../../components/payment/AllPaymentTsx';

export const metadata: any = {
    title: "All Payment Details",
}
const AllPaymentDetails = () => {
    return (
        <div>
            <DefaultLayout>
                <AllPaymentsComp />
            </DefaultLayout>
        </div>
    );
};

export default AllPaymentDetails;