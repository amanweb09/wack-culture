import { useEffect } from 'react';

export function useMountRazorpayButton(keyId, amount, order_id, name, email) {
    useEffect(() => {

        const paymentForm = document.createElement('form');
        paymentForm.setAttribute('action', 'http://localhost:5000/api/checkout/receive-payment')
        paymentForm.setAttribute('method', 'POST');

        document.body.appendChild(paymentForm);

        const script = document.createElement('script');
        script.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js');
        script.setAttribute('data-key', keyId);
        script.setAttribute('data-amount', amount);
        script.setAttribute('data-curreny', 'INR');
        script.setAttribute('data-order_id', order_id);
        script.setAttribute('data-name', "The Goblin's Wardrobe");
        script.setAttribute('data-description', 'Pay securely with RazorPay');
        script.setAttribute('data-prefill.name', name)
        script.setAttribute('data-prefill.email', email)
        script.setAttribute('data-theme.color', '#F37254')

    }, [])
}