<template>
  <v-container>
    <div>Equipements groups : {{ id }}</div>
    <v-tabs color="#1D4F91" left>
      <v-tab>users</v-tab>
      <v-tab>Damage type</v-tab>
      <v-tab>Equipement</v-tab>

      <v-tab-item>
        <v-container fluid>
          <v-row class="user">
            <User />
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-row class="user">
            <DamageType />
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <template> </template>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import User from "./user/Users.vue";
import DamageType from "./damage_Type/DamageType.vue";

export default {
  components: {
    User,
    DamageType,
  },
  data: () => ({
    id: "",
  }),
  created() {
    this.id = this.$route.params.name;
  },
};
</script>

<style></style>
