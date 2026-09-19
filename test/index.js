var assert = require("assert");
var TinySegmenter = require("../lib");

var segmenter = new TinySegmenter();

// joinNumericSequences: off by default, as in the original TinySegmenter.
assert.deepEqual(segmenter.segment("1280"), ["1", "2", "8", "0"]);
assert.deepEqual(segmenter.segment("千二百八十"), ["千", "二", "百", "八", "十"]);
assert.deepEqual(new TinySegmenter({ joinNumericSequences: false }).segment("1280"), segmenter.segment("1280"));
assert.throws(function () { new TinySegmenter({ joinNumericSequences: "yes" }); }, TypeError);

var numericSegmenter = new TinySegmenter({ joinNumericSequences: true });
assert.deepEqual(numericSegmenter.segment("1280"), ["1280"]);
assert.deepEqual(numericSegmenter.segment("価格は1280円です"), ["価格", "は", "1280", "円", "です"]);
assert.deepEqual(numericSegmenter.segment("１２８０"), ["１２８０"]);
assert.deepEqual(numericSegmenter.segment("12３４"), ["12３４"]);
assert.deepEqual(numericSegmenter.segment("千二百八十"), ["千二百八十"]);
assert.deepEqual(numericSegmenter.segment("価格は千二百八十円です"), ["価格", "は", "千二百八十", "円", "です"]);
assert.deepEqual(numericSegmenter.segment("一億二千万"), ["一億二千万"]);
assert.deepEqual(numericSegmenter.segment("一億2000万"), ["一億", "2000", "万"]);

// userWords: never split inside a user word; the word's edges are left to the model.
assert.deepEqual(segmenter.segment("雪だるまを作る"), ["雪", "だる", "ま", "を", "作る"]);
var userSegmenter = new TinySegmenter({ userWords: ["新幹線", "雪だるま"] });
assert.deepEqual(userSegmenter.segment("雪だるまを作る"), ["雪だるま", "を", "作る"]);
assert.deepEqual(userSegmenter.segment("新幹線で帰る"), ["新幹線", "で", "帰る"]);
assert.deepEqual(userSegmenter.segment("新幹線と新幹線"), ["新幹線", "と", "新幹線"]);
assert.deepEqual(userSegmenter.segment("新幹線誕生日"), ["新幹線", "誕生", "日"]);
assert.deepEqual(new TinySegmenter({ userWords: ["新幹線"], joinNumericSequences: true }).segment("新幹線は1280円です"), ["新幹線", "は", "1280", "円", "です"]);
assert.deepEqual(new TinySegmenter({ userWords: [] }).segment("雪だるまを作る"), segmenter.segment("雪だるまを作る"));
assert.throws(function () { new TinySegmenter({ userWords: "新幹線" }); }, TypeError);
assert.throws(function () { new TinySegmenter({ userWords: [1] }); }, TypeError);
// A word that is a prefix of another, overlapping words, and a partial match.
assert.deepEqual(new TinySegmenter({ userWords: ["雪だ", "雪だるま"] }).segment("雪だるまを作る"), ["雪だるま", "を", "作る"]);
assert.deepEqual(new TinySegmenter({ userWords: ["雪だる", "だるま"] }).segment("雪だるまを作る"), ["雪だるま", "を", "作る"]);
assert.deepEqual(new TinySegmenter({ userWords: ["雪だるま"] }).segment("雪だる"), segmenter.segment("雪だる"));
