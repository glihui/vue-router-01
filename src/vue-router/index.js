import install from './install';
import createMatcher from './create-matcher';
import HashHistory from "./history/hash";
export default class VueRouter {
    constructor(options) {
        
        // createMatcher返回 match和addRoutes 
        // match 负责匹配路径{'/':'记录', 'about': '记录'}
        // addRoutes 动态添加路由配置
        this.matcher = createMatcher(options.routes || []);

        // 创建路由系统 根据模式 创建不同的路由对象    
        this.mode = options.mode || 'hash';
        this.history = new HashHistory(this);
    }
    init(app) { //app指代根实例
        // 初始化： 先根据当前路径 显示到指定的 组件
        const history = this.history;
        const setupHashListener =  ()=> {
            history.setupListener();
        }
        history.transitionTo(
            history.getCurrentLocation(), // 后续要监听路径变化
            setupHashListener
        );
        history.listen((route) => {
            app._route = route; //视图就可以刷新了
        })
    }
    //用来匹配路径的方法
    match (location) {
        // 找到当前记录

        // 
        return this.matcher.match(location)
    }
    push() {

    }
    replace() {

    }
}
VueRouter.install = install;