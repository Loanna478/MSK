import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
};

export default getStripe;