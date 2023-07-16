<template>
  <div class="catalog view">
    <div class="view-body">
      <div class="view-container">
        <ul class="list filters">
          <li class="item">
            <Search :disabled="loading"
              :input="filters.search"
              @submit="filter" />
          </li>

          <li v-if="isDesktop"
            class="item">
            <Select :disabled="loading"
              :options="categoriesOptions"
              placeholder="Tipo de propiedad"
              v-model="filters.id_category.model"
              @update="filter" />
          </li>

          <li v-if="isDesktop"
            class="item">
            <Select :disabled="loading"
              :options="locationsOptions"
              placeholder="Ubicación"
              v-model="filters.id_location.model"
              @update="filter" />
          </li>
        </ul>

        <template v-if="loading">
          <ul class="list cards">
            <li v-for="(item, key) in emptys"
              class="item skeleton"
              :key="key">
              <Card :skeleton="loading" />
            </li>
          </ul>

          <Pagination :skeleton="loading" />
        </template>

        <template v-else>
          <template v-if="properties.length">
            <ul class="list cards">
              <li v-for="(property, key) in results[filters.page]"
                class="item"
                :key="`property-${ key }`">
                <Card :data="property" />
              </li>
            </ul>

            <Pagination :items="results"
              v-model="filters.page" />
          </template>

          <template v-else>
            <div class="flex justify-center col-span-4">
              <Empty>
                <template v-slot:text>
                  No se encontraron propiedades
                </template>
              </Empty>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Pagination from "../Pagination.vue";
  import Empty from "../cards/Empty.vue";
  import Card from "../cards/Property.vue";
  import Select from "../inputs/Select.vue";
  import Search from "../inputs/Search.vue";

  export default {
    name: 'Catalog',
    components: {
      Card,
      Empty,
      Pagination,
      Search,
      Select,
    },
    computed: {
      ...mapGetters([ 'categoriesOptions', 'filters', 'isDesktop', 'loading', 'locationsOptions', 'properties', ]),
      emptys () {
        if (this.isDesktop) {
          return 12;
        }

        return 4;
      },
      pages () {
        return Object.keys(this.results);
      },
      results () {
        let pages = {};

        let key = 1;

        this.properties
          .map((property, index) => {
            if (index == key * this.filters.results_per_page)
              key++;

            if (!pages[key])
              pages[key] = [];

            pages[key].push(property);
          });

        return pages;
      },
    },
    methods: {
      ...mapActions([ 'filter', 'getCategories', 'getLocations', ]),
    },
    async beforeMount () {
      await this.getCategories();

      await this.getLocations();

      this.filter();
    },
  }
</script>

<style lang="scss" scoped>
  .catalog.view {
    min-height: calc(100vh - (var(--height, 4.6rem) * 2));

    .view-body {
      .view-container {
        display: grid;
        gap: 1rem;
        max-width: unset;
        padding: 1rem;
        @media (min-width: 1024px) {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .filters.list {
          @media (min-width: 1024px) {
            display: grid;
            grid-column: span 4 / span 4;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1rem;

            .item {
              &:first-child {
                grid-column: span 2 / span 2;
              }
            }
          }
        }

        .cards.list {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          @media (min-width: 1024px) {
            grid-column: span 4 / span 4;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .pagination {
          @media (min-width: 1024px) {
            grid-column: span 2 / span 2;
            grid-column-start: 2;
          }
        }
      }
    }
  }
</style>