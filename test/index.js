var assert = require("assert");
var TinySegmenter = require("../lib");

var segmenter = new TinySegmenter();

assert.deepEqual(segmenter.segment("1280"), ["1280"]);
assert.deepEqual(segmenter.segment("価格は1280円です"), ["価格", "は", "1280", "円", "です"]);
assert.deepEqual(segmenter.segment("１２８０"), ["１２８０"]);
assert.deepEqual(segmenter.segment("12３４"), ["12３４"]);
