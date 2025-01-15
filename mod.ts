// @ts-nocheck lib type code
import { ensureDirSync, existsSync } from "@std/fs";
import { join as joinPath } from "@std/path";
type RunStepsOptions<TStepKeys> = {
  from?: TStepKeys | number;
  cacheDir: string;
};

// 1 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<TStep1Key>,
  ) => TStep1Ret)
  & {
    $inferStepInputs: [
      TInput,
    ];
  };

// 2 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
  TStep2Key extends string,
  TStep2Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
  step2: [
    TStep2Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]
      >,
    ) => TStep2Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<TStep1Key | TStep2Key>,
  ) => TStep2Ret)
  & {
    $inferStepInputs: [
      TInput,
      TupleToRecord<["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]>,
    ];
  };

// 3 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
  TStep2Key extends string,
  TStep2Ret,
  TStep3Key extends string,
  TStep3Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
  step2: [
    TStep2Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]
      >,
    ) => TStep2Ret,
  ],
  step3: [
    TStep3Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
    ) => TStep3Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<TStep1Key | TStep2Key | TStep3Key>,
  ) => TStep3Ret)
  & {
    $inferStepInputs: [
      TInput,
      TupleToRecord<["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]>,
      TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
    ];
  };

// 4 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
  TStep2Key extends string,
  TStep2Ret,
  TStep3Key extends string,
  TStep3Ret,
  TStep4Key extends string,
  TStep4Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
  step2: [
    TStep2Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]
      >,
    ) => TStep2Ret,
  ],
  step3: [
    TStep3Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
    ) => TStep3Ret,
  ],
  step4: [
    TStep4Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ] | [
          TStep3Key,
          Awaited<TStep3Ret>,
        ]
      >,
    ) => TStep4Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<
      TStep1Key | TStep2Key | TStep3Key | TStep4Key
    >,
  ) => TStep4Ret)
  & {
    $inferStepInputs: [
      TInput,
      TupleToRecord<["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]>,
      TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
    ];
  };

// 5 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
  TStep2Key extends string,
  TStep2Ret,
  TStep3Key extends string,
  TStep3Ret,
  TStep4Key extends string,
  TStep4Ret,
  TStep5Key extends string,
  TStep5Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
  step2: [
    TStep2Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]
      >,
    ) => TStep2Ret,
  ],
  step3: [
    TStep3Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
    ) => TStep3Ret,
  ],
  step4: [
    TStep4Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
    ) => TStep4Ret,
  ],
  step5: [
    TStep5Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
      >,
    ) => TStep5Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<
      TStep1Key | TStep2Key | TStep3Key | TStep4Key | TStep5Key
    >,
  ) => TStep5Ret)
  & {
    $inferStepInputs: [
      TInput,
      TupleToRecord<["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]>,
      TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
      >,
    ];
  };

// 6 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
  TStep2Key extends string,
  TStep2Ret,
  TStep3Key extends string,
  TStep3Ret,
  TStep4Key extends string,
  TStep4Ret,
  TStep5Key extends string,
  TStep5Ret,
  TStep6Key extends string,
  TStep6Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
  step2: [
    TStep2Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]
      >,
    ) => TStep2Ret,
  ],
  step3: [
    TStep3Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
    ) => TStep3Ret,
  ],
  step4: [
    TStep4Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
    ) => TStep4Ret,
  ],
  step5: [
    TStep5Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
      >,
    ) => TStep5Ret,
  ],
  step6: [
    TStep6Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
        | [TStep5Key, Awaited<TStep5Ret>]
      >,
    ) => TStep6Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<
      TStep1Key | TStep2Key | TStep3Key | TStep4Key | TStep5Key | TStep6Key
    >,
  ) => TStep6Ret)
  & {
    $inferStepInputs: [
      TInput,
      TupleToRecord<["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]>,
      TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
        | [TStep5Key, Awaited<TStep5Ret>]
      >,
    ];
  };

// 7 steps
export function runSteps<
  TInput extends unknown,
  TStep1Key extends string,
  TStep1Ret,
  TStep2Key extends string,
  TStep2Ret,
  TStep3Key extends string,
  TStep3Ret,
  TStep4Key extends string,
  TStep4Ret,
  TStep5Key extends string,
  TStep5Ret,
  TStep6Key extends string,
  TStep6Ret,
  TStep7Key extends string,
  TStep7Ret,
>(
  step1: [
    TStep1Key,
    (input: TInput) => TStep1Ret,
  ],
  step2: [
    TStep2Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]
      >,
    ) => TStep2Ret,
  ],
  step3: [
    TStep3Key,
    (
      inputs: TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
    ) => TStep3Ret,
  ],
  step4: [
    TStep4Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
    ) => TStep4Ret,
  ],
  step5: [
    TStep5Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
      >,
    ) => TStep5Ret,
  ],
  step6: [
    TStep6Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
        | [TStep5Key, Awaited<TStep5Ret>]
      >,
    ) => TStep6Ret,
  ],
  step7: [
    TStep7Key,
    (
      inputs: TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
        | [TStep5Key, Awaited<TStep5Ret>]
        | [TStep6Key, Awaited<TStep6Ret>]
      >,
    ) => TStep7Ret,
  ],
):
  & ((args: TInput) => (
    options?: RunStepsOptions<
      | TStep1Key
      | TStep2Key
      | TStep3Key
      | TStep4Key
      | TStep5Key
      | TStep6Key
      | TStep7Key
    >,
  ) => TStep7Ret)
  & {
    $inferStepInputs: [
      TInput,
      TupleToRecord<["input", TInput] | [TStep1Key, Awaited<TStep1Ret>]>,
      TupleToRecord<
        ["input", TInput] | [TStep1Key, Awaited<TStep1Ret>] | [
          TStep2Key,
          Awaited<TStep2Ret>,
        ]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
      >,
      TupleToRecord<
        | ["input", TInput]
        | [TStep1Key, Awaited<TStep1Ret>]
        | [TStep2Key, Awaited<TStep2Ret>]
        | [TStep3Key, Awaited<TStep3Ret>]
        | [TStep4Key, Awaited<TStep4Ret>]
        | [TStep5Key, Awaited<TStep5Ret>]
        | [TStep6Key, Awaited<TStep6Ret>]
        | [TStep7Key, Awaited<TStep7Ret>]
      >,
    ];
  };

export function runSteps(...steps) {
  const fn =
    (input) => async ({ from, cacheDir }: RunStepsOptions<string, string>) => {
      console.log(`using cache dir: ${cacheDir}`);

      let fromIndex: number;
      if (!from) {
        fromIndex = 0;
      } else if (typeof from === "string") {
        fromIndex = steps.findIndex(([stepName]) => stepName === from);
      } else {
        if (from < 0) {
          fromIndex = steps.length + from;
        } else {
          fromIndex = from;
        }
      }

      const stepsResult = { input };

      ensureDirSync(cacheDir);
      const getCacheFilePath = (stepName: string) =>
        joinPath(cacheDir, `${stepName}.json`);
      const doesCacheFileExist = (stepName: string) =>
        existsSync(getCacheFilePath(stepName));
      const readCacheFile = (stepName: string) =>
        JSON.parse(Deno.readTextFileSync(getCacheFilePath(stepName)));

      const writeCacheFile = (stepName: string, result: any) => {
        if (result === undefined || result === null) {
          result = {};
        }
        const filePath = getCacheFilePath(stepName);
        Deno.writeTextFile(filePath, JSON.stringify(result, null, 2)).then(
          () => {
            console.log(`${stepName}: written cache file file://${filePath}`);
          },
        );
      };

      for (const [index, [stepName, stepFn]] of steps.entries()) {
        const cacheFileExists = doesCacheFileExist(stepName);

        // Should hydrate
        if (index < fromIndex) {
          if (cacheFileExists) {
            console.log(`Hydrating [${index}] ${stepName} from cache`);
            stepsResult[stepName] = readCacheFile(stepName);
            continue;
          } else {
            console.log(
              `Cannot hydrate [${index}] ${stepName} since no cache file exists.`,
            );
          }
        }

        if (cacheFileExists) {
          console.log(`Re-calculating [${index}] ${stepName} step result...`);
        } else {
          console.log(`Calculating [${index}] ${stepName} step result...`);
        }

        let result;
        try {
          if (index === 0) {
            result = await stepFn(input);
          } else {
            result = await stepFn(stepsResult);
          }
        } catch (e) {
          console.error(
            `Error in calculating step ${index} - ${stepName}: ${
              e?.message || "propagating error"
            }`,
          );
          throw e;
        }
        console.log(`[${index}] ${stepName} result calculated`);
        stepsResult[stepName] = result;
        writeCacheFile(stepName, result);
      }

      const lastStepResult = stepsResult[steps[steps.length - 1][0]];
      return lastStepResult;
    };

  fn.$inferStepInputs = Array(steps.length).fill(null);
  return fn;
}

type TupleToRecord<T extends [string, any]> = {
  [P in T as P[0]]: Extract<T, [P[0], any]>[1];
};

if (import.meta.main) {
  const fn = runSteps(
    ["dothis", (input: string) => input],
    ["dothat", (steps) => steps.dothis.length],
    ["dothat2", (steps) => steps.dothat * 2],
    ["dothat3", (steps) => steps.dothat2 * 2],
    ["dothat4", (steps) => steps.dothat3 * 2],
  );
  const res = await fn("input4")({ from: -1, cacheDir: "/tmp/testi" });
  type a = typeof fn.$inferStepInputs[3];

  console.log(res);
}

type StepParameters<
  TRunStepsFn extends typeof runSteps,
  TStepNumber extends number,
> = Parameters<Parameters<TRunStepsFn>[TStepNumber][1]>[0];
