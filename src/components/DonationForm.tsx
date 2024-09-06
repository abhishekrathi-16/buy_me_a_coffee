"use client";
import { createDonation } from "@/actions/donationActions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function DonationForm({ email }: { email: string }) {
  const [numberInput, setNumberInput] = useState("");
  const [amount, setAmount] = useState(1);
  const [crypto, selectCrypto] = useState("btc");

  useEffect(() => {
    if (numberInput) {
      const intValue = parseInt(numberInput);
      if (intValue > 5 && intValue <= 1000000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue == 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInput]);

  async function handleFormSubmit(formData: FormData){
    formData.set('amount',amount.toString());
    formData.set('crypto',crypto);
    formData.set('email',email);    
    
    const url = await createDonation(formData);
    if(!url){      
      return;
    }
    if(url && window && window.location){
      window.location.href = url;
    }
;  }

  return (
    <form action={handleFormSubmit}>
      <div className="border border-yellow-300 rounded-xl p-4 flex items-center gap-2 bg-yellow-300/10">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        <button
          type="button"
          onClick={() => {
            setAmount(1);
            setNumberInput("1");
          }}
          className={"amount " + (amount === 1 ? "active" : "")}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(3);
            setNumberInput("3");
          }}
          className={"amount " + (amount === 3 ? "active" : "")}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(5);
            setNumberInput("5");
          }}
          className={"amount " + (amount === 5 ? "active" : "")}
        >
          5
        </button>
        <input
          type="number"
          value={numberInput}
          placeholder="10"
          onChange={(e) => setNumberInput(e.target.value)}
          className="w-12 border border-yellow-300 h-12 border rounded-xl text-center"
        />
      </div>
      <div className="mt-2">
        <input type="text" name="name" placeholder="Your Name" />
      </div>
      <div className="mt-2">
        <textarea name="message" placeholder="Say something nice" />
      </div>
      <div className="mt-2">
        <h3 className="text-xs mb-1 text-gray-500">Pay With Selected Crypto or with CC</h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => {
              selectCrypto("btc");
            }}
            className={"crypto " + (crypto === "btc" ? "active" : "")}
          >
            <span>BTC</span>
            <p>BITCOIN</p>
          </button>
          <button
            type="button"
            onClick={() => {
              selectCrypto("eth");
            }}
            className={"crypto " + (crypto === "eth" ? "active" : "")}
          >
            <span>ETH</span>
            <p>ETHEREUM</p>
          </button>
          <button
            type="button"
            onClick={() => {
              selectCrypto("ltc");
            }}
            className={"crypto " + (crypto === "ltc" ? "active" : "")}
          >
            <span>LTC</span>
            <p>LITECOIN</p>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <button className="bg-yellow-300 w-full rounded-xl py-2 font-semibold">
          Support ${amount * 5}
        </button>
      </div>
    </form>
  );
}
