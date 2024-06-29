import { Order } from '@/lib/modals/Orders';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const POST =async(req)=>{
    try {
        const body = await req.text();
        const sig = req.headers.get('stripe-signature');

        let event = stripe.webhooks.constructEvent(body,sig,process.env.STRIPE_SIGN_SECRET);
        if(event.type === "checkout.session.completed"){
            const id = event?.data?.object?.metadata?.orderId ;
            await Order.findByIdAndUpdate(id,{paid:true})
        }
        return NextResponse.json('ok',{status:200})
    } catch (error) {
        console.log(error)
    }
}