<template>
  <header>
    <nav class="nav">
      <button v-if="!isDesktop"
        class="sidebar-button open"
        @click.prevent="open('MenuSidebar')">
        <i class="fa-solid fa-bars"></i>
      </button>

      <Logo />

      <button v-if="!isDesktop && isCatalog"
        class="sidebar-button open"
        @click.prevent="open('FilterSidebar')">
        <i class="fa-solid fa-filter"></i>
      </button>

      <Links v-if="isDesktop" />
    </nav>

    <component v-if="!isDesktop"
      :is="sidebar"
      v-model="sidebar" />
  </header>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Links from "./Links.vue";
  import Logo from "./Logo.vue";
  import FilterSidebar from "./sidebars/Filter.vue";
  import MenuSidebar from "./sidebars/Menu.vue";

  export default {
    name: 'Header',
    components: {
      Links,
      Logo,
      FilterSidebar,
      MenuSidebar,
    },
    data () {
      return {
        sidebar: false,
      };
    },
    computed: {
      ...mapGetters([ 'isDesktop', ]),
      isCatalog () {
        return this.$route.name == 'Catalog';
      },
    },
    methods: {
      ...mapActions([ 'filter', ]),
      open (component) {
        this.sidebar = component;
      },
    },
  }
</script>

<style lang="scss" scoped>
  header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 var(--padding-inline, 1rem);
    background-color: var(--light, white);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
    z-index: 2;

    .nav {
      display: flex;
      align-items: center;
      width: 100%;
      @media (min-width: 1024px) {
        justify-content: space-between;
      }

      .sidebar-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15%;
        color: var(--lightgrey, lightgrey);
        font-size: 1.2rem;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }

      .logo {
        width: 70%;
        @media (min-width: 1024px) {
          width: fit-content;
        }
      }
    }
  }
</style>