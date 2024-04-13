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
  increasingOnes: {
    initialConfig: "b",
    behaviors: new Map([
      [
        "b-",
        new Behavior(
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
          "o"
        ),
      ],
      ["o-0", new Behavior([], "q")],
      [
        "o-1",
        new Behavior(
          [
            // R, Px, L, L, L
            Operation.RIGHT,
            Operation.PRINTX,
            Operation.LEFT,
            Operation.LEFT,
            Operation.LEFT,
          ],
          "o"
        ),
      ],
      ["q-0", new Behavior([Operation.RIGHT, Operation.RIGHT], "q")],
      ["q-1", new Behavior([Operation.RIGHT, Operation.RIGHT], "q")],
      ["q-", new Behavior([Operation.PRINT1, Operation.LEFT], "p")],
      ["p-x", new Behavior([Operation.ERASE, Operation.RIGHT], "q")],
      ["p-ə", new Behavior([Operation.RIGHT], "f")],
      ["p-", new Behavior([Operation.LEFT, Operation.LEFT], "p")],
      ["f-0", new Behavior([Operation.RIGHT, Operation.RIGHT], "f")],
      ["f-1", new Behavior([Operation.RIGHT, Operation.RIGHT], "f")],
      [
        "f-",
        new Behavior([Operation.PRINT0, Operation.LEFT, Operation.LEFT], "o"),
      ],
    ]),
  },
};

export default programs;
