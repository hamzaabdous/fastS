<template>
  <v-row style="margin: 0; padding: 0;background: #fff;" >
    <v-col cols="7" class="backgroundLogin"> </v-col>
    <v-col cols="5" class="form">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field v-model="username" label="username"></v-text-field
        ></v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field
            type="password"
            v-model="password"
            label="password"
          ></v-text-field>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>

      <div class="btn_form">
        <v-btn color="#A6CEE3" class="mb-2 btn white--text" @click="Login">
          <v-icon left> mdi-login-variant </v-icon>
          LOGIN
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import CustomizedAxios from "../plugins/axios";
export default {
  components: {},
  data() {
    return {
      logged: false,
      username: null,
      password: null,
      userActive:{
        user: {
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
                updated_at: ""
            }
        }
    },
    token: ""
      },
    };
  },
  mounted() {
    document.title = "Dashboard";

     this.initialize();
  },
  computed: {
    ...mapGetters(["getUsers","getUserActive"]),
  },
  watch: {},
  methods: {
    initialize() {
      console.log("xccc");
     
    },
    Login() {
      console.log("username", this.username);
      console.log("password", this.password);
      
      this.userActive=this.getUserActive;
      /* localStorage.removeItem("userActive");
      localStorage.setItem('userActive', JSON.stringify(this.userActive)); */
      console.log("this.userActive",this.userActive);

      CustomizedAxios
        .post("users/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log("res login ", response.data);
          // localStorage.removeItem("token");
          localStorage.setItem("token", response.data.token);
          this.$router.push({
            name: "Damage",
            params: { token: response.data.token },
          });
          window.location.reload();
        })
        .catch((error) => {
          console.log("error login ", error);
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
<style></style>
