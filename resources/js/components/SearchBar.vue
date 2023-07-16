<template>
  <aside class="search-bar">
    <header>
      <h3 class="subtitle">
        ¿No encontrás lo que buscás?
      </h3>
    </header>

    <form @submit.prevent="submit">
      <Search :input="filters.search"
        @submit="submit" />
    </form>
  </aside>
</template>

<script>
  import { mapGetters, } from "vuex";

  import Search from "./inputs/Search.vue";

  export default {
    name: 'SearchBar',
    components: {
      Search,
    },
    computed: {
      ...mapGetters([ 'filters', ]),
    },
    methods: {
      submit () {
        if (!this.filters.search.invalid) {
          this.$router
            .push({
              name: 'Catalog',
              query: {
                search: this.filters.search.model,
              },
            });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .search-bar {
    display: grid;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--grey, grey);
    color: var(--light, white);

    .subtitle {
      font-size: 1rem;
    }

    form {
      display: flex;
      align-items: center;

      .custom-input-search {
        &::v-deep {
          input {
            background-color: var(--white, white);
            border-color: var(--maroon, maroon);
            color: var(--dark, black);

            &::placeholder {
              color: var(--grey, grey);
            }
          }

          .btn {
            background-color: var(--maroon, maroon);
            border: 2px solid var(--maroon, maroon);
            color: var(--light, white);
          }
        }
      }
    }
  }
</style>