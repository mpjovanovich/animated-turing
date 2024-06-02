import { ConfigMap } from "./ConfigMap";

// Helper class that can hold either a ConfigMap or a string.
// Makes the code neater.
// By convention we will use capital letters for ConfigMaps and lowercase for strings.
export class ConfigMapOrString {
  private _ConfigMapValue?: ConfigMap;
  private _stringValue?: string;

  get string(): string {
    if (this._stringValue) {
      return this._stringValue;
    } else {
      throw new Error("ConfigMapOrString is not a string.");
    }
  }

  get ConfigMap(): ConfigMap {
    if (this._ConfigMapValue) {
      return this._ConfigMapValue;
    } else {
      throw new Error("ConfigMapOrString is not a ConfigMap.");
    }
  }

  set string(value: string) {
    this._stringValue = value;
  }

  set ConfigMap(value: ConfigMap) {
    this._ConfigMapValue = value;
  }
}

// This allows us to create a JSON object with any number of keys, each of which is a ConfigMapOrString.
// We will define and later set the arguments for the function using this object.
type FuncArgs = {
  [key: string]: ConfigMapOrString;
};

// Function that takes any number of ConfigMaps and strings and returns an array of ConfigMaps.
export class MFunction {
  description: string; // Friendly name for the m-function
  notation: string; // Math notation for the m-function
  args: FuncArgs; // Arguments to the function
  func: (args: FuncArgs) => ConfigMap[];

  constructor(
    description: string,
    notation: string,
    args: FuncArgs,
    func: (args: FuncArgs) => ConfigMap[]
  ) {
    this.description = description;
    this.notation = notation;
    this.args = args;
    this.func = func;
  }
}

// Example usage:
// import {findSymbol} from "./Functions/FindSymbol";
// findSymbol.args.a.string = "0";
// findSymbol.args.C.ConfigMap = b;
// for (const configMap of findSymbol.func(findSymbol.args)) {
// ...add configMap to program...
// }
