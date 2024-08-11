import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants/theme";
import { images, icons } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const WelcomeScreen = ({navigation}) => {
  const innerRingPadding = useSharedValue(0);
  const outerRingPadding = useSharedValue(0);

  useEffect(() => {
    outerRingPadding.value = 0;
    innerRingPadding.value = 0;
    setTimeout(
      () =>
        (outerRingPadding.value = withSpring(
          outerRingPadding.value + hp(5),
          100
        ))

      );
      setTimeout(
        () =>
        (innerRingPadding.value = withSpring(
          innerRingPadding.value + hp(5),
          300
        ))
    );
    setTimeout(()=>navigation.navigate("HomeScreen"),3000)
  }, [outerRingPadding, innerRingPadding]);

  return (
    <View
    className="flex-1 justify-center items-center space-y-10"
    style={{ backgroundColor: COLORS.primary }}
    >
      <StatusBar style="light" />
      <Animated.View
        className="bg-white/20 rounded-full flex"
        style={{ padding: outerRingPadding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: innerRingPadding }}
        >
          <Image
            source={images.WelcomeImage}
            style={{ width: hp(20), height: hp(20) }}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>

      {/* title & punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest uppercase"
          style={{ fontSize: hp(7) }}
        >
          foodie
        </Text>
        <Text
          className="font-medium text-xl text-white tracking-wider"
          style={{ fontSize: hp(2) }}
        >
          No idea? Grab the Foodie!
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
