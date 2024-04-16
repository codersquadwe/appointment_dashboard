import React from 'react';
import AllEmails from '../../../components/newsletter/AllEmails';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

export const metadata: any = {
    title: "All Subscribed Emails",
}

const AddLocation = () => {
    return (
        <div>
            <DefaultLayout>
                <AllEmails />
            </DefaultLayout>
        </div>
    );
};

export default AddLocation;