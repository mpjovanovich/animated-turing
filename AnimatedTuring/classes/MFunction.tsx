import { ConfigMap } from "./ConfigMap";
import { Operation } from "./Operation";

// Helper class that can hold either a ConfigMap or a string.
// Makes the code neater.
// By convention we will use capital letters for ConfigMaps and lowercase for strings.
export class ConfigMapOrString {
  private _ConfigMapValue?: ConfigMap;
  private _stringValue?: string;

  constructor(value: ConfigMap | string) {
    if (typeof value === "string") {
      this._stringValue = value;
    } else if (value instanceof ConfigMap) {
      this._ConfigMapValue = value;
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

  get ConfigMap(): ConfigMap {
    if (this._ConfigMapValue) {
      return this._ConfigMapValue;
    } else {
      throw new Error("ConfigMapOrString is not a ConfigMap.");
    }
  }
}

// Function that takes any number of ConfigMaps and strings and returns an array of ConfigMaps.
type FuncType = (...args: ConfigMapOrString[]) => ConfigMap[];

export class MFunction {
  description: string; // Friendly name for the m-function
  notation: string; // Math notation for the m-function
  func: FuncType; // The function itself

  constructor(description: string, notation: string, func: FuncType) {
    this.description = description;
    this.notation = notation;
    this.func = func;
  }
}
