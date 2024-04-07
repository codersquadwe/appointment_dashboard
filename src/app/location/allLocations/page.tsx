import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AllLocationComp from '../../../components/location/AllLocationComp';

export const metadata: any = {
    title: "All Locations",
}

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