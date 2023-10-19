import {createContext, FC, ReactNode, useContext, useState} from 'react';


type PhoneWrapperType = {
    children:ReactNode,
}

type PhoneContextType = {
    phone:string,
    approval:boolean,
    updatePhone:(value:string) => void,
    makeApproval:(value:boolean) => void,
}

export const PhoneContext = createContext<PhoneContextType | null>(null)

export const PhoneWrapper:FC<PhoneWrapperType> =({children}) => {
    const [ phone,setPhone ] = useState<string>('')
    const [ approval,setApproval ] = useState<boolean>(false)

    const updatePhone = (value:string) => {
        value === 'стереть' ?
            setPhone(prev => prev.slice(0,prev.length-1)):
            setPhone(prev => prev + value)
    }

    const makeApproval = (value:boolean) => setApproval(value)

    return (<PhoneContext.Provider value={{
        phone,
        approval,
        updatePhone,
        makeApproval
    }}>
        {children}
    </PhoneContext.Provider>)
}

export const usePhoneContext = () => useContext(PhoneContext)

