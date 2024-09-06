export function shortenText(
  text: string,
  frontLength: number = 4,
  backLength: number = 4
): string {
  if (text.length > frontLength + backLength) {
    let shortenedText = text.slice(0, frontLength);
    if (backLength > 0) {
      shortenedText += `...${text.slice(-backLength)}`;
    } else {
      shortenedText += '...';
    }

    return shortenedText;
  }

  return text;
}
