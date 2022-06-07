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
        <v-dialog v-model="dialogTEC" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Warning ! </v-card-title>
            <v-card-text
              >Are you sure you want to add this damage ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="cancelTEC"> No </v-btn>
              <v-btn color="green darken-1" text @click="dialogTEC = false">
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogIT" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Warning ! </v-card-title>
            <v-card-text
              >Are you sure you want to add this damage ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="cancelIT"> No </v-btn>
              <v-btn color="green darken-1" text @click="dialogIT = false">
                Yes
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
                      >({{
                        this.modelDamageIT.length + this.modelIT.length
                      }})</span
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
                    multiple
                    color="#f54"
                  >
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
                          <v-icon medium> mdi-progress-wrench </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="modelDamageIT"
                            v-text="item.name"
                          ></v-list-item-title>
                          <h4>on progress</h4>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div>
                      <v-list-item
                        v-for="(item, i) in damageTypesIT"
                        :key="i"
                        class="item"
                        @click="validerIT(item)"
                      >
                        <v-list-item-icon>
                          <v-icon> mdi-cellphone-link-off</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-titlele
                            name="damageTypesIT"
                            v-text="item.name"
                          ></v-list-item-titlele>
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
                      ({{
                        this.modelDamageTEC.length + this.modelTEC.length
                      }})</span
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
                    color="#f54"
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
                        :disabled="true"
                      >
                        <v-list-item-icon>
                          <v-icon medium> mdi-progress-wrench </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="modelDamageTEC"
                            v-text="item.name"
                          ></v-list-item-title>
                          <h4>on progress</h4>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div>
                      <v-list-item
                        v-for="(item, i) in damageTypesTEC"
                        :key="i"
                        class="item"
                        @click="validerTEC(item)"
                      >
                        <v-list-item-icon>
                          <v-icon>mdi-car-wrench</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="damageTypesTEC"
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
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
                @click="validerDamages"
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
    sendDamages: [],
    modelDamageIT: [],
    modelDamageTEC: [],
    profile_groupe_id: null,
    equipments_id: "",
    equipmentsFiltre: [],
    equipmentsDamageType: [],
    disabledEquipmentsFiltre: true,
    isDamaged: false,
    damagesend: [],
    Data: [],
    departements: [],
    testIT: [],
    testTEC: [],
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
      "getdepartements",
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
      this.damageTypesIT.length = 0;
      this.damageTypesTEC.length = 0;
      this.Data.length = 0;
      //  this.damageFunction();
      this.disabledEquipmentsFiltre = false;
      this.profile_groupe.map((item) => {
        if (item.id == this.profile_groupe_id) {
          item.damageTypes.map((item) => {
            this.Data.push(item);
          });
        }
      });
      this.equipments.map((item) => {
        if (item.profileGroup.id == this.profile_groupe_id) {
          this.equipmentsFiltre.push(item);
        }
      });
      //this.damagetypeITandTEC();
    },
    changeEquipmentsFiltreSELECT() {
      // this.damageFunction();
      this.modelDamageIT.length = 0;
      this.modelDamageTEC.length = 0;
      this.damageTypesIT.length = 0;
      this.damageTypesTEC.length = 0;
      this.damagetypeITandTEC();
      //this.Data.length = 0;
      this.FindDamageTypeByEquipmentIDAction(this.equipments_id).then(() => {
        this.equipmentsDamageType = [...this.getDamageTypeByEquipmentID];

        this.equipmentsDamageType.map((item2) => {
          console.log("item2 it", item2);
          this.damageTypesIT.map((item) => {
            console.log("item it", item);
            if (item.id == item2.damageType.id) {
              this.modelDamageIT.push(item);
            }
          });
        });

        this.equipmentsDamageType.map((item2) => {
          console.log("item2 tec", item2);

          this.damageTypesTEC.map((item) => {
            console.log("item tec", item);
            if (item.id == item2.damageType.id) {
              this.modelDamageTEC.push(item);
            }
          });
        });

        this.damageTypesTEC.map((item) => {
          this.modelDamageTEC.map((item2) => {
            if (item.name == item2.name) {
              let index = this.damageTypesTEC.indexOf(item);
              this.testIT.push(item);
            }
          });
        });
        this.damageTypesIT.map((item) => {
          this.modelDamageIT.map((item2) => {
            if (item.name == item2.name) {
              let index = this.damageTypesIT.indexOf(item);
              this.testTEC.push(item);
            }
          });
        });

      });
    },
    initialize() {
      console.log("initialize");

      this.setDOMAINGROUPESAction().then(() => {
        this.profile_groupe = [...this.getdomainGroupes];
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
      "setDOMAINGROUPESAction",
      "setequipmentsAction",
      "FindDamageTypeByEquipmentIDAction",
      "addDAMAGESAction",
      "setDepartementsAction",
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
            console.log("damageTypesTEC 333", this.damageTypesTEC[index]);
          }
        });
      });
    },
    damagetypeITandTEC() {
      this.setDepartementsAction(this.equipments_id).then(() => {
        //debugger;
        this.departements = [...this.getdepartements];
        this.departements[0].damageTypes.map((item) => {
          this.Data.map((dataitem) => {
            if (dataitem.id == item.id) {
              this.damageTypesIT.push(dataitem);
            }
          });
        });
        this.departements[1].damageTypes.map((item) => {
          this.Data.map((dataitem) => {
            if (dataitem.id == item.id) {
              this.damageTypesTEC.push(dataitem);
            }
          });
        });
      });
    },
    validerTEC(item) {
      var id = item.id;
      var userid = 1;
      var equipmentsid = this.equipments_id;
      var name = "dmagaetest";

      console.log("item vvvv", id);
      console.log("equipmentsid vvvv", equipmentsid);
      var obj = {
        name: name,
        status: "",
        description: "",
        equipement: {
          id: equipmentsid,
        },
        userDeclaration: {
          id: userid,
        },
        damageType: {
          id: id,
        },
      };
      this.damagesend.push(obj);

      console.log(this.damagesend);
      this.dialogTEC = true;
    },
    validerIT(item) {
      var id = item.id;
      var userid = 1;
      var equipmentsid = this.equipments_id;
      var name = "dmagaetest";

      console.log("item vvvv", id);
      console.log("equipmentsid vvvv", equipmentsid);
      var obj = {
        name: name,
        status: "",
        description: "",
        equipement: {
          id: equipmentsid,
        },
        userDeclaration: {
          id: userid,
        },
        damageType: {
          id: id,
        },
      };
      this.damagesend.push(obj);

      console.log(this.damagesend);
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
      this.damage = [...this.getdamage];

      /* this.setDAMAGETYPESAction().then(() => {
        this.damageTypes.length = 0;
        this.damageTypes = [...this.getdamageTypes];
        this.damageTypes.map((item) => {
          if (
            item.profileGroup.id == this.profile_groupe_id &&
            item.department.name == "IT"
          ) {
            this.damageTypesIT.push(item);
          } else if (
            item.profileGroup.id == this.profile_groupe_id &&
            item.department.name == "TECHNIQUE"
          ) {
            this.damageTypesTEC.push(item);
          }
        });
      }); */
      this.setDAMAGEAction().then(() => {
        this.damageTypes = [...this.getdamageTypes];
      });
    },
    validerDamages() {
      this.addDAMAGESAction(this.damagesend).then(() => {
        console.log("validerDamages");
      });
    },
  },
};
</script>
