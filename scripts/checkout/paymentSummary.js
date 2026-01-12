import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPrice = 0;
    let cartQuantity = 0;
    
    cart.forEach((item) =>{
        const product = getProduct(item.productId);
        productPriceCents += product.priceCents * item.quantity;
        
        const deliveryOption = getDeliveryOption(item.deliveryOptionId);
        shippingPrice = deliveryOption.priceCents;
        cartQuantity += item.quantity;
    });
    const totalBeforTax = productPriceCents + shippingPrice
    const taxPriceCents = totalBeforTax * 0.1;
    const totalCents = totalBeforTax + taxPriceCents;

    const paymentSummaryHTML =`
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforTax)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxPriceCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}