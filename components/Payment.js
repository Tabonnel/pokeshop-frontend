import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";

import CheckoutForm from "../components/CheckoutForm";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NnH79CGeghBSZjOmK048CObgQSEaxjlJAjKtzIw1u3eeRz6K9LVV7etlsLj7gVOK6KIQWQNSO7BHqktl3tun3DO00JSkbRUe4"
);

function Payment() {
  const cart = useSelector((state) => state.cart.items);
  const [clientSecret, setClientSecret] = useState("");
  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://pokeshop-backend.vercel.app/payment/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items:  cart  }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

//   console.log(clientSecret)

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#11385f",
      colorText: "#616270",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
