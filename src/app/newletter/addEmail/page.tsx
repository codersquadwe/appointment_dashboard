import React from 'react';
import AddNewsletterEmail from '../../../components/newsletter/AddNewsletterEmail';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

export const metadata: any = {
    title: "Add Email",
}

const AddLocation = () => {
    return (
        <div>
            <DefaultLayout>
                <AddNewsletterEmail/>
            </DefaultLayout>            
        </div>
    );
};

export default AddLocation;