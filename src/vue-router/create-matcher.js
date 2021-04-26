import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";
export default function createMatcher(routes) {
    // routes 外部用户当前传入的配置
    // 扁平化用户传入的数据，创建路由映射表

    // [/,/about/,/about/a, /about/b]
    // {/:'记录',/about：'记录'， /about/a： '记录', /about/b: '记录'}
    let { pathList, pathMap } = createRouteMap(routes); //初始化配置
    // 动态添加的方法
    function addRoutes(routes) { //添加新的配置
        createRouteMap(routes, pathList, pathMap)
    }

    // 匹配方法
    function match(location) {
        let record = pathMap[location];
        let local = {
            path: location
        }
        if (record) {
            return createRoute(record, local)
        }
        return createRoute(null, local);
    }

    return {
        match,
        addRoutes    
    }
}