import React from 'react';
import AllCategoriesComp from '../../../components/category/AllCategoriesComp';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

export const metadata: any = {
    title: "All Categories",
};

const AllCategories = () => {
    return (
        <DefaultLayout>
            <AllCategoriesComp/>            
        </DefaultLayout>
    );
};

export default AllCategories;