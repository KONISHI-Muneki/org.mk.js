/**
 * Created by konishi_muneki on 2014/06/29.
 */

/**
 * org.mk.StaticCommon定義スコープ.
 */
(function (ns) {
    /**
     * org.mkパッケージ共通オブジェクトネームスペース.
     * @type {object}
     * @public
     */
    ns.StaticCommon = ns.StaticCommon || {};
})(org.mk);

/**
 * org.mk.StaticCommons.StringUtils定義スコープ.
 */
(function (ns) {
    /**
     * org.mk.StaticCommons.StringUtilsネームスペース.
     * @type {object}
     * @public
     */
    ns.StringUtils = ns.StringUtils || {};
})(org.mk.StaticCommon);

/**
 * org.mk.StaticCommons.FunctionUtils定義スコープ.
 */
(function (ns) {
    /**
     * org.mk.StaticCommons.FunctionUtilsネームスペース.
     * @type {object}
     * @public
     */
    ns.FunctionUtils = ns.FunctionUtils || {};
})(org.mk.StaticCommon);

/**
 * org.mk.StaticCommons.StringUtils内関数定義スコープ.
 */
(function (ns) {

    /**
     * startsWith()
     * @param {string} str - 対象文字列.
     * @param {string} start - 開始文字列.
     * @return {boolean} - 対象文字列が開始文字列で始まっていた場合はtrue.
     */
    function startsWith(str, start) {
        if ('string' !== typeof (str) || 'string' !== typeof (start)) {
            throw new Error('IllegalArguments.');
        }
        return str.substring(0, start.length) === start;
    }

    ns.startsWith = ns.startsWith || startsWith;

    /**
     * 文字列ハッシュコード.
     * @param {string} arg - 文字列.
     * @returns {number} ハッシュ値.
     * @private
     */
    function stringHashCode(arg) {
        if (!arg) {
            return 0;
        }
        // 強制的に文字列化.
        var str = '' + arg;
        var hash = 0;
        for (var i = 0, size = str.length; i < size; i++) {
            hash = hash * 31 + str.charCodeAt(i);
            hash = hash | 0;
        }
        return hash;
    }

    ns.stringHashCode = ns.stringHashCode || stringHashCode;

})(org.mk.StaticCommon.StringUtils);

/**
 * org.mk.StaticCommons.FunctionUtils内関数定義スコープ.
 */
(function (ns) {

    /**
     * 関数オブジェクトから関数名を取得する.
     * @param f {Function} - 対象関数.
     * @return {string} - 関数名.
     */
    function getFunctionName(f) {
        return 'name' in f
            ? f['name']
            : ('' + f).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
    }

    ns.getFunctionName = ns.getFunctionName || getFunctionName;

})(org.mk.StaticCommon.FunctionUtils);