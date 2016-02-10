/**
 * Created by konishi_muneki on 2015/11/02.
 */

/**
 * org.mk.Nexception定義スコープ.
 */
(function (ns) {
    /**
     * org.mkネームスペースマネージャオブジェクト.
     * @type {object}
     * @public
     */
    ns.exception = ns.exception || {};
})(org.mk);

(function (ns) {

    /**
     * 例外クラス.
     * @param [v1] {string|*} - メッセージ/throwabelオブジェクト.
     * @param [v2] {*} - throwabelオブジェクト.
     * @return {Exception} - new Exceptionオブジェクト.
     * @constructor
     */
    function Exception(v1, v2) {

        if (!(this instanceof Exception)) {
            return new Exception(v1, v2);
        }

        /**
         * メッセージ.
         * @type {string}
         */
        var _message;

        /**
         * throwableオブジェクト.
         * @type {*}
         */
        var _throwable;

        // 引数に合わせて初期化.
        if (typeof v1 === 'string') {
            // f(message [, throwable])
            _message = v1;
            _throwable = v2;
        } else {
            // f(throwable)
            _throwable = v1;
        }

        /**
         * メッセージ.
         * @return {string}
         */
        function message() {
            return _message;
        }

        ns.message = message;

        /**
         * throwableオブジェクト.
         * @return {*}
         */
        function throwable() {
            return _throwable;
        }

        ns.message = message;

    }

    // Errorを継承.
    Exception.prototype = new Error();
    Exception.prototype.constructor = Exception;

    // Public逸出.
    ns.Exception = Exception;

})(org.mk.exception);