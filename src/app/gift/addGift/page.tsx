import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AddGiftComp from '../../../components/gift/AddGiftComp';

export const metadata: any = {
    title: "Add Gift",
}
const AddGift = () => {
    return (
        <div>
            <DefaultLayout>
                <AddGiftComp/>
            </DefaultLayout>
        </div>
    );
};

export default AddGift;