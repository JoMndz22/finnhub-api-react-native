import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Platform,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableHighlight,
} from "react-native";

import axios from "axios";
import { Picker } from "@react-native-picker/picker";

import { useStoreSymbolAlert } from "../../hooks/useStore";

interface PropsSymbol {
  value: string;
  label: string;
}

const Symbols = () => {
  const inputRef = React.useRef<TextInput>(null);

  const [loadPetition, setLoadPetition] = useState<boolean>(true);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [symbolsData, setSymbolsData] = useState<PropsSymbol[]>([]);
  const [symbolSelected, setSymbolSelected] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");

  // Zustand
  const { alertUsdValue, symbolValue, setSymbolValue, setAlertUsdValue } =
    useStoreSymbolAlert();

  // I created this array to filter the data from the API because the response is too large
  const SYMBOLS_MATCH = [
    "AAPL",
    "TSLA",
    "MSFT",
    "AMZN",
    "APC.BE",
    "BINANCE:BTCUSDT",
    "IC MARKETS:1",
    "BTC",
    "ETH",
  ];

  // Fetch function
  const fetchSymbols = async () => {
    try {
      // Send petition
      const response = await axios.get(
        "https://finnhub.io/api/v1/stock/symbol",
        {
          params: {
            exchange: "US", // Replace 'US' with the desired exchange code
            token: "cqapvq1r01qmfd85dh10cqapvq1r01qmfd85dh1g",
          },
        }
      );

      // Filter and map data
      const pickerData = response.data
        .filter((item: any) => SYMBOLS_MATCH.includes(item.symbol))
        .map((item: any) => ({ label: item.symbol, value: item.symbol }));

      // Set data to array state
      setSymbolsData(pickerData);
    } catch (error) {
      Alert.alert("Error fetching symbols. Please, try again...");
    } finally {
      setLoadPetition(false);
    }
  };

  // save alert function
  const onSaveAlert = () => {
    // save with zustand
    try {
      setSymbolValue(symbolSelected);
      setAlertUsdValue(textValue);
      Alert.alert("Alert saved successfully!");
      if (inputRef.current) inputRef.current.blur();
    } catch (error) {
      Alert.alert("Error saving alert! Please, try again...");
    }
  };

  // UseEffect to fetch data
  useEffect(() => {
    fetchSymbols();
  }, []);

  // Disable button
  useEffect(() => {
    if (symbolSelected && textValue) {
      return setDisabledBtn(false);
    }
    return setDisabledBtn(true);
  }, [textValue, symbolSelected]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: Platform.OS === "ios" ? 65 : 30,
        paddingHorizontal: 30,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 25,
          color: "#ffffff",
          marginBottom: 40,
        }}
      >
        Send Alert!
      </Text>
      {loadPetition ? (
        <ActivityIndicator size="large" color="#dedede" />
      ) : (
        <>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            Select your symbol:
          </Text>
          <Picker
            selectedValue={symbolSelected}
            onValueChange={(itemValue) => setSymbolSelected(itemValue)}
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 8,
              marginTop: 10,
              minWidth: "100%",
              backgroundColor: "#dedede",
              color: "white",
            }}
          >
            <Picker.Item label=" " value={""} />
            {symbolsData.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>

          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Add your limit price (USD):
          </Text>
          <TextInput
            ref={inputRef}
            onChangeText={(e) => {
              const numericValue = e.replace(/[^0-9]/g, "");
              setTextValue(numericValue);
            }}
            style={{
              backgroundColor: "white",
              height: 40,
              marginTop: 10,
              borderRadius: 8,
              paddingHorizontal: 10,
              color: "black",
            }}
            value={textValue}
            keyboardType="numbers-and-punctuation"
            placeholder="$0.00"
          />
          <TouchableHighlight
            style={
              disabledBtn
                ? {
                    backgroundColor: "#1db954",
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 20,
                    opacity: 0.7,
                  }
                : {
                    backgroundColor: "#1db954",
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 20,
                  }
            }
            disabled={disabledBtn}
            onPress={onSaveAlert}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Save alert
            </Text>
          </TouchableHighlight>
        </>
      )}
      <Text style={{ color: "white" }}>:: ZUSTAND :: </Text>
      <Text style={{ color: "white" }}>{`symbolValue : ${symbolValue}`}</Text>
      <Text style={{ color: "white" }}>
        {`alertUsdValue : $${alertUsdValue}`}
      </Text>
    </View>
  );
};

export default Symbols;
