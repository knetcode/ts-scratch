"use client";

import { useState } from "react";

export default function BustWaistPage() {
  const [bust, setBust] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [cup, setCup] = useState<string>("");

  function submitHandler() {
    console.log("bust",      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),)
  }

  return (
    <form className="p-2 flex flex-col gap-2" action={submitHandler}>
      <div className="flex flex-col w-64 gap-1 bg-slate-800 p-2">
        <label htmlFor="bust">bust</label>
        <input
          value={bust}
          onChange={(e) => setBust(e.target.value)}
          className="text-black"
          type="text"
          id="bust"
        />
      </div>
      <div className="flex flex-col w-64 gap-1 bg-slate-800 p-2">
        <label htmlFor="waist">waist</label>
        <input
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          className="text-black"
          type="text"
          id="waist"
        />
      </div>
      <div className="flex flex-col w-64 gap-1 bg-slate-800 p-2">
        <label htmlFor="cup">cup</label>
        <input
          value={cup}
          onChange={(e) => setCup(e.target.value)}
          className="text-black"
          type="text"
          id="cup"
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}
