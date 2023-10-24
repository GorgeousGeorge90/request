import { fromEvent, mergeWith, Observable } from 'rxjs';

export class TimerService {
    private keydown$:Observable<Event>
    private click$:Observable<Event>
    private timeout:any
    private subscription:any


    constructor(
        public time:number,
        private el:Element,
        public close:() => void,
    ) {
        this.time = time
        this.close = close
        this.keydown$ = fromEvent(el,'keydown')
        this.click$ = fromEvent(el,'click')
    }

    setTimer() {
        return setTimeout(()=> this.close(), this.time)
    }

    makeSubscription() {
        this.timeout = this.setTimer()

        this.subscription = this.keydown$.pipe(
            mergeWith(this.click$)
        ).subscribe(() => {
            clearTimeout(this.timeout)
            this.timeout = this.setTimer()
        })
    }

    makeUnsubscription() {
        this.subscription.unsubscribe()
    }
}