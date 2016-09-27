var math = require('./mymath.js')

function add(a, b) {
    if (typeof a !== 'number' && !isNaN(a) && isFinite(a))
        throw new Error('a is not valid number');
    if (typeof b !== 'number' && !isNaN(b) && isFinite(b))
        throw new Error('b is not valid number');
    return (math.add(a, b));
}

exports.add = add;