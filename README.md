This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Authorisation

The project uses **[Next-Auth](https://next-auth.js.org/)** for authorisation with **Google OAuth 2.0**. Check [documentation](https://next-auth.js.org/providers/google) on how to use with Google cloud console.

## Storage

Uses **MongoDB** for the storage of data and the application directly links with the database through Next-Auth mongoDB adapters to store information of signed up users.

Also uses **MongoDB** for storing data relevant to user profile and donations.

This project leverages **AWS S3 bucket** to store static images used for profile pictures and cover images.

## Payment

For donation payments, the project is integrated with **Cryptomus**.
(This payment method with Cryptomus has stopped working due to some functional errors, redefining the payment procedure with other alternatives soon)

## Deployment

This project was deployed to **Vercel**. You can find it deployed [here](https://buy-me-a-coffee-xi.vercel.app/).