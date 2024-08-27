import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants/theme";
import { images } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { icons } from "../constants";

const WelcomeScreen = ({ navigation }) => {
  const innerRingPadding = useSharedValue(0);
  const outerRingPadding = useSharedValue(0);

  useEffect(() => {
    outerRingPadding.value = withSpring(hp(5), { stiffness: 100 });
    innerRingPadding.value = withSpring(hp(5), { stiffness: 300 });

    const timer = setTimeout(() => navigation.navigate("HomeScreen"), 3000);
    return () => clearTimeout(timer);
  }, [navigation, outerRingPadding, innerRingPadding]);

  const outerRingStyle = useAnimatedStyle(() => {
    return { padding: outerRingPadding.value };
  });

  const innerRingStyle = useAnimatedStyle(() => {
    return { padding: innerRingPadding.value };
  });

  return (
    <View
      className="flex-1 justify-around items-center space-y-10"
      style={{ backgroundColor: COLORS.primary }}
    >
      <StatusBar style="light" />
      <Animated.View
        className="bg-white/20 rounded-full flex"
        style={outerRingStyle}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={innerRingStyle}
        >
          <Image
            source={images.WelcomeImage}
            style={{ width: hp(20), height: hp(20) }}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>

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
      <Text className="text-white font-bold flex items-center justify-center text-center">
        Made with <icons.HeartIcon style={[{ stroke: COLORS.red,fill:COLORS.red }]} /> by Zuheb
      </Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
