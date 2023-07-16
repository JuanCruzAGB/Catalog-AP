<template>
  <main class="home view">
    <div class="view-body">
      <div class="view-container">
        <Banner />

        <Catalog v-for="(location, key) in locations"
          :key="key"
          :location="location" />

        <SearchBar />

        <ContactForm />
      </div>
    </div>
  </main>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Banner from "../Banner.vue";
  import SearchBar from "../SearchBar.vue";
  import ContactForm from "../forms/Contact.vue";
  import Catalog from "../locations/Catalog.vue";

  export default {
    name: 'Home',
    components: {
      Banner,
      Catalog,
      ContactForm,
      SearchBar,
    },
    computed: {
      ...mapGetters([ 'filters', 'locations', ]),
    },
    methods: {
      ...mapActions([ 'getLocations', ]),
    },
    async beforeMount () {
      this.filters.favorite = true;

      await this.getLocations();
    },
  }
</script>

<style lang="scss" scoped>
  .home.view {
    .view-body {
      .view-container {
        display: grid;
        gap: 2rem;
      }
    }
  }
</style>