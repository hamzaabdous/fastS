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
              @change="changeEquipmentsFiltreeSELECT"
              :disabled="disabledEquipmentsFiltre"
            ></v-select>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogTEC" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> error? </v-card-title>
            <v-card-text>error</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="cancelTEC">
                Disagree
              </v-btn>
              <v-btn color="green darken-1" text @click="dialogTEC = false">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogIT" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> error? </v-card-title>
            <v-card-text>error</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="cancelIT">
                Disagree
              </v-btn>
              <v-btn color="green darken-1" text @click="dialogIT = false">
                Agree
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
                      >({{ this.modelIT.length }})</span
                    ></v-col
                  >
                  <v-col cols="3"></v-col>
                </v-row>
              </v-container>

              <v-col cols="12" sm="12" class="scroll">
                <v-list>
                  <v-list-item-group v-model="modelIT" multiple color="#f54">
                    <div>
                      <div>
                        <v-list-item
                          v-for="(item, i) in modelDamageIT"
                          :key="i"
                          class="item itemDamaged"
                          :disabled="true"
                          style="
                            background-color: rgb(255, 235, 234);
                            color: #f54;
                          "
                        >
                          <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                    </div>
                    <div>
                      <v-list-item
                        v-for="(item, i) in damageTypesIT"
                        :key="i"
                        class="item"
                        @click="validerIT"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="item.icon"> </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-titlele
                            v-text="item.name"
                          ></v-list-item-titlele>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
              {{ this.modelIT }}
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="5" class="TECpanell">
              <v-container>
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="6">
                    <span>Technique </span>
                    <span class="red--text">
                      ({{ this.modelTEC.length }})</span
                    ></v-col
                  >
                  <v-col cols="3"></v-col>
                </v-row>
              </v-container>

              <v-col cols="12" sm="12" class="scroll">
                <v-list>
                  <v-list-item-group v-model="modelTEC" multiple color="#f54">
                    <div>
                      <v-list-item
                        v-for="(item, i) in modelDamageTEC"
                        :key="i"
                        class="item"
                        style="
                          background-color: rgb(255, 235, 234);
                          color: #f54;
                        "
                        :disabled="true"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div>
                      <v-list-item
                        v-for="(item, i) in damageTypesTEC"
                        :key="i"
                        class="item"
                        @click="validerTEC"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
              {{ this.modelTEC }}
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4"> </v-col>
            <v-col cols="4">
              <v-btn
                color="#1D4F91"
                class="mb-2 btn white--text"
                @click="damageFunction"
              >
                Valider
              </v-btn>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomizedAxios from "../../plugins/axios";

export default {
  data: () => ({
    dialogTEC: false,
    dialogIT: false,
    damage: [],
    profile_groupe: [],
    equipments: [],
    damageTypes: [],
    damageTypesIT: [],
    damageTypesTEC: [],
    modelIT: [],
    modelTEC: [],
    modelDamageIT: [],
    modelDamageTEC: [],
    profile_groupe_id: null,
    equipments_id: null,
    equipmentsFiltre: [],
    equipmentsDamageType: [],
    disabledEquipmentsFiltre: true,
    isDamaged: false,
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
      "getdomainGroupes",
      "getequipments",
      "getDamageTypeByEquipmentID",
      "getdamage",
      "getDamageTypeByEquipmentID",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    //this.initialize();
  },
  methods: {
    changeProfile_groupeSELECT() {
      this.modelDamageIT.length = 0;
      this.modelDamageTEC.length = 0;
      this.equipmentsFiltre.length = 0;
      this.disabledEquipmentsFiltre = false;
      this.equipments.map((item) => {
        if (item.profileGroup.id == this.profile_groupe_id) {
          this.equipmentsFiltre.push(item);
        }
      });
    },
    changeEquipmentsFiltreeSELECT() {
      this.modelDamageIT.length = 0;
      this.modelDamageTEC.length = 0;
      this.damageTypesIT.length = 0;
      this.damageTypesTEC.length = 0;
      this.damageFunction();
      this.FindDamageTypeByEquipmentIDAction(this.equipments_id).then(() => {
        // debugger;

        this.equipmentsDamageType = [...this.getDamageTypeByEquipmentID];
        this.equipmentsDamageType.map((item) => {
          if (item.damageType.department.name == "IT") {
            this.modelDamageIT.push(item.damageType);
          } else if (item.damageType.department.name == "TECHNIQUE") {
            this.modelDamageTEC.push(item.damageType);
          }
        });
        for (let i = 0; i < this.damageTypesIT.length; i++) {
          for (let j = 0; j < this.modelDamageIT.length; j++) {
            if (this.damageTypesIT[i].name == this.modelDamageIT[j].name) {
              this.damageTypesIT.splice(i, 1);
            }
          }
        }
        for (let i = 0; i < this.damageTypesTEC.length; i++) {
          for (let j = 0; j < this.modelDamageTEC.length; j++) {
            if (this.damageTypesTEC[i].name == this.modelDamageTEC[j].name) {
              this.damageTypesTEC.splice(i, 1);
            }
          }
        }
        //console.log("damageTypesIT ccc", this.damageTypesIT);
        //  console.log("modelDamageTEC", this.modelDamageTEC);
      });
    },
    initialize() {
      console.log("initialize");

      this.setDOMAINGROUPESAction().then(() => {
        this.profile_groupe = [...this.getdomainGroupes];
        console.log(this.profile_groupe);
      });
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        console.log(this.equipments);
      });
      this.setDAMAGETYPESAction().then(() => {
        this.damageTypes = [...this.getdamageTypes];
        this.damageTypes.map((item) => {
          if (item.department.name == "IT") {
            this.damageTypesIT.push(item);
          } else if (item.department.name == "TECHNIQUE") {
            this.damageTypesTEC.push(item);
          }
        });
      });
    },
    ...mapActions([
      "setDAMAGEAction",
      "editDAMAGEAction",
      "deleteDAMAGEAction",
      "addDAMAGEAction",
      "setDAMAGETYPESAction",
      "setDOMAINGROUPESAction",
      "setequipmentsAction",
      "FindDamageTypeByEquipmentIDAction",
    ]),
    validerTEC() {
      this.dialogTEC = true;
    },
    validerIT() {
      this.dialogIT = true;
    },
    cancelTEC() {
      this.modelTEC.pop();
      this.dialogTEC = false;
    },
    cancelIT() {
      this.modelIT.pop();
      this.dialogIT = false;
    },
    damageFunction() {
      // this.setDAMAGEAction().then(() => {
      this.damage = [...this.getdamage];
      /*  this.damage.map((item) => {
          if (item.damageType.department.name == "IT") {
            this.modelDamageIT.push(item);
          } else if (item.damageType.department.name == "TECHNIQUE") {
            this.modelDamageTEC.push(item);
          }
        });
        console.log("modelDamageIT", this.modelDamageIT);
        console.log("modelDamageTEC", this.modelDamageTEC); */
      //});
      this.setDAMAGETYPESAction().then(() => {
        this.damageTypes = [...this.getdamageTypes];
        this.damageTypes.map((item) => {
          if (item.department.name == "IT") {
            this.damageTypesIT.push(item);
          } else if (item.department.name == "TECHNIQUE") {
            this.damageTypesTEC.push(item);
          }
        });
      });
    },
  },
};
</script>
