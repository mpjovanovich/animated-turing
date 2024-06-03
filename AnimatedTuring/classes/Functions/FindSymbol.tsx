import { ConfigMap, Operation } from "../ConfigMap";
import { ConfigMapOrString, MFunction } from "../MFunction";

// TODO: friendly versions with common modern English symbols
// p115

export function findSymbol() {
  return new MFunction(
    "Find Symbol",
    "𝔣(ℭ, 𝔅, 𝛼)",
    {
      C: new ConfigMapOrString(),
      B: new ConfigMapOrString(),
      a: new ConfigMapOrString(),
    },
    (args): ConfigMap[] => {
      const f = new ConfigMap("𝔣(ℭ, 𝔅, 𝛼)");
      const f1 = new ConfigMap("𝔣₁(ℭ, 𝔅, 𝛼)");
      const f2 = new ConfigMap("𝔣₂(ℭ, 𝔅, 𝛼)");

      f.addBranch("ə", [Operation.LEFT], f1);
      f.addBranch("not ə", [Operation.LEFT], f);
      // Note: this was added by me, not in the original code
      // Was not working without it.
      f.addBranch("None", [Operation.LEFT], f);

      f1.addBranch(args.a.string, [], args.C.ConfigMap);
      f1.addBranch("not " + args.a.string, [Operation.RIGHT], f1);
      f1.addBranch("None", [Operation.RIGHT], f2);

      f2.addBranch(args.a.string, [], args.C.ConfigMap);
      f2.addBranch("not " + args.a.string, [Operation.RIGHT], f1);
      f2.addBranch("None", [Operation.RIGHT], args.B.ConfigMap);

      return [f, f1, f2];
    }
  );
}

// Example usage:
// const findSymbol = findSymbol();
// findSymbol.args.a.string = "0";
// findSymbol.args.C.ConfigMap = b;
