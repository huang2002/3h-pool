/**
 * Type of pool creators.
 */
export type PoolCreator<T> = () => T;

/**
 * Type of pool processors.
 */
export type PoolProcessor<T> = (object: T) => void;

/**
 * Type of pool options.
 */
export interface PoolOptions<T> {
    /**
     * The creator of objects.
     */
    create: PoolCreator<T>;
    /**
     * The initializer of objects,
     * which will be invoked to initialize
     * objects that will be returned by `pop`.
     */
    init?: PoolProcessor<T> | null;
    /**
     * The cleaner of objects,
     * which will be invoked to clear
     * objects that are received by `push`.
     */
    clear?: PoolProcessor<T> | null;
    /**
     * The initial pool size.
     * (`prepare(initSize)` will be executed.)
     */
    initSize?: number;
}

/**
 * Class of object pools.
 */
export class Pool<T> {

    /**
     * Constructor {@link Pool}.
     */
    constructor(options: PoolOptions<T>) {

        this.create = options.create;
        this.init = options.init || null;
        this.clear = options.clear || null;

        if (options.initSize) {
            this.prepare(options.initSize);
        }

    }

    /**
     * Creator of objects.
     */
    create: PoolCreator<T>;

    /**
     * The initializer of objects,
     * which will be invoked to initialize
     * objects that will be returned by `pop`.
     */
    init: PoolProcessor<T> | null;

    /**
     * The cleaner of objects,
     * which will be invoked to clear
     * objects that are received by `push`.
     */
    clear: PoolProcessor<T> | null;

    /**
     * Internal pool.
     */
    pool: T[] = [];

    /**
     * Prepare specific amount of objects in the pool.
     */
    prepare(count: number) {
        const { pool, create } = this;
        let object;
        for (let i = pool.length; i < count; i++) {
            object = create();
            pool.push(object);
        }
    }

    /**
     * Get an object from the pool.
     */
    pop(): T {
        const { pool } = this;
        const object = pool.length ? pool.pop()! : this.create();
        this.init?.(object);
        return object;
    }

    /**
     * Put an object into the pool. (recycle)
     */
    push(object: T) {
        const { pool } = this;
        this.clear?.(object);
        pool.push(object);
    }

}
