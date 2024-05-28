import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRef, useEffect, useState } from "react";

import programs from "./classes/programs";

import { TuringMachine } from "./classes/TuringMachine";

const program = programs.alternateZeroOne1;

export default function App() {
  const [r, setR] = useState(0);

  // TODO: I don't really understand this
  const turingMachineRef = useRef<TuringMachine | null>(null);

  useEffect(() => {
    turingMachineRef.current = new TuringMachine(
      program,
      (tape) => {
        console.log("onTapeWrite", tape);
      },
      (mConfig) => {
        console.log("onMCConfigChange", mConfig);
      },
      (r) => {
        console.log("onRMove", r);
        setR(r);
      }
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Turing Machine...</Text>
      <View style={styles.machineState}>
        {/* <View>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Tape:</Text> {tape}
          </Text>
        </View> */}
        <View>
          <Text>
            <Text style={{ fontWeight: "bold" }}>r:</Text> {r}
          </Text>
        </View>
        {/* <View>
          <Text>
            <Text style={{ fontWeight: "bold" }}>mConfig:</Text> {mConfig}
          </Text>
        </View> */}
      </View>
      <Button
        title="Scan"
        onPress={() => {
          turingMachineRef.current?.scan();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  machineState: {
    backgroundColor: "#f0f0f0",
    // flexDirection: "row",
    marginVertical: 20,
  },
});
