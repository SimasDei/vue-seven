<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"> </v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date }}</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              sequi iusto, asperiores quis tenetur magni aliquam! Nemo ut
              possimus dolores repellendus aperiam quisquam tempore veritatis
              quia numquam id molestiae aliquam aliquid, sequi inventore, cumque
              nobis laboriosam eveniet! Similique aspernatur earum fugiat
              impedit!
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    }
  }
};
</script>

<style>
</style>
