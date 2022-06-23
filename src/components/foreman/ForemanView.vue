<template>
  <div style="padding: 0; padding-top: 13px">
    <div style="margin: 0 auto; width: 100%">
      <v-container class="damageContainer">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="profile_groupe"
              item-text="name"
              item-value="id"
              v-model="profile_groupe_id"
              label="Equipment groupe :"
              @change="changeProfile_groupeSELECT"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="equipmentsFiltre"
              item-text="name"
              item-value="id"
              v-model="equipments_id"
              label="Equipment :"
              @change="changeEquipmentsFiltreSELECT"
              :disabled="disabledEquipmentsFiltre"
            ></v-select>
          </v-col>
        </v-row>
        <v-dialog
          v-model="dialog"
          max-width="700px"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark  @click="cancel">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
            </v-toolbar>

            <v-card-title class="text-h5"> Description : </v-card-title>
            <v-col cols="12" md="12">
              <v-textarea
                solo
                name="input-7-4"
                label="Description"
                v-model="photo.description"
              ></v-textarea>
            </v-col>
            <v-card-title class="text-h5"> Add picture : </v-card-title>
            <v-col cols="12" md="12">
              <v-file-input
                label="Pictures"
                v-model="photo.photos"
                filled
                multiple
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="dialog = false">
                  Close
                </v-btn>
                <v-btn depressed color="primary" @click="save(editedItem)">
                  Save
                </v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
        <v-container>
          <v-row>
            <v-col cols="5" class="ITpanell">
              <v-container>
                <v-row>
                  <v-col cols="5"></v-col>
                  <v-col cols="4">
                    <span>IT </span>
                    <span class="red--text"
                      >({{ this.modelDamageIT.length }})</span
                    ></v-col
                  >
                  <v-col cols="3"></v-col>
                </v-row>
              </v-container>

              <v-col cols="12" sm="12" class="scroll">
                <v-list>
                  <v-list-item-group
                    name="it"
                    v-model="modelIT"
                    multiple>
                    <div>
                      <v-list-item
                        v-for="(item, i) in modelDamageIT"
                        :key="i"
                        class="item itemDamaged"
                        style="
                          background-color: rgb(255, 235, 234);
                          color: #f54;
                        "
                        @click="valider(item)"
                      >
                        <v-list-item-icon>
                          <v-icon color="red" medium> mdi-progress-wrench </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="modelDamageIT"
                            v-text="item.damage_type.name"
                          ></v-list-item-title>
                          <h4 v-text="item.status"></h4>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="5" class="TECpanell">
              <v-container>
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="6">
                    <span>Technique </span>
                    <span class="red--text">
                      ({{ this.modelDamageTEC.length }})</span
                    ></v-col
                  >
                  <v-col cols="3"></v-col>
                </v-row>
              </v-container>

              <v-col cols="12" sm="12" class="scroll">
                <v-list>
                  <v-list-item-group
                    name="TEC"
                    v-model="modelTEC"
                    multiple
                  >
                    <div>
                      <v-list-item
                        v-for="(item, i) in modelDamageTEC"
                        :key="i"
                        class="item"
                        style="
                          background-color: rgb(255, 235, 234);
                          color: #f54;
                        "
                        @click="valider(item)"
                      >
                        <v-list-item-icon>
                          <v-icon color="red" medium> mdi-progress-wrench </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="modelDamageTEC"
                            v-text="item.damage_type.name"
                          ></v-list-item-title>
                          <h4 v-text="item.status"></h4>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
       
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomizedAxios from "../../plugins/axios.js";
export default {
  data: () => ({
    profile_groupe: [],
    damage: [],
    equipmentsFiltre: [],
    damageTypesIT: [],
    damageTypesTEC: [],
    modelIT: [],
    modelTEC: [],
    modelDamageIT: [],
    modelDamageTEC: [],
    Data: [],
    equipments: [],
    departements: [],
    statusdamage: "",
    FindDamageTypeByEquipmentID: [],
    profile_groupe_id: null,
    equipments_id: "",
    disabledEquipmentsFiltre: true,
    dialog: false,
    dialogIT: false,
    image: "",
    photo: {
      id: "",
      description: "",
      foreman_id: "",
      photos: [],
    },
    foremanIntervention: [],
    statusList: [
      {
        id: "1",
        name: "on progress",
      },
      {
        id: "2",
        name: "Confirmed",
      },
      {
        id: "3",
        name: "closed",
      },
    ],
  }),
  mounted() {
    document.title = "damage";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "getUsers",
      "getdamageTypes",
      "getprofilegroups",
      "getequipments",
      "getdamage",
      "getdepartements",
      "getDamageTypeByEquipmentID",
      "getEquipmentDamagesMergedWithDamageTypes",
      "sendDamagePhotosStoragePath",
    ]),
  },
  watch: {},
  created() {},
  methods: {
    changeProfile_groupeSELECT() {
      this.modelDamageIT.length = 0;
      this.modelDamageTEC.length = 0;
      this.equipmentsFiltre.length = 0;
      this.damageTypesIT.length = 0;
      this.damageTypesTEC.length = 0;
      this.Data.length = 0;
      this.disabledEquipmentsFiltre = false;
      this.equipments.map((item) => {
        if (item.profile_group_id == this.profile_groupe_id) {
          this.equipmentsFiltre.push(item);
        }
      });
      //this.damagetypeITandTEC();
    },
    changeEquipmentsFiltreSELECT() {
      this.modelDamageTEC = [];
      this.modelDamageIT = [];
      this.FindDamageTypeByEquipmentID = [];
      this.FindDamageTypeByEquipmentIDAction(this.equipments_id).then(() => {
        this.FindDamageTypeByEquipmentID = [...this.getDamageTypeByEquipmentID];
        this.FindDamageTypeByEquipmentID.map((item) => {
          if (item.damage_type.department_id == 1 && item.status != "confirmed") {
            this.modelDamageTEC.push(item);
          }
          if (item.damage_type.department_id == 2 && item.status != "confirmed") {
            this.modelDamageIT.push(item);
          }
        });
      });
    },
    initialize() {
      console.log("initialize");

      this.setPROFILEDROUPSAction().then(() => {
        this.profile_groupe = [...this.getprofilegroups];
        console.log("vvv", this.damageTypes);
      });
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        console.log(this.equipments);
      });
    },
    ...mapActions([
      "setDAMAGEAction",
      "editDAMAGEAction",
      "deleteDAMAGEAction",
      "addDAMAGEAction",
      "setDAMAGETYPESAction",
      "setPROFILEDROUPSAction",
      "setequipmentsAction",
      "addDAMAGESAction",
      "setDepartementsAction",
      "FindDamageTypeByEquipmentIDAction",
      "getEquipmentDamagesMergedWithDamageTypesAction",
      "sendDamagePhotosStoragePathAction",
    ]),
    deleteDamage() {
      this.damageTypesIT = this.damageTypesIT.filter((e) => {
        return (
          this.modelDamageIT.filter((e1) => {
            return e.name == e1.name;
          }).length == 0
        );
      });
      this.damageTypesTEC.map((item) => {
        this.modelDamageTEC.map((item2) => {
          if (item.name == item2.name) {
            let index = this.damageTypesTEC.indexOf(item);
            this.damageTypesTEC.splice(index, 1);
          }
        });
      });
    },

    valider(item) {
      console.log("item",item);
      this.photo.description=item.description;
      this.photo.id = item.id;
      this.photo.foreman_id = 1;
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
    },

    validerDamages() {
      var formData = new FormData();
      formData.append("id", parseFloat(this.photo.id));
      formData.append("description", this.photo.description);

      this.photo.photos.map((item) => {
        formData.append("photos[]", item);        
        });
      formData.append(
        "foreman_id",
        parseFloat(parseFloat(this.photo.foreman_id))
      );

         console.log("formData",formData);
      this.sendDamagePhotosStoragePathAction(formData).then(() => {
        this.foremanIntervention = [...this.sendDamagePhotosStoragePath];
      });
      console.log("itemTEC", this.foremanIntervention);
      this.dialog=false;

      /* CustomizedAxios.post("damages/foremanIntervention", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        }); */
    },
  },
};
</script>
