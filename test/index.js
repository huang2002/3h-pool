// @ts-check
const { test } = require('3h-test');
const { Pool } = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-pool.umd.js'))
);

test(null, {

    basics(context) {

        const pool = new Pool({
            create: () => ({
                initialized: false,
                cleared: false,
            }),
        });

        context.assertStrictEqual(typeof pool.create, 'function');
        context.assertStrictEqual(pool.init, null);
        context.assertStrictEqual(pool.clear, null);
        context.assertStrictEqual(pool.pool.length, 0);

        const object = pool.pop();
        context.assertStrictEqual(pool.pool.length, 0);
        context.assertDeepEqual(object, {
            initialized: false,
            cleared: false,
        });

        pool.push(object);
        context.assertStrictEqual(pool.pool.length, 1);
        context.assertDeepEqual(object, {
            initialized: false,
            cleared: false,
        });

    },

    prepare(context) {

        const pool = new Pool({
            create: () => ({
                initialized: false,
                cleared: false,
            }),
            initSize: 10,
        });

        context.assertStrictEqual(typeof pool.create, 'function');
        context.assertStrictEqual(pool.init, null);
        context.assertStrictEqual(pool.clear, null);
        context.assertStrictEqual(pool.pool.length, 10);

        const object = pool.pop();
        context.assertStrictEqual(pool.pool.length, 9);
        context.assertDeepEqual(object, {
            initialized: false,
            cleared: false,
        });

        pool.prepare(10);
        context.assertStrictEqual(pool.pool.length, 10);

        pool.prepare(5);
        context.assertStrictEqual(pool.pool.length, 10);

        pool.push(object);
        context.assertStrictEqual(pool.pool.length, 11);
        context.assertDeepEqual(object, {
            initialized: false,
            cleared: false,
        });

    },

    init(context) {

        const pool = new Pool({
            create: () => ({
                initialized: false,
                cleared: false,
            }),
            init(object) {
                object.initialized = true;
                object.cleared = false;
            },
        });

        context.assertStrictEqual(typeof pool.create, 'function');
        context.assertStrictEqual(typeof pool.init, 'function');
        context.assertStrictEqual(pool.clear, null);
        context.assertStrictEqual(pool.pool.length, 0);

        const object = pool.pop();
        context.assertStrictEqual(pool.pool.length, 0);
        context.assertDeepEqual(object, {
            initialized: true,
            cleared: false,
        });

        pool.push(object);
        context.assertStrictEqual(pool.pool.length, 1);
        context.assertDeepEqual(object, {
            initialized: true,
            cleared: false,
        });

    },

    clear(context) {

        const pool = new Pool({
            create: () => ({
                initialized: false,
                cleared: false,
            }),
            clear(object) {
                object.initialized = false;
                object.cleared = true;
            },
        });

        context.assertStrictEqual(typeof pool.create, 'function');
        context.assertStrictEqual(pool.init, null);
        context.assertStrictEqual(typeof pool.clear, 'function');
        context.assertStrictEqual(pool.pool.length, 0);

        const object = pool.pop();
        context.assertStrictEqual(pool.pool.length, 0);
        context.assertDeepEqual(object, {
            initialized: false,
            cleared: false,
        });

        pool.push(object);
        context.assertStrictEqual(pool.pool.length, 1);
        context.assertDeepEqual(object, {
            initialized: false,
            cleared: true,
        });

    },

});
