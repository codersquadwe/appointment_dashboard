import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AddProfessionalComp from '../../../components/Professionals/AddProfessionalComp';

export const metadata: any = {
    title: "Add Professional",
};
const AddProfessional: React.FC = () => {
    return (
        <DefaultLayout>
            <AddProfessionalComp/>            
        </DefaultLayout>
    );
};

export default AddProfessional;