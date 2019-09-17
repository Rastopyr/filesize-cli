
const fs = require("fs");
const filesize = require("filesize");

const exponentOptions = {
    b: 0,
    kb: 1,
    mb: 2,
    gb: 3
};

module.exports = ({ filename, format, round }) => {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            if (err) {
                return reject(err);
            }

            const formatted = filesize(stats.size, {
                round,
                output: "object",
                exponent: exponentOptions[format]
            });

            resolve(formatted.value)
        });
    });
}
