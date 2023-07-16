<template>
  <div class="custom-input custom-input-checkbox"
    :class="{
      checked: checked,
      disabled: disabled,
      'use-default-css': useDefaultCss,
    }">
    <label>
      <input :disabled="disabled"
        type="checkbox"
        v-model="checked"
        @change="change" />

      <slot name="icon">
        <span class="checkbox">
          <span class="check material-icons-outlined">
            check
          </span>
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
    name: 'Checkbox',
    props: {
      disabled: {
        default: false,
        required: false,
      },
      label: {
        default: false,
        required: false,
      },
      multiple: {
        default: true,
        required: false,
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
        checked: false,
        model: this.value,
      };
    },
    computed: {
      labelTxt () {
        if (typeof this.option == 'object')
          if (this.option.label)
            return this.option.label;

        return this.label;
      },
    },
    methods: {
      change (event) {
        if (event.target.checked)
          this.check();

        else
          this.uncheck();
      },
      check () {
        if(this.multiple){
          if (!this.model)
            this.model = [];

          this.model.push(this.option);
        }else{
          this.model = this.option;
        }
      },
      checkInput () {
        let checked = false;

        if (this.multiple) {
          if (this.model && this.model.length) {
            let codes = this.model
              .map(option => typeof option == 'object'
                ? option.code
                : option);

            if (codes.includes(typeof this.option == 'object'
              ? this.option.code
              : this.option))
              checked = true;
          }
        }

        else if (this.model == this.option)
          checked = true;

        this.checked = checked;
      },
      uncheck () {
        if(this.multiple){
          if (this.model) {
            this.model = this.model
              .filter(option => typeof this.option == 'object'
                ? option.code != this.option.code
                : option != this.option);

            if (!this.model.length)
              this.model = null;
          }
        }

        else
          this.model = null;
      },
    },
    beforeMount () {
      this.checkInput();
    },
    watch: {
      model () {
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
    &.custom-input-checkbox {
      &.use-default-css {
        label {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;

          input {
            display: none;
          }

          .checkbox {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--aspect-ratio, 20px);
            height: var(--aspect-ratio, 20px);
            background-color: transparent;
            border: 2px solid #333333;
            border-radius: 2px;
            cursor: pointer;

            .check {
              display: none;
              color: #333333;
              font-size: 16px;
              font-weight: bolder;
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
            .checkbox {
              .check {
                display: inline;
              }
            }
          }
        }
        &.disabled {
          .checkbox {
            border-color: #D6D6D6;
          }

          &.checked {
            label {
              .checkbox {
                .check {
                  color: #D6D6D6;
                }
              }
            }
          }
        }
      }
    }
  }
</style>