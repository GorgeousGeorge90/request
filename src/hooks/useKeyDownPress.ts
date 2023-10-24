import { useEffect } from 'react';


export const useKeyPress = (
    callback:(title?:string)=>void,
    targetKey:string,
    ):void=> {
    useEffect(()=> {
        const KeyPressHandler = (event:KeyboardEvent) => {
            if (event.key === targetKey) {
                callback()
            }
        }
        window.addEventListener('keydown', KeyPressHandler)
        return () => window.removeEventListener('keydown', KeyPressHandler)
    },[callback, targetKey])
}


