<template>
  <v-container>
    <v-row style="height:100vh">
      <v-col class="main-content" cols="12" sm="6" md="8">
        <!-- <JobCard /> -->
        <MainContentCard />
      </v-col>
      <v-col class="right-pane" cols="6" md="4">
        <AreaSearchCard />
        <ShowcaseCard />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import JobCard from "../components/JobCard";
import MainContentCard from "../components/MainContentCard";
import ShowcaseCard from "../components/ShowcaseCard";
import AreaSearchCard from "../components/AreaSearchCard";
export default {
  data: () => ({}),
  created() {},
  components: {
    // JobCard,
    ShowcaseCard,
    AreaSearchCard,
    MainContentCard
  }
};
</script>
<style scoped>
.main-content {
  height: 100%;
  overflow-y: scroll;
}

.right-pane {
  height: 100%;
  overflow-y: scroll;
}

html,
body {
  height: 100%;
}
</style>