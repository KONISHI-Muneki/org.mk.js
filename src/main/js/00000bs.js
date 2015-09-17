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
})(org.mk, new Function("return this")());