const list_helper = require('../utils/list_helper')

const dummy = list_helper.dummy

test('dummy should be 1', () => {
    expect(dummy([])).toBe(1)
})