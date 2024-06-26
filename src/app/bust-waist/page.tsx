"use client";

import { useEffect, useRef } from "react";

type TestBust = {
  bust: number;
  waist: number;
  expected: "small" | "medium" | "full" | "very full";
};

const testData: TestBust[] = [
  { bust: 80, waist: 69.5, expected: "small" },
  { bust: 81, waist: 72, expected: "small" },
  { bust: 82.2, waist: 69.5, expected: "small" },
  { bust: 83, waist: 80, expected: "small" },
  { bust: 87, waist: 72.3, expected: "medium" },
  { bust: 87, waist: 75, expected: "medium" },
  { bust: 87, waist: 77.5, expected: "medium" },
  { bust: 87.5, waist: 69, expected: "full" },
  { bust: 88, waist: 68, expected: "full" },
  { bust: 88, waist: 72, expected: "medium" },
  { bust: 88, waist: 77, expected: "medium" },
  { bust: 89, waist: 81, expected: "medium" },
  { bust: 89.1, waist: 74.3, expected: "medium" },
  { bust: 90, waist: 81, expected: "medium" },
  { bust: 90.1, waist: 78.74, expected: "medium" },
  { bust: 90.5, waist: 81.7, expected: "medium" },
  { bust: 91, waist: 76.75, expected: "medium" },
  { bust: 92.2, waist: 79.5, expected: "medium" },
  { bust: 92.5, waist: 76, expected: "medium" },
  { bust: 93, waist: 75, expected: "medium" },
  { bust: 93.2, waist: 83.3, expected: "medium" },
  { bust: 93.5, waist: 79, expected: "medium" },
  { bust: 93.98, waist: 81.28, expected: "medium" },
  { bust: 94, waist: 83, expected: "medium" },
  { bust: 96, waist: 99.5, expected: "full" },
  { bust: 97, waist: 74, expected: "full" },
  { bust: 97, waist: 82.5, expected: "medium" },
  { bust: 98, waist: 83, expected: "medium" },
  { bust: 98, waist: 86, expected: "medium" },
  { bust: 98.5, waist: 86.6, expected: "medium" },
  { bust: 101, waist: 90, expected: "medium" },
  { bust: 102, waist: 94, expected: "very full" },
  { bust: 108.2, waist: 96.2, expected: "medium" },
];

export default function BustWaistPage() {
  const testsPassed = useRef(0);
  const testsFailed = useRef(0);

  useEffect(() => {
    testsPassed.current = 0;
    testsFailed.current = 0;

    return () => {
      testsPassed.current = 0;
      testsFailed.current = 0;
    };
  }, []);

  function calc(bust: number, waist: number) {
    const ratio = bust / waist;

    if (bust >= 80 && ratio < 1) return "full";
    if (ratio < 1) return "medium";
    if (bust >= 100 && ratio >= 1.12) return "medium";
    if (bust >= 100 && ratio >= 1.08) return "very full";
    if (bust >= 90 && ratio >= 1.3) return "full";
    if (bust >= 90 && ratio >= 1.15) return "medium";
    if (bust >= 85 && ratio >= 1.25) return "full";
    if (bust >= 85 && ratio >= 1) return "medium";
    if (bust >= 70 && ratio >= 1) return "small";

    return "unknown";
  }

  // const lookingFor = "very full";
  // const lookingFor = "full";
  // const lookingFor = "medium";
  const lookingFor = "small";

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <h1>Tests Passed: {testsPassed.current}</h1>
        <h1>Tests Failed: {testsFailed.current}</h1>
        <h1>Tests TOTAL: {testData.length}</h1>
        <div className="flex flex-row gap-2 items-start justify-start">
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-2">
            {testData.map((t, i) => {
              if (calc(t.bust, t.waist) === t.expected) {
                testsPassed.current = testsPassed.current + 1;
                return (
                  <div
                    className={`w-64 h-min bg-slate-800 p-2 ${
                      lookingFor === t.expected ? "border-2 border-pink-500" : ""
                    }`}
                    key={i}
                  >
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
                      <p className={t.expected === lookingFor ? "text-pink-500" : ""}>{t.expected}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>Calc:</p>
                      <p className={calc(t.bust, t.waist) === "unknown" ? "text-yellow-500" : ""}>
                        {calc(t.bust, t.waist)}
                      </p>
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
              }
            })}
          </div>
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-2">
            {testData.map((t, i) => {
              if (calc(t.bust, t.waist) !== t.expected) {
                testsFailed.current = testsFailed.current + 1;
                return (
                  <div
                    className={`w-64 h-min bg-slate-800 p-2 ${
                      lookingFor === t.expected ? "border-2 border-pink-500" : ""
                    }`}
                    key={i}
                  >
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
                      <p className={t.expected === lookingFor ? "text-pink-500" : ""}>{t.expected}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>Calc:</p>
                      <p className={calc(t.bust, t.waist) === "unknown" ? "text-yellow-500" : ""}>
                        {calc(t.bust, t.waist)}
                      </p>
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
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
