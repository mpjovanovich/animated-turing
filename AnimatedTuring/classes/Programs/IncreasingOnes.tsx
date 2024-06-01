import { mFunction, Operation } from "../Program";

// p87
export namespace IncreasingOnes {
  const b = new mFunction("b");
  const o = new mFunction("o");
  const q = new mFunction("q");
  const p = new mFunction("p");
  const k = new mFunction("k");

  b.addBranch(
    "None",
    [
      // Pə, R, Pə, R, P0, R, R, P0, L, L
      Operation.PRINT_SCHWA,
      Operation.RIGHT,
      Operation.PRINT_SCHWA,
      Operation.RIGHT,
      Operation.PRINT0,
      Operation.RIGHT,
      Operation.RIGHT,
      Operation.PRINT0,
      Operation.LEFT,
      Operation.LEFT,
    ],
    o
  );

  o.addBranch("0", [], q);
  o.addBranch(
    "1",
    [
      // R, Px, L, L, L
      Operation.RIGHT,
      Operation.PRINTX,
      Operation.LEFT,
      Operation.LEFT,
      Operation.LEFT,
    ],
    o
  );

  q.addBranch("Any", [Operation.RIGHT, Operation.RIGHT], q);
  q.addBranch("None", [Operation.PRINT1, Operation.LEFT], p);

  p.addBranch("x", [Operation.ERASE, Operation.RIGHT], q);
  p.addBranch("ə", [Operation.RIGHT], k);
  p.addBranch("None", [Operation.LEFT, Operation.LEFT], p);

  k.addBranch("Any", [Operation.RIGHT, Operation.RIGHT], k);
  k.addBranch("None", [Operation.PRINT0, Operation.LEFT, Operation.LEFT], o);

  // This is the initial configuration
  export const program = b;
}
