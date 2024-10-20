"use client";

import { useEffect, useRef } from "react";

type LegResult = "long" | "slightlyLong" | "combination" | "slightlyShort" | "short" | "balanced" | "unknown";

type OgResult = {
  height: number;
  waist: number;
  hip: number;
  leg: number;
  expected: LegResult;
};

type TestResult = {
  lowerBody: number;
  // upperBody: number;
  // bodyRatio: number;
  waistHipRatio: number;
} & OgResult;

const ogData: OgResult[] = [
  { height: 177, waist: 90, hip: 100, leg: 79, expected: "combination" },
  { height: 175, waist: 73, hip: 99, leg: 85, expected: "long" },
  { height: 173, waist: 76, hip: 92, leg: 80.5, expected: "short" },
  { height: 172, waist: 105.4, hip: 137.7, leg: 80, expected: "long" },
  { height: 170, waist: 83, hip: 95, leg: 83, expected: "long" },
  { height: 170, waist: 79, hip: 100, leg: 82.5, expected: "slightlyLong" },

  { height: 169, waist: 75, hip: 102, leg: 81, expected: "slightlyShort" },
  { height: 168, waist: 94, hip: 93, leg: 81, expected: "balanced" },
  { height: 168, waist: 90, hip: 105, leg: 76, expected: "long" },
  { height: 168, waist: 76.5, hip: 94, leg: 72.5, expected: "long" },
  { height: 168, waist: 86.6, hip: 106, leg: 80, expected: "slightlyLong" },
  { height: 167.64, waist: 78.74, hip: 91.4, leg: 85, expected: "long" },
  { height: 167.6, waist: 76.75, hip: 99, leg: 82, expected: "slightlyLong" },
  { height: 165, waist: 74.3, hip: 96, leg: 81, expected: "balanced" },
  { height: 165, waist: 74, hip: 106, leg: 72, expected: "slightlyLong" },
  { height: 165, waist: 77.5, hip: 103, leg: 83, expected: "long" },

  { height: 164, waist: 68, hip: 96, leg: 78, expected: "short" },
  { height: 164, waist: 69.5, hip: 93, leg: 79.2, expected: "balanced" },
  { height: 163.5, waist: 86, hip: 108, leg: 75.5, expected: "long" },
  { height: 163, waist: 81, hip: 117, leg: 76.5, expected: "slightlyShort" },
  { height: 163, waist: 81.7, hip: 100.4, leg: 79.5, expected: "long" },
  { height: 160, waist: 81.28, hip: 93.98, leg: 78.74, expected: "combination" },

  { height: 157.48, waist: 83.3, hip: 106, leg: 76.6, expected: "slightlyLong" },
  { height: 157, waist: 83, hip: 113, leg: 82, expected: "long" },
  { height: 157, waist: 69.5, hip: 97, leg: 71.6, expected: "slightlyLong" },
  { height: 152, waist: 99.5, hip: 129, leg: 72, expected: "combination" },
  { height: 152.4, waist: 90, hip: 111, leg: 66, expected: "short" },
  { height: 152, waist: 72, hip: 92.5, leg: 73, expected: "slightlyLong" },
];

// function getLowerbody(leg: number, height: number) {
//   return leg / height;
// }

// function getUpperBody(lowerBody: number) {
//   return 1 - lowerBody;
// }

// function getBodyRatio(upperBody: number, lowerBody: number) {
//   return upperBody / lowerBody;
// }

// function getWaistHipRatio(waist: number, hip: number) {
//   return waist / hip;
// }

// const ogDataMapped = ogData.map((t) => {
//   return {
//     height: t.height,
//     waist: t.waist,
//     hip: t.hip,
//     leg: t.leg,
//     lowerBody: getLowerbody(t.leg, t.height),
//     upperBody: getUpperBody(getLowerbody(t.leg, t.height)),
//     bodyRatio: getBodyRatio(getUpperBody(getLowerbody(t.leg, t.height)), getLowerbody(t.leg, t.height)),
//     waistHipRatio: getWaistHipRatio(t.waist, t.hip),
//     expected: t.expected,
//   };
// });

// @TODO - get torso length, infer head/neck length. if they have a longer torso and/or neck, then leg is shorter

function getLowerbody(leg: number, height: number) {
  return height / leg;
}

function getWaistHipRatio(waist: number, hip: number, height: number) {
  return height / (hip - waist);
}

const ogDataMapped = ogData.map((t) => {
  return {
    height: t.height,
    waist: t.waist,
    hip: t.hip,
    leg: t.leg,
    lowerBody: getLowerbody(t.leg, t.height),
    waistHipRatio: getWaistHipRatio(t.waist, t.hip, t.height),
    expected: t.expected,
  };
});

const testDataSorted = ogDataMapped.sort((a, b) => {
  if (a.height !== b.height) return b.height - a.height;
  if (a.waistHipRatio !== b.waistHipRatio) return b.waistHipRatio - a.waistHipRatio;
  if (a.lowerBody !== b.lowerBody) return b.lowerBody - a.lowerBody;
  if (a.leg !== b.leg) return b.leg - a.leg;
  if (a.hip !== b.hip) return b.hip - a.hip;
  return b.waist - a.waist;
});

const testData: TestResult[] = testDataSorted;

function calc(t: TestResult): LegResult {
  if (t.height >= 170) {
    if (t.waistHipRatio < 5.153 && t.waistHipRatio > 1) {
      return "combination";
    }
    if (t.lowerBody >= 2.141) {
      return "short";
    }
    if (t.lowerBody >= 2.123) {
      return "slightlyShort";
    }
    if (t.lowerBody >= 2.089) {
      return "balanced";
    }
    if (t.lowerBody >= 2.059) {
      return "slightlyLong";
    }

    return "long";
  }

  if (t.height >= 165) {
    if (t.waistHipRatio < 5.153 && t.waistHipRatio > 1) {
      return "combination";
    }
    if (t.lowerBody >= 2.128) {
      return "short";
    }
    if (t.lowerBody >= 2.086) {
      return "slightlyShort";
    }
    if (t.lowerBody >= 2.073) {
      return "balanced";
    }
    if (t.lowerBody >= 2.043) {
      return "slightlyLong";
    }

    return "long";
  }

  if (t.height >= 160) {
    if (t.waistHipRatio < 4.526 && t.waistHipRatio > 1) {
      return "combination";
    }
    if (t.lowerBody >= 2.102) {
      return "short";
    }
    if (t.lowerBody >= 2.086) {
      return "slightlyShort";
    }
    if (t.lowerBody >= 2.069) {
      return "balanced";
    }
    if (t.lowerBody >= 2.051) {
      return "slightlyLong";
    }

    return "long";
  }

  if (t.waistHipRatio < 5.153 && t.waistHipRatio > 1) {
    return "combination";
  }
  if (t.lowerBody >= 2.102) {
    return "short";
  }
  if (t.lowerBody >= 2.086) {
    return "slightlyShort";
  }
  if (t.lowerBody >= 2.069) {
    return "balanced";
  }
  if (t.lowerBody >= 2.051) {
    return "slightlyLong";
  }

  return "long";
}

// const lookingFor = "combination";
// const lookingFor = "short";
// const lookingFor = "slightlyShort";
// const lookingFor = "balanced";
// const lookingFor = "slightlyLong";
// const lookingFor = "long";
const lookingFor = "unknown";

function DataCard({ t }: { t: TestResult }) {
  return (
    <div
      className={`
        w-64 h-min bg-slate-800 p-2 
        ${lookingFor === t.expected ? "border-4 border-pink-500" : ""}
        ${lookingFor === calc(t) ? "ring-4 ring-blue-500" : ""}
      `}
    >
      <div className="flex flex-row justify-between items-center">
        <p>lowerBody:</p>
        <p>{t.lowerBody.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>waistHipRatio:</p>
        <p>{t.waistHipRatio.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>height:</p>
        <p>{t.height.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>leg:</p>
        <p>{t.leg.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>waist:</p>
        <p>{t.waist.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>hip:</p>
        <p>{t.hip.toFixed(4)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Expected:</p>
        <p className={t.expected === lookingFor ? "text-pink-500" : ""}>{t.expected}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Calc:</p>
        <p className={calc(t) === "unknown" ? "text-yellow-500" : ""}>{calc(t)}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p>Match:</p>
        {calc(t) === t.expected ? <p className="text-green-500">YES</p> : <p className="text-red-500">NO</p>}
      </div>
    </div>
  );
}

export default function LegPage() {
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

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <h1>Tests Passed: {testsPassed.current}</h1>
        <h1>Tests Failed: {testsFailed.current}</h1>
        <h1>Tests TOTAL: {testData.length}</h1>
        <div className="flex flex-row gap-2 items-start justify-start">
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-4">
            {testData.map((t, i) => {
              if (calc(t) === t.expected) {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "long" && t.expected === "slightlyLong") {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "slightlyLong" && t.expected === "long") {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "short" && t.expected === "slightlyShort") {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
              if (calc(t) === "slightlyShort" && t.expected === "short") {
                testsPassed.current = testsPassed.current + 1;
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
          <div className="flex flex-1 flex-row flex-wrap items-start justify-start gap-4">
            {testData.map((t, i) => {
              if (calc(t) === "short" && t.expected === "slightlyShort") {
                return;
              }
              if (calc(t) === "slightlyShort" && t.expected === "short") {
                return;
              }
              if (calc(t) === "long" && t.expected === "slightlyLong") {
                return;
              }
              if (calc(t) === "slightlyLong" && t.expected === "long") {
                return;
              }
              if (calc(t) !== t.expected) {
                testsFailed.current = testsFailed.current + 1;
                return <DataCard t={t} key={i} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
