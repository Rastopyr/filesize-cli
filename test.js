const fs = require("fs");
const child_process = require("child_process");

describe("FSZ", () => {
  beforeAll(done => {
    fs.writeFile("file.test", Buffer.from("123").toString(), done);
  });

  afterAll(done => {
    fs.unlink("file.test", done);
  });

  it("should fail on empty size", done => {
    child_process.execFile("./bin.js", ["test.file"], (err, stdout, stderr) => {
      expect(stderr).toEqual(
        `Error: ENOENT: no such file or directory, stat 'test.file'`
      );
      done();
    });
  });

  it("should return size of test file", done => {
    child_process.execFile("./bin.js", ["file.test"], (err, stdout) => {
      if (err) {
        done(err);
        return;
      }

      expect(stdout).toEqual(`3`);
      done();
    });
  });
});
