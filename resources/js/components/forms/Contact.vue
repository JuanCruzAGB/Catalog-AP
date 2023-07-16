<template>
  <section class="contact"
    id="contacto">
    <div class="form">
      <header>
        <h3 class="title">
          Contacto
        </h3>
      </header>

      <form @submit.prevent="submit">
        <Input :input="inputs.name"
          placeholder="Nombre y Apellido"
          :showLabel="true"
          type="text" />

        <Input :input="inputs.email"
          placeholder="Correo"
          :showLabel="true"
          type="text" />

        <Input :input="inputs.phone"
          placeholder="Teléfono"
          :showLabel="true"
          type="text" />

        <Input :input="inputs.message"
          label="Mensaje"
          placeholder="Detalle de tu consulta..."
          type="textarea" />

        <div class="flex justify-center lg:justify-end">
          <button class="btn btn-solid btn-maroon"
            :disabled="!valid">
            Enviar
          </button>
        </div>
      </form>
    </div>

    <footer class="data">
      <Card />
    </footer>
  </section>
</template>

<script>
  import Input from "../Input.vue";
  import Card from "../cards/Contact.vue";

  export default {
    name: 'Contact',
    components: {
      Card,
      Input,
    },
    data () {
      return {
        inputs: {
          email: new this._provided.objects.input({
            requirements: 'required|mail',
          }),
          name: new this._provided.objects.input({
            requirements: 'nullable',
          }),
          message: new this._provided.objects.input({
            requirements: 'nullable',
          }),
          phone: new this._provided.objects.input({
            requirements: 'required|phone|length:10',
          }),
        },
      };
    },
    computed: {
      formData () {
        let formData = [];

        Object
          .values(this.inputs)
          .map(input => {
            formData.push(input.model);
          });

        return formData;
      },
      valid () {
        return !Object
          .values(this.inputs)
          .some(input => input.invalid);
      },
    },
    methods: {
      submit () {
        if (this.valid) {
          console.log(this.formData);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .contact:not(.card) {
    display: grid;
    gap: 1rem;
    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0;
      margin-top: -2rem;
    }

    .form {
      display: grid;
      gap: 1rem;
      @media (min-width: 1024px) {
        padding-block: 2rem;
        padding-left: var(--padding-inline, 1rem);
      }

      .title {
        font-size: 1rem;
        text-align: center;
      }

      form {
        display: grid;
        gap: 1rem;
        padding-inline: 1rem;
        @media (min-width: 1024px) {
          padding-inline: 0 2rem;
        }
      }
    }

    .data {
      padding: 1rem;
      background: url(../../../assets/images/contact.jpg) no-repeat center left;
      background-size: cover;
      background-attachment: fixed;
      @media (min-width: 1024px) {
        padding: 2rem;
        padding-inline: 2rem var(--padding-inline, 1rem);
      }
    }
  }
</style>