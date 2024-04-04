import React from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import AddCategoryComp from '../../../components/category/AddCategoryComp';

export const metadata: any = {
    title: "Add Category",
};

const AddCategory: React.FC = () => {
    return (
        <DefaultLayout>
            <AddCategoryComp/>
        </DefaultLayout>
    );
};

export default AddCategory;