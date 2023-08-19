<template>
  <footer>
    <span class="copyright">
      <p>
        <a :href="`mailto:${ contact.email }`">© Armentia Propiedades</a>

        <br>

        Todos los Derechos Reservados

        <br>

        Desarrollado por <a :href="`mailto:${ contact.developer }`">Juan Cruz Armentia</a>
      </p>
    </span>
  </footer>
</template>

<script>
  import { mapGetters, } from "vuex";

  export default {
    name: 'Footer',
    computed: {
      ...mapGetters([ 'contact', ]),
    },
  }
</script>

<style lang="scss" scoped>
  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--height, 4.6rem);
    background-color: var(--grey, grey);

    .copyright {
      color: var(--light, white);
      font-family: var(--work-sans, sans-serif);
      text-align: center;

      a {
        color: var(--red, red);
      }
    }
  }
</style>