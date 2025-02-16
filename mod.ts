import { dirname, fromFileUrl, join, resolve } from "@std/path";
import { ensureDirSync } from "@std/fs";

type AccumFn<in TPreviousFn extends (ctx: any) => object> = (
  ctx: Awaited<ReturnType<TPreviousFn>> & Parameters<TPreviousFn>[0],
) => object;

type StepByStepOptions = {
  from?: number;
  cacheDir: string;
};

export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
>(
  input: TInput,
  ...fns: [TFn1]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn1>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn2>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
  TFn3 extends AccumFn<TFn2>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2, TFn3]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn3>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
  TFn3 extends AccumFn<TFn2>,
  TFn4 extends AccumFn<TFn3>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2, TFn3, TFn4]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn4>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
  TFn3 extends AccumFn<TFn2>,
  TFn4 extends AccumFn<TFn3>,
  TFn5 extends AccumFn<TFn4>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2, TFn3, TFn4, TFn5]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn5>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
  TFn3 extends AccumFn<TFn2>,
  TFn4 extends AccumFn<TFn3>,
  TFn5 extends AccumFn<TFn4>,
  TFn6 extends AccumFn<TFn5>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2, TFn3, TFn4, TFn5, TFn6]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn6>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
  TFn3 extends AccumFn<TFn2>,
  TFn4 extends AccumFn<TFn3>,
  TFn5 extends AccumFn<TFn4>,
  TFn6 extends AccumFn<TFn5>,
  TFn7 extends AccumFn<TFn6>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2, TFn3, TFn4, TFn5, TFn6, TFn7]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn7>>>;
export function stepByStep<
  TInput extends object,
  TFn1 extends (ctx: TInput) => object,
  TFn2 extends AccumFn<TFn1>,
  TFn3 extends AccumFn<TFn2>,
  TFn4 extends AccumFn<TFn3>,
  TFn5 extends AccumFn<TFn4>,
  TFn6 extends AccumFn<TFn5>,
  TFn7 extends AccumFn<TFn6>,
  TFn8 extends AccumFn<TFn7>,
>(
  input: TInput,
  ...fns: [TFn1, TFn2, TFn3, TFn4, TFn5, TFn6, TFn7, TFn8]
): (options: StepByStepOptions) => Promise<ReturnType<AccumFn<TFn8>>>;
export function stepByStep(
  input: object,
  ...fns: ((ctx: any) => object | Promise<object>)[]
): (options: StepByStepOptions) => Promise<object> {
  return async ({ from, cacheDir }: StepByStepOptions) => {
    const cacheDirWrapper = new CacheDir(cacheDir);
    const previousFunctions = await cacheDirWrapper.loadFnsFile();
    const changedIndex = whichFunctionChanged(fns, previousFunctions);

    const maxStepWithContext = await cacheDirWrapper.maxStepWithContextFile();
    let startFrom: number;
    if (changedIndex === -1) {
      console.log("No functions have changed since last run");

      startFrom = fns.length - 1;
    } else if (changedIndex === 0) {
      console.log("First function changed, re-running");
      startFrom = 0;
    } else {
      startFrom = changedIndex;
      console.log(
        "Function at index ",
        changedIndex,
        " changed, re-running from there",
      );
    }
    cacheDirWrapper.saveFnsFile(fns);

    if (startFrom > maxStepWithContext) {
      console.log(
        `No cached context found for step ${startFrom}, starting from ${maxStepWithContext}`,
      );

      startFrom = maxStepWithContext;
    }

    const fnsToRun = fns.slice(startFrom);
    let ctx = startFrom === 0
      ? input
      : await cacheDirWrapper.loadContextForStep(startFrom);

    await Promise.all(
      fnsToRun.map(async (fn, idx) => {
        const result = await fn(ctx);
        console.log(
          String.raw`Result of step ${idx + startFrom}${
            fn.name ? ` (${fn.name})` : ""
          } is ${JSON.stringify(result, null, 2)}`,
        );

        ctx = { ...ctx, ...result };
        cacheDirWrapper.saveContextForStep(idx, ctx);
      }),
    );

    return ctx;
  };
}

class CacheDir {
  dir: string;
  constructor(dir: string) {
    this.dir = dir;
    ensureDirSync(dir);
  }
  async maxStepWithContextFile(): Promise<number> {
    const files = Deno.readDirSync(this.dir);
    const stepFiles = files.filter((file) => file.name.startsWith("step-"));
    const stepNumbers = stepFiles.map((file) => {
      const match = file.name.match(/step-(\d+)\.json/);
      return match ? Number(match[1]) : -1;
    });
    return Math.max(...stepNumbers);
  }

  async loadContextForStep(step: number): Promise<object> {
    const data = await Deno.readTextFile(this.stepFilePath(step));
    return JSON.parse(data);
  }
  async saveContextForStep(step: number, ctx: object): Promise<void> {
    const dataString = JSON.stringify(ctx, null, 2);
    return Deno.writeTextFile(
      this.stepFilePath(step),
      dataString,
      {},
    );
  }

  stepFilePath(step: number) {
    return join(this.dir, `step-${step}.json`);
  }
  get functionsFilePath() {
    return join(this.dir, "functions.json");
  }
  saveFnsFile(fns: Array<(...args: any[]) => any>): Promise<void> {
    return Deno.writeTextFile(
      this.functionsFilePath,
      JSON.stringify(fns.map((fn) => fn.toString()), null, 2),
      {},
    );
  }
  async loadFnsFile(): Promise<string[]> {
    try {
      const data = await Deno.readTextFile(this.functionsFilePath);
      return JSON.parse(data);
    } catch (error) {
      console.log(`No previous functions found at ${this.dir}`);

      // If file does not exist or couldn't be read, return an empty array
      return [];
    }
  }
}

function whichFunctionChanged(
  fns: Array<(...args: any[]) => any>,
  prevFunctions: string[],
): number {
  // Convert the new functions to their string representation
  const newFunctions = fns.map((fn) => fn.toString());

  const maxLength = Math.max(prevFunctions.length, newFunctions.length);
  let changedIndex = -1;

  for (let i = 0; i < maxLength; i++) {
    if (prevFunctions[i] !== newFunctions[i]) {
      changedIndex = i;
      break;
    }
  }

  return changedIndex;
}

if (import.meta.main) {
  stepByStep({ a: 1 }, ({ a }) => {
    return { b: 2 };
  }, (ctx) => {
    return { c: 3, l: 2 };
  }, function stepFour(ctx) {
    return { k: 4 };
  })({
    cacheDir: "./cache",
  });
}
