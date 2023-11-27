import { CardElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';


const CheckOutForm = () => {
    const {email} = useParams()

    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [error, setError] = useState('')
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const totalPrice = 130
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, totalPrice])

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["/users/email",email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users/email/${email}`)
            return result.data
        }
    })

    console.log("from line 40", users)

    const handleSubmit = async (event) => {

        // Block native form submission
        event.preventDefault()

        // is stripe.js not loaded disable the form submission
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        // if card elements is null then disable the form submission
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log("Payment Method Error", error)
            setError(error.message)
        } else {
            console.log("Payment Method", paymentMethod)
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || "Anonymous"
                }

            }
        })

        if (confirmError) {
            console.log('Confirm error', error)
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Somthing went wrong",
                text: `Find error : ${error}`,
                showConfirmButton: false,
                // timer: 3000
            });
        }
        else {
            console.log("Payment Intent", paymentIntent)
            if (paymentIntent.status === 'succeeded') {

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'successfull'
                };

                // console.log(payment)

                const res = await axiosSecure.post('/payments', payment);
                console.log('Payment saved:', res.data);
                console.log("From line 108 of checkoutform", users._id)

                axiosSecure.patch(`/users/${users._id}`)
                    .then(res => {
                        // console.log(res.user)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Wow Gold Member!",
                                text: "You are now a Gold Member.",
                                icon: "success"
                            });
                        }
                        else {
                            refetch()
                            Swal.fire({
                                title: "Already Added!",
                                icon: "error"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error.message}`,
                            icon: "error"
                        });
                    })
                Swal.fire({
                    icon: "success",
                    title: 'Your Payment is successfully',
                    confirmButtonText: "Payment History",
                    customClass: {
                        // Add custom classes for styling
                        title: 'text-lg',
                    },
                    showCancelButton: true,
                    cancelButtonText: "Go Back"

                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        navigate("/dashboard/paymentHistory", { state: { from: location } })
                    }
                })

                refetch()
            }

            setTransactionId(paymentIntent.id)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex justify-center items-center'>
                <CardElement className='w-full lg:w-2/3 border-2 border-orange-300 rounded-lg p-3 m-3'>
                    options={{
                        style: {


                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                </CardElement>
            </div>
            <div className='flex justify-center'>
                <button className='btn btn-primary btn-sm my-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className='text-red text-xs'>{error}</p>
        </form>
    );
};

export default CheckOutForm;