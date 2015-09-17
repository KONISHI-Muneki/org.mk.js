/**
 * Created by konishi_muneki on 15/03/23.
 */

(function (ns) {

    /**
     * 履歴.
     * @param prevVal {*} - 前の値.
     * @param nextVal {*} - 次の値.
     * @constructor
     * @private
     */
    function Mem(prevVal, nextVal) {

        function getPrevVal() {
            return prevVal;
        }

        this.getPrevVal = getPrevVal;

        function getNextVal() {
            return nextVal;
        }

        this.getNextVal = getNextVal;
    }

    /**
     * 履歴マネージャ.
     * @param num {number} - 履歴数.
     * @constructor
     * @public
     */
    function History(num) {

        /**
         * 履歴オブジェクト配列.
         * @type {Array}
         * @private
         */
        var memories = [];

        /**
         * 履歴カーソル.
         * @type {number}
         * @private
         */
        var cursor = 0;

        /**
         * チェックポイント有効フラグ.
         * @type {boolean}
         * @private
         */
        var enableCheckPoint = true;

        /**
         * 取り消す.
         * @public
         */
        function undo() {
        }

        this.undo = undo;

        /**
         * やり直す.
         * @public
         */
        function redo() {
        }

        this.redo = redo;

        /**
         * 履歴をクリアする.
         * @public
         */
        function clear() {
        }

        this.clear = clear;

        /**
         * チェックポイントを生成する.
         * @public
         */
        function checkpoint() {
        }

        this.checkpoint = checkpoint;

        /**
         * チェックポイントの有効/無効を切り替える.
         * @param bool {boolean} - チェックポイント有効/無効.
         * @public
         */
        function setEnableCheckpoint(bool) {
            enableCheckPoint = bool;
        }

        this.setEnableCheckpoint = setEnableCheckpoint;
    }

    ns.History = History;

})(org.mk);