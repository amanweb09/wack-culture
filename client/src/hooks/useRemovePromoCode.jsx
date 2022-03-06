import { removePromoCode } from "../http";

export const useRemovePromoCode = (setLoading, setLoadingText) => {
    return async function () {
        setLoadingText("We're removing the promo code")
        setLoading(true)
        const cart = window.localStorage.getItem('cart');

        try {
            const promoDetails = {
                cartAmount: JSON.parse(cart).totalPrice,
                isApplied: JSON.parse(cart).isApplied,
                codeApplied: JSON.parse(cart).promoApplied,
                discountType: JSON.parse(cart).discountType
            };

            const { data } = await removePromoCode(promoDetails)
            const { newAmt, canApply } = data;

            let _cart = { ...JSON.parse(cart) }
            _cart.totalPrice = newAmt;
            delete _cart.isApplied
            delete _cart.promoApplied
            delete _cart.discountType
            delete _cart.discount

            window.localStorage.setItem('cart', JSON.stringify(_cart));
            window.localStorage.setItem('canApply', canApply.toString())
            setLoading(false)

            window.location.href = '/cart'

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
}