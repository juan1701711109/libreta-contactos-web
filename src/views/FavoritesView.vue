<template>
  <v-row class="mt-5">
      <v-row wrap class="mx-2" v-if="contactsFavorites.length > 0">
			<v-col cols="12" sm="6" md="4" lg="3" v-for="contact in contactsFavorites" :key="contact.id">
				<v-card
				class="mx-auto my-1"
					max-width="374"
					color="#ececec"
					hover
					link
				>
					<div class="d-flex">
            <div>
              <v-card-title>
                <h2>{{contact.name}}</h2>
              </v-card-title>
              <v-card-subtitle>
                <h2 v-if="contact.lastname">{{contact.lastname}}</h2>
                <h2 v-else>...</h2>
              </v-card-subtitle>
            </div>
            <div class="mt-5 ml-auto">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="removeFavorite(contact.id)"
              >
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </div>
          <v-card-text>
            <strong>Email: </strong>{{contact.email}}
          </v-card-text>
          <v-card-text>
            <strong>Phone: </strong>{{contact.phone}}
          </v-card-text>
          <v-card-text>
            <strong>Cellphone: </strong>{{contact.cellphone}}
          </v-card-text>
          <v-card-text>
            <strong>Address: </strong>{{contact.address}}
          </v-card-text>
				</v-card>
			</v-col>
		</v-row>
    <v-row v-else>
      <NoResults/>
    </v-row>
    </v-row>
</template>

<script>
import { defineComponent } from 'vue'

import { getData, postData, deleteData, putData } from "@/request/request.js";
import NoResults from '@/components/NoResults.vue';
import Swal from 'sweetalert2'; 
  export default defineComponent({
    name: 'Favorites',
    components: {
      NoResults
    },
    data: () => ({
      contacts: [],
      contactsFavorites: [],
      contact: {},
      editId: 0,
    }),
    mounted() {
      //Verifica que el usuario este logeado
      if(!localStorage.getItem('token')) {
        this.$router.push('/auth');
      }
    },
    methods: {
      //Obtiene todos los contactos del usuario
      async getContacts() {
        await getData(`contacts`)
          .then(res => {
              this.contacts = res.contacts;
              if(!res.success) {
                Swal.fire({
                  title: "¡Error!",
                  text: res.mess,
                  icon: "error",
                  confirmButtonText: "Aceptar",
              });
              }
            })
            .catch(error => {
              Swal.fire({
                title: "¡Error!",
                text: error,
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            })
            this.getContactsFavorites();
      },
      //Filtra entre los contactos del usuario los marcados como favoritos
      getContactsFavorites() {
        this.contacts.forEach(contact => {
          if(contact.favorite == true) {
            this.contactsFavorites.push(contact);
          }
        });
      },
      //Remueve al contacto de favoritos
      async editarContacto() {
          this.dialog = false;
        await putData(`contacts/${this.editId}`, this.contact)
          .then(res => {
            if(res.success) {
              Swal.fire({
                title: "Contacto editado Exitosamente!",
                text: 'Editado',
                icon: "success",
                confirmButtonText: "Aceptar",
              })
            } else {
              Swal.fire({
                title: "Error editando el contacto!",
                text: res.mess,
                icon: "error",
                confirmButtonText: "Aceptar",
              })
            }
          })
          .catch(error => {
            		Swal.fire({
                title: "¡Error editando el usuario!",
                text: error,
                icon: "error",
                confirmButtonText: "Aceptar",
              }); 
          })
      },
      async removeFavorite(id) {
        this.cargarDatosContactoEditar(id)
        this.contact.favorite = 0;
        this.editId = this.contact.id;
        await this.editarContacto();
        this.contactsFavorites = [];
        await this.getContactsFavorites();
      },
      cargarDatosContactoEditar(id) {
        this.contacts.forEach(contact => {
          if(contact.id == id) {
            this.contact = contact;
          }
        });
        this.editId = id;
      }, 
    },
    async created() {
      await this.getContacts();
    }
  })
  </script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss"
</style>
