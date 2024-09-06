import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';

export function ResendCode({ countDownComponent, resendText, onTimeReached, onResend }: ResendCodeProps) {

    const [countdown, setCountdown] = useState(0);
    let timer: number;

    useEffect(() => {
        timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            clearInterval(timer);
        }
    }, [countdown]);

    const handleResend = () => {
        setCountdown(30);
        onResend();
    }

    return (
        <View>
            {
                countdown > 0 ? (
                    <PassText>
                        You can resend the code in {countdown}
                    </PassText>
                ) : (
                    <PassButton onPress={handleResend}>
                        <PassText>{resendText}</PassText>
                    </PassButton>
                )
            }
        </View>
    )
}

interface ResendCodeProps {
    countDownComponent: (currentTime: number) => void;
    resendText?: string;
    onTimeReached: () => void
    onResend: () => void
}