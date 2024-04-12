import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import TuringMachine from "./classes/TuringMachine";

export default function App() {
  const turingMachine = new TuringMachine("b");
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