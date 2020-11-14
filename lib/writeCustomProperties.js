const prettier = require('prettier');

module.exports = (css) => {
    let output = `:root {
        ${css.join('\n')}
    }`;

    return prettier.format(output, { parser: 'css' });
};
