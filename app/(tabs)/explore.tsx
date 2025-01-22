import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import axios from "axios";

const TabTwoScreen = () => {
  const [stocks, setStocks] = useState([]);

  const useSocket = () => {
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=cqapvq1r01qmfd85dh10cqapvq1r01qmfd85dh1g"
    );

    socket.addEventListener("open", function (event) {
      socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" })
      );
    });

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        updateStockData(data.data);
      }
    };

    return () => {
      socket.close();
    };
  };

  useEffect(() => {
    // useSocket();
    const fetchQuote = async (symbol: string) => {
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
          params: {
            symbol,
            token: "cqapvq1r01qmfd85dh10cqapvq1r01qmfd85dh1g",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Finnhub data:", error);
      } finally {
        console.info("finally");
      }
    };

    // fetchQuote("BINANCE:BTCUSDT");
  }, []);

  const updateStockData = (newData: any[]) => {
    console.log(newData);
    setStocks(newData);
  };

  const renderStock = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={{ color: "#ffffff" }}>{item.s}</Text>
      <Text style={{ color: "#ffffff" }}>${item.p}</Text>
      <Text style={{ color: "#ffffff" }}>{item.c}%</Text>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#dedede",
        paddingVertical: 65,
      }}
    >
      <View style={{ backgroundColor: "red" }}>
        <Text
          style={{
            color: "#ffffff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Trades - Last Price Updates
        </Text>

        <FlatList
          data={stocks}
          renderItem={renderStock}
          keyExtractor={(item) => item.s}
          style={{ padding: 8 }}
        />
      </View>
    </View>
  );
};
export default TabTwoScreen;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
});
