import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import GalleryIcon from '~shared/assets/svgs/galleryIcon.svg';

type CollectibleGalleryItemProps = {
  image: string;
  title: string;
  floorPrice: number;
  collections: Array<any>;
  canViewFullScreen?: boolean;
};

const CollectibleGalleryItem: React.FC<CollectibleGalleryItemProps> = ({
  canViewFullScreen,
  image,
  title,
  floorPrice,
  collections,
}) => {
  const [isViewerVisible, setViewerVisible] = useState(false);

  const handlePress = () => {
    if (canViewFullScreen) {
      setViewerVisible(true);
    }
  };

  return (
    <View className="flex-1 rounded-lg bg-white p-4">
      <View className="rounded-xl bg-white">
        <TouchableOpacity className="relative" onPress={handlePress}>
          <Image source={{ uri: image }} className="h-40 rounded-2xl" />
          <View className="absolute bottom-0 right-0 m-2 flex-row gap-2 rounded-full bg-black bg-opacity-50 p-2">
            <GalleryIcon />
            <Text className="font-bold text-white">{collections.length}</Text>
          </View>
        </TouchableOpacity>
        <Text className="mt-2 truncate text-lg font-bold" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-gray-600">Floor: ${floorPrice.toFixed(2)}</Text>
      </View>
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={isViewerVisible}
        onRequestClose={() => setViewerVisible(false)}
      />
    </View>
  );
};

export default CollectibleGalleryItem;
