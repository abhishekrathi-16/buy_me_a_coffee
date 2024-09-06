"use server";

import { DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import axios from "axios";
import md5 from "md5";
import mongoose from "mongoose";

export async function createDonation(
  formData: FormData
): Promise<string | false> {
  // 1. save to our database
  const { amount, name, message, crypto, email } = Object.fromEntries(formData);

  mongoose.connect(process.env.MONGODB_URI as string);
  const donationDoc = await DonationModel.create({
    amount,
    name,
    message,
    crypto,
    email,
  });

  const profileDoc = await ProfileInfoModel.findOne({ email });
  if (!profileDoc) return false;

  // 2. create cryptomus invoice and return the url
  const endpoint = "https://api.cryptomus.com/v1/payment";
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY;
  const data = {
    amount: (parseInt(amount as string) * 5).toString() + ".00",
    currency: "USD",
    order_id: donationDoc._id.toString(),
    to_currency: (crypto as string).toUpperCase(),

    // uncomment these while pushing for production

    url_callback: process.env.NEXTAUTH_URL+"/callback?id="+donationDoc._id,
    url_return: process.env.NEXTAUTH_URL ||
      "http://localhost:3000" + "/" + profileDoc.username,
    url_success:
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000" + "/" + profileDoc.username + "?success=1",

    // url_callback:
    //   "https://956c-2405-201-801b-c005-ddda-664a-2657-2f09.ngrok-free.app/callback?id=" +
    //   donationDoc._id,
    // url_return: "http://localhost:3000/" + profileDoc.username,
    // url_success: "http://localhost:3000/" + profileDoc.username + "?success=1",
  };
  
  const merchantId = process.env.CRYPTOMUS_MERCHANT_ID as string;
  const sign = md5(btoa(JSON.stringify(data)) + apiKey);
  
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        merchantId,
        sign,
      },
    });
    console.log(response.data);
    
    return response.data.result.url;

  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    }
  }

  return false;
}
