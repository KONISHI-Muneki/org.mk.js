/**
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