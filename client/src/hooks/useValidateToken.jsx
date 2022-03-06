import { useEffect, useState } from "react";
import { validatePasswordToken } from "../http";

export function useValidatePasswordToken(token) {
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        (
            async () => {
                try {
                    await validatePasswordToken({ token })
                    setIsValid(true)

                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [])

    return isValid;
}