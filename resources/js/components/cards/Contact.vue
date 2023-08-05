<template>
  <Card class="contact">
    <template v-slot:header>
      <h4 class="title">
        <span class="maroon">Información</span> de contacto
      </h4>
    </template>

    <template v-slot:content>
      <ul class="list">
        <li class="item">
          Juan Manuel Armentia
        </li>

        <li class="item">
          {{ contact.address }}
        </li>

        <li class="item">
          <a :href="`mailto:${ contact.email }`">
            <i class="icon fa-solid fa-envelope"></i>

            {{ contact.email }}
          </a>
        </li>

        <li class="item">
          <a :href="`tel:+${ contact.phone }`">
            <i class="icon fa-solid fa-phone"></i>

            + {{ contact.phone }}
          </a>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Card from "../Card.vue";

  export default {
    name: 'Contact',
    components: {
      Card,
    },
    computed: {
      ...mapGetters([ 'contact', ]),
    },
    methods: {
      ...mapActions([ 'getContact', ]),
    },
    async beforeMount () {
      await this.getContact();
    },
  }
</script>

<style lang="scss" scoped>
  .contact.card {
    cursor: default;
    &:hover {
      text-decoration: none;
    }
    @media (min-width: 1024px) {
      position: sticky;
      top: calc(var(--height, 4.6rem) + 32px);
    }

    .title {
      padding-bottom: .5rem;
      padding-inline: 1rem;
      color: var(--grey, grey);
      font-size: 1rem;
      text-align: center;
    }

    .list {
      display: grid;
      gap: 1rem;

      .item {
        color: var(--black, black);

        a {
          color: var(--black, black);

          .icon {
            color: var(--maroon, maroon);
          }
        }
      }
    }

    &::v-deep {
      .card-body {
        .card-container {
          gap: 1rem;
          padding: 1rem;
          background-color: var(--light, #FFFFFF);
          border-radius: .25rem;

          .card-header {
            border-bottom: 1px solid var(--grey, grye);
          }
        }
      }
    }
  }
</style>