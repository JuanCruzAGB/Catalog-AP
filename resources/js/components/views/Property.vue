<template>
  <div class="property view"
    :class="{
      skeleton: loading,
    }">
    <div class="view-body">
      <div class="view-container">
        <header class="view-header">
          <h2 class="title"
            :class="{
              empty: loading,
            }">
            <template v-if="!loading">
              {{ property.name }}
            </template>
          </h2>
        </header>

        <Gallery :skeleton="loading" />

        <main class="view-content">
          <div>
            <ul class="categories"
              :class="{
                empty: loading,
              }">
              <template v-if="!loading">
                <li v-for="(category, key) in property.categories"
                  class="item"
                  :key="key">
                  {{ category.name }}
                </li>
              </template>
            </ul>

            <div class="location"
              :class="{
                empty: loading,
              }">
              <template v-if="!loading">
                {{ property.location.name }}
              </template>
            </div>

            <div class="description"
              :class="{
                empty: loading,
              }">
              <template v-if="!loading">
                {{ property.description }}
              </template>
            </div>
          </div>
        </main>
      </div>

      <SearchBar />

      <QueryForm :property="property" />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Gallery from "../Gallery.vue";
  import SearchBar from "../SearchBar.vue";
  import QueryForm from "../forms/Query.vue";

  export default {
    name: 'Property',
    components: {
      QueryForm,
      Gallery,
      SearchBar,
    },
    computed: {
      ...mapGetters([ 'isDesktop', 'loading', 'property', ]),
    },
    methods: {
      ...mapActions([ 'getProperty', ]),
    },
    async beforeMount () {
      await this.getProperty(this.$route.params.slug);
    },
  }
</script>

<style lang="scss" scoped>
  .property.view {
    .view-body {
      display: grid;
      gap: 2rem;

      .view-container {
        display: grid;
        gap: 2rem;
        max-width: unset;
        padding-top: 2rem;
        @media (min-width: 1024px) {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          padding-inline: var(--padding-inline, 1rem);
        }

        .view-header {
          padding-inline: 1rem;
          @media (min-width: 1024px) {
            grid-column: span 3 / span 3;
            padding-inline: unset;
          }

          .title {
            &:not(.empty) {
              border-bottom: 1px solid var(--black, #000000);
            }
          }
        }

        @media (min-width: 1024px) {
          .gallery {
            grid-column: span 2 / span 2;
          }
        }

        .view-content {
          > div {
            display: grid;
            gap: 1rem;
            padding-inline: 1rem;

            @media (min-width: 1024px) {
              padding-inline: unset;
            }

            .categories {
              color: var(--maroon, maroon);
              font-family: var(--monterey, sans-serif);
              font-weight: bold;
              text-transform: uppercase;
            }

            .location {
              color: var(--grey, grey);
              font-family: var(--monterey, sans-serif);
              font-weight: bold;
              text-transform: uppercase;
            }
          }
        }
      }
    }

    &.skeleton {
      .empty {
        &.description {
          height: 75px;
        }
      }
    }
  }
</style>