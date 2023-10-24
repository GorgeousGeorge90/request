import { fromEvent } from 'rxjs';
import { mockedButtonType, PhoneActionsType } from '../modules/MainScreen/models';


export class NumbersService {
    private stream$ = fromEvent<KeyboardEvent>(document, 'keydown')
    private subscription: any

    constructor(
        private buttons: mockedButtonType[],
        public addNumber: PhoneActionsType["addNumber"],
        public deleteNumber: PhoneActionsType["deleteNumber"],
    ) {
        this.buttons = buttons
        this.addNumber = addNumber
        this.deleteNumber = deleteNumber
    }

    makeSubscription(): void {
        this.subscription = this.stream$.subscribe(e => {
            this.buttons.forEach(btn => {
                if (e.key === btn.title) {
                    this.addNumber(btn.title)
                } else if (e.key === 'Backspace' &&
                    btn.title === 'стереть') {
                    this.deleteNumber()
                }
            })
        })
    }

    makeUnsubscription():void {
        this.subscription.unsubscribe()
    }
}
