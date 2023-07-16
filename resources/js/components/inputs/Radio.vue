<template>
  <div class="custom-input custom-input-radio"
    :class="{
      checked: checked,
      disabled: disabled,
      'use-default-css': useDefaultCss,
    }">
    <label>
      <input :disabled="disabled"
        :name="name"
        type="radio"
        :value="option"
        v-model="checked"
        @change="change" />

      <slot name="icon">
        <span class="radio">
          <!--  -->
        </span>
      </slot>

      <span v-if="labelTxt || $slots.label"
        class="label">
        <slot name="label"
          v-bind="{ model, }">
          {{ labelTxt }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Radio',
    props: {
      disabled: {
        default: false,
        required: false,
      },
      label: {
        default: false,
        required: false,
      },
      name: {
        required: true,
        type: String,
      },
      option: {
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
      },
    },
    model: {
      event: 'update',
      prop: 'value',
    },
    data () {
      return {
        model: this.value,
      };
    },
    computed: {
      labelTxt () {
        if (typeof this.option == 'object') {
          if (this.option.label)
            return this.option.label;
        }

        return this.label;
      },
    },
    methods: {
      change () {
        this.model = this.option;
      },
      checkInput () {
        let checked = false;

        if (typeof this.option == 'object') {
          if (this.model.code == this.option.code)
            checked = true;
        }

        if (this.model == this.option)
          checked = true;

        this.checked = checked;
      },
    },
    beforeMount () {
      this.checkInput();
    },
    watch: {
      model () {
        let checked = false;

        if (typeof this.option == 'object') {
          if (this.model.code == this.option.code)
            checked = true;
        }

        if (this.model == this.option)
          checked = true;

        if (checked)
          this.$emit('update', this.model);
      },
      value () {
        this.model = this.value;

        this.checkInput();
      },
    },
  }
</script>

<style lang="scss" scoped>
  .custom-input {
    &.custom-input-radio {
      &.use-default-css {
        label {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;

          input {
            display: none;
          }

          .radio {
            position: relative;
            width: var(--aspect-ratio, 20px);
            min-width: var(--aspect-ratio, 20px);
            height: var(--aspect-ratio, 20px);
            background-color: transparent;
            border: 2px solid #333333;
            border-radius: 100vh;
            cursor: pointer;

            &::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 12px;
              aspect-ratio: 1 / 1;
              background-color: transparent;
              border-radius: 100vh;
              transform: translate(-50%, -50%);
            }
          }

          .label {
            display: inline;
            padding: 0;
            color: #333333;
            font-family: 'Work Sans';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 19px;
            cursor: pointer;
          }
        }
        &.checked {
          label {
            .radio {
              &::before {
                background-color: #333333;
              }
            }
          }
        }
        &.disabled {
          .radio {
            border-color: #D6D6D6;
          }

          &.checked {
            label {
              .radio {
                &::before {
                  background-color: #D6D6D6;
                }
              }
            }
          }
        }
      }
    }
  }
</style>