<template>
  <section class="sidebar"
    :class="{
      left: position == 'left',
      opened: sidebar,
      'outside-click': outsideClick,
      right: position == 'right',
    }"
    :style="{
      '--width': width,
    }"
    @click="clickOutside">
    <div class="sidebar-body">
      <slot name="body">
        <button v-if="showCloseButton"
          class="sidebar-button close"
          @click.prevent="close">
          <i class="fa-solid fa-times"></i>
        </button>

        <div class="sidebar-container">
          <slot name="container">
            <header v-if="$slots.header"
              class="sidebar-header">
              <slot name="header" />
            </header>

            <main v-if="$slots.content"
              class="sidebar-content">
              <slot name="content" />
            </main>

            <footer v-if="$slots.footer"
              class="sidebar-footer">
              <slot name="footer" />
            </footer>
          </slot>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: {
      open: {
        default: false,
        required: false,
      },
      outsideClick: {
        default: true,
        required: false,
      },
      position: {
        default: 'left',
        required: false,
        type: String,
      },
      showCloseButton: {
        default: true,
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
        width: `${ window.innerWidth }px`,
      };
    },
    methods: {
      close () {
        this.sidebar = false;
      },
      clickOutside (event) {
        if (this.outsideClick)
          if (event.target.classList.contains('sidebar'))
            this.close();
      },
      resize () {
        this.width = `${ window.innerWidth }px`;
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
    beforeMount () {
      this.resize();

      window.addEventListener('resize', () => {
        this.resize();
      });
    },
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 0px;
    height: 100%;
    transition: 500ms;
    z-index: 3;
    &.left {
      justify-content: flex-start;

      .sidebar-body {
        .sidebar-button {
          right: var(--padding-inline, 0);
        }
      }
    }
    &.right {
      justify-content: flex-end;

      .sidebar-body {
        .sidebar-button {
          left: var(--padding-inline, 0);
        }
      }
    }
    &.opened {
      width: var(--width, 100%);

      &.outside-click {
        &::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .5);
          z-index: 2;
        }
      }
    }

    .sidebar-body {
      position: relative;
      width: 75%;
      height: 100%;
      overflow: auto;
      background-color: var(--light, white);
      box-shadow: 0 0 15px rgba(0, 0, 0, .5);
      z-index: 3;

      .sidebar-button {
        position: absolute;
        top: var(--padding-inline, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--lightgrey, lightgrey);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 3;
      }

      .sidebar-container {
        display: grid;

        .sidebar-header {
          position: sticky;
          top: 0;
          height: var(--height, 4.6rem);
          padding-inline: var(--padding-inline, 1rem);
          background-color: var(--light, white);
        }

        .sidebar-content {
          padding-inline: var(--padding-inline, 1rem);
        }

        .sidebar-footer {
          position: sticky;
          bottom: 0;
          height: var(--height, 4.6rem);
          padding-inline: var(--padding-inline, 1rem);
          background-color: var(--light, white);
        }
      }
    }
  }
</style>