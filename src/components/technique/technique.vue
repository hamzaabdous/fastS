<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-col cols="6" md="6">
      <v-select
        :items="departements"
        item-text="name"
        item-value="id"
        v-model="departementId"
        label="departements"
        @change="changeDepartment"
      ></v-select>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="profilegroupsBydepartements"
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
</template>
<script>
import CustomizedAxios from "../../plugins/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    search: "",
    confirmAddSave: false,
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "damaged", value: "damaged", sortable: true },
      { text: "confirmed", value: "confirmed", sortable: true },
      { text: "closed", value: "closed", sortable: true },
      { text: "equipment count", value: "equipmentLength", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    profilegroups: [],
    profilegroupsBydepartements: [],
    departements: [],
    test: [],
    merge: [],
    departementId: "",
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
    document.title = "profilegroups";

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
    ...mapGetters(["getprofilegroups", "getdepartements"]),
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
  created() {},
  methods: {
    initialize() {
      this.profilegroupsBydepartements.length = [];
      this.setPROFILEDROUPSAction().then(() => {
        this.profilegroups = [...this.getprofilegroups];
        this.profilegroupsBydepartements = [...this.getprofilegroups];
        /* this.profilegroups.map((element) => {
          var department_id = element.department_id;
          CustomizedAxios.get(
            `/profilegroup/getProfileGroupEquipments/${{ department_id }}`
          )
            .then((response) => {
              var equipmentCount = response.data.payload.length;
              element.equipmentLength=equipmentCount;
            })
            .catch((error) => {
              console.log("error :", error);
            });
        });
          console.log(this.profilegroups); */
      }); 
      this.setDepartementsAction().then(() => {
        this.departements = [...this.getdepartements];
      });
    },
    pageView(item) {
      this.$router.push({
        name: "techniqueView",
        params: { name: item.name },
      });
      localStorage.removeItem("idDomainGroupes");
      localStorage.setItem("idDomainGroupes", item.name);
    },
    ...mapActions(["setPROFILEDROUPSAction", "setDepartementsAction"]),
    changeDepartment() {
      this.profilegroupsBydepartements = [];
      this.profilegroups = [];
      console.log("this.departementId", this.departementId);
      this.setPROFILEDROUPSAction().then(() => {
        this.profilegroups = [...this.getprofilegroups];
        this.profilegroups.map((element) => {
          if (element.department_id == this.departementId) {
            this.profilegroupsBydepartements.push(element);
          }
          // PROFILEDROUPSS;
        });
      });
    },
  },
};
</script>
