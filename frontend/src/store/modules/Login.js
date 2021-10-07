
import Login from '../../services/Login';

const getters = {

}

const actions = {
    login: async ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            console.log(payload)
            window.localStorage.setItem('user', JSON.stringify({email: payload.email, type: payload.type, name: payload.name}));
            commit("setUser", {email: payload.email, type: payload.type, name: payload.name});
            resolve({success: true});
        })
    },
    logout: async ({ commit }, payload) => {
        console.log('entrou')
        commit("resetLogin");
        commit("resetUser");
    }
}

let login = {
    isLogged: false,
    token: window.localStorage.getItem('token')
}

const mutations = {
    setLogin: (state, payload) => state.login = payload,
    resetLogin: (state) => {
        window.localStorage.setItem('token', '');
        state.login.isLogged = false;
    },
    changeSidebar: (state) => state.isOpen = !state.isOpen
}


login.isLogged = true;
export default {
    getters,
    actions,
    mutations,
    state: {
        login,
        isOpen: false
    }
}