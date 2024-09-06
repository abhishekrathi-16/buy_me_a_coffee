import mongoose,{ models, model } from "mongoose";

export type Donation = {
    amount: number;
    name: string;
    email: string;
    message?: string;
    crypto: 'btc'|'eth'|'ltc';
    paid: boolean;
}

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  crypto: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return ['btc','eth','ltc'].includes(v);
      },
    },
  },
  paid: { type: Boolean, default: false }
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationSchema);
