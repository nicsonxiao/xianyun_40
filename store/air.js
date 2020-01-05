//存储
export const state=()=>({
    //机票搜索历史
    history:[],
    allPrice:''
})


//修改
export const mutations={
    setHistory(state,data){
        state.history.unshift(data)
    },
    setAllPrice(state,data){
        state.allPrice=data
    }
}

//异步修改
export const actions={

}