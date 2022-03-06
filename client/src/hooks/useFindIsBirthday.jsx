import { useEffect, useState } from "react";
import Cookies from 'universal-cookie'
import { detectBirthday } from "../http";

const useFindIsBirthday = () => {
    const [isBirthday, setIsBirthday] = useState(false)

    const cookie = new Cookies();
    useEffect(() => {

        (async () => {
            const isShown = cookie.get('birthdayPopupShown')

            if (!isShown || isShown === 'false') {
                try {
                    await detectBirthday();
                    setIsBirthday(true)
                    return;

                } catch (error) {
                    console.log(error);
                }
            }
        }
        )()
    }, [])
    
    return { isBirthday, setIsBirthday };
}

export default useFindIsBirthday;