<template>
  <div class="custom-input custom-input-select"
    :class="{
      focus,
      selected: selected,
      'type-button': type == 'button',
      'type-dropdown': type == 'dropdown',
      'use-default-css': useDefaultCss,
    }">
    <slot name="dropdown">
      <v-select class="dropdown-input"
        :clearable="clearable"
        :closeOnSelect="closeOnSelect"
        :createOption="createOption"
        :deselectFromDropdown="multiple"
        :disabled="disableInput"
        :filter="filter"
        :multiple="multiple"
        :options="options"
        :placeholder="options.length ? placeholder : 'No hay opciones disponibles'"
        :pushTags="create"
        ref="select"
        :searchable="searchable"
        :taggable="canCreate"
        v-model="model"
        @close="closeDropdown"
        @input="onInput"
        @open="openDropdown"
        @option:created="onOptionCreated"
        @option:selecting="onOptionSelecting"
        @option:deselecting="onOptionDeselecting"
        @option:selected="onOptionSelected"
        @option:deselected="onOptionDeselected"
        @search="onSearch"
        @search:blur="onSearchBlur"
        @search:focus="onSearchFocus">
        <template v-slot:option="option">
          <slot v-if="multiple"
            name="option"
            v-bind="option">
            <div>
              <i class="icon fa-regular"
                :class="{
                  'fa-square-check': inside(option.label),
                  'fa-square': !inside(option.label),
                }">
              </i>

              <span>
                {{ option.label }}
              </span>
            </div>
          </slot>

          <slot v-else
            name="option"
            v-bind="option" />
        </template>

        <template v-slot:selected-option>
          <slot name="selected-option" />
        </template>

        <template v-slot:search="{ attributes, events, }">
          <slot name="search"
            v-bind="{ attributes, events, }">
            <input class="vs__search"
              :class="{
                placeholder: (!model || (multiple && !model.length)) && !focus,
                selected: (Array.isArray(model) && model.length) || model,
              }"
              :placeholder="text"
              v-bind="attributes"
              v-model="input"
              v-on="events" />
          </slot>
        </template>

        <template v-slot:no-options>
          <span class="no-options">
            <slot name="no-options">
              No hay resultados
            </slot>
          </span>
        </template>
      </v-select>
    </slot>

    <slot name="button">
      <button class="btn"
        :class="{
          selected: (Array.isArray(model) && model.length) || model,
        }"
        :disabled="disableInput"
        @click.prevent="openModal">
        <div class="vs__selected-options">
          {{ text }}
        </div>
      </button>
    </slot>

    <slot name="modal">
      <Modal class="modal-options"
        :closeButton="false"
        v-model="modal">
        <template v-slot:content>
          <ul>
            <li v-for="(option, key) of options"
              :key="key">
              <label class="option"
                :class="{
                  checked: inside(option),
                }">
                <input :checked="inside(option)"
                  name="option"
                  ref="options"
                  :type="multiple ? 'checkbox' : 'radio'"
                  :value="typeofmodel == 'object' ? option.code : option"
                  @change="change(option)" />

                <span>
                  {{ typeofmodel == 'object' ? option.label : option }}
                </span>
              </label>
            </li>
          </ul>
        </template>
      </Modal>
    </slot>
  </div>
</template>

<script>
  import vSelect from 'vue-select';
  import Modal from "../Modal.vue";

  export default {
    name: 'Select',
    components: {
      Modal,
      vSelect,
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
        type: Array,
      },
      placeholder: {
        default: 'Select',
        required: false,
        type: String,
      },
      regexp: {
        default () {
          return /(.)+/i;
        },
        required: false,
      },
      searchable: {
        default: true,
        required: false,
      },
      searchValue: {
        default: null,
        required: false,
      },
      template: {
        default: false,
        required: false,
      },
      type: {
        default: false,
        required: false,
      },
      useDefaultCss: {
        default: true,
        required: false,
      },
      value: {
        default: null,
        required: false,
      },
    },
    model: {
      prop: 'value',
      event: 'update',
    },
    data () {
      return {
        focus: false,
        input: this.searchValue,
        modal: false,
        model: this.value,
      };
    },
    computed: {
      canCreate () {
        if (this.create && this.input && this.regexp)
          if (this.input.match(this.regexp))
            return true;

        return false;
      },
      disableInput () {
        if (this.options.length == 1)
          if (this.inside(this.options[0]) && !this.create)
            return true;

        return this.disabled || (!this.options.length && !this.create);
      },
      selected () {
        if (this.multiple)
          return this.model && this.model.length;

        return this.model;
      },
      text () {
        if (this.model) {
          if (this.multiple) {
            if (this.typeofmodel == 'object') {
              if (Array.isArray(this.model) && this.model.length)
                return this.model
                  .map(item => {
                    return item.label;
                  })
                  .join(', ');
            } else {
              if (Array.isArray(this.model) && this.model.length)
                return this.model
                  .map(item => {
                    return item;
                  })
                  .join(', ');
            }
          } else {
            if (this.typeofmodel == 'object')
              return this.model.label;

            else
              return this.model;
          }
        }

        if (this.placeholder)
          return this.options.length
            ? this.placeholder
            : 'No hay opciones disponibles';

        return '';
      },
      typeofmodel () {
        return this.options && this.options.length
          ? typeof this.options[0]
          : 'string';
      },
    },
    methods: {
      change (option) {
        if (this.inside(option))
          this.deselect(option);

        else
          this.select(option);

        if (this.closeOnSelect)
          this.modal = false;
      },
      closeDropdown () {
        this.focus = false;

        this.$emit('close');
      },
      closeModal () {
        this.modal = false;
      },
      createOption (search) {
        if (this.typeofmodel == 'object') {
          let newOption = {
            // 
          };

          if (this.template)
            newOption = {
              ...this.template,
            };

          newOption.code = search;

          newOption.label = search;

          return newOption;
        }

        else
          return search;
      },
      deselect (option) {
        this.$refs.select.deselect(option);

        if (Array.isArray(this.model) && !this.model.length)
          this.model = null;
      },
      filter (options) {
        return options.filter(option => {
            if (this.input) {
              let code_regexp = new RegExp(`^${ this.input }`);

              let label_regexp = new RegExp(`${ this.input }`, 'i');

              if (this.typeofmodel == 'object')
                return option.label.match(label_regexp);

              return option.match(label_regexp);
            }

            return true;
          }).sort((a, b) => {
            if (this.typeofmodel == 'object') {
              if (a.tier > b.tier)
                return -1;

              if (a.tier < b.tier)
                return 1;

              if (a.label > b.label)
                return 1;

              if (a.label < b.label)
                return -1;
            } else {
              if (a > b)
                return 1;

              if (a < b)
                return -1;
            }

            return 0;
          });
      },
      inside (option) {
        if (this.multiple) {
          if (Array.isArray(this.model) && this.model.length)
            for (const item of this.model) {
              switch (this.typeofmodel) {
                case 'object':
                  if (item.code == option.code)
                    return true;

                case 'string':
                default:
                  if (item == option)
                    return true;
              }
            }
        } else if (this.model) {
          if (this.typeofmodel == 'object')
            return this.model.code == option.code;

          else
            return this.model == option;
        }

        return false;
      },
      openDropdown () {
        this.focus = true;

        this.$emit('open');
      },
      openModal () {
        this.modal = true;
      },
      select (option) {
        this.$refs.select.select(option);
      },
      onInput (value) {
        this.$emit('input', value);
      },
      onOptionCreated (option) {
        this.$emit('option:created', option);
      },
      onOptionDeselected (option) {
        this.$emit('option:deselected', option);
      },
      onOptionDeselecting (option) {
        this.$emit('option:deselecting', option);
      },
      onOptionSelected (option) {
        this.$emit('option:selected', option);
      },
      onOptionSelecting (option) {
        this.input = null;

        this.$emit('option:selecting', option);
      },
      onSearch (input) {
        this.$emit('search', this.input);
      },
      onSearchBlur () {
        this.focus = false;

        this.$emit('search:blur');
      },
      onSearchFocus () {
        this.$emit('search:focus');
      },
    },
    beforeMount () {
      if (this.options.length == 1 && !this.create) {
        if (this.multiple)
          this.model = [this.options[0]];

        else
          this.model = this.options[0];
      }
    },
    watch: {
      model () {
        this.$emit('update', this.model);
      },
      value () {
        this.model = this.value;
      },
      input () {
        this.$emit('update:search', this.input);
      },
      searchValue () {
        this.input = this.searchValue;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .custom-input-select {
    &.type-dropdown {
      .btn {
        display: none;
      }
    }

    &:not(.type-button) {
      @media (min-width: 1024px) {
        .btn {
          display: none;
        }
      }
    }

    &:not(.type-dropdown) {
      .dropdown-input {
        display: none;
      }

      &:not(.type-button) {
        @media (min-width: 1024px) {
          .dropdown-input {
            display: block;
          }
        }
      }
    }

    &.use-default-css {
      .btn {
        display: flex;
        align-items: center;
        width: 100%;
        height: calc(3rem - 4px);
        padding: 0;
        background-color: var(--lightgrey, lightgrey);
        border: 2px solid var(--lightgrey, lightgrey);
        color: var(--black, black);
        &.selected {
          color: var(--black, black);
        }

        .vs__selected-options {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 0.5rem 1rem;
          text-align: left;
        }

        &::after {
          content: "\f077";
          // position: absolute;
          // top: 0;
          // right: 5%;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          // height: 100%;
          padding: .5rem 1rem;
          // color: var(--black, black);
          font-family: "Font Awesome 6 Free";
          font-size: 1rem;
          font-weight: 900;
        }

        &:disabled {
          background-color: var(--grey, grey);
          border-color: var(--grey, grey);
          cursor: not-allowed;
        }
      }

      &.type-dropdown {
        .btn {
          display: none;
        }
      }

      &:not(.type-button) {
        @media (min-width: 1024px) {
          .btn {
            display: none;
          }
        }
      }

      .dropdown-input {
        position: relative;
        display: block;
        background-color: var(--lightgrey, lightgrey);
        border: 2px solid var(--lightgrey, lightgrey);
        border-radius: .25rem;
        // font-family: var(--work-sans, sans-serif);
        // cursor: pointer;

        &.focus {
          border-color: var(--maroon, maroon);
        }

        label {
        color: red;
          // margin-bottom: 0px;
        }

        .icon {
        color: red;
          // color: var(--black, black);
          // cursor: pointer;
        }

        &::v-deep {
          .vs__dropdown-toggle {
            display: flex;
            min-height: calc(3rem - 4px);

            .vs__selected-options {
              display: flex;
              width: 100%;
              padding: .5rem 1rem;

              .vs__selected {
                position: absolute;
                top: calc(0.5rem + 2px);
                left: 1rem;
                color: var(--black, black);
              }

              input {
                width: 100%;
                background: transparent;
                color: var(--black, black);

                &.placeholder {
                  color: var(--grey, grey);
                }

                &::placeholder {
                  color: var(--grey, grey);
                }

                &:focus {
                  outline: none;
                }
              }
            }

            .vs__actions {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: .5rem 1rem;

              &::before {
                content: "\f077";
                background-color: var(--lightgrey, lightgrey);
                color: var(--black, black);
                font-family: "Font Awesome 6 Free";
                font-size: 1rem;
                font-weight: 900;
              }

              .vs__clear {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background-color: var(--lightgrey, lightgrey);

                &::before {
                  content: "\f00d";
                  color: var(--black, black);
                  font-family: "Font Awesome 6 Free";
                  font-size: 1rem;
                  font-weight: 900;
                }
              }

              svg {
                display: none;
              }
            }
          }

          .vs__dropdown-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            display: grid;
            width: auto;
            min-width: 100%;
            max-height: 280px;
            border-bottom-left-radius: .25rem;
            border-bottom-right-radius: .25rem;
            transform: translateX(-50%);
            background-color: var(--lightgrey, lightgrey);
            overflow-y: auto;
            z-index: 1;

            .vs__dropdown-option {
              padding: .5rem 1rem;
              color: var(--black, black);
              cursor: pointer;
              &:not(:last-child) {
                border-bottom: 2px solid var(--grey, grey);
              }

              &.vs__dropdown-option--highlight {
                background-color: var(--grey, grey);
                color: var(--black, black);
              }

              &.vs__dropdown-option--selected {
                background-color: var(--grey, grey);
              }
            }

            .vs__no-options {
              padding: .5rem 1rem;
              color: var(--black, black);
            }
          }
        }

        &.vs--disabled {
          background-color: var(--grey, grey);
          border-color: var(--grey, grey);
          cursor: not-allowed;

          &::v-deep {
            .vs__dropdown-toggle {
              .vs__selected-options {
                input {
                  cursor: not-allowed;

                  &.placeholder {
                    color: var(--black, black);
                  }

                  &::placeholder {
                    color: var(--black, black);
                  }
                }
              }

              .vs__actions {
                &::before {
                  background-color: var(--grey, grey);
                }

                .vs__clear {
                  background-color: var(--grey, grey);
                }
              }
            }
          }
        }

        &:not(.vs--single) {
        color: red;
          &::v-deep {
            .vs__dropdown-toggle {
        color: red;
              .vs__selected-options {
        color: red;
                .vs__selected {
        color: red;
                  // display: none;
                }
              }
            }
          }
        }

        &.vs--open {
          &::v-deep {
            .vs__dropdown-toggle {
              .vs__selected-options {
                .vs__selected {
                  color: transparent;
                }
              }

              .vs__actions {
                &::before {
                  content: "\f078";
                }
              }
            }
          }
        }

        &.vs--multiple {
        color: red;
          &::v-deep {
            .vs__dropdown-menu {
        color: red;
              .vs__dropdown-option {
        color: red;
                // cursor: pointer;

                label {
        color: red;
                  // cursor: pointer;
                }
              }
            }
          }

          &:not(.vs--open) {
            &::v-deep {
              .vs__dropdown-toggle {
                .vs__selected-options {
                  input {
                    &.selected {
                      color: transparent;
                    }
                  }
                }
              }
            }
          }
        }
      }
      &:not(.type-dropdown) {
        .dropdown-input {
          display: none;
        }

        &:not(.type-button) {
          @media (min-width: 1024px) {
            .dropdown-input {
              display: block;
            }
          }
        }
      }

      .modal-options {
        ul {
          display: grid;
          padding: 0;
          list-style: none;

          li {
            display: grid;
            &:not(:last-child) {
              border-bottom: 2px solid var(--lightgrey, lightgrey);
            }

            .option {
              margin: 0;
              padding: .5rem 1rem;
              color: var(--black, black);
              font-family: var(--work-sans, sans-serif);
              font-style: normal;
              font-size: 14px;
              font-weight: 500;
              line-height: 19px;
              cursor: pointer;
              &.checked {
                background-color: var(--lightgrey, lightgrey);
              }
              &:hover {
                background-color: var(--grey, grey);
              }

              input {
                display: none;
              }
            }

            &:first-child {
              .option {
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
              }
            }

            &:last-child {
              .option {
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
              }
            }
          }
        }

        &::v-deep {
          .modal-body {
            padding: 0;
          }
        }
      }
    }
  }
</style>