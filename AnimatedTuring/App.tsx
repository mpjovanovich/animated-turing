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

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: r * (tapeSquareWidth + tapeSquarePadding * 2),
        animated: true,
      });
    }
  }, [r]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Animated Turing</Text>
      <View style={styles.machine}>
        {/* TODO: add program name and description to configs */}
        <Text style={styles.programName}>Program Name</Text>
        <View style={styles.marginContainer}>
          <ScrollView ref={scrollViewRef} horizontal>
            {tape.map((symbol, i) => (
              <View key={i + "squareWrapper"} style={styles.squareWrapper}>
                <Text
                  key={i + "squareText"}
                  style={
                    i === r
                      ? [styles.square, styles.activeSquare]
                      : styles.square
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
        <View style={styles.marginContainer}>
          {/* TODO: m-config table */}
          {/* Should be animated, showing actions as they happen */}
          <Text>
            <Text style={{ fontWeight: "bold" }}>mConfig:</Text> {mConfig}
          </Text>
        </View>
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
const tapeSquareWidth = fontSize * 2.5;
const tapeSquarePadding = 10;

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
    overflow: "hidden",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20,
    backgroundColor: "lightgray",
  },
  machine: {
    flex: 1,
    width: "86%",
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
    padding: tapeSquarePadding,
    textAlign: "center",
    width: tapeSquareWidth,
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
    marginBottom: 5,
  },
  programName: {
    fontSize: 18,
    marginBottom: 10,
    padding: 20,
    textAlign: "center",
    color: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 20,
    textAlign: "center",
    backgroundColor: "#a345fc",
    color: "#fff",
    width: "100%",
  },
  marginContainer: {
    marginTop: 20,
  },
});
