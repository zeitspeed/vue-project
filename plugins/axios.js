// 封装错误拦截信息
// 因为所有的接口都有可能出现错误的，那么这些错误需要提示给用户。
// 我们可以通过axios插件的拦截器一次性把项目中的所有接口错误信息都拦截下来，统一的进行提示
import {Message} from "element-ui";

export default function({$axios, redirect}){
    $axios.onError(err => {
        console.log(8,err) // log方法只能看到大概的信息
        console.dir(err) // dir方法可以打印出来具体的信息
        const {statusCode, message} = err.response.data;
        
        // 登录过期或者失效的错误
        // 当我们登录后会得到一个token值，这个token值是用户登录后再网站中的唯一标识符，代表了个人身份
        // 这个token是有一个过期时间的，这个过期时间是由后端规定，当token过期了，后端会通过接口返回401状态码
        // 所以我们根据状态码来判断是否登录过期即可，过期了跳转到登录页面
        if(statusCode === 401 || statusCode === 403){
            Message.warning({message: "请先登录"});
            redirect("/user/login");
        }
        // 普通的错误
        if(statusCode === 400){
            Message.warning({message});
        }
    })
}