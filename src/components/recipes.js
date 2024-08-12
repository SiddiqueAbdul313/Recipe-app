import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, dummyData, SIZES } from "../constants";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { CachedImage } from "../helpers/image";

export default function Recipes({ categories = [], meals = [] }) {
  return (
    <View className="mx-4 space-y-3">
      <Text
        className="text-3xl font-semibold"
        style={{ color: COLORS.darkgray }}
      >
        Recipes
      </Text>
      <View>
        {/* Check if categories or recipes are undefined or have zero length */}
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" className="mt-20" color={COLORS.primary} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        className="flex justify-center mb-4 space-y-1"
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : SIZES.padding - 2,
          paddingRight: isEven ? SIZES.padding - 2 : 0,
        }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            height: index % 3 === 0 ? hp(35) : hp(30),
            width: "100%",
            borderRadius: SIZES.padding * 3,
          }}
          resizeMode="cover"
          className="bg-black/5"
        />
        <Text
          className="font-semibold ml-2"
          style={{
            color: COLORS.darkgray,
            fontSize: hp(1.7),
            letterSpacing: 0.7,
          }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
