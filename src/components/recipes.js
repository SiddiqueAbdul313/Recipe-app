import { Pressable, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES } from "../constants";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Loading from "./loading";

export default function Recipes({ categories = [], meals = [] }) {
  const navigation = useNavigation();

  return (
    <View className="mx-4 space-y-3">
      <Text
        className="text-3xl font-semibold"
        style={{ color: COLORS.darkgray }}
      >
        Recipes
      </Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Loading />
          </View>
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
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
        onPress={() => navigation.navigate("RecipeDetailScreen", { ...item })}
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
