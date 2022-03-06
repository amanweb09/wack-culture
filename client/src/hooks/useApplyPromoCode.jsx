import { applyPromoCode } from "../http";

export const useApplyPromoCode = (promoCode, setDiscount, dispatch, setLoading, setLoadingText) => {
    return async function () {

        setLoadingText("We're applying your promo code!")
        setLoading(true)
        const cart = window.localStorage.getItem('cart');

        const promoDetails = {
            code: promoCode,
            cartAmount: JSON.parse(cart).totalPrice
        }

        const canApply = window.localStorage.getItem('canApply');

        if (!canApply || canApply === 'true') {
            try {
                const { data } = await applyPromoCode(promoDetails)
                const { canApply, discountType, isApplied, newAmt, discount } = data;

                let _cart = { ...JSON.parse(cart) }
                _cart.totalPrice = newAmt;
                _cart.discount = discount;
                _cart.discountType = discountType;
                _cart.isApplied = isApplied;
                _cart.promoApplied = promoCode;

                window.localStorage.setItem('cart', JSON.stringify(_cart))
                window.localStorage.setItem('canApply', canApply);

                setDiscount(discount)
                setLoading(false)
                setLoadingText('')
                dispatch({ type: 'setSuccess', payload: { message: 'Woohoo! Promo Code applied Successfully!' } })

            } catch (error) {
                console.log(error);
                dispatch({ type: 'setError', payload: { message: error.response.data.err } })
                setLoading(false)
                setLoadingText('')
            }
        }

        else {
            dispatch({ type: 'setError', payload: { message: 'Only one promo code can be applied at a time!' } })
            setLoading(false)
            setLoadingText('')
        }

    }
}