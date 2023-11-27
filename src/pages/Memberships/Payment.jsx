import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../sharedComponents/SectionTitle/SectionTitle';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY)

const Payment = () => {
    return (
        <div className=' bg-white rounded  lg:mx-12 my-6 py-6 lg:p-12'>
             <SectionTitle subHeading="Please Pay" heading="Payment"></SectionTitle>
            <div className=''>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;