import { mFunction, Operation } from "./Program";

// p81
const b = new mFunction();
const c = new mFunction();
const e = new mFunction();
const k = new mFunction();
b.addBranch("", [Operation.PRINT0, Operation.RIGHT], c);
c.addBranch("", [Operation.RIGHT], e);
e.addBranch("", [Operation.PRINT1, Operation.RIGHT], k);
k.addBranch("", [Operation.RIGHT], b);

// TODO: ...
export const alternateZeroOne1 = b;
