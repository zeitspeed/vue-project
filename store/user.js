// 保存全局数据 --- 用户信息
// export 导出，这里必须把声明变量的函数导出，将来解析代码的时候才能获取到
// export const state = ()=>{
//     return {}
// }
export const state = ()=>({
    // 声明全局变量的地方
    userInfo: {
        token: '',
        user: {}
    }
})

// 修改全局变量必须通过mutations中声明的函数来实现
export const mutations = {
    // 设置全局变量userInfo的函数
    SET_UserInfo(state, data){
        state.userInfo = data
    }
}