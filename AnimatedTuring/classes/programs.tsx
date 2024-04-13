import { Action, Operation, Program } from "./TuringMachine";

const programs: Record<string, Program> = {
  // p81
  alternateZeroOne1: {
    initialConfig: "b",
    actions: new Map([
      ["b-None", new Action([Operation.PRINT0, Operation.RIGHT], "c")],
      ["c-None", new Action([Operation.RIGHT], "e")],
      ["e-None", new Action([Operation.PRINT1, Operation.RIGHT], "k")],
      ["k-None", new Action([Operation.RIGHT], "b")],
    ]),
    symbolResolutionFunctions: new Map([
      ["b", (s: string) => "b-None"],
      ["c", (s: string) => "c-None"],
      ["e", (s: string) => "e-None"],
      ["k", (s: string) => "k-None"],
    ]),
  },
  // p84
  alternateZeroOne2: {
    initialConfig: "b",
    actions: new Map([
      ["b-None", new Action([Operation.PRINT0], "b")],
      [
        "b-0",
        new Action([Operation.RIGHT, Operation.RIGHT, Operation.PRINT1], "b"),
      ],
      [
        "b-1",
        new Action([Operation.RIGHT, Operation.RIGHT, Operation.PRINT0], "b"),
      ],
    ]),
    symbolResolutionFunctions: new Map([
      // The function translate to use the actual value if truthy, else "None"
      ["b", (s: string) => (s ? "b-" + s : "b-None")],
    ]),
  },
  increasingOnes: {
    initialConfig: "b",
    actions: new Map([
      [
        "b-None",
        new Action(
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
      ["o-0", new Action([], "q")],
      [
        "o-1",
        new Action(
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
      ["q-Any", new Action([Operation.RIGHT, Operation.RIGHT], "q")],
      ["q-None", new Action([Operation.PRINT1, Operation.LEFT], "p")],
      ["p-x", new Action([Operation.ERASE, Operation.RIGHT], "q")],
      ["p-ə", new Action([Operation.RIGHT], "f")],
      ["p-None", new Action([Operation.LEFT, Operation.LEFT], "p")],
      ["f-Any", new Action([Operation.RIGHT, Operation.RIGHT], "f")],
      [
        "f-None",
        new Action([Operation.PRINT0, Operation.LEFT, Operation.LEFT], "o"),
      ],
    ]),
    // p87
    symbolResolutionFunctions: new Map([
      ["b", (s: string) => "b-None"],
      ["o", (s: string) => "o-" + s],
      ["q", (s: string) => "q-" + (s ? "Any" : "None")],
      ["p", (s: string) => "p-" + (s ? s : "None")],
      ["f", (s: string) => "f-" + (s ? "Any" : "None")],
    ]),
  },
};

export default programs;
