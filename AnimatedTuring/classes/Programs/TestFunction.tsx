import { configMap, Operation } from "../Program";

// Helper class that can hold either a configMap or a string.
// Makes the code neater.
// By convention we will use capital letters for configMaps and lowercase for strings.
class ConfigMapOrString {
  private _configMapValue?: configMap;
  private _stringValue?: string;

  constructor(value: configMap | string) {
    if (typeof value === "string") {
      this._stringValue = value;
    } else if (value instanceof configMap) {
      this._configMapValue = value;
    } else {
      throw new Error("Invalid type");
    }
  }

  get string(): string {
    if (this._stringValue) {
      return this._stringValue;
    } else {
      throw new Error("ConfigMapOrString is not a string.");
    }
  }

  get configMap(): configMap {
    if (this._configMapValue) {
      return this._configMapValue;
    } else {
      throw new Error("ConfigMapOrString is not a configMap.");
    }
  }
}

// Function that takes any number of configMaps and strings and returns an array of configMaps.
type FuncType = (...args: ConfigMapOrString[]) => configMap[];

class mFunction {
  description: string; // Friendly name for the m-function
  notation: string; // Math notation for the m-function
  func: FuncType; // The function itself

  constructor(description: string, notation: string, func: FuncType) {
    this.description = description;
    this.notation = notation;
    this.func = func;
  }
}

// TODO: friendly versions with common modern English symbols
// p115
const findSymbol: mFunction = new mFunction(
  "Find Symbol",
  "𝔣(ℭ, 𝔅, 𝛼)",
  (
    C: ConfigMapOrString,
    B: ConfigMapOrString,
    a: ConfigMapOrString
  ): configMap[] => {
    const f = new configMap("𝔣(ℭ, 𝔅, 𝛼)");
    const f1 = new configMap("𝔣₁(ℭ, 𝔅, 𝛼)");
    const f2 = new configMap("𝔣₂(ℭ, 𝔅, 𝛼)");

    f.addBranch("ə", [Operation.LEFT], f1);
    f.addBranch("not ə", [Operation.LEFT], f);

    f1.addBranch(a.string, [], C.configMap);
    f1.addBranch("not " + a.string, [Operation.RIGHT], f1);
    f1.addBranch("None", [Operation.RIGHT], f2);

    f2.addBranch(a.string, [], C.configMap);
    f2.addBranch("not " + a, [Operation.RIGHT], f1);
    f2.addBranch("None", [Operation.RIGHT], B.configMap);

    return [f, f1, f2];
  }
);
