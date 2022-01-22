// Ava compatibility layer for Deno
/* global Deno */

import { assertEquals, assertStrictEquals, assertThrows } from 'https://deno.land/std@0.122.0/testing/asserts.ts'
import { Buffer } from 'https://cdn.deno.land/std/versions/0.122.0/raw/node/buffer.ts'

const testContext = {
  is: assertStrictEquals,
  deepEqual: assertEquals,
  throws: (fn, condition) => {
    return assertThrows(fn, condition.instanceof, condition.message)
  }
}

function test (name, fn) {
  Deno.test(name, () => fn(testContext))
}

// Does nothing: Deno by default runs tests in serial
test.serial = test

test.skip = test.serial.skip = (name, fn) => {
  Deno.test({
    name,
    fn,
    ignore: true
  })
}

window.Buffer = Buffer
export default test