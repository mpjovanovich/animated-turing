import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import programs from "./classes/programs";

import { TuringMachine } from "./classes/TuringMachine";

export default function App() {
  // This is where we pick the program and
  //   const turingMachine = new TuringMachine(programs.alternateZeroOne1);
  const turingMachine = new TuringMachine(programs.alternateZeroOne2);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Turing Machine...</Text>
      <Button
        title="Scan"
        onPress={() => {
          turingMachine.scan();
        }}
      />
      <Button
        title="Print State"
        onPress={() => {
          turingMachine.printState();
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
});
