import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.containerLogin}>
      <Text style={styles.themeLogin}>Login</Text>
      <View>
        <Text style={styles.labelInputsLogin}>Email</Text>
        <TextInput
          style={styles.inputsLogin}
          onChangeText={(text) => console.log(text)}
        />
        <Text style={styles.labelInputsLogin}>Password</Text>
        <View>
          <TextInput
            style={{ ...styles.inputsLogin, marginBottom: 5 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ color: "#ffffff", fontSize: 12 }}>
              {showPassword ? "Hide" : "Show"} password{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={() => console.log("sign ....")}
          >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type='title'>Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{' '}
    //       <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText>{' '}
    //       to see changes. Press{' '}
    //       <ThemedText type='defaultSemiBold'>
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this
    //       starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText>{' '}
    //       to get a fresh <ThemedText type='defaultSemiBold'>app</ThemedText>{' '}
    //       directory. This will move the current{' '}
    //       <ThemedText type='defaultSemiBold'>app</ThemedText> to{' '}
    //       <ThemedText type='defaultSemiBold'>app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  themeLogin: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  labelInputsLogin: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 5,
  },
  inputsLogin: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginBottom: 20,
  },
  buttonSignIn: {
    backgroundColor: "#1db954",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
});
