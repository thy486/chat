enum PromiseStatus {
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected'
}

type Resolve<T> = (value: T | MyPromise<T>) => void;
type Reject = (error: unknown) => void;
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

class MyPromise<T = unknown> {
    #executor: Executor<T>
    #value: T | MyPromise<T> | undefined
    #error: unknown
    status: PromiseStatus = PromiseStatus.pending

    constructor(executor: Executor<T>) {
        this.#executor = executor
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value: T | MyPromise<T>) {
        if (this.status === PromiseStatus.pending) {
            this.#value = value
            this.status = PromiseStatus.fulfilled
        }
    }

    reject(e: unknown) {
        if (this.status === PromiseStatus.pending) {
            this.#error = e
            this.status = PromiseStatus.rejected
        }
    }

    then(
        onFulfilled?: ((value: T | MyPromise<T>) => (T | MyPromise<T> | void)) | null | undefined,
        onRejected?: (error: any) => MyPromise<never> | null | undefined | void
    ) {
        if (this.status === PromiseStatus.fulfilled) {
            onFulfilled && onFulfilled(this.#value as T)
        } else if (this.status === PromiseStatus.rejected) {
            onRejected && onRejected(this.#error)
        } else {
            setTimeout(()=>{
                this.then(onFulfilled, onRejected)
            })
        }
    }


    catch(onRejected: (error: any) => MyPromise<never> | null | undefined | void) {
        if (this.status === PromiseStatus.rejected) {
            onRejected && onRejected(this.#error)
        }
    }
}
