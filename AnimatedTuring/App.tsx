import {
  Pressable,
  SafeAreaView,
  ScrollView,
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
  const [tape, setTape] = useState([""]);
  const [r, setR] = useState(0);
  const [mConfig, setMConfig] = useState(program.initialConfig);

  // TODO: look into this more - don't quite understand it yet.
  const turingMachineRef = useRef<TuringMachine | null>(null);

  // Make sure the TuringMachine is created only once
  // After that we will let it update its own internal state,
  // and observe those variables that we need.
  useEffect(() => {
    turingMachineRef.current = new TuringMachine(
      program,
      (tape) => {
        setTape(tape);
      },
      (mConfig) => {
        setMConfig(mConfig);
      },
      (r) => {
        setR(r);
      }
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Animated Turing</Text>
      {/* Was working without this view... */}
      <Text>
        <Text style={{ fontWeight: "bold" }}>mConfig:</Text> {mConfig}
      </Text>
      <View style={styles.tape}>
        <ScrollView horizontal>
          {tape.map((symbol, i) => (
            <View key={i + "squareWrapper"} style={styles.squareWrapper}>
              <Text
                key={i + "squareText"}
                style={
                  i === r ? [styles.square, styles.activeSquare] : styles.square
                }
              >
                {symbol ? symbol : " "}
              </Text>
              <View
                key={i + "writeHead"}
                style={i === r ? styles.writeHead : null}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          turingMachineRef.current?.scan();
        }}
      >
        <Text style={styles.buttonText}>Scan</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// TODO: global styles
// TODO: custom components
const fontSize = 14;
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#a345fc",
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: fontSize,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "lightgray",
  },
  squareWrapper: {
    alignItems: "center",
  },
  square: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#000",
    fontSize: fontSize,
    marginHorizontal: 5,
    padding: 10,
    textAlign: "center",
    width: fontSize * 2.5,
  },
  activeSquare: {
    borderWidth: 2,
  },
  writeHead: {
    width: 0,
    height: 0,
    borderLeftWidth: (fontSize * 0.75) / 2,
    borderRightWidth: (fontSize * 0.75) / 2,
    borderBottomWidth: fontSize * 0.75,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    marginTop: 5,
  },
  tape: {
    margin: 20,
    width: "90%",
    // debug
    // backgroundColor: "lightblue",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 20,
    textAlign: "center",
  },
});
