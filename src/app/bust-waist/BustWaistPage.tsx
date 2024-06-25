"use client";
import { useRef, useState } from "react";
import { testbust } from "./page";

export default function BustWaistPage() {
  const [bust, setBust] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [result, setResult] = useState<string | number>("");
  const testsPassed = useRef(0);
  const testsFailed = useRef(0);

  function submitHandler() {
    console.log("bust", bust);
    console.log("waist", waist);
    console.log("result", Number(bust) / Number(waist));
    setResult(Number(bust) / Number(waist));
  }

  function calc(bust: number, waist: number) {
    const ratio = bust / waist;

    if (ratio > 1.3) {
      return "very full";
    }

    if (ratio > 1.22) {
      return "full";
    }

    if (ratio > 1.183) {
      return "medium";
    }

    if (ratio > 1) {
      return "small";
    }
  }

  return (
    <div className="w-64">
      <form className="p-2 flex flex-col gap-2" action={submitHandler}>
        <h1>PLAYGROUND</h1>
        <div className="flex flex-col w-full gap-1 bg-slate-800 p-2">
          <label htmlFor="bust">bust</label>
          <input
            value={bust}
            onChange={(e) => setBust(e.target.value)}
            className="text-black"
            type="text"
            id="bust"
          />
        </div>
        <div className="flex flex-col w-full gap-1 bg-slate-800 p-2">
          <label htmlFor="waist">waist</label>
          <input
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="text-black"
            type="text"
            id="waist"
          />
        </div>
        <button type="submit">submit</button>
      </form>
      <div>
        <h1>RESULTS</h1>
        <p>{result}</p>
      </div>
      <div>
        <h1>TEST DATA</h1>
        <h1>Tests Passed: {testsPassed}</h1>
        <h1>Tests Failed: {testsFailed}</h1>
        <div className="flex flex-col gap-2">
          {testbust.map((t, i) => {
            if (calc(t.bust, t.waist) === t.expected) {
              setTestsPassed(testsPassed + 1);
            } else {
              setTestsFailed(testsPassed + 1);
            }

            return (
              <div className=" bg-slate-800 p-2" key={i}>
                <div className="flex flex-row justify-between items-center">
                  <p>Bust:</p>
                  <p>{t.bust}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>Waist:</p>
                  <p>{t.waist}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>Ratio:</p>
                  <p>{t.bust / t.waist}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>Expected:</p>
                  <p>{t.expected}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>Calc:</p>
                  <p>{calc(t.bust, t.waist)}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>Match:</p>
                  {calc(t.bust, t.waist) === t.expected ? (
                    <p className="text-green-500">YES</p>
                  ) : (
                    <p className="text-red-500">NO</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
