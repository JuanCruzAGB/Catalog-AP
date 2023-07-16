<template>
  <section class="catalog">
    <header>
      <h2>
        <RouterLink class="title"
          :to="{
            name: 'Catalog',
            query: {
              location: location.slug,
            },
          }">
          <i class="icon fa-solid fa-chevron-right"></i>

          {{ location.name }}
        </RouterLink>
      </h2>
    </header>

    <ul class="list cards">
      <li v-for="(property, key) in list"
        class="item"
        :key="key">
        <Card :data="property" />
      </li>
    </ul>
  </section>
</template>

<script>
  import Card from "../cards/Property.vue";

  export default {
    name: 'Catalog',
    components: {
      Card,
    },
    props: {
      location: {
        required: true,
      },
    },
    computed: {
      list () {
        return this.location.properties
          .filter(property => property.favorite);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .catalog {
    display: grid;
    gap: 1rem;

    header {
      margin-inline: var(--padding-inline, 1rem);
      padding-bottom: .5rem;
      border-bottom: 1px solid var(--grey, grey);

      .title {
        position: relative;
        color: var(--black, black);
        font-size: 1rem;
        transition: padding 500ms;
        &:hover {
          padding-left: 1.5rem;
          text-decoration: none;
        }

        .icon {
          position: absolute;
          top: 0;
          left: -1rem;
          color: transparent;
          transition: 500ms;
        }
        &:hover {
          .icon {
            left: 0;
            color: var(--maroon, maroon);
          }
        }
      }
    }

    .list {
      display: flex;
      gap: 1rem;
      width: 100%;
      overflow-x: scroll;
      padding-bottom: 1rem;
      @media (min-width: 1024px) {
        padding-inline: var(--padding-inline, 1rem);
      }

      .item {
        min-width: 100%;
        @media (min-width: 1024px) {
          min-width: 30%;
        }
      }
    }
  }
</style>