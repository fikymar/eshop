import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	const items = req.body;
	console.log(items);
	if (req.method === 'POST') {
		try {
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_options: [
					{ shipping_rate: 'shr_1N5R8uLlQw37Ggt7OlhgVBL7' },
					{ shipping_rate: 'shr_1N5lsDLlQw37Ggt7edq9Qb9s' },
				],
				line_items: items.map((item) => {
					return {
						price_data: {
							currency: 'usd',
							product_data: {
								name: item.title,
								description: item.description,
								images: [item.imgURL],
							},
							unit_amount: parseInt(item.price) * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						quantity: item.qty,
					};
				}),
				success_url: `${req.headers.origin}/?success=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			});

			res.json({ url: session.url });
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
