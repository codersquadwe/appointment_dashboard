import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AllLocationComp from '../../../components/location/AllLocationComp';

const AllLocations = () => {
    return (
        <div>
            <DefaultLayout>
                <AllLocationComp/>
            </DefaultLayout>
        </div>
    );
};

export default AllLocations;