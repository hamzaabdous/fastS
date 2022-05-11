<template>
  <div style="padding-top: 100px">
    <v-container class="grey lighten-5" style="margin: 0 auto; width: 700px">
      <v-row>
        <v-col cols="12" sm="5" md="5" class="ITpanell">
          <v-card class="" max-width="340">
            <v-card-title>
              <v-spacer></v-spacer> IT <v-spacer></v-spacer>
            </v-card-title>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="green accent-4 white--text"
                column
              >
                <v-chip>Radio</v-chip>

                <v-chip>Tablets</v-chip>

                <v-chip>xxxx</v-chip>

                <v-chip>xxxx</v-chip>
                <v-chip>xxxx</v-chip>

                <v-chip>xxxx</v-chip>

                <v-chip>xxxx</v-chip>

                <v-chip>xxxx</v-chip>
                <v-chip>xxxx</v-chip>

                <v-chip>xxxx</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="reserve">
                <v-img
                  contain
                  lazy-src="../../../assets/verifieduser.svg"
                  max-height="100"
                  max-width="100"
                  src="../../../assets/verifieduser.svg"
                ></v-img>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="2" md="2"> </v-col>
        <v-col cols="12" sm="5" md="5" class="damage cards">
          <v-card max-width="340" color="#ff000000">
            <v-card-text color="#ff000000">
              <v-chip-group
                v-model="selection"
                active-class="green accent-4 white--text"
                column
                color="#FF0000"
              >
              </v-chip-group>
              <v-list color="#ff000000">
                <v-list-item-group color="primary">
                  <v-list-item
                    class="erreurChip"
                    v-for="(item, i) in data"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon small class="mr-2">mdi-pencil </v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon>
                      <v-icon small class="mr-2">mdi-delete </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="reserve">
                <v-img
                  contain
                  lazy-src="../../../assets/warningamber.svg"
                  max-height="100"
                  max-width="100"
                  src="../../../assets/warningamber.svg"
                ></v-img>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    data: [
      { text: "Radio", icon: "mdi-radio" },
      { text: "Tablet", icon: "mdi-tablet-android" },
      { text: "Radio", icon: "mdi-radio" },
      { text: "Tablet", icon: "mdi-tablet-android" },
    ],
  }),
};
</script>
