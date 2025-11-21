import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ImageSourcePropType,
} from "react-native";
import { AppColors } from "../../theme/colors";

export type WeatherSlide = {
  id: string;
  image: ImageSourcePropType;
};

type WeatherSliderProps = {
  slides: WeatherSlide[];
};

const SLIDE_SPACING = 16;
const SCREEN_HORIZONTAL_PADDING = 24;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - SCREEN_HORIZONTAL_PADDING * 2;
const AUTO_SCROLL_INTERVAL = 4000;

function WeatherSlider({ slides }: WeatherSliderProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList<WeatherSlide>>(null);

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
    ({ item, index }: { item: WeatherSlide; index: number }) => (
      <ImageBackground
        source={item.image}
        style={[
          styles.slide,
          {
            width: CARD_WIDTH,
            marginRight: index === slides.length - 1 ? 0 : SLIDE_SPACING,
          },
        ]}
        imageStyle={styles.slideImage}
      />
    ),
    [slides.length]
  );

  React.useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % slides.length;
        const offset = nextIndex * (CARD_WIDTH + SLIDE_SPACING);
        flatListRef.current?.scrollToOffset({ offset, animated: true });
        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
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
    height: 160,
    borderRadius: 18,
    overflow: "hidden",
  },
  slideImage: {
    borderRadius: 18,
    resizeMode: "cover",
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

export default WeatherSlider;
