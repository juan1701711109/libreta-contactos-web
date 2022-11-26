<template>
  <v-row  justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      
    >
      <v-card class="main">
        <v-card-title>
          <span class="text-h5 texto-blanco ml-5 mt-1">
            {{editando ? 'Edit Contact' : 'Create Contact'}}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="accionPadre" novalidate="true">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <input
                    class="input"
                    v-model="contact.name"
                    placeholder="Nombre"
                    required
                  />
                    <template v-if="errors.name">
                      <p class="errorF">*{{ errors.name }}</p>
                    </template>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <input
                    class="input"
                    v-model="contact.lastname"
                    placeholder="Lastname"
                    required
                  />
                  <template v-if="errors.lastname">
                    <p class="errorF">*{{ errors.lastname }}</p>
                  </template>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                <input
                    class="input"
                    v-model="contact.email"
                    placeholder="Email"
                    required
                  />
                  <template v-if="errors.email">
                    <p class="errorF">*{{ errors.email }}</p>
                  </template>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <input
                    class="input"
                    v-model="contact.phone"
                    placeholder="Phone Number"
                    required
                  />
                    <template v-if="errors.phone">
                      <p class="errorF">*{{ errors.phone }}</p>
                    </template>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <input
                    class="input"
                    v-model="contact.cellphone"
                    placeholder="Cellphone Number"
                    required
                  />
                    <template v-if="errors.cellphone">
                      <p class="errorF">*{{ errors.cellphone }}</p>
                    </template>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <input
                    class="input"
                    v-model="contact.address"
                    placeholder="Address"
                    required
                  />
                    <template v-if="errors.address">
                      <p class="errorF">*{{ errors.address }}</p>
                    </template>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
              <v-row>
                <v-container class="d-flex justify-center">
                  <input class="btn secundario mx-5" type="submit" value="Guardar">
                  <input class="btn rojo mx-3" type="button" value="Cancelar" @click="resetForm">
                </v-container>
              </v-row>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

  <script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CreateContact',
    data: () => ({
      contact: {},
      errors: {},
      abrir: false
    }),
    props: {
      dialog: false,
      editando: false,
    },
    methods: {
      accionPadre() {
        this.$emit('crearContacto', this.contact);
      },
      resetForm() {
        this.abrir = false;
        console.log('cancelar')
      },
    },
    computed: {
      abrirmodal() {
        this.abrir = this.dialog;
        return this.abrir
      }
    }
  })
  </script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss"
</style>
