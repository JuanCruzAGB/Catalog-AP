<template>
  <section class="banner"
    :style="{
      '--image': `url(${ _provided.images.banner })`,
    }">
    <figure>
      <img alt="Banner image"
        :src="_provided.images.banner" />
    </figure>

    <main class="banner-body">
      <section class="banner-container">
        <header class="banner-header">
          <h2 class="title">
            ¿Qué buscas?
          </h2>
        </header>

        <main class="banner-content">
          <p class="subtitle">
            En los negocios no se consigue lo que se merece, 

            <br v-if="isDesktop">

            se consigue lo que se negocia. Negocie con nosotros.
          </p>
        </main>
      </section>
    </main>
  </section>
</template>

<script>
  import { mapGetters, } from "vuex";

  export default {
    name: 'Banner',
    computed: {
      ...mapGetters([ 'isDesktop', ]),
    },
  };
</script>

<style lang="scss" scoped>
  .banner {
    figure {
      display: none;
    }

    .banner-body {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50vmin;
      isolation: isolate;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--image) no-repeat center center;
        background-size: cover;
        background-attachment: fixed;
        object-fit: cover;
        object-position: center;
        z-index: -1;
      }

      .banner-container {
        display: grid;
        justify-content: center;
        padding: 1rem;

        .banner-header {
          color: var(--light, white);
          text-align: center;
        }

        .banner-content {
          color: var(--light, white);
          text-align: center;
        }
      }
    }
  }
</style>