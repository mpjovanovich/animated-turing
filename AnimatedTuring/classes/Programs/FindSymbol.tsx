import { mFunction, Operation } from "../Program";

// TODO: eh? Need to sub in Programs and symbols...

// p115
export namespace FindSymbol {
  // Name can and should be overridden when arguments are known for
  // the first two mConfigs and the symbol to find.
  const f = new mFunction("f(C, B, a)");

  export const program = f;
}
