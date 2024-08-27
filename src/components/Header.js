import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Header({ text }) {
  const navigation = useNavigation();

  return (
    <View
      className="flex-row items-center px-1 py-1"
      style={{ backgroundColor: COLORS.transparent }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        accessibilityLabel="Go Back"
        accessibilityRole="button"
        className="flex-row items-center"
      >
        <View className="flex-row items-center">
          <ChevronLeftIcon size={hp(3.5)} color={COLORS.primary} />
        </View>
        <Text
          className="font-semibold ml-3"
          style={{ fontSize: hp(3), color: COLORS.primary }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
