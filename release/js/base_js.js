/**
 * Created by konishi_muneki on 2014/06/28.
 */

"use strict";

/**
 * ベースネームスペース.
 * @type {object}
 * @global
 */
var org = org || {};

/**
 * org.mkパッケージ定義スコープ.
 */
(function (ns) {
    /**
     * org.mkネームスペース.
     * @type {object}
     * @public
     */
    ns.mk = ns.mk || {};
})(org);

/**
 * グローバルスコープ.
 * @global
 */
(function(target, global){
    target.global = global;
})(org.mk, new Function("return this")());/**
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

})(org.mk.StaticCommon.FunctionUtils);/**
 * Created by konishi_muneki on 2014/06/29.
 */

/**
 * org.mk.NamespaceManager定義スコープ.
 */
(function (ns) {
    /**
     * org.mkネームスペースマネージャオブジェクト.
     * @type {object}
     * @public
     */
    ns.NamespaceManager = ns.NamespaceManager || {};
})(org.mk);

/**
 * org.mk.PackageManagerメソッド定義スコープ.
 */
(function (ns, gl) {

    /**
     * 登録済みオブジェクトマップ.
     * @type {Object}
     * @private
     */
    var registry = {};

    /**
     * オブジェクトマップに登録する.
     * @param {string} fqon - FQON.
     * @param {object|Function} target - instance/class.
     * @private
     */
    function put(fqon, target) {
        if ('string' !== typeof  fqon || registry.hasOwnProperty(fqon)) {
            throw new Error('IllegalArguments');
        }
        registry[fqon] = target;
    }

    /**
     * オブジェクトマップからオブジェクトを取得する.
     * @param {string} fqon - FQON.
     * @return {*} - オブジェクト.
     * @private
     */
    function get(fqon) {
        if ('string' !== typeof  fqon || !registry.hasOwnProperty(fqon)) {
            throw new Error('IllegalArguments');
        }
        return registry[fqon];
    }

    /**
     * オブジェクトインポートメソッド.
     * @param {string} fqon - FQON.
     * @return {*} - オブジェクト.
     * @public
     */
    function pick(fqon) {
        return get(fqon);
    }

    // public逸出.
    ns.pick = ns.pick || pick;

    /**
     * ネームスペースパッキング関数.
     * @param {string} fqon - FQON.
     * @param {*} obj - オブジェクト.
     * @return {*} - オブジェクト.
     * @public
     */
    function pack(fqon, obj) {
        // 型バリデート.
        if ('string' !== typeof  fqon) {
            throw new Error('IllegalArguments');
        }

        // グローバルスコープを起点.
        var targetSpace = gl;

        // 子ネームスペースを生成.
        var nsstrs = fqon.split('.');

        // 親ネームスペースが複数存在する場合、対象の親が存在しなければ作成して登録.
        if(nsstrs.length > 2) {
            // 子ネームスペースフルパス.
            var childNssstr = '';
            for (var i = 0, size = nsstrs.length; i < size - 1; i++) {
                var childName = nsstrs[i];
                // すでに存在している場合は生成しない.
                targetSpace[childName] = targetSpace[childName] || {};
                targetSpace = targetSpace[childName];

                // オブジェクトではない場合はエラー.
                if (typeof targetSpace !== 'object') {
                    throw new Error('IllegalState.');
                }

                // 子ネームスペースをオブジェクトレジストリに登録.
                childNssstr += (childNssstr ? '.' : '') + childName;
                put(childNssstr, targetSpace);
            }
        }

        // フルパスから参照させる.
        var name = nsstrs[nsstrs.length - 1];
        if (targetSpace.hasOwnProperty(name)) {
            // すでに存在している場合はエラー.
            throw new Error('IllegalArguments.');
        }
        targetSpace[name] = obj;

        // プライベートマップに登録.
        put(fqon, obj);

        // FQON定義からオブジェクト参照をワンライナーで行うためobjを返す.
        return obj;
    }

    // public逸出.
    ns.pack = ns.pack || pack;

})(org.mk.NamespaceManager, org.mk.global);