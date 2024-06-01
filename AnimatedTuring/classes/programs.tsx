import { mFunction, Operation } from "./Program";

// p81
const b = new mFunction();
const c = new mFunction();
const e = new mFunction();
const k = new mFunction();
b.addBranch("None", [Operation.PRINT0, Operation.RIGHT], c);
c.addBranch("None", [Operation.RIGHT], e);
e.addBranch("None", [Operation.PRINT1, Operation.RIGHT], k);
k.addBranch("None", [Operation.RIGHT], b);

// TODO: ...
export const alternateZeroOne1 = b;
