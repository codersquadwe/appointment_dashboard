import React from 'react';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import EditProfessionalComp from '../../../../components/Professionals/EditProfessionalComp';

export const metadata: any = {
    title: "Edit Professional",
};
const EditProfessional = () => {
    return (
        <div>
            <DefaultLayout>
                <EditProfessionalComp />
            </DefaultLayout>
        </div>
    );
};

export default EditProfessional;