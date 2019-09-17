# fsz-cli

Small CLI wrapper for filesize npm package

## Usage

```bash
> fsz package.json
322 # size in bytes

> fsz package.json --format kb
0.32 # size in kb

> fsz 2mb.file --format mb
2 # size in mb

> fsz 5gb.file --format gb
5 # size in gb

> fsz 2mb.file --format gb
0 # size in gb is zero because default round is 2

> fsz 2mb.file --format gb --round 4
0.0004 # size in gb rounded to 4
```
