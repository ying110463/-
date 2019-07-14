export const state = () => ({
  userInfo: {
    token: '',
    user: {

    }
  }
})
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  clearUserInfo(state) {
    state.userInfo = {
      token: '',
      user: {}
    }
  }
};
export const actions = {
  login(store, data) {
    return this.$axios({
      url: "/accounts/login",
      data,
      method: "POST"
    }).then(res => {
      store.commit('setUserInfo' ,res.data);
      // console.log(res.data);
   
    });
  }
}
