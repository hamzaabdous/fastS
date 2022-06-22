<template>
  <div style="padding: 3px; padding-top: 2%">
    <v-row style="text-align: center">
      <v-col cols="12" md="12">
        <h3>
          Equipement : <span class="red--text"> {{ this.equipment }}</span>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 red--text">
                  Pending Damage Tickets
                </div>
                <v-list-item-title class="text-h5 mb-1 red--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="red" large>
                  mdi-alarm-light
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 deep-orange--text">
                  CONFIRMED DAMAGE TICKETS
                </div>
                <v-list-item-title class="text-h5 mb-1 deep-orange--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="deep-orange" large>
                  mdi-bell-check
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 blue--text">
                  Closed Damage Tickets
                </div>
                <v-list-item-title class="text-h5 mb-1 blue--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="blue" large>
                  mdi-lock-open
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>

      <v-col cols="3" md="3">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 green--text">
                  Total Functional Equipement
                </div>
                <v-list-item-title class="text-h5 mb-1 green--text">
                  5
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="60" color="white">
                <v-icon color="green" large>
                  mdi-check-bold
                </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <div style="padding: 3px; padding-top: 4%">
      <v-data-table
        :headers="headers"
        :items="damageByEquipments"
        :search="search"
        :loading="loading"
        sort-by="item.id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="save(editedItem)"> confirmed </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-title class="text-h5 grey--text text--darken-3">
                Damage Details:
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3" md="3">
                    <h3>Description :</h3>
                    <h3>cc</h3>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <h3>Status :</h3>
                    <h3>cc</h3>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <h3>declaredAt :</h3>
                    <h3>cc</h3>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <h3>closedAt :</h3>
                    <h3>cc</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="3" md="3">
                    <h3>revertedTimes :</h3>
                    <h3>cc</h3>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <h3>updated_at :</h3>
                    <h3>cc</h3>
                  </v-col>

                </v-row>
              </v-container>
              <v-card-title class="text-h5 grey--text text--darken-3">
                photos :
              </v-card-title>
              <v-container>
                <v-row> </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="pageView(item)">
            mdi-eye-outline
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize()"> Reset </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    search: "",
    headers: [
      { text: "description", value: "description", sortable: true },
      { text: "status", value: "status", sortable: true },
      { text: "created By", value: "declared_by.username", sortable: true },
      { text: "closed_by", value: "closed_by.name", sortable: true },
      { text: "created At", value: "created_at", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    damageByEquipments: [],
    equipmentsFiltre: [],
    equipmentSelect: [],
    equipment: null,
    idEquipment: null,

    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      description: "",
    },
    defaultItem: {
      id: null,
      name: "",
      description: "",
    },
  }),
  mounted() {
    document.title = "user";
    this.loading = true;
    setTimeout(() => {
      this.initialize();
      this.loading = false;
    }, 2500);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getDamageTypeByEquipmentID"]),
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
    // this.initialize();
  },
  methods: {
    initialize() {
      this.equipment = localStorage.getItem("equipment");
      this.idEquipment = localStorage.getItem("idEquipment");
      this.FindDamageTypeByEquipmentIDAction(this.idEquipment).then(() => {
        this.damageByEquipments = [...this.getDamageTypeByEquipmentID];
        console.log("damageByEquipments", this.damageByEquipments);
        this.damageByEquipments.map((item) => {
          if (item.damage_type.profile_group.name == this.equipment) {
            this.equipmentsFiltre.push(item);
          }
        });
      });

      console.log("initialize", this.damageByEquipments);
    },
    ...mapActions(["FindDamageTypeByEquipmentIDAction"]),
    pageView(item) {
      this.dialog = true;
      this.equipmentSelect[0] = item;
      console.log("this.equipmentSelect", this.equipmentSelect[0]);
    },
  },
};
</script>
