import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import programs from "./classes/programs";

import { TuringMachine } from "./classes/TuringMachine";

export default function App() {
  // Event  handlers for machine state
  const onTapeWrite = (tape: string[]) => {
    // console.log("Tape written...");
    // console.log(tape);
  };

  const onMCConfigChange = (mConfig: string) => {
    console.log("Machine configuration changed...");
    console.log(mConfig);
  };

  const onRMove = (r: number) => {
    console.log("Read/write head moved...");
    console.log(r);
  };

  //   const turingMachine = new TuringMachine(programs.alternateZeroOne1);
  //   const turingMachine = new TuringMachine(programs.alternateZeroOne2);
  //   const turingMachine = new TuringMachine(programs.increasingOnes);
  const turingMachine = new TuringMachine(
    programs.alternateZeroOne1,
    onTapeWrite,
    onMCConfigChange,
    onRMove
  );

  // State for the machine is comprised of:
  // tape (infinite tape of symbols)
  // r (read/write head index)
  // mConfig (name of the machine configuration)

  return (
    <SafeAreaView style={styles.container}>
      <Text>Turing Machine...</Text>
      <View style={styles.machineState}></View>
      <Button
        title="Scan"
        onPress={() => {
          turingMachine.scan();
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
    flexDirection: "row",
    marginVertical: 20,
  },
});
