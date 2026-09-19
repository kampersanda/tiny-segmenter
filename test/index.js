var assert = require("assert");
var TinySegmenter = require("../lib");

var segmenter = new TinySegmenter();

assert.deepEqual(segmenter.segment("1280"), ["1280"]);
assert.deepEqual(segmenter.segment("価格は1280円です"), ["価格", "は", "1280", "円", "です"]);
assert.deepEqual(segmenter.segment("１２８０"), ["１２８０"]);
assert.deepEqual(segmenter.segment("12３４"), ["12３４"]);
assert.deepEqual(segmenter.segment("千二百八十"), ["千二百八十"]);
assert.deepEqual(segmenter.segment("価格は千二百八十円です"), ["価格", "は", "千二百八十", "円", "です"]);
assert.deepEqual(segmenter.segment("一億二千万"), ["一億二千万"]);
assert.deepEqual(segmenter.segment("一億2000万"), ["一億", "2000", "万"]);

// userWords: never split inside a user word; the word's edges are left to the model.
assert.deepEqual(segmenter.segment("契約書を確認する"), ["契", "約書", "を", "確認", "する"]);
var userSegmenter = new TinySegmenter({ userWords: ["契約", "業務委託"] });
assert.deepEqual(userSegmenter.segment("契約書を確認する"), ["契約", "書", "を", "確認", "する"]);
assert.deepEqual(userSegmenter.segment("業務委託契約"), ["業務委託", "契約"]);
assert.deepEqual(userSegmenter.segment("新しい契約を結ぶ"), ["新しい", "契約", "を", "結ぶ"]);
assert.deepEqual(userSegmenter.segment("契約と契約"), ["契約", "と", "契約"]);
assert.deepEqual(userSegmenter.segment("価格は1280円です"), ["価格", "は", "1280", "円", "です"]);
assert.deepEqual(new TinySegmenter({ userWords: [] }).segment("契約書を確認する"), segmenter.segment("契約書を確認する"));
assert.throws(function () { new TinySegmenter({ userWords: "契約" }); }, TypeError);
assert.throws(function () { new TinySegmenter({ userWords: [1] }); }, TypeError);
