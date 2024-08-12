import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { COLORS, images, SIZES } from "../constants";
import { dummyData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { StretchInY } from "react-native-reanimated";

const Categories = ({
  navigation,
  activeCategory,
  setActiveCategory,
  categories,
}) => {
  return (
    <Animated.View entering={StretchInY.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: SIZES.padding2 + 3 }}
      >
        {categories.map((category, index) => {
          let isActive = category.strCategory == activeCategory;
          let activeButtonClass = isActive ? "bg-red-500" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              activeOpacity={0.8}
              onPress={() => setActiveCategory(category.strCategory)}
            >
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{
                    height: hp(6),
                    width: hp(6),
                  }}
                  //   resizeMode="cover"
                  className="rounded-full"
                />
              </View>
              <Text style={{ color: COLORS.darkgray, fontSize: hp(1.7) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
