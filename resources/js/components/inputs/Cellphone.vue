<template>
  <div class="custom-input custom-input-cellphone">
    <CustomCountry :clearable="clearable"
      :closeOnSelect="closeOnSelect"
      :disabled="disabled"
      :searchable="searchable"
      :useDefaultCss="useDefaultCss"
      v-model="countryModel"
      @close="onDropdownClose"
      @open="onDropdownOpen"
      @option:created="onOptionCreated"
      @option:selecting="onOptionSelecting"
      @option:deselecting="onOptionDeselecting"
      @option:selected="onOptionSelected"
      @option:deselected="onOptionDeselected" />

    <input placeholder="341454545"
      type="text"
      v-model="cellphoneModel"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus" />
  </div>
</template>

<script>
  import CustomCountry from "./Country.vue";

  export default {
    name: "Cellphone",
    components: {
      CustomCountry,
    },
    props: {
      cellphone: {
        default: null,
        required: false,
      },
      clearable: {
        default: false,
        required: false,
      },
      closeOnSelect: {
        default: true,
        required: false,
      },
      country: {
        default () {
          return null;
        },
        required: false,
      },
      create: {
        default: true,
        required: false,
      },
      disabled: {
        default: false,
        required: false,
      },
      placeholder: {
        default: '341454545',
        required: false,
      },
      searchable: {
        default: true,
        required: false,
      },
      useDefaultCss: {
        default: true,
        required: false,
      },
    },
    data () {
      return {
        cellphoneModel: this.cellphone ?? null,
        countryModel: this.country ?? null,
      };
    },
    methods: {
      onBlur () {
        this.$emit('blur');
      },
      onDropdownClose () {
        this.$emit('dropdown:close');
      },
      onFocus () {
        this.$emit('focus');
      },
      onInput () {
        this.$emit('input', this.cellphone);
      },
      onDropdownOpen () {
        this.$emit('dropdown:open');
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
        this.$emit('option:selecting', option);
      },
    },
    watch: {
      cellphone () {
        this.cellphoneModel = this.cellphone;
      },
      cellphoneModel () {
        this.$emit('cellphone:update', this.cellphoneModel);
      },
      country () {
        this.countryModel = this.country;
      },
      countryModel () {
        this.$emit('country:update', this.countryModel);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-input-cellphone.custom-input {
    display: flex;

    .custom-input-country {
      width: 68px;

      &::v-deep {
        .dropdown-input {
          .vs__dropdown-toggle {
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }
    }

    input {
      position: relative;
      width: 100%;
      height: 42px;
      padding: 0;
      background-color: #FFFFFF;
      border: 1px solid #6D6D6D;
      border-left: none;
      border-top-right-radius: 5px;
      border-top-left-radius: 0;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 0;
      font-family: "Work Sans";
      font-size: 14px;
      line-height: 20px;

      &:focus {
        outline: none;
      }
    }
  }
</style>