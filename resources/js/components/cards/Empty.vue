<template>
  <Card class="empty">
    <template v-slot:content>
      <figure>
        <img alt="Empty image"
          :src="_provided.images.sample" />
      </figure>
    </template>

    <template v-slot:footer>
      <span class="text">
        <slot name="text" />
      </span>
    </template>
  </Card>
</template>

<script>
  import Card from "../Card.vue";

  export default {
    name: 'Empty',
    components: {
      Card,
    },
  };
</script>

<style lang="scss" scoped>
  .empty.card {
    position: relative;
    cursor: default;

    &:hover {
      text-decoration: none;
    }

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
      .text {
        font-size: .9rem;
      }
    }

    &::v-deep {
      .card-body {
        .card-container {
          .card-footer {
            min-height: 5rem;
            padding: 1rem;
            background-color: var(--grey, grey);
            color: var(--light, white);
            text-align: center;
          }
        }
      }
    }
  }
</style>