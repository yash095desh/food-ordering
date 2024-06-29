import { auth } from "@/lib/auth";
import { Order } from "@/lib/modals/Orders";
import { ConnectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const POST = async(req) =>{
    ConnectToDb();
    const session = await auth();
    const email = session?.user?.email;
try {
    const {products,address} = await req.json();

    const order = await Order.create({
        email,
        ...address,
        products
    })
    const stripeLineItems = [];
    for(const product of products){

        stripeLineItems.push({
            quantity : 1,
            price_data : {
                currency : 'USD',
                product_data:{
                    name : product.name,
                },
                unit_amount : product.price * 100,
            }
        })
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items : stripeLineItems,
        mode : 'payment',
        customer_email : email,
        success_url : process.env.APPURL + '/orders/' + order._id.toString()+'?clearCart=1',
        cancel_url : process.env.APPURL + '/cart?cancelled=1' ,
        metadata : {orderId : order._id.toString()},
        payment_intent_data : {
            metadata : {orderId : order._id.toString()},
        },
        shipping_options:[
            {
                shipping_rate_data :{
                    display_name : 'Delivery Fee',
                    type : 'fixed_amount',
                    fixed_amount : {amount:500,currency:'USD'},
                },
            }
        ]

    })
    return NextResponse.json(stripeSession.url)
} catch (error) {
    console.log(error)
}
}