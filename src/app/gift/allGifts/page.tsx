import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AllGiftsComp from '../../../components/gift/AllGiftsComp';

export const metadata: any = {
    title: "All Gifts",
}
const AllGifts = () => {
    return (
        <div>
            <DefaultLayout>
                <AllGiftsComp/>
            </DefaultLayout>
            
        </div>
    );
};

export default AllGifts;