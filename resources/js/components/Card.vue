<template>
  <a class="card"
    href="#"
    @click.prevent="click">
    <div class="card-body">
      <slot name="body">
        <div class="card-container">
          <slot name="container">
            <header v-if="$slots.header"
              class="card-header">
              <slot name="header" />
            </header>

            <main v-if="$slots.content"
              class="card-content">
              <slot name="content" />
            </main>

            <footer v-if="$slots.footer"
              class="card-footer">
              <slot name="footer" />
            </footer>
          </slot>
        </div>
      </slot>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'Card',
    methods: {
      click () {
        this.$emit('click');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    .card-body {
      .card-container {
        display: grid;
      }
    }
  }
</style>