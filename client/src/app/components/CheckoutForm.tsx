"use client"

import { Button } from '@/components/ui/button';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = { "amount" : 5};

    const secret = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/create-payment-intent`,data);

    const paymentSecret = secret.data.clientSecret;
    //@ts-ignore
    const { error, paymentIntent } = await stripe.confirmCardPayment(
            //@ts-ignore
      paymentSecret,
      {
        payment_method: {
                //@ts-ignore
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
            //@ts-ignore
      setError(error.message);
    } else {
      // Handle successful payment
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full mx-28'>
      <CardElement />
      <Button type="submit" disabled={!stripe || loading}>
        Pay
      </Button>
      {error && <div>{error}</div>}
    </form>
  )
}

export default CheckoutForm
