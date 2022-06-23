<template>
  <div style="padding: 50px; padding-top: 2%">
    <v-row style="text-align: center">
      <v-col cols="12" md="12">
        <h3>
          Equipement :
          <span class="red--text">
            {{ this.EquipmentsByCounter.nameEquipment }}</span
          >
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
                  {{ this.EquipmentsByCounter.damagedCount }}
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
      <v-col cols="4" md="4">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 deep-orange--text">
                  CONFIRMED DAMAGE TICKETS
                </div>
                <v-list-item-title class="text-h5 mb-1 deep-orange--text">
                  {{ this.EquipmentsByCounter.confirmedCount }}
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
      <v-col cols="4" md="4">
        <template>
          <v-card class="mx-auto" max-width="200" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4 blue--text">
                  Closed Damage Tickets
                </div>
                <v-list-item-title class="text-h5 mb-1 blue--text">
                  {{ this.EquipmentsByCounter.closedCount }}
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
          <v-dialog v-model="dialog" max-width="1000px">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closedtailedialoge">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-title class="text-h5 blue--text text--darken-3">
                Damage Details:
              </v-card-title>
              <v-container class="DamageDetails">
                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>Description :</h3>
                  </v-col>
                  <v-col cols="9" sm="9" md="9">
                    <h4 >
                      {{ damageSelect.description }}
                    </h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>Status :</h3>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <h4 >
                      {{ damageSelect.status }}
                    </h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>declaredAt :</h3>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <h4 >
                      {{ damageSelect.declaredAt }}
                    </h4>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>closedAt :</h3>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <h4 >
                      {{ damageSelect.closedAt }}
                    </h4>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>revertedTimes :</h3>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <h4 >
                      {{ damageSelect.revertedTimes }}
                    </h4>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>updated at :</h3>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <h4 >
                      {{ damageSelect.updated_at }}
                    </h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <h3>created at :</h3>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <h4 >
                      {{ damageSelect.created_at }}
                    </h4>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-title class="text-h5 blue--text text--darken-3">
                photos :
              </v-card-title>
              <v-container v-if="damageSelect.photos!=null" >
                <template >
                <v-row :v-for="(item, i) in damageSelect.photos">
                  <v-img
                    :key="i"
                    max-height="150"
                    max-width="250"
                    :src="`http://localhost:8000/storage/cdn/damagePhotos/${item.filename}`"
                  ></v-img>
                </v-row>
              </template>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="confirmed">
                  Confirme damage
                </v-btn>
                <v-btn depressed color="red" @click="closed">
                  Close damage
                </v-btn>
                <v-btn depressed color="red" @click="revert">
                  Revert damage
                </v-btn>
              </v-card-actions>
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
    dialog: false,
    dialogDelete: false,
    loading: false,
    search: "",
    headers: [
      { text: "Description", value: "description", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Created By", value: "declared_by.username", sortable: true },
      { text: "Closed By", value: "closed_by.name", sortable: true },
      { text: "Created At", value: "created_at", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    damageByEquipments: [],
    equipmentsFiltre: [],
    showdetails: false,
    ImagesPath: "http://localhost:8000/storage/cdn/damagePhotos/",
    damageSelect: {
      id: null,
      status: "",
      description: "",
      declaredBy_id: null,
      declaredAt: "",
      confirmedBy_id: null,
      confirmedAt: null,
      closedBy_id: null,
      closedAt: null,
      revertedBy_id: null,
      revertedAt: null,
      revertedTimes: null,
      equipment_id: null,
      damage_type_id: null,
      created_at: "",
      updated_at: "",
      declared_by: {
        id: null,
        username: "",
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        fonction_id: null,
        created_at: "",
        updated_at: "",
        fonction: {
          id: null,
          name: "",
          department_id: null,
          created_at: "",
          updated_at: "",
          department: {
            id: null,
            name: "",
            created_at: "",
            updated_at: "",
          },
        },
      },
      confirmed_by: null,
      closed_by: null,
      reverted_by: null,
      equipment: {
        id: null,
        name: "",
        profile_group_id: null,
        created_at: "",
        updated_at: "",
        profile_group: {
          id: null,
          name: "",
          department_id: null,
          created_at: "",
          updated_at: "",
          department: {
            id: null,
            name: "",
            created_at: "",
            updated_at: "",
          },
        },
      },
      damage_type: {
        id: null,
        name: "",
        profile_group_id: null,
        department_id: null,
        created_at: "",
        updated_at: "",
        profile_group: {
          id: null,
          name: "",
          department_id: null,
          created_at: "",
          updated_at: "",
          department: {
            id: null,
            name: "",
            created_at: "",
            updated_at: "",
          },
        },
        department: {
          id: null,
          name: "",
          created_at: "",
          updated_at: "",
        },
      },
      photos: [
        {
          id: null,
          description: null,
          filename: "",
          damage_id: null,
          created_at: "",
          updated_at: "",
        },
      ],
    },
    equipment: null,
    idEquipment: null,
    EquipmentsByCounter: {
      id: null,
      nameEquipment: "",
      damagedCount: null,
      confirmedCount: null,
      closedCount: null,
    },
    confirmDamage: {
      id: null,
      confirmedBy_id: null,
    },
    closeDamage: {
      id: null,
      closedBy_id: null,
    },
    revertDamage: {
      id: null,
      revertedBy_id: null,
    },
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
    ...mapGetters(["getDamageTypeByEquipmentID", "getEquipmentsByCounter"]),
  },
  watch: {
    dialog(val) {},
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      this.idEquipment = localStorage.getItem("idEquipment");
      this.FindDamageTypeByEquipmentIDAction(this.idEquipment).then(() => {
        this.damageByEquipments = [...this.getDamageTypeByEquipmentID];
        this.damageByEquipments.map((item) => {
          if (item.equipment_id == this.idEquipment) {
            this.equipmentsFiltre.push(item);
          }
        });
      });

      this.getEquipmentsByCounterAction(this.idEquipment).then(() => {
        this.EquipmentsByCounter.id = this.getEquipmentsByCounter.id;
        this.EquipmentsByCounter.nameEquipment =
          this.getEquipmentsByCounter.nameEquipment;

        this.EquipmentsByCounter.damagedCount =
          this.getEquipmentsByCounter.damagedCount;
        this.EquipmentsByCounter.confirmedCount =
          this.getEquipmentsByCounter.confirmedCount;
        this.EquipmentsByCounter.closedCount =
          this.getEquipmentsByCounter.closedCount;
      });

      console.log("EquipmentsByCounter", this.EquipmentsByCounter);
    },
    ...mapActions([
      "FindDamageTypeByEquipmentIDAction",
      "getEquipmentsByCounterAction",
      "confirmDamageAction",
      "closeDamageAction",
      "revertDamageAction",
    ]),
    pageView(item) {
      this.damageSelect = item;
      console.log("this.damageSelect", this.damageSelect);
      this.dialog = true;
      this.showdetails = true;
    },
    closedtailedialoge() {
      this.showdetails = false;
      this.dialog = false;
    },
    confirmed() {
      this.confirmDamage.id = this.damageSelect.id;
      this.confirmDamage.confirmedBy_id = localStorage.getItem("userid");
       
      this.confirmDamageAction(this.confirmDamage).then(() => {});
      this.showdetails = false;
      this.dialog = false;
    },
    closed() {
      this.closeDamage.id = this.damageSelect.id;
      this.closeDamage.closedBy_id = localStorage.getItem("userid");
       
      this.closeDamageAction(this.closeDamage).then(() => {});
      this.showdetails = false;
      this.dialog = false;
    },
    revert() {
      this.revertDamage.id = this.damageSelect.id;
      this.revertDamage.revertedBy_id = localStorage.getItem("userid");
       
      this.revertDamageAction(this.revertDamage).then(() => {});
      this.showdetails = false;
      this.dialog = false;
    },
  },
};
</script>
