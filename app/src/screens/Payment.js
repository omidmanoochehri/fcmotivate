/* eslint-disable prettier/prettier */
import React from 'react';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import GLOBALS from '../utils/Globals';

export default function Payment() {
  const {confirmPayment} = useStripe();

  return (
    <StripeProvider
      publishableKey={GLOBALS.STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier={GLOBALS.STRIPE_MERCHANT_IDENTIFIER} // required for Apple Pay
      //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </StripeProvider>
  );
}
