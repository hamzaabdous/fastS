<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-col cols="6" md="6">
      <v-select
        :items="departements"
        item-text="name"
        item-value="name"
        v-model="departementId"
        label="departements"
        @change="changeDepartment"
      ></v-select>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="domainGroupesBydepartements"
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
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

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
                        v-model="editedItem.departement"
                        label="departement"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.domain.id"
                        label="domain"
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
                <v-btn color="blue darken-1" text @click="openSave">
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
          <v-dialog v-model="confirmAddSave" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" v-if="editedIndex == -1"
                >Are you sure you want to add this item?</v-card-title
              >
              <v-card-title class="text-h5" v-else
                >Are you sure you want to update this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddSaveDialog"
                  >No</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">Yes</v-btn>
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
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    search: "",
    confirmAddSave: false,
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "equipments", value: "equipments.length", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    domainGroupes: [],
    domainGroupesBydepartements: [],
    departements: [],
    departementId: "",
    isAdd: true,
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      departement: "",
      domain: {
        id: "",
      },
    },
    defaultItem: {
      id: "",
      name: "",
      departement: "",
      domain: {
        id: "",
      },
    },
  }),
  mounted() {
    document.title = "domainGroupes";

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
    ...mapGetters(["getdomainGroupes", "getdepartements"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
          departement: "",
          domain: {
            id: "",
          },
        };
      }

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
      this.domainGroupesBydepartements.length = [];
      this.setDOMAINGROUPESAction().then(() => {
        this.domainGroupes = [...this.getdomainGroupes];
        this.domainGroupesBydepartements = [...this.getdomainGroupes];
        console.log(this.domainGroupes);
      });
      this.setDepartementsAction().then(() => {
        this.departements = [...this.getdepartements];
        console.log(this.departements);
      });
    },
    pageView(item) {
      this.$router.push({
        name: "techniqueView",
        params: { name: item.name },
      });
      localStorage.removeItem("idDomainGroupes");
      localStorage.setItem("idDomainGroupes", item.name);

      //this.dialogView = true;
    },
    ...mapActions([
      "setDOMAINGROUPESAction",
      "editDOMAINGROUPEAction",
      "deleteDOMAINGROUPEAction",
      "addDOMAINGROUPEAction",
      "setDepartementsAction",
    ]),
    changeDepartment() {
      this.domainGroupesBydepartements = [];
      this.domainGroupes = [];
      this.setDOMAINGROUPESAction().then(() => {
        this.domainGroupes = [...this.getdomainGroupes];
        this.domainGroupes.map((element) => {
        if (element.department == this.departementId) {
          this.domainGroupesBydepartements.push(element);
        }
      });
      });
      
    },

    editItem(item) {
      this.editedIndex = this.domainGroupes.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteDOMAINGROUPEAction(this.editedIndex).then(() => {
        this.domainGroupes = this.getdomainGroupes;
      });
      this.closeDelete();
    },
    close() {
      this.editedIndex = -1;

      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeAddSaveDialog() {
      this.confirmAddSave = false;
    },
    openSave() {
      this.confirmAddSave = true;
    },
    save() {
      if (this.editedIndex == -1) {
        this.addDOMAINGROUPEAction(this.editedItem).then(() => {
          this.domainGroupes = [...this.domainGroupes];
        });
        this.closeAddSaveDialog();
      } else {
        this.editDOMAINGROUPEAction(this.editedItem).then(() => {
          this.domainGroupes = this.getdomainGroupes;
        });
        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
