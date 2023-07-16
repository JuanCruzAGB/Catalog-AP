<template>
  <div class="custom-input-search custom-input"
    :class="{
      focus,
    }">
    <input :disabled="disabled"
      v-model="input.model"
      placeholder="Buscar..."
      @blur="onBlur"
      @focus="onFocus"
      @keyup="onKeyUp" />

    <button class="btn btn-icon btn-solid btn-lightgrey"
      @click.prevent="submit">
      <i class="icon fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>

<script>
  import Input from "../Input.vue";

  export default {
    name: 'Search',
    components: {
      Input,
    },
    props: {
      disabled: {
        default: false,
        required: false,
      },
      input: {
        required: true,
      },
    },
    data () {
      return {
        focus: false,
      };
    },
    methods: {
      onBlur () {
        this.focus = false;
      },
      onFocus () {
        this.focus = true;
      },
      onKeyUp (event) {
        switch (event.key) {
          case 'Enter':
            this.submit();
            break;
        }
      },
      submit () {
        this.$emit('submit');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-input-search.custom-input {
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 100%;
      min-height: 3rem;
      padding: .5rem 1rem;
      background-color: var(--lightgrey, lightgrey);
      border-radius: .25rem;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 2px solid var(--lightgrey, lightgrey);
      border-right: none;
      color: var(--black, black);
      font-family: var(--work-sans, sans-serif);
      &:focus {
        outline: none;
        border-color: var(--maroon, maroon);
      }

      &::placeholder {
        color: var(--grey, grey);
        font-family: var(--work-sans, sans-serif);
      }
    }

    .btn {
      height: 100%;
      min-height: 3rem;
      border: 2px solid var(--lightgrey, lightgrey);
      border-left: none;
      border-radius: .25rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      &:hover {
        outline: none;
      }
    }

    &.focus {
      input {
        border-color: var(--maroon, maroon);
      }

      .btn {
        border-color: var(--maroon, maroon);
      }
    }
  }
</style>