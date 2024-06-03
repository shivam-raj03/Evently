'use server'

import { loadStripe }  from '@stripe/stripe-js';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

interface orderProps {
    totalTickets: number,
    totalAmount: number,
    user: any,
    event: any
}

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export async function checkoutOrder(order: orderProps){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    try {
         // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price_data:{
                        currency: 'inr',
                        unit_amount: order.totalAmount*100,
                        product_data: {
                            name: order.event.title
                        }
                    },
                    quantity: order.totalTickets
                }
            ],
            metadata:{
                totalTickets: order.totalTickets,
                userId: order.user._id,
                eventId: order.event._id,
            },
            mode: 'payment',
            success_url: `http://localhost:3000/tickets`,
            cancel_url: `http://localhost:3000/event/${order.event._id}`,
        });
        console.log(session.url);
        redirect(session.url!)
    } catch (error) {
        console.log(error);
        throw error
    }
}