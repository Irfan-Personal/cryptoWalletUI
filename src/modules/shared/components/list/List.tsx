import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

const List = <T,>({
  className,
  data,
  renderItem,
  keyExtractor,
}: ListProps<T>) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      className={className}
    />
  );
};

interface ListProps<T> extends FlatListProps<T> {
  className?: string;
}

export { List };
