import DefaultLayout from '@/components/Layouts/DefaultLayout';
import AllProfessionalComp from '@/components/Professionals/AllProfessionalComp';
import React from 'react';

export const metadata: any = {
    title: "All Professionals",
};
const AllProfessionals: React.FC = () => {
    return (
        <DefaultLayout>
            <AllProfessionalComp/>            
        </DefaultLayout>
    );
};

export default AllProfessionals;