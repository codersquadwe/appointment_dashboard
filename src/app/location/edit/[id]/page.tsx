import React from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import EditLocationComp from '../../../../components/location/EditLocation';

export const metadata: any = {
    title: "Edit Location",
}

const EditLocation = () => {
    return (
        <div>
            <DefaultLayout>
                <EditLocationComp/>
            </DefaultLayout>
        </div>
    );
};

export default EditLocation;