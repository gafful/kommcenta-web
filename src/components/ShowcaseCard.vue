<template>
  <v-card class="mx-auto">
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-end fill-height">Kenkey House</v-card-title>
    </v-img>
    <v-card-text>0201-234-567</v-card-text>
    <v-rating v-model="rating"></v-rating>
    <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn text>Click</v-btn>
      <v-btn outlined>Click</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    rating: 3,
  }),
};
</script>