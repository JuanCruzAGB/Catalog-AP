<template>
  <Sidebar class="sidebar-filter"
    position="right"
    v-model="sidebar">
    <template v-slot:header>
      <Logo />
    </template>

    <template v-slot:content>
      <ul class="list">
        <li class="item">
          <Select :disabled="loading"
            :options="categoriesOptions"
            placeholder="Tipo de propiedad"
            v-model="filters.id_category.model"
            @update="filter" />
        </li>

        <li class="item">
          <Select :disabled="loading"
            :options="locationsOptions"
            placeholder="Ubicación"
            v-model="filters.id_location.model"
            @update="filter" />
        </li>
      </ul>
    </template>
  </Sidebar>
</template>

<script>
  import { mapActions, mapGetters, } from "vuex";

  import Logo from "../Logo.vue";
  import Sidebar from "../Sidebar.vue";
  import Select from "../inputs/Select.vue";

  export default {
    name: 'Filter',
    components: {
      Select,
      Logo,
      Sidebar,
    },
    props: {
      open: {
        default: false,
        required: false,
      },
    },
    model: {
      event: 'close',
      prop: 'open',
    },
    data () {
      return {
        sidebar: this.open,
      };
    },
    computed: {
      ...mapGetters([ 'categoriesOptions', 'filters', 'loading', 'locationsOptions', ]),
    },
    methods: {
      ...mapActions([ 'filter', ]),
      close () {
        this.sidebar = false;
      },
    },
    watch: {
      open () {
        this.sidebar = this.open;
      },
      sidebar () {
        if (!this.sidebar) {
          this.$emit('close', false);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .sidebar-filter {
    .logo {
      width: 33%;
    }

    .list {
      .item {
        padding-top: var(--padding-inline, 1rem);
        &:not(:first-child) {
          border-top: 1px solid var(--lightgrey, lightgrey);
        }
        &:last-child {
          padding-bottom: calc(var(--padding-inline, 1rem) * 2);
        }
      }
    }


    &::v-deep {
      .sidebar-body {
        .sidebar-container {
          .sidebar-header {
            display: flex;
            justify-content: flex-end;
            margin-inline: var(--padding-inline, 1rem);
            padding-inline: 0;
            border-bottom: 1px solid var(--lightgrey, lightgrey);
          }
        }
      }
    }
  }
</style>