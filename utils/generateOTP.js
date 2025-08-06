import {randomInt} from "crypto"


export const generateOTP = (minValue = 100000, maxValue = 999999) => {
    try {
        const otp = randomInt(minValue, maxValue)
        return otp
        
    } catch (error) {
        throw `Error generating password ${error}`
    }
}