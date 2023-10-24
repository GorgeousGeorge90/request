import { fromEvent } from "rxjs";


export class FocusService {
    private stream$ = fromEvent<KeyboardEvent>(document, 'keydown')
    private subscription:any
    private active?:HTMLElement

    private i:number = 0;

    constructor(
        readonly elements:NodeList,
    ) {
        this.elements = elements
    }

    focusEl():void {
        this.active = (this.elements[this.i] as HTMLElement)
        this.active.focus()
    }

    forwards():void {
        let { i, elements }  = this
        if ( i === 0 ) {
            this.focusEl()
            this.i++;
        }
        if ( i === elements.length - 1 ) {
            this.focusEl()
            this.i = 0;
        }
        if ( i > 0 && i < elements.length-1) {
            this.focusEl()
            this.i++;
        }
    }

    backwards():void {
        let {i, elements} = this
        if (i === 0) {
            this.focusEl()
            this.i -= 1
        }
        if (i > 0 && i <= elements.length - 1) {
            this.focusEl()
            this.i -= 1
        }
    }

    makeSubscription():void {
        this.subscription = this.stream$.subscribe(e => {
            if (e.key === 'ArrowRight') {
                this.forwards()
            }

            if (e.key === 'ArrowLeft') {
                this.backwards()
            }
        })
    }

    makeUnsubscription():void {
         this.subscription.unsubscribe()
    }
}
