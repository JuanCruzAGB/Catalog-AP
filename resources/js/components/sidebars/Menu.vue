<template>
  <Sidebar class="sidebar-menu"
    v-model="sidebar">
    <template v-slot:header>
      <Logo />
    </template>

    <template v-slot:content>
      <Links />
    </template>
  </Sidebar>
</template>

<script>
  import Links from "../Links.vue";
  import Logo from "../Logo.vue";
  import Sidebar from "../Sidebar.vue";

  export default {
    name: 'Menu',
    components: {
      Links,
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
    methods: {
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
  .sidebar-menu {
    .logo {
      width: 33%;
    }

    &::v-deep {
      .sidebar-body {
        .sidebar-container {
          .sidebar-header {
            margin-inline: var(--padding-inline, 1rem);
            padding-inline: 0;
            border-bottom: 1px solid var(--lightgrey, lightgrey);
          }

          .sidebar-content {
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
          }
        }
      }
    }
  }
</style>