<template>
  <section class="index layout">
    <Header />

    <FloatMenu v-if="showFlags">
      <ul class="list grid gap-2">
        <li class="item">
          <AuthFlag />
        </li>

        <li class="item">
          <EnvFlag />
        </li>
      </ul>
    </FloatMenu>

    <RouterView />

    <Footer />
  </section>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Footer from "../Footer.vue";
  import Header from "../Header.vue";
  import AuthFlag from "../flags/Auth.vue";
  import EnvFlag from "../flags/Env.vue";
  import FloatMenu from "../menus/Float.vue";

  export default {
    name: 'Index',
    components: {
      AuthFlag,
      EnvFlag,
      FloatMenu,
      Footer,
      Header,
    },
    computed: {
      ...mapGetters([ 'env', ]),
      showFlags () {
        return [ 'development', 'local' ].includes(this.env);
      },
    },
    methods: {
      ...mapActions([ 'getContact', ]),
    },
    beforeMount () {
      this.getContact();
    },
  }
</script>

<style lang="scss" scoped>
  .index.layout {
    .float.menu {
      top: var(--height, 0);
      padding: .5rem 0;
      z-index: 2;
      @media (min-width: 1024px) {
        top: var(--height, 0);
      }
    }

    .view {
      background-color: var(--white, white);
    }
  }
</style>