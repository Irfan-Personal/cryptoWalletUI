export function truncateText(text: string = '', truncateLength: number) {
  if (text.length <= truncateLength) return text;

  return `${text.substring(0, truncateLength + 1)}...`;
}

export const isEmpty = (collection: unknown): boolean => {
  if (collection === null || collection === undefined) return true;

  if (Array.isArray(collection)) {
    return collection.length === 0;
  }

  if (typeof collection === 'object') {
    return Object.keys(collection).length === 0;
  }

  if (typeof collection === 'string') {
    return collection.length === 0;
  }

  if (typeof collection === 'boolean' || typeof collection === 'number') {
    return false;
  }

  return false;
};
