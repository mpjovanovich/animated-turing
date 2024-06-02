import { ConfigMap } from "../ConfigMap";
import { MFunction, ConfigMapOrString } from "../MFunction";
import { Operation } from "../Operation";

// TODO: friendly versions with common modern English symbols
// p115
export const findSymbol: MFunction = new MFunction(
  "Find Symbol",
  "𝔣(ℭ, 𝔅, 𝛼)",
  (
    C: ConfigMapOrString,
    B: ConfigMapOrString,
    a: ConfigMapOrString
  ): ConfigMap[] => {
    const f = new ConfigMap("𝔣(ℭ, 𝔅, 𝛼)");
    const f1 = new ConfigMap("𝔣₁(ℭ, 𝔅, 𝛼)");
    const f2 = new ConfigMap("𝔣₂(ℭ, 𝔅, 𝛼)");

    f.addBranch("ə", [Operation.LEFT], f1);
    f.addBranch("not ə", [Operation.LEFT], f);

    f1.addBranch(a.string, [], C.ConfigMap);
    f1.addBranch("not " + a.string, [Operation.RIGHT], f1);
    f1.addBranch("None", [Operation.RIGHT], f2);

    f2.addBranch(a.string, [], C.ConfigMap);
    f2.addBranch("not " + a, [Operation.RIGHT], f1);
    f2.addBranch("None", [Operation.RIGHT], B.ConfigMap);

    return [f, f1, f2];
  }
);
