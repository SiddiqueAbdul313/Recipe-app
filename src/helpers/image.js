import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import * as FileSystem from "expo-file-system";

export const CachedImage = ({ uri, style, ...props }) => {
  const [cachedSource, setCachedSource] = useState(null);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const getCachedImage = async () => {
      const fileName = uri.split("/").pop();
      const filePath = `${FileSystem.cacheDirectory}${fileName}`;

      try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          setCachedSource({ uri: fileInfo.uri });
        } else {
          const downloadResult = await FileSystem.downloadAsync(uri, filePath);
          if (downloadResult.status === 200) {
            setCachedSource({ uri: downloadResult.uri });
          } else {
            setCachedSource({ uri });
          }
        }
      } catch (error) {
        console.error("Error caching image:", error);
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, [uri]);

  // Fade in animation when the image is loaded
  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500, // duration of the fade-in effect
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.Image
      source={cachedSource}
      onLoad={onLoad}
      style={[style, { opacity }]}
      {...props}
    />
  );
};
