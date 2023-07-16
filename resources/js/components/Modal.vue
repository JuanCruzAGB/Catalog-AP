<template>
  <div class="modal"
    :class="{
      opened: modal,
      'outside-click': outsideClick,
      'use-default-css': useDefaultCss,
    }"
    @click="click">
    <div class="modal-body">
      <i v-if="closeButton"
        class="icon close fa-regular fa-times"
        @click="close"></i>

      <div class="modal-container grid">
        <div v-if="$slots.header"
          class="modal-header">
          <slot name="header" />
        </div>

        <div class="modal-content">
          <slot name="content" />

          <slot />
        </div>

        <div v-if="$slots.footer"
          class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>

    <div v-if="$slots.extra"
      class="modal-extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      closeButton: {
        default: true,
        required: false,
      },
      open: {
        default: false,
        required: false,
      },
      outsideClick: {
        default: true,
        required: false,
      },
      useDefaultCss: {
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
        modal: this.open,
      };
    },
    methods: {
      click (event) {
        if (this.outsideClick)
          if (event.target.classList.contains('modal'))
            this.close();
      },
      close () {
        this.modal = false;
      },
    },
    watch: {
      modal () {
        if (!this.modal)
          this.$emit('close', false);
      },
      open () {
        this.modal = this.open;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    &.opened {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      padding: 15px;
      overflow: auto;
    }
    &.outside-click {
      background: var(--modal-outside-color, rgba(51, 51, 51, 0.4));
      cursor: pointer;

      .modal-body {
        cursor: default;
      }
    }
    &:not(.outside-click) {
      pointer-events: none;
    }

    .modal-body {
      .modal-container {
        .modal-header {
          padding: 0;
          border: none;
        }

        .modal-content {
          top: unset;
          padding: 0;
          background-color: unset;
          border: unset;
          box-shadow: unset;
          overflow: hidden;
          overflow-y: auto;
        }

        .modal-footer {
          padding: 0;
          border: none;
          text-align: unset;
        }
      }
    }

    .modal-extra {
      width: 100%;
    }
    @media (min-width: 1024px) {
      .modal-extra {
        width: fit-content;
      }
    }

    &.use-default-css {
      width: 100%;
      height: 100%;
      overflow: auto;

      .modal-body {
        max-height: 100%;
        padding: 45px;
        background-color: var(--modal-body-background-color, #FFFFFF);
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        pointer-events: all;
        z-index: 3;
        @media (min-width: 1024px) {
          max-width: 80%;
        }

        .close {
          position: absolute;
          top: 28px;
          left: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6D6D6D;
          font-size: 24px;
          font-weight: normal;
          opacity: 1;
          z-index: 1;
          @media (min-width: 1024px) {
            left: unset;
            right: 28px;
          }
        }
      }
      &.opened {
        .modal-body {
          display: flex;

          .modal-container {
            display: grid;
            width: 100%;
          }
        }
      }
    }
  }
</style>