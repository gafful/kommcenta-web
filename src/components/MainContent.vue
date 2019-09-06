<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <JobCard />
      </v-col>
      <v-col cols="6" md="4">
        <AreaSearchCard />
        <ShowcaseCard />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import JobCard from "./JobCard";
import ShowcaseCard from "./ShowcaseCard";
import AreaSearchCard from "./AreaSearchCard";
export default {
  data: () => ({}),
  created() {},
  components: {
    JobCard,
    ShowcaseCard,
    AreaSearchCard
  }
};
</script>