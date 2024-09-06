import React from 'react';
import { View } from 'react-native';
import Skeleton from '~shared/skeleton/Skeleton';

const ActivityListPlaceholder = () => {
  return (
    <View className="mt-5">
      {[...new Array(8).keys()].map((index) => (
        <View className="flex flex-row items-center p-5" key={index}>
          <Skeleton className="h-14 w-14 rounded-full" />
          <View className="flex-1">
            <Skeleton className="ml-5 h-5 w-40" />
          </View>
          <View className="ml-3 w-28 flex-col ">
            <Skeleton className="mb-3 h-5" />
            <Skeleton className="h-2 w-14 items-center justify-center self-end" />
          </View>
        </View>
      ))}
    </View>
  );
};

export default React.memo(ActivityListPlaceholder);
