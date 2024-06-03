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
  configMaps: ConfigMap[];
  func: (args: FuncArgs) => ConfigMap[];
  initialConfig: ConfigMap;

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
    // TODO: can't call this until ars are set/bound.
    // For now we will have the user set these after setting the args.
    // Later it'd be nice to firgure out how to manage this all in the constructor.
    // this.configMaps = this.func(this.args);
    this.configMaps = [];

    // TODO: This is a placeholder. It will be set in the setConfigMaps method.
    // Don't know if there's a better way to do this.
    this.initialConfig = new ConfigMap(description);
  }

  setConfigMaps() {
    this.configMaps = this.func(this.args);

    // We're assuming this has entries. If not something is wrong anyway.
    this.initialConfig = this.configMaps[0];
  }
}

// Example usage:
// import {findSymbol} from "./Functions/FindSymbol";
// findSymbol.args.a.string = "0";
// findSymbol.args.C.ConfigMap = b;
// findSymbole.setConfigMaps();
// }
