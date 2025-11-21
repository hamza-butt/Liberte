import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Video from "react-native-video";
import { AppColors } from "../../theme/colors";

export type ProductSlide = {
  id: string;
  title: string;
  type: "image" | "video";
  source: ReturnType<typeof require>;
};

type ProductSliderProps = {
  slides: ProductSlide[];
};

const SLIDE_SPACING = 16;
const SCREEN_HORIZONTAL_PADDING = 24;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - SCREEN_HORIZONTAL_PADDING * 2;

function ProductSlider({ slides }: ProductSliderProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const proposedIndex = Math.round(offsetX / (CARD_WIDTH + SLIDE_SPACING));
      const normalizedIndex = Math.max(
        0,
        Math.min(slides.length - 1, proposedIndex)
      );
      setActiveIndex((current) =>
        current === normalizedIndex ? current : normalizedIndex
      );
    },
    [slides.length]
  );

  const renderItem = React.useCallback(
    ({ item, index }: { item: ProductSlide; index: number }) => (
      <View
        style={[
          styles.slide,
          {
            width: CARD_WIDTH,
            marginRight: index === slides.length - 1 ? 0 : SLIDE_SPACING,
          },
        ]}
      >
        <View style={styles.mediaContainer}>
          {item.type === "video" ? (
            <Video
              source={item.source}
              muted
              repeat
              controls={false}
              resizeMode="cover"
              paused={activeIndex !== index}
              style={styles.video}
            />
          ) : (
            <Image
              source={item.source}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
      </View>
    ),
    [activeIndex, slides.length]
  );

  if (slides.length === 0) {
    return null;
  }

  return (
    <View>
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        snapToInterval={CARD_WIDTH + SLIDE_SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    borderRadius: 24,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: AppColors.whiteTranslucent,
  },
  mediaContainer: {
    borderRadius: 18,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.primaryTextDark,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  listContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: {
    backgroundColor: AppColors.sliderDotActive,
    width: 10,
  },
});

export default ProductSlider;
