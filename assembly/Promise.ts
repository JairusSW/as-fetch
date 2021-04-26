declare function _defer(fn: usize): void

export {_defer}

export function defer<T>(fn: T): void {
	if (!isFunction<T>(fn)) throw new Error('Must pass a function of type `() => void`.')
	_defer(load<i32>(changetype<usize>(fn)))
}

declare function _deferWithArg(fn: usize, arg: usize): void

export {_deferWithArg}

export function deferWithArg<T>(fn: T, arg: usize): void {
	if (!isFunction<T>(fn)) throw new Error('Must pass a function of type `() => void`.')
	_deferWithArg(load<i32>(changetype<usize>(fn)), arg)
}


// TODO convert to callback form once closures are out.
// type Executor<T> = (resolve: (result: T) => void, reject: (error: Error | null) => void) => void
type Executor<T> = (resRej: PromiseActions<T>) => void

// We shouldn't have to export this (or this class should even exist) once AS supports closures.
class PromiseActions<T> {
	/*friend*/ constructor(private promise: Promise<T>) {}

	resolve(result: T): void {
		if (this.promise.__isSettled) return
		this.promise.__isSettled = true
		this.promise.__isResolved = true

		this.promise.__result.push(result)

		if (this.promise.__thenCallback.length) this.promise.__runThen()
	}

	reject(error: Error): void {
		if (this.promise.__isSettled) return
		this.promise.__isSettled = true
		this.promise.__isRejected = true

		this.promise.__error.push(error)

		if (this.promise.__catchCallback.length) this.promise.__runCatch()
	}
}

export class Promise<T> {
	__isSettled: boolean = false
	__isResolved: boolean = false
	__isRejected: boolean = false

	private actions: PromiseActions<T> = new PromiseActions(this)

	__result: Array<T> = []
	__error: Array<Error> = []

	constructor(private executor: Executor<T>) {
		this.executor(this.actions)
	}

	__thenCallback: Array<(val: T) => void> = []

	then(cb: (v: T) => void): Promise<T> {
		//if (this.__thenCallback.length) throw new Error('Promise chaining or multiple then/catch calls not yet supported.')
		//--> Fixed. Return type is Promise<T> and return is this.
		this.__thenCallback.push(cb)

		if (this.__result.length) this.__runThen()

		return this

	}

	__runThen(): void {
		// XXX unable to pass methods as callbacks:
		// defer<(this: Promise<T>) => void>(this.anyMethod)
		// _defer(changetype<usize>(this.anyMethod))
		// _defer(changetype<usize><(this: Promise<T>) => void>(this.anyMethod))

		// The goal here is to run the callback in the next microtask, as per Promise spec.
		deferWithArg((selfPtr: usize) => {
			const self = changetype<Promise<T>>(selfPtr)

			if (!self.__thenCallback.length || !self.__result.length) throw new Error('This should not happen.')

			const fn = self.__thenCallback[0]

			fn(self.__result[0])
		}, changetype<usize>(this))
	}

	__catchCallback: Array<(err: Error) => void> = []

	catch(cb: (err: Error) => void): Promise<T> {
		//if (this.__catchCallback.length) throw new Error('Promise chaining or multiple then/catch calls not yet supported.')
		//--> Fixed. Return type is Promise<T> and return is this.
		this.__catchCallback.push(cb)

		if (this.__error.length) this.__runCatch()

		return this

	}

	__runCatch(): void {
		if (!this.__catchCallback.length || !this.__error.length) throw new Error('This should not happen.')
		const fn = this.__catchCallback[0]
		fn(this.__error[0])
	}
}
