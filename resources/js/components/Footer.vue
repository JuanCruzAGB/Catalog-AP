<template>
  <footer>
    <span class="copyright">
      <p>
        <a href="mailto:jmarmentia2010@hotmail.com">© Armentia Propiedades</a>

        <br>

        Todos los Derechos Reservados

        <br>

        Desarrollado por <a href="mailto:juan.cruz.armentia@gmail.com">Juan Cruz Armentia</a>
      </p>
    </span>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
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