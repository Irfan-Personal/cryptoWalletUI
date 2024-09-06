import { View } from "react-native";
import { PassText } from "../passText/PassText";
import { PassButton } from "../passButton/PassButton";




export function countDownComponent({}){
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