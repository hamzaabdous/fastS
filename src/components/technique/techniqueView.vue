<template>
  <div style="padding: 30px; padding-top: 2%">
    <v-row style="text-align: center">
      <v-col cols="12" md="12">
        <h3>
          Profile group : <span class="red--text"> {{ this.ProfileGroupsByCounter.name }}</span>
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
                  {{ this.ProfileGroupsByCounter.damagedCount }}
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
                  {{ this.ProfileGroupsByCounter.confirmedCount }}
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
                  {{ this.ProfileGroupsByCounter.closedCount }}
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
                  {{ this.ProfileGroupsByCounter.functionalEquipmnet }}
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
        :items="equipments"
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="teal"
          class="mr-2 btn white--text"
          @click="pageView(item)"
        >
          <v-icon medium class="mr-2"> mdi-eye-outline </v-icon>
        </v-btn>
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
    loading: false,
    search: "",
    headers: [
      { text: "name", value: "nameEquipment", sortable: true },
      { text: "damaged", value: "damagedCount", sortable: true },
      { text: "confirmed", value: "confirmedCount", sortable: true },
      { text: "closed", value: "closedCount", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    equipments: [],
    equipmentsFiltre: [],
    idgrp: null,
    ProfileGroupsByCounter: {
      id: null,
      name: "",
      equipmentsCount: null,
      functionalEquipmnet: null,
      damagedCount: null,
      confirmedCount: null,
      closedCount: null,
    },
    EquipmentsByCounters: {
      id: null,
      nameEquipment: null,
      damagedCount: null,
      confirmedCount: null,
      closedCount: null,
    },
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
    ...mapGetters([
      "getequipments",
      "getProfileGroupsByCounter",
      "getEquipmentsByCounters",
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
    // this.initialize();
  },
  methods: {
    initialize() {
      this.idgrp = localStorage.getItem("idDomainGroupes");
      this.getEquipmentsByCountersAction(localStorage.getItem("idDomainGroupesid")).then(() => {
        this.equipments = [...this.getEquipmentsByCounters];
       /*  this.equipments.map((item) => {
          if (item.profile_group.name == this.idgrp) {
            this.equipmentsFiltre.push(this.EquipmentsByCounters);
          }
        }); */
      });
      this.getProfileGroupsByCounterAction(
        localStorage.getItem("idDomainGroupesid")
      ).then(() => {
        this.ProfileGroupsByCounter.id = this.getProfileGroupsByCounter.id;
        this.ProfileGroupsByCounter.name = this.getProfileGroupsByCounter.name;
        this.ProfileGroupsByCounter.equipmentsCount =
          this.getProfileGroupsByCounter.equipmentsCount;
        this.ProfileGroupsByCounter.functionalEquipmnet =
          this.getProfileGroupsByCounter.functionalEquipmnet;
        this.ProfileGroupsByCounter.damagedCount =
          this.getProfileGroupsByCounter.damagedCount;
        this.ProfileGroupsByCounter.confirmedCount =
          this.getProfileGroupsByCounter.confirmedCount;
        this.ProfileGroupsByCounter.closedCount =
          this.getProfileGroupsByCounter.closedCount;
      });
      console.log("this.ProfileGroupsByCounter", this.ProfileGroupsByCounter);
    },
    ...mapActions([
      "setequipmentsAction",
      "getProfileGroupsByCounterAction",
      "getEquipmentsByCountersAction",
    ]),
    pageView(item) {
      this.$router.push({
        name: "techniqueEquipment",
        params: { name: item.name },
      });

  
      localStorage.removeItem("idEquipment");
      localStorage.setItem("idEquipment", item.id);
    },
  },
};
</script>
