import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, images, SIZES, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <icons.BackIcon
          style={[{ stroke: COLORS.primary }]}
          height={24}
          width={24}
          strokeWidth={3.5}
        />
      </TouchableOpacity>
    </View>
  );
}
