import { ConfigMap } from "./ConfigMap";
import { Operation } from "./Operation";

export interface Behavior {
  operations: Operation[];
  finalMConfig: ConfigMap;
}
