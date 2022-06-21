import CustomizedAxios from "../../plugins/axios";

const profilegroupModule = {
  state: {
    profilegroups: [],
  },
  mutations: {
    SET_PROFILEDROUPS(state, profilegroups) {
      state.profilegroups = profilegroups;
    },
    ADD_PROFILEDROUP(state, profilegroups) {
      state.profilegroups.push(profilegroups);
    },
    DELETE_PROFILEDROUP(state, id) {
      state.profilegroups = state.profilegroups.filter((c) => c.id != id);
    },
    EDIT_PROFILEDROUP(state, profilegroups) {
      state.profilegroups = state.profilegroups.map((c) => {
        if (c.id == profilegroups.id) return profilegroups;
        return c;
      });
    },
  },
  actions: {
    setPROFILEDROUPSAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("profilegroup/")
          .then((response) => {
            commit("SET_PROFILEDROUPS", response.data.payload);
            console.log("set profilegroups ");
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addPROFILEDROUPAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/create", {
          name: profilegroup.name,
          department_id: profilegroup.department_id,
        })
          .then((response) => {
            commit("ADD_PROFILEDROUP", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deletePROFILEDROUPAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/delete", {
          id: profilegroup.id,
        })
          .then((response) => {
            commit("DELETE_PROFILEDROUP", profilegroup.id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editPROFILEDROUPAction({ commit }, profilegroup) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("profilegroup/update", {
          id: profilegroup.id,
          name: profilegroup.name,
          department_id: profilegroup.department_id,
        })
          .then((response) => {
            commit("EDIT_PROFILEDROUP", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getprofilegroups: (state) => {
      return state.profilegroups;
    },
  },
};
export default profilegroupModule;
