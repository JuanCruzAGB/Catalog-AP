<template>
  <section class="query"
    :class="{
      skeleton: loading,
    }"
    id="contacto">
    <div class="form">
      <header>
        <h3 class="title"
          :class="{
            empty: loading,
          }">
          <template v-if="!loading">
            <span class="maroon">
              Preguntar por
            </span>

            <br />

            {{ property.name }}
          </template>
        </h3>
      </header>

      <form @submit.prevent="submit">
        <input type="hidden"
          v-model="inputs.id_property" />

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
            Consultar
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
  import { mapGetters } from "vuex";
  import Input from "../Input.vue";

  import Card from "../cards/Contact.vue";

  export default {
    name: 'Query',
    components: {
      Card,
      Input,
    },
    props: {
      property: {
        default () {
          return {
            // 
          };
        },
        required: false,
      },
    },
    data () {
      return {
        inputs: {
          email: new this._provided.objects.input({
            requirements: 'required|mail',
          }),
          id_property: new this._provided.objects.input({
            requirements: 'nullable',
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
      ...mapGetters([ 'loading', ]),
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
    watch: {
      propery () {
        this.inputs.id_property.model = this.property.id_property;

        this.inputs.id_property.error = false;

        this.inputs.id_property.invalid = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .query:not(.card) {
    display: grid;
    gap: 1rem;
    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0;
      margin-top: -2rem;

      header {
        padding-inline: 0 2rem;
      }
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
        position: relative;
        padding: 2rem;
        padding-inline: 2rem var(--padding-inline, 1rem);
      }
    }
  }
</style>