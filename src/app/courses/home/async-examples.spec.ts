import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe('Async Testing Examples',()=>{
    it('Asynchronous test example with jasmine done()',(done:DoneFn)=>{
        let test = false;

        setTimeout(() => {
            test = true;
            expect(test).toBeTruthy()
            done()
        }, 1000);

    })

    it('Asynchronous test example - fake async',fakeAsync(()=>{
        let test = false;
        setTimeout(() => {
            test = true;
            expect(test).toBeTruthy();
        }, 1000);

        // tick(1000);
        flush();
        expect(test).toBeTruthy();

    }))

    it('Asynchronous test example - ',fakeAsync(()=>{
        let test = false;
        Promise.resolve().then(()=>{
            test = true;

        });
        
        flushMicrotasks();
        expect(test).toBeTruthy();

    }))

    it('Asynchronous test example - promises + settimeout',fakeAsync(()=>{
        let counter = 0 ;

        Promise.resolve().then(()=>{
            counter+=10;
            setTimeout(() => {
                counter += 1;
            },1000);
        })

        expect(counter).toBe(0)
        flushMicrotasks();
        expect(counter).toBe(10)
        flush()
        expect(counter).toBe(11)
        

    }))

    it('Asynchronous test example - Observables',fakeAsync(()=>{
        let test = false;
        const test$ = of(test).pipe(delay(1000));
        test$.subscribe(()=>{
            test = true;
        })

        tick(1000);

        expect(test).toBe(true);
    }))

})