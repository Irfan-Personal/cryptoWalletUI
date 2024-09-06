// Placeholder.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface PlaceholderProps {
  className?: string;
  style?: ViewStyle;
}

const Skeleton: React.FC<PlaceholderProps> = ({ className = '', style }) => {
  const animation = useRef(new Animated.Value(0)).current; // Initial value for opacity

  useEffect(() => {
    const animated: Animated.CompositeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animated.start();

    return animated.stop;
  }, [animation]);

  return (
    <Animated.View
      className={`bg-gray-200 ${className}`}
      style={[
        style,
        {
          opacity: animation,
        },
      ]}
    />
  );
};

export default Skeleton;
