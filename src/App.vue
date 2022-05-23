<template>
  <v-card v-if="logged" class="mx-auto overflow-hidden">
    <v-app-bar color="#fff" style="border-bottom: 2px solid #002f6c">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
          contain
          lazy-src="./assets/TangerAlliance.png"
          max-height="100"
          max-width="150"
          src="./assets/TangerAlliance.png"
        ></v-img>
      </v-toolbar-title>
      <p><b>Checklist</b></p>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="15em"
      style="background-color: #d3e4cd"
    >
      <v-list style="padding: 0px; align-items: center" nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-img
            contain
            lazy-src="./assets/TangerAlliance.png"
            max-height="220"
            max-width="250"
            src="./assets/TangerAlliance.png"
          ></v-img>
          <v-list>
            <v-list-item
              v-for="item in listDrawerChildRouter"
              :key="item.id"
              link
              :to="item.ROUTE"
              class="sideBarItem"
            >
              <v-list-item class="test">
                <v-list-item-content>{{ item.name }}</v-list-item-content>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h2>{{ item.name }}</h2>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item>
          </v-list>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app style="background-color: #fff">
      <router-view />
    </v-app>
  </v-card>
  <Login v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "./View/Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      drawer: false,
      logged: false,
      listDrawerRouter: [{ id: 1, name: "Gestion" }],
      listDrawerChildRouter: [
        { id: 1, name: "user", ROUTE: "/user" },
        { id: 2, name: "damage", ROUTE: "/Damage" },
        { id: 3, name: "profile_groupe", ROUTE: "/profile_groupe" },
      ],
      users: [],
      show: true,
    };
  },
  mounted() {
    document.title = "Dashboard";
    if (localStorage.getItem("token") == null) {
      this.logged = false;
    } else if (localStorage.getItem("token") != null) this.logged = true;
    //  this.initialize();
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  watch: {},
  methods: {
    initialize() {
      this.setUsersAction().then(() => {
        this.users = [...this.getUsers];
        console.log(this.users);
      });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserAction",
      "addUserAction",
    ]),
  },
};
</script>
