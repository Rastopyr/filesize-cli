const fs = require("fs");
const child_process = require("child_process");

const fsz = require('.');

// https://stackoverflow.com/questions/49433241/creating-an-empty-file-of-a-certain-size
const createEmptyFileOfSize = (fileName, size) => {
  return new Promise((resolve, reject) => {
    if (size < 0) {
      reject("Error: a negative size doesn't make any sense");
      return;
    }

    setTimeout(() => {
      try {
        fd = fs.openSync(fileName, "w");
        if (size > 0) {
          fs.writeSync(fd, Buffer.alloc(1), 0, 1, size - 1);
        }
        fs.closeSync(fd);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
};

describe("FSZ", () => {
  describe("use as library", () => {
    describe("default behavior", () => {
      beforeAll(() => createEmptyFileOfSize("file.test", 30));

      afterAll(done => {
        fs.unlink("file.test", done);
      });

      it("should fail on empty size", () => {
         return fsz(
           {
             filename: "test.file"
           }
         ).catch((err) => {
           expect(err.message).toEqual(
             `ENOENT: no such file or directory, stat 'test.file'`
           );
         });
      });

      it("should return size of test file", () => {
          return fsz({
          filename: "file.test"
        }, (value) => {
          expect(value).toEqual(30);
        });
      });
    });

    describe("format behavior", () => {
      describe("bytes", () => {
        beforeAll(() => createEmptyFileOfSize("file.test", 30));

        afterAll(done => {
          fs.unlink("file.test", done);
        });

        it("should return formatted size in bytes", () => {
          return fsz({
            filename: "file.test",
            format: "b"
          }).then((value) => {
             expect(value).toEqual(30);
          });
        });
      });
    });
  });

  describe("default behavior", () => {
    beforeAll(() => createEmptyFileOfSize("file.test", 30));

    afterAll(done => {
      fs.unlink("file.test", done);
    });

    it("should fail on empty size", done => {
      child_process.execFile(
        "./bin.js",
        ["test.file"],
        (err, stdout, stderr) => {
          expect(stderr).toEqual(
            `Error: ENOENT: no such file or directory, stat 'test.file'`
          );
          done();
        }
      );
    });

    it("should return size of test file", done => {
      child_process.execFile("./bin.js", ["file.test"], (err, stdout) => {
        if (err) {
          done(err);
          return;
        }

        expect(stdout).toEqual(`30`);
        done();
      });
    });
  });

  describe("format behavior", () => {
    describe("bytes", () => {
      beforeAll(() => createEmptyFileOfSize("file.test", 30));

      afterAll(done => {
        fs.unlink("file.test", done);
      });

      it("should return formatted size in bytes", done => {
        child_process.execFile(
          "./bin.js",
          ["file.test", "--format", "b"],
          (err, stdout, stderr) => {
            if (err || stderr) return done(err || stderr);
            expect(stdout).toEqual("30");
            done();
          }
        );
      });
    });

    describe("kilobytes", () => {
      beforeAll(() => createEmptyFileOfSize("file.test", 3 * 1024));

      afterAll(done => {
        fs.unlink("file.test", done);
      });

      it("should return formatted size in kb", done => {
        child_process.execFile(
          "./bin.js",
          ["file.test", "--format", "kb"],
          (err, stdout, stderr) => {
            if (err || stderr) return done(err || stderr);
            expect(stdout).toEqual("3");
            done();
          }
        );
      });
    });

    describe("megabytes", () => {
      beforeAll(() => createEmptyFileOfSize("file.test", 3 * 1024 * 1024));

      afterAll(done => {
        fs.unlink("file.test", done);
      });

      it("should return formatted size in mb", done => {
        child_process.execFile(
          "./bin.js",
          ["file.test", "--format", "mb"],
          (err, stdout, stderr) => {
            if (err || stderr) return done(err || stderr);
            expect(stdout).toEqual("3");
            done();
          }
        );
      });
    });

    describe("gigabytes", () => {
      beforeAll(() => createEmptyFileOfSize("file.test", 50 * 1024 * 1024));

      afterAll(done => {
        fs.unlink("file.test", done);
      });

      it("should return formatted size in gb", done => {
        child_process.execFile(
          "./bin.js",
          ["file.test", "--format", "gb"],
          (err, stdout, stderr) => {
            if (err || stderr) return done(err || stderr);
            expect(stdout).toEqual("0.05");
            done();
          }
        );
      });
    });
  });

  describe("round behavior", () => {
    beforeAll(() => createEmptyFileOfSize("file.test", 3 * 1024 * 1024));

    afterAll(done => {
      fs.unlink("file.test", done);
    });

    it("should properly round small file", done => {
      child_process.execFile(
        "./bin.js",
        ["file.test", "--format", "gb", "--round", "3"],
        (err, stdout, stderr) => {
          if (err || stderr) return done(err || stderr);
          expect(stdout).toEqual("0.003");
          done();
        }
      );
    });
  });
});
