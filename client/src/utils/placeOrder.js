import { checkout } from "../http";

export async function placeOrder(address, setLoading, setLoadingText, setOrderSuccess, setShowPaymentsModal) {
    if (address.address_line_1 === '' || address.address_line_2 === '' || address.landmark === '' || address.city === '' || address.state === '' || address.pincode === '' || address.country === '') {
        alert('Please fill in the shipping information')
        return;
    }

    setLoadingText("Till we're placing your order")
    setLoading(true)

    const cart = window.localStorage.getItem('cart');
    const isPaid = false
    const paymentType = 'COD'
    const promoApplied = JSON.parse(cart).isApplied ? JSON.parse(cart).promoApplied : 'not applied'

    const stringedAddress = `${address.address_line_1}, ${address.address_line_2}, ${address.landmark},${address.city}, ${address.state}-${address.pincode}, ${address.country}`

    try {
        await checkout({
            cart: JSON.parse(cart), address: stringedAddress, isPaid, paymentType, promoApplied
        })

        setOrderSuccess(true)
        setShowPaymentsModal(false)
        setLoadingText('')
        setLoading(false)

    } catch (error) {
        console.log(error.response.data);
        alert("Oops! Order Couldn't be Placed!")
        setLoading(false)
        setShowPaymentsModal(false)

    }
}