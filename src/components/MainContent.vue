<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <JobCard />
      </v-col>
      <v-col cols="6" md="4">
        <v-window v-model="window" class="elevation-1" vertical autorun>
          <v-window-item v-for="n in length" :key="n">
            <ShowcaseCard/>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import JobCard from "./JobCard";
import ShowcaseCard from "./ShowcaseCard";
export default {
  data: () => ({
    rating: 5,
    length: 13,
    window: 0,
    vertical: false,
    autorun: true
  }),
  created() {
    setInterval(() => {
      if (!this.autorun) return;
      if (++this.window >= this.length) this.window = 0;
    }, 1000);
  },
  components: {
    JobCard,
    ShowcaseCard
  }
};
</script>