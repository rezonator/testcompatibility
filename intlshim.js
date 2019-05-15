(function () {
	'use strict';

	var SUPPORTS_RELATIVE_TIME_FORMAT = "RelativeTimeFormat" in Intl;

	

	

	

	

	

	

	

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __values(o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	var VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES = ["second", "minute", "hour", "day", "week", "month", "quarter", "year"];
	var VALID_EXTENDED_SINGULAR_RELATIVE_TIME_UNIT_VALUES = __spread(VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES, [
	    "second-narrow",
	    "second-short",
	    "minute-narrow",
	    "minute-short",
	    "hour-narrow",
	    "hour-short",
	    "day-narrow",
	    "day-short",
	    "week-narrow",
	    "week-short",
	    "month-narrow",
	    "month-short",
	    "quarter-narrow",
	    "quarter-short",
	    "year-narrow",
	    "year-short"
	]);
	/**
	 * Sanitizes a RelativeTimeUnit into a SingularRelativeTimeUnit
	 *
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-singularrelativetimeunit
	 * @param {RelativeTimeUnit} unit
	 * @return {SingularRelativeTimeUnit}
	 */
	function singularRelativeTimeUnit(unit) {
	    // Assert: Type(unit) is String.
	    if (typeof unit !== "string") {
	        throw new TypeError("unit: '" + unit + "' must be a string");
	    }
	    // If unit is "seconds", return "second".
	    if (unit === "seconds")
	        return "second";
	    // If unit is "minutes", return "minute".
	    if (unit === "minutes")
	        return "minute";
	    // If unit is "hours", return "hour".
	    if (unit === "hours")
	        return "hour";
	    // If unit is "days", return "day".
	    if (unit === "days")
	        return "day";
	    // If unit is "weeks", return "week".
	    if (unit === "weeks")
	        return "week";
	    // If unit is "months", return "month".
	    if (unit === "months")
	        return "month";
	    // If unit is "quarters", return "quarter".
	    if (unit === "quarters")
	        return "quarter";
	    // If unit is "years", return "year".
	    if (unit === "years")
	        return "year";
	    // If unit is not one of "second", "minute", "hour", "day", "week", "month", "quarter", or "year", throw a RangeError exception.
	    if (!VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES.some(function (validUnit) { return validUnit === unit; })) {
	        throw new RangeError("Unit: '" + unit + "' must be one of: " + VALID_SINGULAR_RELATIVE_TIME_UNIT_VALUES.map(function (val) { return "\"" + val + "\""; }).join(", "));
	    }
	    // Return unit.
	    return unit;
	}

	

	

	

	

	

	

	

	/* tslint:disable:use-primitive-type no-construct no-any */
	/**
	 * The abstract operation ToObject converts argument to a value of type Object.
	 *
	 * https://tc39.github.io/ecma262/#sec-toobject
	 * @param {T} argument
	 * @return {T extends boolean ? Boolean : T extends number ? Number : T extends string ? String : T extends symbol ? symbol : T}
	 */
	function toObject(argument) {
	    if (argument == null) {
	        throw new TypeError("Argument " + argument + " cannot be converted to an Object");
	    }
	    if (typeof argument === "boolean") {
	        return new Boolean(argument);
	    }
	    if (typeof argument === "number") {
	        return new Number(argument);
	    }
	    if (typeof argument === "string") {
	        return new String(argument);
	    }
	    if (typeof argument === "symbol") {
	        return new Object(argument);
	    }
	    return argument;
	}

	

	

	

	

	/**
	 * A Regular Expression that matches Unicode extension sequences
	 * @type {RegExp}
	 */
	var UNICODE_EXTENSION_SEQUENCE_REGEXP = /-u(?:-[0-9a-z]{2,8})+/gi;
	/**
	 * Removes all Unicode characters from the given string
	 * @param {string} str
	 * @return {string}
	 */
	function removeUnicodeExtensionSequences(str) {
	    return str.replace(UNICODE_EXTENSION_SEQUENCE_REGEXP, "");
	}
	/**
	 * The abstract operation UnicodeExtensionValue is called with extension, which must be a Unicode locale extension sequence,
	 * and String key. This operation returns the type subtags for key.
	 * @param {string} extension
	 * @param {string} key
	 * @returns {string?}
	 */
	function unicodeExtensionValue(extension, key) {
	    // Assert: The number of elements in key is 2.
	    if (key.length !== 2) {
	        throw new TypeError("Could not get UnicodeExtensionValue: The given key: '" + key + "' must have a length of 2");
	    }
	    // Let size be the number of elements in extension.
	    var size = key.length;
	    // Let searchValue be the concatenation of "-", key, and "-".
	    var searchValue = "-" + key + "-";
	    // Let pos be Call(%StringProto_indexOf%, extension, « searchValue »).
	    var pos = String.prototype.indexOf.call(extension, searchValue);
	    // If pos ≠ -1, then
	    if (pos !== -1) {
	        // Let start be pos + 4.
	        var start = pos + 4;
	        // Let end be start.
	        var end = start;
	        // Let k be start.
	        var k = start;
	        // Let done be false.
	        var done = false;
	        // Repeat, while done is false
	        while (!done) {
	            // Let e be Call(%StringProto_indexOf%, extension, « "-", k »).
	            var e = String.prototype.indexOf.call(extension, "-", k);
	            // If e = -1, let len be size - k; else let len be e - k.
	            var len = e === -1 ? size - k : e - k;
	            // If len = 2, then
	            if (len === 2) {
	                // Let done be true.
	                done = true;
	            }
	            // Else if e = -1, then
	            else if (e === -1) {
	                // Let end be size.
	                end = size;
	                // Let done be true.
	                done = true;
	            }
	            // Else,
	            else {
	                // Let end be e.
	                end = e;
	                // Let k be e + 1.
	                k = e + 1;
	            }
	        }
	        // Return the String value equal to the substring of extension consisting of
	        // the code units at indices start (inclusive) through end (exclusive).
	        return extension.slice(start, end);
	    }
	    // Let searchValue be the concatenation of "-" and key.
	    searchValue = "-" + key;
	    // Let pos be Call(%StringProto_indexOf%, extension, « searchValue »).
	    pos = String.prototype.indexOf.call(extension, searchValue);
	    // If pos ≠ -1 and pos + 3 = size, then
	    if (pos !== -1 && pos + 3 === size) {
	        // Return the empty String.
	        return "";
	    }
	    // Return undefined.
	    return undefined;
	}

	/**
	 * The BestAvailableLocale abstract operation compares the provided argument locale,
	 * which must be a String value with a structurally valid and canonicalized BCP 47 language tag,
	 * against the locales in availableLocales and returns either the longest non-empty prefix of locale
	 * that is an element of availableLocales, or undefined if there is no such element. It uses the fallback
	 * mechanism of RFC 4647, section 3.4.
	 *
	 * https://tc39.github.io/ecma402/#sec-bestavailablelocale
	 * @param {Locales} availableLocales
	 * @param {Locale} locale
	 * @return {string}
	 */
	function bestAvailableLocale(availableLocales, locale) {
	    // Let candidate be locale.
	    var candidate = locale;
	    // Repeat
	    while (true) {
	        // If availableLocales contains an element equal to candidate, return candidate.
	        if (availableLocales.includes(candidate)) {
	            return candidate;
	        }
	        // Let pos be the character index of the last occurrence of "-" (U+002D) within candidate.
	        var pos = candidate.lastIndexOf("-");
	        // If that character does not occur, return undefined.
	        if (pos === -1)
	            return undefined;
	        // If pos ≥ 2 and the character "-" occurs at index pos-2 of candidate, decrease pos by 2.
	        if (pos >= 2 && candidate.charAt(pos - 2) === "-") {
	            pos -= 2;
	        }
	        // Let candidate be the substring of candidate from position 0, inclusive, to position pos, exclusive.
	        candidate = candidate.slice(0, pos);
	    }
	}

	/**
	 * Must represent the structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the host environment's current locale.
	 *
	 * https://tc39.github.io/ecma402/#sec-defaultlocale
	 * @type {Locale?}
	 */
	var _defaultLocale;
	/**
	 * Sets the default locale
	 * @param {Locale} locale
	 */
	function setDefaultLocale(locale) {
	    _defaultLocale = locale;
	}
	/**
	 * The DefaultLocale abstract operation returns a String value representing the structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the host environment's current locale.
	 * https://tc39.github.io/ecma402/#sec-defaultlocale
	 * @return {Locale | undefined}
	 */
	function getDefaultLocale() {
	    return _defaultLocale;
	}
	/**
	 * Retrieves the default locale if it is set, and throws otherwise
	 * @return {Locale}
	 */
	function ensureDefaultLocale() {
	    if (_defaultLocale == null) {
	        throw new ReferenceError("Could not determine locale: No default locale has been configured");
	    }
	    return _defaultLocale;
	}

	/**
	 * The LookupMatcher abstract operation compares requestedLocales, which must be a List as returned by CanonicalizeLocaleList,
	 * against the locales in availableLocales and determines the best available language to meet the request.
	 *
	 * https://tc39.github.io/ecma402/#sec-lookupmatcher
	 * @param {MatcherOptions} options
	 * @return {MatcherResult}
	 */
	function lookupMatcher(_a) {
	    var availableLocales = _a.availableLocales, requestedLocales = _a.requestedLocales;
	    var e_1, _b;
	    // Let result be a new Record.
	    var result = {};
	    try {
	        // For each element locale of requestedLocales in List order, do
	        for (var requestedLocales_1 = __values(requestedLocales), requestedLocales_1_1 = requestedLocales_1.next(); !requestedLocales_1_1.done; requestedLocales_1_1 = requestedLocales_1.next()) {
	            var locale = requestedLocales_1_1.value;
	            // Let noExtensionsLocale be the String value that is locale with all Unicode locale extension sequences removed.
	            var noExtensionsLocale = removeUnicodeExtensionSequences(locale);
	            // Let availableLocale be BestAvailableLocale(availableLocales, noExtensionsLocale).
	            var availableLocale = bestAvailableLocale(availableLocales, noExtensionsLocale);
	            // If availableLocale is not undefined, then
	            if (availableLocale !== undefined) {
	                // Set result.[[locale]] to availableLocale.
	                result.locale = availableLocale;
	                // If locale and noExtensionsLocale are not the same String value, then
	                if (locale !== noExtensionsLocale) {
	                    // Let extension be the String value consisting of the first substring of local
	                    // that is a Unicode locale extension sequence.
	                    var extensionMatch = locale.match(UNICODE_EXTENSION_SEQUENCE_REGEXP);
	                    // Set result.[[extension]] to extension.
	                    result.extension = extensionMatch == null ? "" : extensionMatch[0];
	                }
	                return result;
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (requestedLocales_1_1 && !requestedLocales_1_1.done && (_b = requestedLocales_1["return"])) _b.call(requestedLocales_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    // Let defLocale be DefaultLocale().
	    var defLocale = ensureDefaultLocale();
	    // Set result.[[locale]] to defLocale.
	    result.locale = defLocale;
	    // Return result.
	    return result;
	}

	/**
	 * The BestFitMatcher abstract operation compares requestedLocales,
	 * which must be a List as returned by CanonicalizeLocaleList,
	 * against the locales in availableLocales and determines the best available language to meet the request.
	 * The algorithm is implementation dependent, but should produce results that a typical user of the requested
	 * locales would perceive as at least as good as those produced by the LookupMatcher abstract operation.
	 * RelativeTimeFormatOptions specified through Unicode locale extension sequences must be ignored by the algorithm.
	 * Information about such subsequences is returned separately. The abstract operation returns a record
	 * with a [[locale]] field, whose value is the language tag of the selected locale,
	 * which must be an element of availableLocales.
	 * If the language tag of the request locale that led to the selected locale contained a Unicode locale extension sequence,
	 * then the returned record also contains an [[extension]] field whose value is the first Unicode locale extension sequence
	 * within the request locale language tag.
	 *
	 * https://tc39.github.io/ecma402/#sec-bestfitmatcher
	 * @param {MatcherOptions} options
	 * @return {MatcherResult}
	 */
	function bestFitMatcher(options) {
	    return lookupMatcher(options);
	}

	/**
	 * Returns true if the given item is a record
	 * @param {T} item
	 * @return {item is T}
	 */
	function isRecord(item) {
	    return Object.prototype.toString.call(item) === "[object Object]";
	}

	

	/**
	 * Returns true if the given item is a List
	 * @param {T} item
	 * @return {item is T}
	 */
	function isList(item) {
	    return Array.isArray(item) || isRecord(item);
	}

	/**
	 * The internal comparison abstract operation SameValueNonNumber(x, y), where neither x nor y are Number values, produces true or false.
	 *
	 * https://tc39.github.io/ecma262/#sec-samevaluenonnumber
	 * @param {Exclude<*, number>} x
	 * @param {Exclude<*, number>} y
	 * @return {boolean}
	 */
	function sameValueNonNumber(x, y) {
	    // Assert: Type(x) is not Number.
	    if (typeof x === "number") {
	        throw new TypeError("First argument 'x' must not be a number");
	    }
	    // Assert: Type(x) is the same as Type(y).
	    if (typeof x !== typeof y) {
	        throw new TypeError("The given arguments must have the same type");
	    }
	    // If Type(x) is Undefined, return true.
	    if (x === undefined)
	        return true;
	    // If Type(x) is Null, return true.
	    if (x === null)
	        return true;
	    // If Type(x) is String, then
	    if (typeof x === "string") {
	        // If x and y are exactly the same sequence of code units
	        // (same length and same code units at corresponding indices), return true; otherwise, return false.
	        return x === y;
	    }
	    // If Type(x) is Boolean, then
	    if (typeof x === "boolean") {
	        // If x and y are both true or both false, return true; otherwise, return false.
	        return x === y;
	    }
	    // If Type(x) is Symbol, then
	    if (typeof x === "symbol") {
	        // If x and y are both the same Symbol value, return true; otherwise, return false.
	        return x.valueOf() === y.valueOf();
	    }
	    // If x and y are the same Object value, return true. Otherwise, return false.
	    return x === y;
	}
	/**
	 * The internal comparison abstract operation SameValue(x, y), where x and y are ECMAScript language values, produces true or false.
	 *
	 * https://tc39.github.io/ecma262/#sec-samevalue
	 * @param {*} x
	 * @param {*} y
	 * @return {boolean}
	 */
	function sameValue(x, y) {
	    // If Type(x) is different from Type(y), return false.
	    if (typeof x !== typeof y)
	        return false;
	    // If Type(x) is Number, then
	    if (typeof x === "number") {
	        // If x is NaN and y is NaN, return true.
	        if (isNaN(x) && isNaN(y))
	            return true;
	        // If x is +0 and y is -0, return false.
	        if (Object.is(x, 0) && Object.is(y, -0))
	            return false;
	        // If x is the same Number value as y, return true.
	        if (x === y)
	            return true;
	        // Return false.
	        return false;
	    }
	    // Return SameValueNonNumber(x, y).
	    return sameValueNonNumber(x, y);
	}

	/**
	 * The ResolveLocale abstract operation compares a BCP 47 language priority list
	 * requestedLocales against the locales in availableLocales and determines the best available language to meet the request.
	 * availableLocales, requestedLocales, and relevantExtensionKeys must be provided as List values,
	 * options and localeData as Records.
	 *
	 * https://tc39.github.io/ecma402/#sec-resolvelocale
	 * @param {Locales} availableLocales
	 * @param {Locales} requestedLocales
	 * @param {ResolveLocaleOptions} options
	 * @param {RelevantExtensionKey[]} relevantExtensionKeys
	 * @param {LocaleData} localeData
	 * @returns {ResolveLocaleResult}
	 */
	function resolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
	    var e_1, _a;
	    // Let matcher be options.[[localeMatcher]].
	    var matcher = options.localeMatcher;
	    // If matcher is "lookup", then
	    // (a) Let r be LookupMatcher(availableLocales, requestedLocales).
	    // (b) Let r be BestFitMatcher(availableLocales, requestedLocales).
	    var r = matcher === "lookup" ? lookupMatcher({ availableLocales: availableLocales, requestedLocales: requestedLocales }) : bestFitMatcher({ availableLocales: availableLocales, requestedLocales: requestedLocales });
	    // Let foundLocale be r.[[locale]].
	    var foundLocale = r.locale;
	    // Let result be a new Record.
	    var result = {};
	    // Set result.[[dataLocale]] to foundLocale.
	    result.dataLocale = foundLocale;
	    // Let supportedExtension be "-u"
	    var supportedExtension = "-u";
	    try {
	        // For each element key of relevantExtensionKeys in List order, do
	        for (var relevantExtensionKeys_1 = __values(relevantExtensionKeys), relevantExtensionKeys_1_1 = relevantExtensionKeys_1.next(); !relevantExtensionKeys_1_1.done; relevantExtensionKeys_1_1 = relevantExtensionKeys_1.next()) {
	            var key = relevantExtensionKeys_1_1.value;
	            // Let foundLocaleData be localeData.[[<foundLocale>]].
	            var foundLocaleData = localeData[foundLocale];
	            // Assert: Type(foundLocaleData) is Record.
	            if (!isRecord(foundLocaleData)) {
	                throw new TypeError("LocaleData for locale: '" + foundLocale + "' must be an object");
	            }
	            // Let keyLocaleData be foundLocaleData.[[<key>]].
	            var keyLocaleData = foundLocaleData[key];
	            // Assert: Type(keyLocaleData) is List.
	            if (!isList(keyLocaleData)) {
	                throw new TypeError("key: '" + key + "' in LocaleData for locale: '" + foundLocale + "' must be indexable");
	            }
	            // Let value be keyLocaleData[0].
	            var value = keyLocaleData[0];
	            // Assert: Type(value) is either String or Null.
	            if (typeof value !== "string" && value !== null) {
	                throw new TypeError("value: '" + value + "' for key: '" + key + "' in LocaleData for locale: '" + foundLocale + "' must be a string or null");
	            }
	            // Let supportedExtensionAddition be "".
	            var supportedExtensionAddition = "";
	            // If r has an [[extension]] field, then
	            if ("extension" in r) {
	                // Let requestedValue be UnicodeExtensionValue(r.[[extension]], key).
	                var requestedValue = unicodeExtensionValue(r.extension, key);
	                // If requestedValue is not undefined, then
	                if (requestedValue !== undefined) {
	                    // If requestedValue is not the empty String, then
	                    if (requestedValue !== "") {
	                        // If keyLocaleData contains requestedValue, then
	                        if (keyLocaleData.includes(requestedValue)) {
	                            // Let value be requestedValue.
	                            value = requestedValue;
	                            // Let supportedExtensionAddition be the concatenation of "-", key, "-", and value.
	                            supportedExtensionAddition = "-" + key + "-" + value;
	                        }
	                    }
	                    // Else if keyLocaleData contains "true", then
	                    else if (keyLocaleData.includes("true")) {
	                        // Let value be "true".
	                        value = "true";
	                    }
	                }
	            }
	            // If options has a field [[<key>]], then
	            if ("key" in options) {
	                // Let optionsValue be options.[[<key>]].
	                var optionsValue = options.key;
	                // Assert: Type(optionsValue) is either String, Undefined, or Null.
	                if (typeof optionsValue !== "string" && optionsValue != null) {
	                    throw new TypeError("options value: '" + optionsValue + "' must be a string, undefined, or null");
	                }
	                // If keyLocaleData contains optionsValue, then
	                if (optionsValue !== undefined && keyLocaleData.includes(optionsValue)) {
	                    // If SameValue(optionsValue, value) is false, then
	                    // tslint:disable-next-line:no-collapsible-if
	                    if (!sameValue(optionsValue, value)) {
	                        // Let value be optionsValue.
	                        value = optionsValue;
	                        // Let supportedExtensionAddition be "".
	                        supportedExtensionAddition = "";
	                    }
	                }
	            }
	            // Set result.[[<key>]] to value.
	            result[key] = value;
	            // Append supportedExtensionAddition to supportedExtension.
	            supportedExtension += supportedExtensionAddition;
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (relevantExtensionKeys_1_1 && !relevantExtensionKeys_1_1.done && (_a = relevantExtensionKeys_1["return"])) _a.call(relevantExtensionKeys_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    // If the number of elements in supportedExtension is greater than 2, then
	    if (supportedExtension.length > 2) {
	        // Let privateIndex be Call(%StringProto_indexOf%, foundLocale, « "-x-" »).
	        var privateIndex = String.prototype.indexOf.call(foundLocale, "-x-");
	        // If privateIndex = -1, then
	        if (privateIndex === -1) {
	            // Let foundLocale be the concatenation of foundLocale and supportedExtension.
	            foundLocale = "" + foundLocale + supportedExtension;
	        }
	        // Else,
	        else {
	            // Let preExtension be the substring of foundLocale from position 0, inclusive, to position privateIndex, exclusive.
	            var preExtension = foundLocale.slice(0, privateIndex);
	            // Let postExtension be the substring of foundLocale from position privateIndex to the end of the string.
	            var postExtension = foundLocale.slice(privateIndex);
	            // Let foundLocale be the concatenation of preExtension, supportedExtension, and postExtension.
	            foundLocale = "" + preExtension + supportedExtension + postExtension;
	        }
	        // Assert: IsStructurallyValidLanguageTag(foundLocale) is true.
	        // Let foundLocale be CanonicalizeLanguageTag(foundLocale).
	        // Intl.getCanonicalLocales will throw a TypeError if the locale isn't structurally valid
	        foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
	    }
	    // Set result.[[locale]] to foundLocale.
	    result.locale = foundLocale;
	    // Return result.
	    return result;
	}

	/**
	 * The LookupSupportedLocales abstract operation returns the subset of the provided BCP 47 language priority list
	 * requestedLocales for which availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
	 * Locales appear in the same order in the returned list as in requestedLocales.
	 *
	 * https://tc39.github.io/ecma402/#sec-bestfitsupportedlocales
	 * @param {Locales} availableLocales
	 * @param {Locales} requestedLocales
	 * @return {Locales}
	 */
	function lookupSupportedLocales(availableLocales, requestedLocales) {
	    var e_1, _a;
	    // Let subset be a new empty List.
	    var subset = [];
	    try {
	        // For each element locale of requestedLocales in List order, do
	        for (var requestedLocales_1 = __values(requestedLocales), requestedLocales_1_1 = requestedLocales_1.next(); !requestedLocales_1_1.done; requestedLocales_1_1 = requestedLocales_1.next()) {
	            var locale = requestedLocales_1_1.value;
	            // Let noExtensionsLocale be the String value that is locale with all Unicode locale extension sequences removed.
	            var noExtensionsLocale = removeUnicodeExtensionSequences(locale);
	            // Let availableLocale be BestAvailableLocale(availableLocales, noExtensionsLocale).
	            var availableLocale = bestAvailableLocale(availableLocales, noExtensionsLocale);
	            // If availableLocale is not undefined, append locale to the end of subset.
	            if (availableLocale !== undefined) {
	                subset.push(locale);
	            }
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (requestedLocales_1_1 && !requestedLocales_1_1.done && (_a = requestedLocales_1["return"])) _a.call(requestedLocales_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    return subset;
	}

	/**
	 * The BestFitSupportedLocales abstract operation returns the subset of the provided BCP 47 language priority list
	 * requestedLocales for which availableLocales has a matching locale when using the Best Fit Matcher algorithm.
	 * Locales appear in the same order in the returned list as in requestedLocales.
	 *
	 * https://tc39.github.io/ecma402/#sec-bestfitsupportedlocales
	 * @param {Locales} availableLocales
	 * @param {Locales} requestedLocales
	 * @return {Locales}
	 */
	function bestFitSupportedLocales(availableLocales, requestedLocales) {
	    return lookupSupportedLocales(availableLocales, requestedLocales);
	}

	/**
	 * The SupportedLocales abstract operation returns the subset of the provided BCP 47 language priority list
	 * requestedLocales for which availableLocales has a matching locale. Two algorithms are available to match
	 * the locales: the Lookup algorithm described in RFC 4647 section 3.4, and an implementation dependent
	 * best-fit algorithm. Locales appear in the same order in the returned list as in requestedLocales.
	 *
	 * https://tc39.github.io/ecma402/#sec-supportedlocales
	 * @param {Locales} availableLocales
	 * @param {Locales} requestedLocales
	 * @param {SupportedLocalesOptions} [options]
	 * @return {Locales}
	 */
	function supportedLocales(availableLocales, requestedLocales, options) {
	    // If options is not undefined, then
	    if (options !== undefined) {
	        // Let options be ? ToObject(options).
	        options = toObject(options);
	    }
	    // If options is not undefined, then Let matcher be ? GetOption(options, "localeMatcher", "string", « "lookup", "best fit" »,  "best fit").
	    // Else, let matcher be "best fit".
	    var matcher = options !== undefined && options.localeMatcher != null ? options.localeMatcher : "best fit";
	    // If matcher is "best fit", then let supportedLocales be BestFitSupportedLocales(availableLocales, requestedLocales).
	    // Else let supportedLocales be LookupSupportedLocales(availableLocales, requestedLocales).
	    // Return CreateArrayFromList(supportedLocales).
	    return matcher === "best fit" ? bestFitSupportedLocales(availableLocales, requestedLocales) : lookupSupportedLocales(availableLocales, requestedLocales);
	}

	

	

	/**
	 * A WeakMap between RelativeTimeFormat instances and their internal slot members
	 * @type {WeakMap<RelativeTimeFormat, RelativeTimeFormatInstanceInternals>}
	 */
	var RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP = new WeakMap();
	/**
	 * Contains the internal static for RelativeTimeFormat
	 * @type {RelativeTimeFormatStaticInternals}
	 */
	var RELATIVE_TIME_FORMAT_STATIC_INTERNALS = {
	    /**
	     * The value of the [[RelevantExtensionKeys]] internal slot is « "nu" ».
	     * http://tc39.github.io/proposal-intl-relative-time/#sec-Intl.RelativeTimeFormat-internal-slots
	     */
	    relevantExtensionKeys: ["nu"],
	    /**
	     * The value of the [[LocaleData]] internal slot is implementation defined within the constraints described in 9.1
	     * http://tc39.github.io/proposal-intl-relative-time/#sec-Intl.RelativeTimeFormat-internal-slots
	     */
	    localeData: {},
	    /**
	     * The value of the [[AvailableLocales]] internal slot is implementation defined within the constraints described in 9.1
	     * http://tc39.github.io/proposal-intl-relative-time/#sec-Intl.RelativeTimeFormat-internal-slots
	     */
	    availableLocales: []
	};
	/**
	 * Sets the value for a property in an internal slot for an instance of RelativeTimeFormat
	 * @param {RelativeTimeFormat} instance
	 * @param {T} property
	 * @param {RelativeTimeFormatInstanceInternals[T]} value
	 */
	function setInternalSlot(instance, property, value) {
	    var record = RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	    if (record == null) {
	        record = {};
	        RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.set(instance, record);
	    }
	    // Update the property with the given value
	    record[property] = value;
	}
	/**
	 * Gets the value associated with the given property on the internal slots of the given instance of RelativeTimeFormat
	 * @param {RelativeTimeFormat} instance
	 * @param {T} property
	 * @return {RelativeTimeFormatInstanceInternals[T]}
	 */
	function getInternalSlot(instance, property) {
	    var record = RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	    if (record == null) {
	        throw new ReferenceError("No internal slots has been allocated for the given instance of RelativeTimeFormat");
	    }
	    return record[property];
	}
	/**
	 * Returns true if the given property on the internal slots of the given instance of RelativeTimeFormat exists
	 * @param {RelativeTimeFormat} instance
	 * @param {T} property
	 * @return {RelativeTimeFormatInstanceInternals[T]}
	 */
	function hasInternalSlot(instance, property) {
	    var record = RELATIVE_TIME_FORMAT_INSTANCE_INTERNAL_MAP.get(instance);
	    return record != null && property in record;
	}

	var NUMBERING_SYSTEMS = {
	    arab: ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"],
	    arabext: ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"],
	    bali: ["\u1B50", "\u1B51", "\u1B52", "\u1B53", "\u1B54", "\u1B55", "\u1B56", "\u1B57", "\u1B58", "\u1B59"],
	    beng: ["\u09E6", "\u09E7", "\u09E8", "\u09E9", "\u09EA", "\u09EB", "\u09EC", "\u09ED", "\u09EE", "\u09EF"],
	    deva: ["\u0966", "\u0967", "\u0968", "\u0969", "\u096A", "\u096B", "\u096C", "\u096D", "\u096E", "\u096F"],
	    fullwide: ["\uFF10", "\uFF11", "\uFF12", "\uFF13", "\uFF14", "\uFF15", "\uFF16", "\uFF17", "\uFF18", "\uFF19"],
	    gujr: ["\u0AE6", "\u0AE7", "\u0AE8", "\u0AE9", "\u0AEA", "\u0AEB", "\u0AEC", "\u0AED", "\u0AEE", "\u0AEF"],
	    guru: ["\u0A66", "\u0A67", "\u0A68", "\u0A69", "\u0A6A", "\u0A6B", "\u0A6C", "\u0A6D", "\u0A6E", "\u0A6F"],
	    hanidec: ["\u3007", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D"],
	    khmr: ["\u17E0", "\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9"],
	    knda: ["\u0CE6", "\u0CE7", "\u0CE8", "\u0CE9", "\u0CEA", "\u0CEB", "\u0CEC", "\u0CED", "\u0CEE", "\u0CEF"],
	    laoo: ["\u0ED0", "\u0ED1", "\u0ED2", "\u0ED3", "\u0ED4", "\u0ED5", "\u0ED6", "\u0ED7", "\u0ED8", "\u0ED9"],
	    latn: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	    limb: ["\u1946", "\u1947", "\u1948", "\u1949", "\u194A", "\u194B", "\u194C", "\u194D", "\u194E", "\u194F"],
	    mlym: ["\u0D66", "\u0D67", "\u0D68", "\u0D69", "\u0D6A", "\u0D6B", "\u0D6C", "\u0D6D", "\u0D6E", "\u0D6F"],
	    mong: ["\u1810", "\u1811", "\u1812", "\u1813", "\u1814", "\u1815", "\u1816", "\u1817", "\u1818", "\u1819"],
	    mymr: ["\u1040", "\u1041", "\u1042", "\u1043", "\u1044", "\u1045", "\u1046", "\u1047", "\u1048", "\u1049"],
	    orya: ["\u0B66", "\u0B67", "\u0B68", "\u0B69", "\u0B6A", "\u0B6B", "\u0B6C", "\u0B6D", "\u0B6E", "\u0B6F"],
	    tamldec: ["\u0BE6", "\u0BE7", "\u0BE8", "\u0BE9", "\u0BEA", "\u0BEB", "\u0BEC", "\u0BED", "\u0BEE", "\u0BEF"],
	    telu: ["\u0C66", "\u0C67", "\u0C68", "\u0C69", "\u0C6A", "\u0C6B", "\u0C6C", "\u0C6D", "\u0C6E", "\u0C6F"],
	    thai: ["\u0E50", "\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59"],
	    tibt: ["\u0F20", "\u0F21", "\u0F22", "\u0F23", "\u0F24", "\u0F25", "\u0F26", "\u0F27", "\u0F28", "\u0F29"]
	};

	/**
	 * The PartitionNumberPattern abstract operation is called with arguments numberFormat
	 * (which must be an object initialized as a NumberFormat) and x (which must be a Number value),
	 * interprets x as a numeric value, and creates the corresponding parts according to the effective locale
	 * and the formatting options of numberFormat.
	 * @param {RelativeTimeFormat} relativeTimeFormat - needed to get internal slots
	 * @param {number} x
	 * @returns {Partitions}
	 */
	function partitionNumberPattern(relativeTimeFormat, x) {
	    var pattern;
	    var locale = getInternalSlot(relativeTimeFormat, "locale");
	    var numberFormat = getInternalSlot(relativeTimeFormat, "numberFormat");
	    var numberingSystem = relativeTimeFormat.resolvedOptions().numberingSystem;
	    // If x is not NaN and x < 0 or x is -0, then
	    if (!isNaN(x) && (x < 0 || Object.is(x, -0))) {
	        // Let x be -x.
	        x = -x;
	        // Let pattern be numberFormat.[[NegativePattern]].
	        // Since we don't have access to the internal slots, take it from the locale data
	        // CORRECTION: The positive pattern should always be used when formatting relative time
	        // TODO: Since we don't care about positive and negative patterns, can we leave out the pattern data all-together from this polyfill?
	        pattern = "{number}";
	    }
	    // Else,
	    else {
	        // Let pattern be numberFormat.[[PositivePattern]].
	        // Since we don't have access to the internal slots, take it from the locale data
	        // TODO: Since we don't care about positive and negative patterns, can we leave out the pattern data all-together from this polyfill?
	        pattern = "{number}";
	    }
	    // Let result be a new empty List.
	    var result = [];
	    // Let beginIndex be Call(%StringProto_indexOf%, pattern, « "{", 0 »).
	    var beginIndex = String.prototype.indexOf.call(pattern, "{", 0);
	    // Let endIndex be 0.
	    var endIndex = 0;
	    // Let nextIndex be 0.
	    var nextIndex = 0;
	    // Let length be the number of code units in pattern.
	    var length = pattern.length;
	    var _loop_1 = function () {
	        // Set endIndex to Call(%StringProto_indexOf%, pattern, « "}", beginIndex »).
	        endIndex = String.prototype.indexOf.call(pattern, "}", beginIndex);
	        // Assert: endIndex is greater than beginIndex.
	        if (endIndex <= beginIndex) {
	            throw new TypeError("endIndex: " + endIndex + " must be greater than beginIndex: " + beginIndex);
	        }
	        // If beginIndex is greater than nextIndex, then
	        if (beginIndex > nextIndex) {
	            // Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
	            var literal = pattern.slice(nextIndex, beginIndex);
	            // Append a new Record { [[Type]]: "literal", [[Value]]: literal } as the last element of result.
	            result.push({
	                type: "literal",
	                value: literal
	            });
	        }
	        // CORRECTION FOR RelativeTimeFormat: p will always be equal to 'number'
	        // CORRECTION FOR RelativeTimeFormat: p will always be finite, so we don't have to check for NaN and isFinite
	        // CORRECTION FOR RelativeTimeFormat: NumberFormat.[[Style]] will always be "decimal"
	        // CORRECTION FOR RelativeTimeFormat: NumberFormat.[[UseGrouping]] will always be false
	        // CORRECTION FOR RelativeTimeFormat: Even though the spec doesn't explicitly state it, existing implementations such as in Chrome groups floats with decimals into integers. For example, 1.1 becomes {type: "integer", value: "1.1"}
	        // Let n be FormatNumberToString(numberFormat, x).
	        var n = x.toLocaleString(locale, numberFormat.resolvedOptions());
	        // If the numberFormat.[[NumberingSystem]] matches one of the values in the
	        // "Numbering System" column of Table 3 (https://tc39.github.io/ecma402/#table-numbering-system-digits), then
	        if (NUMBERING_SYSTEMS[numberingSystem] != null) {
	            // Let digits be a List whose 10 String valued elements are the UTF-16 string representations of the 10 digits specified in the "Digits" column of the matching row in Table 3.
	            var digits_1 = __spread(NUMBERING_SYSTEMS[numberingSystem]);
	            // Replace each digit in n with the value of digits[digit].
	            n = n.replace(/\d/g, function (digit) { return digits_1[digit]; });
	        }
	        // Else use an implementation dependent algorithm to map n to the appropriate
	        // representation of n in the given numbering system.
	        else {
	            n = String(n);
	        }
	        var integer = n;
	        // Append a new Record { [[Type]]: "integer", [[Value]]: integer } as the last element of result.
	        result.push({
	            type: "integer",
	            value: integer
	        });
	        // Set nextIndex to endIndex + 1.
	        nextIndex = endIndex + 1;
	        // Set beginIndex to Call(%StringProto_indexOf%, pattern, « "{", nextIndex »).
	        beginIndex = String.prototype.indexOf.call(pattern, "{", nextIndex);
	    };
	    // Repeat, while beginIndex is an integer index into pattern
	    while (pattern[beginIndex] !== undefined) {
	        _loop_1();
	    }
	    // If nextIndex is less than length, then
	    if (nextIndex < length) {
	        // Let literal be the substring of pattern from position nextIndex, inclusive, to position length, exclusive.
	        var literal = pattern.slice(nextIndex, length);
	        // Append a new Record { [[Type]]: "literal", [[Value]]: literal } as the last element of result.
	        result.push({
	            type: "literal",
	            value: literal
	        });
	    }
	    // Return result.
	    return result;
	}

	/**
	 * When the ResolvePlural abstract operation is called with arguments pluralRules (which must be an object initialized as a PluralRules) and n (which must be a Number value), it returns a String value representing the plural form of n according to the effective locale and the options of pluralRules.
	 *
	 * https://tc39.github.io/ecma402/#sec-resolveplural
	 * @param {RelativeTimeFormat} relativeTimeFormat - needed to get internal slots
	 * @param {number} n
	 */
	function resolvePlural(relativeTimeFormat, n) {
	    // Assert: Type(pluralRules) is Object.
	    // Assert: pluralRules has an [[InitializedPluralRules]] internal slot.
	    if (!hasInternalSlot(relativeTimeFormat, "pluralRules")) {
	        throw new TypeError("Given instance of of Intl.RelativeTimeFormat must have an [[InitializedPluralRules]] internal slot");
	    }
	    // Assert: Type(n) is Number.
	    if (typeof n !== "number") {
	        throw new TypeError("Argument 'n' must be a number");
	    }
	    // If n is not a finite Number, then
	    if (!isFinite(n)) {
	        // Return "other".
	        return "other";
	    }
	    // Let locale be pluralRules.[[Locale]].
	    // Let type be pluralRules.[[Type]].
	    var pluralRules = getInternalSlot(relativeTimeFormat, "pluralRules");
	    // Return ? PluralRuleSelect(locale, type, n, operands).
	    return pluralRules.select(n);
	}

	/**
	 * The MakePartsList abstract operation is called with arguments pattern,
	 * a pattern String, unit, a String, and parts, a List of Records representing a formatted Number.
	 *
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-makepartslist
	 * @param {string} pattern
	 * @param {SingularRelativeTimeUnit} unit
	 * @param {Partitions} parts
	 * @returns {UnitPartitions}
	 */
	function makePartsList(pattern, unit, parts) {
	    var e_1, _a;
	    // Let result be a new empty List.
	    var result = [];
	    // Let beginIndex be ! Call(%StringProto_indexOf%, pattern, « "{", 0 »).
	    var beginIndex = String.prototype.indexOf.call(pattern, "{", 0);
	    // Let endIndex be 0.
	    var endIndex = 0;
	    // Let nextIndex be 0.
	    var nextIndex = 0;
	    // Let length be the number of elements in pattern.
	    var length = pattern.length;
	    // Repeat, while beginIndex is an integer index into pattern
	    while (pattern[beginIndex] !== undefined) {
	        // Set endIndex to ! Call(%StringProto_indexOf%, pattern, « "}", beginIndex »).
	        endIndex = String.prototype.indexOf.call(pattern, "}", beginIndex);
	        // Assert: endIndex is not -1, otherwise the pattern would be malformed.
	        if (endIndex === -1) {
	            throw new RangeError("The pattern: '" + pattern + "' is malformed");
	        }
	        // If beginIndex is greater than nextIndex, then
	        if (beginIndex > nextIndex) {
	            // Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
	            var literal = pattern.slice(nextIndex, beginIndex);
	            // Add new part Record { [[Type]]: "literal", [[Value]]: literal } as a new element of the list result.
	            result.push({
	                type: "literal",
	                value: literal
	            });
	        }
	        // Let p be the substring of pattern from position beginIndex, exclusive, to position endIndex, exclusive.
	        var p = pattern.slice(beginIndex + 1, endIndex);
	        // Assert: p is "0".
	        if (p !== "0") {
	            throw new TypeError("Expected " + p + " to be \"0\"");
	        }
	        try {
	            // For each part in parts, do
	            for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
	                var part = parts_1_1.value;
	                // Add new part Record { [[Type]]: part.[[Type]], [[Value]]: part.[[Value]], [[Unit]]: unit } as a new element on the List result.
	                if (part.type === "literal") {
	                    result.push(__assign({}, part));
	                }
	                else {
	                    result.push(__assign({}, part, { unit: unit }));
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (parts_1_1 && !parts_1_1.done && (_a = parts_1["return"])) _a.call(parts_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        // Set nextIndex to endIndex + 1.
	        nextIndex = endIndex + 1;
	        // Set beginIndex to Call(%StringProto_indexOf%, pattern, « "{", nextIndex »).
	        beginIndex = String.prototype.indexOf.call(pattern, "{", nextIndex);
	    }
	    // If nextIndex is less than length, then
	    if (nextIndex < length) {
	        // Let literal be the substring of pattern from position nextIndex, exclusive, to position length, exclusive.
	        // CORRECTION: It should actually be from nextIndex, inclusive, to correctly partition text
	        var literal = pattern.slice(nextIndex, length);
	        // Add new part Record { [[Type]]: "literal", [[Value]]: literal } as a new element of the list result.
	        result.push({
	            type: "literal",
	            value: literal
	        });
	    }
	    return result;
	}

	/**
	 * When the FormatRelativeTime abstract operation is called with arguments relativeTimeFormat,
	 * value, and unit it returns a String value representing value (interpreted as a time value as specified in ES2016, 20.3.1.1)
	 * according to the effective locale and the formatting options of relativeTimeFormat.
	 * @param {RelativeTimeFormat} relativeTimeFormat
	 * @param {number} value
	 * @param {RelativeTimeUnit} unit
	 * @returns {UnitPartitions}
	 */
	function partitionRelativeTimePattern(relativeTimeFormat, value, unit) {
	    // Assert: relativeTimeFormat has an [[InitializedRelativeTimeFormat]] internal slot.
	    if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
	        throw new TypeError("Internal function called on incompatible receiver " + relativeTimeFormat.toString());
	    }
	    // Assert: Type(value) is Number.
	    if (typeof value !== "number") {
	        throw new TypeError("Argument: 'value' must be a number");
	    }
	    // Assert: Type(unit) is String.
	    if (typeof unit !== "string") {
	        throw new TypeError("Argument: 'unit' must be a string");
	    }
	    // If value is NaN, +∞, or -∞, throw a RangeError exception.
	    if (isNaN(value) || value === Infinity || value === -Infinity) {
	        throw new RangeError("Value need to be finite number");
	    }
	    // Let unit be ? SingularRelativeTimeUnit(unit).
	    unit = singularRelativeTimeUnit(unit);
	    // Let fields be relativeTimeFormat.[[Fields]].
	    var fields = getInternalSlot(relativeTimeFormat, "fields");
	    // Let style be relativeTimeFormat.[[Style]].
	    var style = getInternalSlot(relativeTimeFormat, "style");
	    // If style is equal to "short", then let entry be the string-concatenation of unit and "-short".
	    // Else if style is equal to "narrow", then let entry be the string-concatenation of unit and "-narrow".
	    // Else let entry be unit.
	    var entry = style === "short" ? unit + "-short" : style === "narrow" ? unit + "-narrow" : unit;
	    // Let exists be ! HasProperty(fields, entry).
	    var exists = entry in fields;
	    // If exists is false, then
	    if (!exists) {
	        // Let entry be unit.
	        entry = unit;
	    }
	    // Let patterns be ! Get(fields, entry).
	    var patterns = fields[entry];
	    // Make sure that the patterns are defined
	    if (patterns == null) {
	        throw new TypeError("Could not match entry: '" + entry + "' inside fields for locale: '" + getInternalSlot(relativeTimeFormat, "locale") + "'");
	    }
	    // Let numeric be relativeTimeFormat.[[Numeric]].
	    var numeric = getInternalSlot(relativeTimeFormat, "numeric");
	    // If numeric is equal to "auto", then
	    if (numeric === "auto") {
	        // Let exists be ! HasProperty(patterns, ! ToString(value)).
	        exists = String(value) in patterns;
	        // If exists is true, then
	        if (exists) {
	            // Let result be ! Get(patterns, ! ToString(value)).
	            var result = patterns[String(value)];
	            // Return a List containing the Record { [[Type]]: "literal", [[Value]]: result }.
	            return [
	                {
	                    type: "literal",
	                    value: result
	                }
	            ];
	        }
	    }
	    // If value is -0 or if value is less than 0, then let tl be "past".
	    // Else let tl be "future".
	    var tl = Object.is(value, -0) || value < 0 ? "past" : "future";
	    // Let po be ! Get(patterns, tl).
	    var po = patterns[tl];
	    // Let fv be ! PartitionNumberPattern(relativeTimeFormat.[[NumberFormat]], value).
	    var fv = partitionNumberPattern(relativeTimeFormat, value);
	    // Let pr be ! ResolvePlural(relativeTimeFormat.[[PluralRules]], value).
	    var pr = resolvePlural(relativeTimeFormat, value);
	    // Let pattern be ! Get(po, pr).
	    var pattern = po[pr];
	    // Return ! MakePartsList(pattern, unit, fv).
	    return makePartsList(pattern, unit, fv);
	}

	/**
	 * The FormatRelativeTime abstract operation is called with arguments relativeTimeFormat
	 * (which must be an object initialized as a RelativeTimeFormat), value (which must be a Number value),
	 * and unit (which must be a String denoting the value unit) and performs the following steps:
	 *
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-FormatRelativeTime
	 * @param {RelativeTimeFormat} relativeTimeFormat
	 * @param {number} value
	 * @param {RelativeTimeUnit} unit
	 * @return {string}
	 */
	function formatRelativeTime(relativeTimeFormat, value, unit) {
	    var e_1, _a;
	    // Let parts be ? PartitionRelativeTimePattern(relativeTimeFormat, value, unit).
	    var parts = partitionRelativeTimePattern(relativeTimeFormat, value, unit);
	    // Let result be an empty String.
	    var result = "";
	    try {
	        // For each part in parts, do
	        for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
	            var part = parts_1_1.value;
	            // Set result to the string-concatenation of result and part.[[Value]].
	            result += part.value;
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (parts_1_1 && !parts_1_1.done && (_a = parts_1["return"])) _a.call(parts_1);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    // Return result.
	    return result;
	}

	/**
	 * The FormatRelativeTimeToParts abstract operation is called with arguments relativeTimeFormat
	 * (which must be an object initialized as a RelativeTimeFormat), value (which must be a Number value),
	 * and unit (which must be a String denoting the value unit)
	 *
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-FormatRelativeTimeToParts
	 * @param {RelativeTimeFormat} relativeTimeFormat
	 * @param {number} value
	 * @param {RelativeTimeUnit} unit
	 * @return {UnitPartitions}
	 */
	function formatRelativeTimeToParts(relativeTimeFormat, value, unit) {
	    return partitionRelativeTimePattern(relativeTimeFormat, value, unit);
	}

	/**
	 * The RelativeTimeFormat constructor is the %RelativeTimeFormat% intrinsic object and a standard built-in property of the Intl object.
	 * Behaviour common to all service constructor properties of the Intl object is specified in 9.1.
	 *
	 * http://tc39.github.io/proposal-intl-relative-time/#sec-intl-relativetimeformat-constructor
	 */
	var RelativeTimeFormat = /** @class */ (function () {
	    function RelativeTimeFormat(locales, options) {
	        var _newTarget = this.constructor;
	        /**
	         * The initial value of the @@toStringTag property is the string value "Intl.RelativeTimeFormat".
	         * This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	         * @type {string}
	         */
	        this[Symbol.toStringTag] = "Intl.RelativeTimeFormat";
	        // If NewTarget is undefined, throw a TypeError exception.
	        if (_newTarget === undefined) {
	            throw new TypeError("Constructor Intl.RelativeTimeFormat requires 'new'");
	        }
	        // The following operations comes from the 'InitializeRelativeFormat' abstract operation (http://tc39.github.io/proposal-intl-relative-time/#sec-InitializeRelativeTimeFormat)
	        // Let requestedLocales be ? CanonicalizeLocaleList(locales).
	        var requestedLocales = Intl.getCanonicalLocales(locales);
	        // If options is undefined, then (a) Let options be ObjectCreate(null).
	        // Else (b) Let options be ? ToObject(options).
	        options = options === undefined ? Object.create(null) : toObject(options);
	        // Let opt be a new Record.
	        var opt = {};
	        // Let matcher be ? GetOption(options, "localeMatcher", "string", «"lookup", "best fit"»,  "best fit").
	        var matcher = options.localeMatcher != null ? options.localeMatcher : "best fit";
	        // Set opt.[[LocaleMatcher]] to matcher.
	        opt.localeMatcher = matcher;
	        // Let localeData be %RelativeTimeFormat%.[[LocaleData]].
	        var localeData = RELATIVE_TIME_FORMAT_STATIC_INTERNALS.localeData;
	        // Let r be ResolveLocale(%RelativeTimeFormat%.[[AvailableLocales]], requestedLocales, opt, %RelativeTimeFormat%.[[RelevantExtensionKeys]], localeData).
	        var r = resolveLocale(RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales, requestedLocales, opt, RELATIVE_TIME_FORMAT_STATIC_INTERNALS.relevantExtensionKeys, localeData);
	        // Let locale be r.[[Locale]].
	        var locale = r.locale;
	        // Set relativeTimeFormat.[[Locale]] to locale.
	        setInternalSlot(this, "locale", locale);
	        // Set relativeTimeFormat.[[NumberingSystem]] to r_.[[nu]].
	        setInternalSlot(this, "numberingSystem", r.nu);
	        // Let dataLocale be r.[[DataLocale]].
	        var dataLocale = r.dataLocale;
	        // Let s be ? GetOption(options, "style", "string", «"long", "short", "narrow"», "long").
	        var s = options.style != null ? options.style : "long";
	        // Set relativeTimeFormat.[[Style]] to s.
	        setInternalSlot(this, "style", s);
	        // Let numeric be ? GetOption(options, "numeric", "string", «"always", "auto"», "always").
	        var numeric = options.numeric != null ? options.numeric : "auto";
	        // Set relativeTimeFormat.[[Numeric]] to numeric.
	        setInternalSlot(this, "numeric", numeric);
	        // Let fields be ! Get(localeData, dataLocale).
	        var fields = localeData[dataLocale];
	        // Assert: fields is an object (see 1.3.3).
	        if (!(fields instanceof Object)) {
	            throw new TypeError("Expected the LocaleDataEntry for locale: '" + dataLocale + "' to be an Object");
	        }
	        // Set relativeTimeFormat.[[Fields]] to fields.
	        setInternalSlot(this, "fields", fields);
	        // Let relativeTimeFormat.[[NumberFormat]] be ! Construct(%NumberFormat%, « locale »).
	        setInternalSlot(this, "numberFormat", new Intl.NumberFormat(locale));
	        // Let relativeTimeFormat.[[PluralRules]] be ! Construct(%PluralRules%, « locale »).
	        // tslint:disable-next-line:no-any
	        setInternalSlot(this, "pluralRules", new Intl.PluralRules(locale));
	        // Intl.RelativeTimeFormat instances have an [[InitializedRelativeTimeFormat]] internal slot.
	        setInternalSlot(this, "initializedRelativeTimeFormat", this);
	    }
	    /**
	     * Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.
	     * @param {Locale | Locales} locales
	     * @param {SupportedLocalesOptions | undefined} options
	     * @return {Locales}
	     */
	    RelativeTimeFormat.supportedLocalesOf = function (locales, options) {
	        // Let availableLocales be %RelativeTimeFormat%.[[AvailableLocales]].
	        var availableLocales = RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales;
	        // Let requestedLocales be ? CanonicalizeLocaleList(locales).
	        var requestedLocales = Intl.getCanonicalLocales(locales);
	        return supportedLocales(availableLocales, requestedLocales, options);
	    };
	    /**
	     * Adds locale data to the internal slot.
	     * This API exactly mimics that of the Intl polyfill (https://github.com/andyearnshaw/Intl.js)
	     * @private
	     * @internal
	     * @param {InputLocaleDataEntry} data
	     * @param {Locale} locale
	     */
	    RelativeTimeFormat.__addLocaleData = function (_a) {
	        var data = _a.data, locale = _a.locale;
	        // Use the locale as the default one if none is configured
	        var defaultLocale = getDefaultLocale();
	        if (defaultLocale == null) {
	            setDefaultLocale(locale);
	        }
	        RELATIVE_TIME_FORMAT_STATIC_INTERNALS.localeData[locale] = data;
	        if (!RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales.includes(locale)) {
	            RELATIVE_TIME_FORMAT_STATIC_INTERNALS.availableLocales.push(locale);
	        }
	    };
	    /**
	     * Method that formats a value and unit according to the locale and formatting options of this Intl.RelativeTimeFormat object.
	     * @param {number} value
	     * @param {RelativeTimeUnit} unit
	     * @return {string}
	     */
	    RelativeTimeFormat.prototype.format = function (value, unit) {
	        // Let relativeTimeFormat be the this value.
	        var relativeTimeFormat = this;
	        // If Type(relativeTimeFormat) is not Object, throw a TypeError exception.
	        if (!(relativeTimeFormat instanceof Object)) {
	            throw new TypeError("Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver " + this.toString());
	        }
	        // If relativeTimeFormat does not have an [[InitializedRelativeTimeFormat]] internal slot, throw a TypeError exception.
	        if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
	            throw new TypeError("Method Intl.RelativeTimeFormat.prototype.format called on incompatible receiver " + this.toString());
	        }
	        // Let value be ? ToNumber(value).
	        value = Number(value);
	        // Let unit be ? ToString(unit).
	        unit = String(unit);
	        // Return ? FormatRelativeTime(relativeTimeFormat, value, unit).
	        return formatRelativeTime(relativeTimeFormat, value, unit);
	    };
	    /**
	     * A version of the 'format' method that returns an array of objects which represent "parts" of the object,
	     * separating the formatted number into its constituent parts and separating it from other surrounding text
	     * @param {number} value
	     * @param {RelativeTimeUnit} unit
	     * @return {UnitPartitions}
	     */
	    RelativeTimeFormat.prototype.formatToParts = function (value, unit) {
	        // Let relativeTimeFormat be the this value.
	        var relativeTimeFormat = this;
	        // If Type(relativeTimeFormat) is not Object, throw a TypeError exception.
	        if (!(relativeTimeFormat instanceof Object)) {
	            throw new TypeError("Method Intl.RelativeTimeFormat.prototype.formatToParts called on incompatible receiver " + this.toString());
	        }
	        // If relativeTimeFormat does not have an [[InitializedRelativeTimeFormat]] internal slot, throw a TypeError exception.
	        if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
	            throw new TypeError("Method Intl.RelativeTimeFormat.prototype.formatToParts called on incompatible receiver " + this.toString());
	        }
	        // Let value be ? ToNumber(value).
	        value = Number(value);
	        // Let unit be ? ToString(unit).
	        unit = String(unit);
	        // Return ? FormatRelativeTimeToParts(relativeTimeFormat, value, unit).
	        return formatRelativeTimeToParts(relativeTimeFormat, value, unit);
	    };
	    /**
	     * This method provides access to the locale and options computed during initialization of the object.
	     * @returns {ResolvedRelativeTimeFormatOptions}
	     */
	    RelativeTimeFormat.prototype.resolvedOptions = function () {
	        // Let relativeTimeFormat be the this value.
	        var relativeTimeFormat = this;
	        // If Type(relativeTimeFormat) is not Object, throw a TypeError exception.
	        if (!(relativeTimeFormat instanceof Object)) {
	            throw new TypeError("Method Intl.RelativeTimeFormat.prototype.resolvedOptions called on incompatible receiver " + this.toString());
	        }
	        // If relativeTimeFormat does not have an [[InitializedRelativeTimeFormat]] internal slot, throw a TypeError exception.
	        if (!hasInternalSlot(relativeTimeFormat, "initializedRelativeTimeFormat")) {
	            throw new TypeError("Method Intl.RelativeTimeFormat.prototype.resolvedOptions called on incompatible receiver " + this.toString());
	        }
	        var locale = getInternalSlot(this, "locale");
	        var numberingSystem = getInternalSlot(this, "numberingSystem");
	        var style = getInternalSlot(this, "style");
	        var numeric = getInternalSlot(this, "numeric");
	        return {
	            locale: locale,
	            numberingSystem: numberingSystem,
	            style: style,
	            numeric: numeric
	        };
	    };
	    return RelativeTimeFormat;
	}());

	/**
	 * Patches Intl with Intl.RelativeTimeFormat
	 */
	function patch() {
	    if (typeof Intl === "undefined") {
	        throw new TypeError("Could not define Intl.RelativeTimeFormat: Expected 'Intl' to exist. Remember to include polyfills for Intl.NumberFormat, Intl.getCanonicalLocales, and Intl.PluralRules before applying this polyfill");
	    }
	    Intl.RelativeTimeFormat = RelativeTimeFormat;
	}

	if (!SUPPORTS_RELATIVE_TIME_FORMAT) {
	    patch();
	}

}());
//# sourceMappingURL=index.js.map
