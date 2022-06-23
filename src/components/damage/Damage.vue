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
        <v-dialog v-model="dialog" persistent max-width="490">
          <v-card>
            <v-card-title
              class="text text-h5 red--text text--lighten-1 text-uppercase"
            >
              Warning !
            </v-card-title>
            <v-card-text class="font-weight-bold"
              >Are you sure you want to add this damage ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red lighten-1" @click="cancel"> No </v-btn>
              <v-btn color="primary" @click="dialog = false"> Yes </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogValide" persistent max-width="490">
          <v-card>
            <v-card-title
              class="text text-h4 red--text text--lighten-1 text-uppercase"
            >
              Warning !
            </v-card-title>
            <v-card-text class="font-weight-bold"
              >Are you sure you want to valide this Damages ?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red lighten-1" @click="dialogValide = false">
                No
              </v-btn>
              <v-btn color="primary" @click="validerDamages"> Yes </v-btn>
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
                    active-class="bg-active"
                    color="#fff"
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
                          <h4>{{ item.damage.status }}</h4>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div>
                      <v-list-item
                        v-for="(item, i) in damageTypesIT"
                        :key="i"
                        class="item"
                        @click="valider(item)"
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
                    active-class="bg-active"
                    color="#fff"
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
                          <h4>{{ item.damage.status }}</h4>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                    <div>
                      <v-list-item
                        v-for="(item, i) in damageTypesTEC"
                        :key="i"
                        class="item"
                        @click="valider(item)"
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
            <v-col class="d-flex justify-center" cols="12">
              <v-btn depressed color="primary" @click="dialogValideFunction">
                Valider
              </v-btn>
            </v-col>
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
    damageTypesIT: [],
    damageTypesTEC: [],
    modelDamageIT: [],
    modelDamageTEC: [],
    equipmentsFiltre: [],
    Data: [],
    profile_groupe: [],
    equipments: [],
    damagesend: [],
    modelIT: [],
    modelTEC: [],
    department: [],
    departmentIT: {
      id: null,
      name: "",
      created_at: "",
      updated_at: "",
    },
    departmentTEC: {
      id: null,
      name: "",
      created_at: "",
      updated_at: "",
    },
    DamageTypeByEquipmentID: [],
    DamagesMergedWithDamageTypes: [],
    equipments_id: "",
    dialog: false,
    dialogValide: false,
    profile_groupe_id: null,
    disabledEquipmentsFiltre: true,
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
      "getDamageTypeByEquipmentID",
      "getdamage",
      "getEquipmentDamagesMergedWithDamageTypes",
      "getdepartements",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.cancel();
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
      this.disabledEquipmentsFiltre = false;

      console.log("equipments", this.equipments);
      this.equipments.map((item) => {
        if (item.profile_group_id == this.profile_groupe_id) {
          this.equipmentsFiltre.push(item);
        }
      });
    },
    changeEquipmentsFiltreSELECT() {
      var IT = this.departmentIT.id;
      var TEC = this.departmentTEC.id;
      this.modelDamageTEC = [];
      this.modelDamageIT = [];
      this.damageTypesTEC = [];
      this.damageTypesIT = [];
      this.FindDamageTypeByEquipmentID = [];
      this.getEquipmentDamagesMergedWithDamageTypesAction(
        this.equipments_id
      ).then(() => {
        this.DamagesMergedWithDamageTypes = [
          ...this.getEquipmentDamagesMergedWithDamageTypes,
        ];
        console.log(
          "DamagesMergedWithDamageTypes",
          this.DamagesMergedWithDamageTypes
        );
        this.DamagesMergedWithDamageTypes.map((item) => {
          //  debugger;
          if (item.department_id == TEC && item.damage != null) {
            if (item.damage.status == "closed") {
              this.damageTypesTEC.push(item);
            } else {
              this.modelDamageTEC.push(item);
            }
          } else if (item.department_id == TEC && item.damage == null) {
            this.damageTypesTEC.push(item);
          }

          if (item.department_id == IT && item.damage != null) {
            if (item.damage.status == "closed") {
              this.damageTypesIT.push(item);
            } else {
              this.modelDamageIT.push(item);
            }
          } else if (item.department_id == IT && item.damage == null) {
            this.damageTypesIT.push(item);
          }
        });
      });
    },
    initialize() {
      console.log("initialize");

      this.setPROFILEDROUPSAction().then(() => {
        this.profile_groupe = [...this.getprofilegroups];
      });
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        console.log("set equipments", this.equipments);
      });
      this.setDepartementsAction().then(() => {
        this.department = [...this.getdepartements];
        this.department.map((item) =>{
          if(item.name.toLowerCase() == "technique"){
            this.departmentTEC=item;
          }
          if( item.name.toLowerCase() == "it"){
            this.departmentIT=item;
          }
        })
        console.log("set Departements", this.department);
      });
    },
    ...mapActions([
      "setDAMAGEAction",
      "editDAMAGEAction",
      "deleteDAMAGEAction",
      "declareDamageAction",
      "setDAMAGETYPESAction",
      "setPROFILEDROUPSAction",
      "setequipmentsAction",
      "addDAMAGESAction",
      "FindDamageTypeByEquipmentIDAction",
      "getEquipmentDamagesMergedWithDamageTypesAction",
      "setDepartementsAction",
    ]),
    valider(item) {
      console.log("item ", item);

      var Damage = {
        declaredBy_id: null,
        equipment_id: null,
        damage_type_id: null,
      };

      Damage.declaredBy_id = localStorage.getItem("userid");
      Damage.damage_type_id = item.id;
      Damage.equipment_id = this.equipments_id;

      this.Data.push(Damage);

      console.log(this.Data);

      this.dialog = true;
    },

    cancel() {
      this.damagesend.pop();
      this.dialog = false;
    },

    dialogValideFunction() {
      this.dialogValide = true;
      /* this.declareDamageAction(this.Data).then(() => {
        console.log("validerDamages");
      }); */
    },
    validerDamages() {
      this.declareDamageAction(this.Data).then(() => {
        console.log("validerDamages");
      });
      this.dialogValide = false;
    },
  },
};
</script>
