export const stripePayment = async (stripe, email, price,pack) => {
    const session = await stripe.checkout.sessions.create({
      customer_email: `${email}`,
      submit_type: 'pay',
      line_items: [
        {
          
          price: `${price}`,
          quantity:1
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/Premium?pack=${pack}`, 
      cancel_url: `http://localhost:5173/Premium?canceled=true`,
    });
    return session;
  };
  