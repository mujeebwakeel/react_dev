import React, { useEffect } from "react"

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

useEffect(() => {
    if (productId) {
        dispatchEvent(addToCart(productId, qty));
    }
}, [])

    return (
        <div>This is from the cartscreen page</div>
    )
}


export default CartScreen;