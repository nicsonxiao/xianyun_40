//存储
export const state={
    //个人用户信息
    userInfo:''
}


//修改
export const mutations={
    setUserInfo(state,data){
        state.userInfo=data
    }
}

//异步修改
export const actions={
    login(store,data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        }).then(res=>{
            //先默认调回上一个页面
            this.$router.back()
            store.commit('setUserInfo', res.data)
            return true
        })
    }
}