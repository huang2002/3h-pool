# 3h-pool

> A simple object pool lib.

## API Reference

```typescript
// Access the APIs via `require('3h-pool')`
// or `HP.*`(UMD namespace).
export as namespace HP;

/**
 * Type of pool creators.
 */
export declare type PoolCreator<T> = () => T;

/**
 * Type of pool processors.
 */
export declare type PoolProcessor<T> = (object: T) => void;

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
export declare class Pool<T> {

    /**
     * Constructor {@link Pool}.
     */
    constructor(options: PoolOptions<T>);

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
    pool: T[];

    /**
     * Prepare specific amount of objects in the pool.
     */
    prepare(count: number): void;

    /**
     * Get an object from the pool.
     */
    pop(): T;

    /**
     * Put an object into the pool. (recycle)
     */
    push(object: T): void;

}
```
