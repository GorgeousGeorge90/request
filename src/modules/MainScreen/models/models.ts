export type mockedButtonType = {
    id:string,
    title:string,
    aria:string,
}

export type PhoneStateType = {
    phone:string[],
    currentIndex:number,
    isApproved:boolean,
    isFinished:boolean,
    isLoading:'idle' | 'pending' | 'fulfilled' | 'rejected',
    error:null | 'неверно введен номер',
}

export type PhoneActionsType = {
    addNumber:(value:string) => void,
    deleteNumber:() => void,
    setIsApproved:() => void,
    setIsFinished:() => void,
    getResult:() => string,
    setError:() => void,
    clearError:() => void,
    setIsLoading:(value:PhoneStateType["isLoading"]) => void,
    getValidate:(value:number) => void,
    clearState:() => void,
}

