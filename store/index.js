export const state = () => ({
    user: localStorage.getItem("user"),
  })
  
export const getters = {
        isAuthenticated(state) {
            if (localStorage.getItem("user")) {
                console.log(localStorage.getItem("user"))
              return state.user;
            }
            return false;
          },
    }
export const mutations = {
        SET_USER_DATA(state, payload) {
            state.user = payload;
            localStorage.setItem("user", payload);
          },
          LOGOUT(state) {
            state.user = null;
            localStorage.removeItem("user");
            console.log(state.user)
          },
    }
export const actions = {
        logInUser({ commit },credentials){
            commit("SET_USER_DATA",credentials)
        },
        logout({ commit }) {
            commit("LOGOUT");
        },
    }