// pages/api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Assurez-vous d'ajouter votre clé secrète dans .env.local

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, quantity } = req.body;

        // Remplacez par votre logique pour obtenir les détails du produit (prix, nom, etc.)
        const product = { /* récupérer les détails du produit avec productId */ };

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.product_name,
                        },
                        unit_amount: product.product_price * 100, // Stripe attend le prix en cents
                    },
                    quantity: quantity,
                }],
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
            });

            res.json({ id: session.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
