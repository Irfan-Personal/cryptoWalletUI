import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export function QrComponent({ qrData, qrSize }: QrComponentProps) {
  return (
    <QRCode
      value={qrData}
      size={qrSize}
      color="black"
      backgroundColor="white"
      logoBackgroundColor="transparent" // Make sure the background is transparent to see the pattern image
    />
  );
}

interface QrComponentProps {
  qrData: string;
  qrSize: number;
}
