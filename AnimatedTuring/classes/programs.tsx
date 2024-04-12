import { Behavior, BehaviorMap, Operation } from "./TuringMachine";

const programs: Record<string, BehaviorMap> = {
  alternateZeroOne: new Map([
    ["b", new Behavior([Operation.PRINT0, Operation.RIGHT], "c")],
    ["c", new Behavior([Operation.RIGHT], "e")],
    ["e", new Behavior([Operation.PRINT1, Operation.RIGHT], "k")],
    ["k", new Behavior([Operation.RIGHT], "b")],
  ]),
};

export default programs;
