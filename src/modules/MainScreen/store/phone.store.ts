import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'
import MainService from "../service/main.service";
import {devtools} from "zustand/middleware";

type PhoneStateType = {
    phone:string[],
    currentIndex:number,
    isApproved:boolean,
    isFinished:boolean,
    isLoading:'idle' | 'pending' | 'fulfilled' | 'rejected',
    error:null | string,
}

type PhoneActionsType = {
    addNumber:(value:string) => void,
    deleteNumber:() => void,
    setIsApproved:() => void,
    setIsFinished:() => void,
    getResult:() => string,
    setError:() => void,
    clearError:() => void,
    setIsLoading:(value:PhoneStateType["isLoading"]) => void,
    getValidate:(value:number) => void,
}

type ResponseType = {
    valid:boolean,
}

const indexes:number[] = [6,10,13]

export const usePhoneStore = create(devtools(immer<PhoneStateType & PhoneActionsType>((set, get) => ({
    phone: '+7(___)___-__-__'.split(''),
    currentIndex: 3,
    isApproved: false,
    isFinished: false,
    isLoading: 'idle',
    error: null,

    addNumber: (value: string) => set(state => {
        if (indexes.includes(state.currentIndex)) {
            state.currentIndex++;
        }
        if (state.currentIndex <= 15) {
            state.phone[state.currentIndex] = value
            state.currentIndex++;
        }
    }),

    deleteNumber: () => set(state => {
        if (indexes.includes(state.currentIndex - 1)) {
            state.currentIndex--;
        }
        state.phone[state.currentIndex - 1] = '_'
        state.currentIndex--;
    }),

    setIsFinished: () => set(state => {
        state.isFinished = true
    }),

    setIsApproved: () => set(state => {
        state.isApproved = !state.isApproved
    }),

    setError: () => set(state => {
        state.error = 'неверно введен номер'
    }),

    clearError: () => set(state => {
        state.error = null
    }),

    setIsLoading: (value: PhoneStateType["isLoading"]) => set(state => {
        state.isLoading = value
    }),

    getResult: () => {
        return get().phone.join('')
    },

    getValidate: async (value: number) => {
        get().setIsLoading('pending')
        const response = await MainService.getValidate(value)
        if (response) {
            get().setIsLoading('fulfilled')
            get().clearError()
            get().setIsFinished()
        } else {
            get().setError()
            get().setIsLoading('rejected')
        }
    }
}))))