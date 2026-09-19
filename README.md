# @kampersanda/tiny-segmenter

An independently maintained package based on [TinySegmenter](http://chasen.org/~taku/software/TinySegmenter/), the super compact Japanese tokenizer in JavaScript.

This package is published separately from the unscoped `tiny-segmenter` npm package.

Try it in your browser: https://kampersanda.github.io/tiny-segmenter/

## Install

```shell
npm install @kampersanda/tiny-segmenter
```

## Usage

```javascript
var TinySegmenter = require("@kampersanda/tiny-segmenter");

var segmenter = new TinySegmenter();
var segments = segmenter.segment("私の名前は中野です");
console.log(segments.join(" | "));
```

### User words

Pass `userWords` to keep specific words from being split. A user word is never split internally, while the boundaries at its edges are still decided by the model.

```javascript
var segmenter = new TinySegmenter({ userWords: ["新幹線", "雪だるま"] });
console.log(segmenter.segment("雪だるまを作る").join(" | ")); // 雪だるま | を | 作る
```

Without `userWords`, the same input is segmented as `雪 | だる | ま | を | 作る`. If user words overlap in the input, no boundary inside any of them is split.

Each call to `segment` searches the input for every user word, so the extra cost grows in proportion to the number of user words times the input length. A few hundred words have little effect, but very large lists slow segmentation noticeably. In one measurement (Node.js 24, 1,000-character input), segmentation took about 1.1 ms with no user words, 1.2 ms with 1,000, and 2.0 ms with 10,000.

## Differences from the original

Unlike the original TinySegmenter, this version keeps consecutive half-width digits, full-width digits, and kanji numerals in a single segment. For example, `1280` and `千二百八十` remain whole, while `一億2000万` is segmented as `一億 | 2000 | 万`.

## License

The original TinySegmenter implementation is distributed under the BSD 3-Clause License. The npm packaging and related changes inherited by this repository are distributed under the MIT License. See [LICENSE](LICENSE) for details.
