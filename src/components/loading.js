import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Loading = (props) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
