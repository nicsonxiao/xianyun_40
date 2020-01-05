import {Message} from 'element-ui'

export default (Nuxt) => {
    // console.log(Nuxt);
    
    // 拦截axios的错误
    Nuxt.$axios.onError(res => {
        // console.log(res.response);
        

        // response是js原生Error对象的属性
        const {statusCode, message} = res.response.data;

        if(statusCode === 400){
            // Message相当于this.$message
            Message.error(message)
        }

        if(statusCode === 401){
            //登录失效，重新跳转到登录页
            Message.error('登录过期，请重新登录')
            //重定向到登录页面
            Nuxt.redirect(200,'/user/login')
        }
    })
}