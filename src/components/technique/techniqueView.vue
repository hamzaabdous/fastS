<template>
  <div style="padding: 3px; padding-top: 2%">
    <v-row style="text-align: center">
      <v-col cols="12" md="12">
        <h3>
          Profile group : <span class="red--text"> {{ this.idgrp }}</span>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" md="4">
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
                <v-icon color="red" large> mdi-alarm-light </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="4" md="4">
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
                <v-icon color="blue" large> mdi-lock-open </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
      <v-col cols="4" md="4">
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
                <v-icon color="green" large> mdi-check-bold </v-icon></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <div style="padding: 3px; padding-top: 4%">
      <v-data-table
        :headers="headers"
        :items="equipmentsFiltre"
        :search="search"
        :loading="loading"
        sort-by="item.id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#002f6c"
                  class="mb-2 btn white--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left> mdi-account-multiple-plus </v-icon>
                  Add
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.description"
                          label="description"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close(item)">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save(editedItem)">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
                  <v-icon medium class="mr-2" @click="pageView(item)"> mdi-eye-outline </v-icon>

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
      { text: "name", value: "name", sortable: true },
      { text: "status", value: "status", sortable: true },
      { text: "damage", value: "damage", sortable: true },
      { text: "closed", value: "closed", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    equipments: [],
    equipmentsFiltre: [],
    idgrp: null,
    isAdd: true,
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      description: "",
      profileGroup: {
        id: null,
      },
    },
    defaultItem: {
      id: null,
      name: "",
      description: "",
      profileGroup: {
        id: null,
      },
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
    ...mapGetters(["getequipments"]),
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
      this.idgrp = localStorage.getItem("idDomainGroupes");
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        this.equipments.map((item) => {
          if (item.profileGroup.name == this.idgrp) {
            this.equipmentsFiltre.push(item);
          }
        });
      });
      console.log("initialize", this.idgrp);
    },
    ...mapActions([
      "setequipmentsAction",
      "editEQUIPMENTAction",
      "deleteEQUIPMENTAction",
      "addEQUIPMENTAction",
    ]),
    pageView(item) {
      this.$router.push({
        name: "techniqueEquipment",
        params: { name: item.name },
      });
      localStorage.removeItem("equipment");
      localStorage.setItem("equipment", item.name);
      localStorage.removeItem("idEquipment");
      localStorage.setItem("idEquipment", item.id);

      //this.dialogView = true;
    },

    editItem(item) {
      this.editedIndex = this.equipments.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteEQUIPMENTAction(this.editedIndex).then(() => {
        this.equipments = [...this.getequipments];
      });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        this.editedItem.profileGroup.name =
          localStorage.getItem("idDomainGroupes");
        /* var obj ={
          id: this.editedItem.id,
          name: this.editedItem.name,
          description: this.editedItem.description,
          profileGroup: {
            id: localStorage.getItem("id"),
          },
        }; */
        console.log("add", this.editedItem);
        this.addEQUIPMENTAction(this.editedItem).then(() => {
          this.equipments = [...this.getequipments];
        });
      } else {
        console.log("edite");

        this.editEQUIPMENTAction(this.editedItem).then(() => {
          this.equipments = [...this.getequipments];
        });
      }

      this.close();
    },
  },
};
</script>
