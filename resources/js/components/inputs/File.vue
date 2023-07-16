<template>
  <div :class="{
      disabled: disabled,
      selected: model,
      'use-default-css': useDefaultCss,
    }"
    class="custom-input custom-input-file">
    <label>
      <input :accept="types"
        :disabled="disabled"
        @change="change"
        type="file" />

      <slot name="input">
        <span class="input">
          Seleccionar archivo
        </span>
      </slot>

      <span v-if="label || $slots.label"
        class="label">
        <slot name="label"
          v-bind="{ model, }">
          {{ txt }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'File',
    props: {
      accepts: {
        default () {
          return [
            // 
          ];
        },
        required: false,
      },
      disabled: {
        default: false,
        required: false,
      },
      label: {
        default: "Ningún archivo seleccionado",
        required: false,
      },
      preview: {
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
      txt () {
        if (this.model) {
          let names = [];

          for (let index = 0; index < this.model.length; index++)
            names.push(this.model[index].name);

          return names.join(", ");
        }

        return this.label;
      },
      types () {
        return typeof this.accepts == 'object'
            ? this.accepts.join(', ')
            : this.accepts;
      },
    },
    methods: {
      change (event) {
        this.model = event.target.files;

        if (!this.model.length)
          this.model = null;

        else if (this.preview)
          this.model.map(file => {
            console.log(URL.createObjectURL(file));
          });
      },
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
  .custom-input {
    &.custom-input-file {
      label {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        input {
          display: none;
        }

        .input {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 33px;
          padding: 7px 12px;
          background-color: transparent;
          border: 1px solid #A3A3A3;
          color: #A3A3A3;
          font-family: 'Work Sans';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 19px;
          text-align: center;
        }

        .label {
          display: inline;
          padding: 0;
          color: #333333;
          font-family: 'Work Sans';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 19px;
          cursor: pointer;
        }
      }

      &:hover {
        label {
          .input {
            background-color: #F5F5F5;
          }
        }
      }
      &.selected {
        label {
          .input {
            border-color: #333333;
            color: #333333;
          }
        }
      }
    }
  }
</style>