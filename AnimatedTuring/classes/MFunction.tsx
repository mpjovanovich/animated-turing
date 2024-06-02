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

// Function that takes any number of ConfigMaps and strings and returns an array of ConfigMaps.
// type FuncType = (...args: ConfigMapOrString[]) => ConfigMap[];
type FuncArgs = {
  [key: string]: ConfigMapOrString;
};

// let x: FuncArgs = {
//   a: new ConfigMapOrString(),
//   b: new ConfigMapOrString(),
// };

export class MFunction {
  description: string; // Friendly name for the m-function
  notation: string; // Math notation for the m-function
  argMap: FuncArgs; // Arguments to the function
  func: (argMap: FuncArgs) => ConfigMap[];

  constructor(
    description: string,
    notation: string,
    argMap: FuncArgs,
    func: (argMap: FuncArgs) => ConfigMap[]
  ) {
    this.description = description;
    this.notation = notation;
    this.argMap = argMap;
    this.func = func;
  }
}
