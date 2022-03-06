import { initPayment } from "../http";

export async function showPaymentForm(amount, name, email, address, promoApplied, customerId) {
    try {
        const { data } = await initPayment({ amount: amount * 100 })
        const razorOrderId = data.orderId;
        const keyId = data.keyId;
        const orderAmount = amount * 100

        const paymentForm = document.createElement('form');
        paymentForm.setAttribute('action', 'http://localhost:5000/api/checkout/capture-payment')
        paymentForm.setAttribute('method', 'POST');

        const script = document.createElement('script');

        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.setAttribute('data-key', keyId);
        script.setAttribute('data-amount', orderAmount);
        script.setAttribute('data-curreny', 'INR');
        script.setAttribute('data-order_id', razorOrderId);
        script.setAttribute('data-name', "Wack Culture");
        script.setAttribute('data-description', 'Pay securely with RazorPay');
        script.setAttribute('data-prefill.name', name)
        script.setAttribute('data-prefill.email', email)
        script.setAttribute('data-theme.color', '#000')

        const addressInput = document.createElement('input');
        addressInput.type = 'hidden';
        addressInput.value = address;
        addressInput.setAttribute('name', 'address')

        const orderIdInput = document.createElement('input');
        orderIdInput.type = 'hidden';
        orderIdInput.value = razorOrderId;
        orderIdInput.setAttribute('name', 'orderId')

        const cart = window.localStorage.getItem('cart');
        const cartInput = document.createElement('input');
        cartInput.type = 'hidden';
        cartInput.value = cart;
        cartInput.setAttribute('name', 'cart')

        const promoInput = document.createElement('input');
        promoInput.type = 'hidden';
        promoInput.value = promoApplied;
        promoInput.setAttribute('name', 'promoApplied')

        const customerIdInput = document.createElement('input');
        customerIdInput.type = 'hidden';
        customerIdInput.value = customerId;
        customerIdInput.setAttribute('name', 'customerId')

        const formContainer = document.querySelector('div.rp_payment_form_container')
        formContainer.appendChild(paymentForm);

        paymentForm.appendChild(script);
        paymentForm.appendChild(addressInput);
        paymentForm.appendChild(orderIdInput);
        paymentForm.appendChild(cartInput);
        paymentForm.appendChild(promoInput);
        paymentForm.appendChild(customerIdInput);

    } catch (error) {
        console.error(error)
        alert('Oops! Something went wrong...')
    }
}