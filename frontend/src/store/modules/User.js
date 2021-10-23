  
const getters = {

}

const actions = {

}

const mutations = {
    setUser: (state, payload) =>  state.user = payload,
    resetUser: (state) => {
        window.localStorage.removeItem('user')
        window.localStorage.setItem('user', JSON.stringify(user));
        state.user = {...user};
    }
}

let user = {
    name: null,
    id_user: null,
    type: null,
    email: null,
    id_salesman: null,
    id_client: null
}

export default {
    getters,
    actions,
    mutations,
    state: {
        user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : user,
        list: [
            {id: 1, name: "Sávio Miranda", birthdate: "19/10/2000", gender: "M"},
            {id: 2, name: "Erick Lima", birthdate: "18/02/2001", gender: "M"},
            {id: 3, name: "Guilherme Fonseca", birthdate: "05/02/2000", gender: "M"}
        ]
    }
}