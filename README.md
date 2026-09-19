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

## Differences from the original

### Numeric sequences

Unlike the original TinySegmenter, this version keeps consecutive half-width digits, full-width digits, and kanji numerals in a single segment. For example, `1280` and `千二百八十` remain whole, while `一億2000万` is segmented as `一億 | 2000 | 万`.

### User words

The original TinySegmenter has no way to customize segmentation. This version accepts `userWords` to keep specific words from being split. A user word is never split internally, while the boundaries at its edges are still decided by the model.

```javascript
var segmenter = new TinySegmenter({ userWords: ["新幹線", "雪だるま"] });
console.log(segmenter.segment("雪だるまを作る").join(" | ")); // 雪だるま | を | 作る
```

Without `userWords`, the same input is segmented as `雪 | だる | ま | を | 作る`. If user words overlap in the input, no boundary inside any of them is split.

## License

The original TinySegmenter implementation is distributed under the BSD 3-Clause License. The npm packaging and related changes inherited by this repository are distributed under the MIT License. See [LICENSE](LICENSE) for details.
