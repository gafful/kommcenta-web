<template>
  <v-list two-line>
    <v-list-item-group v-model="selected" multiple active-class="pink--text">
      <template v-for="(item, index) in items">
        <v-card class="mx-auto" :key="item.title">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline" v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.headline"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text v-text="item.subtitle"></v-card-text>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="124"></v-img>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">Read</v-btn>
            <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    selected: [2],
    items: [
      {
        action: "15 min",
        headline: "Brunch this weekend?",
        title: "Ali Connors",
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        action: "2 hr",
        headline: "Summer BBQ",
        title: "me, Scrott, Jennifer",
        subtitle: "Wish I could come, but I'm out of town this weekend."
      },
      {
        action: "6 hr",
        headline: "Oui oui",
        title: "Sandra Adams",
        subtitle: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        action: "12 hr",
        headline: "Birthday gift",
        title: "Trevor Hansen",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt13",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt12",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt11",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt10",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt9",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt8",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt7",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt6",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt5",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt4",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt3",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt2",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        title: "Britta Holt1",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  })
};
</script>