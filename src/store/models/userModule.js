import CustomizedAxios from "../../plugins/axios";

const usersModule = {
  state: {
    users: [],
    useractive:{
      user: {
        id: 1,
        username: "hamzaabdous",
        lastName: "abdous",
        firstName: "hamza",
        email: "abdoushamza6@gmail.com",
        phoneNumber: "09876543",
        fonction_id: 1,
        created_at: "2022-06-21T06:53:24.000000Z",
        updated_at: "2022-06-21T06:53:24.000000Z",
        fonction: {
            id: 1,
            name: "technique2",
            department_id: 1,
            created_at: "2022-06-21T06:53:16.000000Z",
            updated_at: "2022-06-21T06:53:16.000000Z",
            department: {
                id: 1,
                name: "technique",
                created_at: "2022-06-21T06:53:10.000000Z",
                updated_at: "2022-06-21T06:53:10.000000Z"
            }
        }
    },
    token: "1|lMIqNr9fXh6VoVgMCG0RsNCBXc4pSLxRHJSL0DOV"
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, id) {
      state.users = state.users.filter((c) => c.id != id);
    },
    EDIT_USER(state, user) {
      state.users = state.users.map((c) => {
        if (c.id == user.id) return user;
        return c;
      });
    },
    GET_USERACTIVE(state, useractive) {
      state.useractive = useractive;
    },
  },
  actions: {
    setUsersAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("users/")
          .then((response) => {
            commit("SET_USERS", response.data.payload);
            console.log("set user ");
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addUserAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/create",)
          .then((response) => {
            console.log("res add ", response);
            commit("GET_USERACTIVE", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteUserAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/delete/", {
          id: id,
        })
          .then((response) => {
            commit("DELETE_USER", id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editUserAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/update", {
          id: user.id,
          username: user.username,
          lastName: user.lastName,
          firstName: user.firstName,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          fonction_id: user.fonction_id,
        })
          .then((response) => {
            commit("EDIT_USER", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getUsers: (state) => {
      return state.users;
    },
    getUserActive: (state) => {
      return state.useractive;
    },
  },
};
export default usersModule;
