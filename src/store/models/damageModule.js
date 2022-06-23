import CustomizedAxios from "../../plugins/axios";

const damageTypeModule = {
  state: {
    damages: [],
    DamageTypeByEquipmentID: [],
    getEquipmentDamagesMergedWithDamageTypes: [],
    foremanIntervention: [],
  },
  mutations: {
    DAMAGE(state, damages) {
      state.damages = damages;
      console.log("cccc", state.damages);
    },
    ADD_DAMAGE(state, damage) {
      state.damages.push(damage);
    },
    ADD_DAMAGES(state, damages) {
      state.damages.push(damages);
    },
    DELETE_DAMAGE(state, id) {
      state.damages = state.damages.filter((c) => c.id != id);
    },
    EDIT_DAMAGE(state, damage) {
      state.damages = state.damages.map((c) => {
        if (c.id == damage.id) return damage;
        return c;
      });
    },
    FindDamageTypeByEquipmentID(state, damages) {
      state.DamageTypeByEquipmentID = damages;
    },
    getEquipmentDamagesMergedWithDamageTypes(state, damages) {
      state.getEquipmentDamagesMergedWithDamageTypes = damages;
    },
    sendDamagePhotosStoragePath(state, foremanIntervention) {
      state.foremanIntervention.push(foremanIntervention);
    },
  },
  actions: {
    setDAMAGEAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/")
          .then((response) => {
            commit("DAMAGE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    declareDamageAction({ commit }, damagesList) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/declareDamage", {
          damages:damagesList
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DAMAGES", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    confirmDamageAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/confirmDamage", {
          id: damage.id,
          confirmedBy_id: damage.confirmedBy_id,
        })
          .then((response) => {
            console.log("res confirmDamage ", response.data.payload);

       //     commit("EDIT_DAMAGE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    closeDamageAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/closeDamage", {
          id: damage.id,
          closedBy_id: damage.closedBy_id,
        })
          .then((response) => {
            console.log("res closeDamage ", response.data.payload);
            //commit("EDIT_DAMAGE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    revertDamageAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/revertDamage", {
          id: damage.id,
          revertedBy_id: damage.revertedBy_id,
        })
          .then((response) => {
            console.log("res revertDamage ", response.data.payload);
          //  commit("EDIT_DAMAGE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDAMAGESAction({ commit }, damages) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/addList", damages)
          .then((response) => {
            commit("ADD_DAMAGES", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteDAMAGEAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/delete/" + id)
          .then((response) => {
            commit("DELETE_DAMAGE", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDAMAGEAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/update", {
          created_date: damage.created_date,
          updateDate: damage.updateDate,
          name: damage.name,
          department: {
            id: damage.department.id,
          },
          profileGroup: {
            id: damage.profileGroup.id,
          },
        })
          .then((response) => {
            commit("EDIT_DAMAGE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    FindDamageTypeByEquipmentIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("damages/getDamagesByEquipments/" + id)
          .then((response) => {
            commit("FindDamageTypeByEquipmentID", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getEquipmentDamagesMergedWithDamageTypesAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get(
          "damages/getEquipmentDamagesMergedWithDamageTypes/" + id
        )
          .then((response) => {
            commit(
              "getEquipmentDamagesMergedWithDamageTypes",
              response.data.payload
            );
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    sendDamagePhotosStoragePathAction({ commit }, formData) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("damages/foremanIntervention", formData)
          .then((response) => {
            commit("sendDamagePhotosStoragePath", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            console.log("error", error);
            reject(error);
          });
      });
    },
  },
  getters: {
    getdamage: (state) => {
      return state.damages;
    },
    getDamageTypeByEquipmentID: (state) => {
      return state.DamageTypeByEquipmentID;
    },
    getEquipmentDamagesMergedWithDamageTypes: (state) => {
      return state.getEquipmentDamagesMergedWithDamageTypes;
    },
    sendDamagePhotosStoragePath: (state) => {
      return state.foremanIntervention;
    },
  },
};
export default damageTypeModule;
