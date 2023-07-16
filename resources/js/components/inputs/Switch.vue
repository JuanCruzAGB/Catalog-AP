<template>
  <div class="custom-input custom-input-switch"
    :class="{
      'use-default-css': useDefaultCss,
    }">
    <label class="switch">
      <input :disabled="disabled"
        type="checkbox"
        v-model="model" />

      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Switch',
    props: {
      disabled: {
        default: false,
        required: false,
      },
      useDefaultCss: {
        default: true,
        required: false,
      },
      value: {
        default: false,
        required: false,
        type: Boolean,
      },
    },
    model: {
      event: 'update',
    },
    data () {
      return {
        model: this.value,
      };
    },
    watch: {
      model () {
        this.$emit('update', this.model);
      },
      value () {
        this.model = this.value;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .custom-input-switch {
    &.use-default-css {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      .switch {
        position: relative;
        top: unset;
        display: block;
        width: 28px;
        height: 16px;
        margin: 0;

        input {
          display: none;
        }

        .slider {
          position: absolute;
          background-color: transparent;
          border: 1px solid #333333;
          border-radius: 100vh;
          cursor: pointer;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #49B170;
          border-color: #49B170;
        }
        input:disabled + .slider {
          background-color: #A3A3A3;
          border-color: #A3A3A3;
          cursor: not-allowed;
        }

        .slider::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          top: 50%;
          left: 2px;
          background-color: #333333;
          border-radius: 100vh;
          transform: translateY(-50%);
          transition: .4s;
        }
        input:checked + .slider::before {
          background-color: #FFFFFF;
          transform: translate(10px, -50%);
        }
        input:disabled + .slider::before {
          background-color: #FFFFFF;
        }
      }
    }
  }
</style>