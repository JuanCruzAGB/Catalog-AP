<template>
  <ul class="list">
    <li class="item">
      <RouterLink class="link"
        :to="{
          name: 'Catalog',
        }">
        Propiedades
      </RouterLink>
    </li>

    <li class="item">
      <RouterLink class="link"
        :to="{
          name: 'Home',
          hash: 'contacto',
        }">
        Contacto
      </RouterLink>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Links',
  };
</script>

<style lang="scss" scoped>
  .list {
    display: grid;
    gap: var(--gap, 1rem);
    @media (min-width: 1024px) {
      display: flex;
    }

    .item {
      .link {
        color: var(--grey, grey);
        line-height: calc(var(--height, 4.6rem) / 2);
        text-transform: uppercase;
        transition: 500ms;
        &:hover {
          color: var(--maroon, maroon);
          text-decoration: none;
        }
      }
    }
  }
</style>