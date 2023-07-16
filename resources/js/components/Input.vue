<template>
  <label class="form-group"
    :class="{
      invalid: input.error,
    }">
    <div v-if="showLabel || label">
      {{ labelText }}:

      <span v-if="required"
        class="required">
        *
      </span>
    </div>

    <template v-if="component">
      <component class="input"
        :clearable="clearable"
        :closeOnSelect="closeOnSelect"
        :deselectFromDropdown="multiple"
        :disabled="disabled"
        :is="component"
        :multiple="multiple"
        :options="options"
        :placeholder="placeholder"
        :readonly="readonly"
        :searchable="searchable"
        :taggable="create"
        v-model="input.model"
        @blur="onBlur"
        @change="onChange"
        @close="onClose"
        @focus="onFocus"
        @input="onInput"
        @open="onOpen"
        @search:blur="onBlur"
        @search:focus="onFocus" />
    </template>

    <template v-else>
      <template v-if="type == 'textarea'">
        <textarea class="input"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          v-model="input.model"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput"></textarea>
      </template>

      <template v-else>
        <input class="input"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :type="type"
          v-model="input.model"
          @blur="onBlur"
          @focus="onFocus"
          @input="onInput" />
      </template>
    </template>

    <div v-if="input.error"
      class="error">
      {{ input.error }}
    </div>
  </label>
</template>

<script>
  import Select from "./inputs/Select.vue";

  export default {
    name: 'Input',
    components: {
      Select,
    },
    props: {
      clearable: {
        default: true,
        required: false,
      },
      closeOnSelect: {
        default: true,
        required: false,
      },
      create: {
        default: false,
        required: false,
      },
      disabled: {
        default: false,
        required: false,
      },
      input: {
        required: true,
      },
      label: {
        default: false,
        required: false,
      },
      multiple: {
        default: false,
        required: false,
      },
      options: {
        default () {
          return [
            // 
          ];
        },
        required: false,
      },
      placeholder: {
        default: false,
        required: false,
      },
      readonly: {
        default: false,
        required: false,
      },
      searchable: {
        default: true,
        required: false,
      },
      showLabel: {
        default: false,
        required: false,
      },
      type: {
        default: 'text',
        required: false,
        type: String,
      },
    },
    computed: {
      component () {
        switch (this.type) {
          case 'select':
            return 'Select';

          default:
            return false;
        }
      },
      labelText () {
        if (this.showLabel || this.label) {
          if (this.label)
            return this.label;

          if (this.placeholder)
            return this.placeholder;
        }

        return '';
      },
      required () {
        return this.input._requirements
          .some(requirement => requirement.name == 'required');
      },
      valid () {
        return !this.input.invalid;
      },
    },
    methods: {
      onBlur () {
        this.$emit('blur');

        this.input.validate();
      },
      onChange () {
        this.$emit('change');

        this.input.validate();
      },
      onClose () {
        this.$emit('close');
      },
      onFocus () {
        this.$emit('focus');
      },
      onInput () {
        this.$emit('input', this.input.model);
      },
      onOpen () {
        this.$emit('open');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form-group {
    display: grid;
    gap: 1rem;

    .required {
      color: var(--maroon, maroon);
    }

    .input {
      width: 100%;
      min-height: 3rem;
      padding: .5rem 1rem;
      background-color: var(--lightgrey, lightgrey);
      border-radius: .25rem;
      border: 2px solid var(--lightgrey, lightgrey);
      color: var(--black, black);
      font-family: var(--work-sans, sans-serif);
      &:focus {
        outline: none;
        border: 2px solid var(--maroon, maroon);
      }

      &::placeholder {
        color: var(--grey, grey);
        font-family: var(--work-sans, sans-serif);
      }
    }

    &.invalid {
      .input {
        border-color: var(--red, red);
      }
    }

    .error {
      color: var(--red, red);
    }
  }
</style>