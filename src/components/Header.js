import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, images, SIZES, icons, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Header({ text }) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        className="flex-row items-center"
      >
        <View className="flex-row items-center justify-center">
          <ChevronLeftIcon size={hp(3.5)} color={COLORS.primary} />
          <Text
            className="font-semibold"
            style={{ fontSize: hp(3), color: COLORS.primary }}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
