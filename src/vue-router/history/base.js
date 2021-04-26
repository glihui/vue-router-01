export function createRoute(record, location) {
    let res = [];
    if (record) {
        while(record) {
            res.unshift(record);
            record = record.parent;
        }
    };
    return {
        ...location,
        matched: res
    }
}
export default class History {
    constructor(router) {
        this.router = router;
        // 默认路由中应该保存一个当前的路径 后续会更改这个路径
        this.current = createRoute(null, {
            path: '/'
        })
    }
    // 跳转的核心逻辑 location 代表跳转的目的地 complete 当前跳转成功后执行的方法
    transitionTo(location, onComplete){

        let route = this.router.match(location); // 用当前路径 找出对应的记录
        // route是当前路径 要匹配到哪些路由
        // 将新的route属性 覆盖掉current
        if (this.current.path === location && route.matched.length === 
            this.current.matched.length) {
                return; // 如果是相同路径，就不进行跳转了
            }
        this.updateRoute(route);
        onComplete && onComplete();
    }
    updateRoute (route) {
        this.current = route;
        this.cb && this.cb(route)  // 路径变化会将最新路径传递给 listen方法
    }
    listen(cb) {
        this.cb = cb;
    }
}