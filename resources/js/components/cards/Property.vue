<template>
  <Card class="property"
    :class="{
      skeleton,
    }"
    @click="click">
    <template v-slot:content>
      <div v-if="skeleton"
        class="empty image">
        <!--  -->
      </div>

      <template v-else>
        <figure>
          <img :alt="`${ data.name } image`"
            :src="_provided.images.property.sample" />
        </figure>

        <div class="hover">
          <i class="icon fa-solid fa-right-to-bracket"></i>
        </div>
      </template>
    </template>

    <template v-if="!skeleton"
      v-slot:footer>
      <span class="subtitle">
        {{ data.name }}
      </span>
    </template>
  </Card>
</template>

<script>
  import Card from "../Card.vue";

  export default {
    name: 'Property',
    components: {
      Card,
    },
    props: {
      data: {
        required: false,
      },
      skeleton: {
        default: false,
        required: false,
      },
    },
    methods: {
      click () {
        this.$router
          .push({
            name: 'Property',
            params: {
              slug: this.data.slug,
            },
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .property.card {
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      height: 50vmin;
      object-fit: cover;
      object-position: top center;
      @media (min-width: 1024px) {
        height: 25vh;
      }
    }

    @media (min-width: 1024px) {
      .subtitle {
        font-size: .9rem;
      }
    }

    .hover {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 50vmin;
      color: var(--maroon, maroon);
      font-size: 4rem;
      isolation: isolate;
      @media (min-width: 1024px) {
        height: 25vh;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50vmin;
        background-color: var(--light, white);
        opacity: 0;
        transition: 500ms;
        z-index: -1;
        @media (min-width: 1024px) {
          height: 25vh;
        }
      }

      .icon {
        opacity: 0;
        transition: 500ms;
      }
    }
    &:hover {
      .hover {
        &::before {
          opacity: .8;
        }

        .icon {
          animation: rotate 500ms normal forwards ease-in-out;
          opacity: 1;
        }
      }
    }

    &:not(.skeleton) {
      &::v-deep {
        .card-body {
          .card-container {
            .card-footer {
              min-height: 5rem;
              padding: 1rem;
              background-color: var(--maroon, maroon);
              color: var(--light, white);
              text-align: center;
            }
          }
        }
      }
    }

    @keyframes rotate {
      0% {
        opacity: 0;
        transform: rotate(0deg);
      }

      100% {
        opacity: 1;
        transform: rotate(360deg);
      }
    }

    &.skeleton {
      .empty {
        &.image {
          height: calc(50vmin + 5rem);
          @media (min-width: 1024px) {
            height: calc(25vh + 5rem);
          }
        }
      }
    }
  }
</style>