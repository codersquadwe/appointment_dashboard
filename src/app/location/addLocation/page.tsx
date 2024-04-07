import React from 'react';
import AddLocationComp from '../../../components/location/AddLocationComp';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

const AddLocation = () => {
    return (
        <div>
            <DefaultLayout>
                <AddLocationComp/>
            </DefaultLayout>            
        </div>
    );
};

export default AddLocation;