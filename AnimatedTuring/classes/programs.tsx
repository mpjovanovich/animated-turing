import { Behavior, Operation, Program } from "./TuringMachine";

const programs: Record<string, Program> = {
  alternateZeroOne1: {
    initialConfig: "b",
    behaviors: new Map([
      ["b-", new Behavior([Operation.PRINT0, Operation.RIGHT], "c")],
      ["c-", new Behavior([Operation.RIGHT], "e")],
      ["e-", new Behavior([Operation.PRINT1, Operation.RIGHT], "k")],
      ["k-", new Behavior([Operation.RIGHT], "b")],
    ]),
  },
  alternateZeroOne2: {
    initialConfig: "b",
    behaviors: new Map([
      ["b-", new Behavior([Operation.PRINT0], "b")],
      [
        "b-0",
        new Behavior([Operation.RIGHT, Operation.RIGHT, Operation.PRINT1], "b"),
      ],
      [
        "b-1",
        new Behavior([Operation.RIGHT, Operation.RIGHT, Operation.PRINT0], "b"),
      ],
    ]),
  },
};

export default programs;
