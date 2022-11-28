<template>
  <div class="mx-5 mt-3">
    <v-row><h1>Mis Contacto</h1></v-row>
    <v-row>
      <AddButton @abrirModal="abrirFormCU" />
    </v-row>
    <v-row>
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
                  <form @submit.prevent="verificarFormulario" novalidate="true">
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
                          type="email"
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
                        <input class="btn secundario mx-5" type="submit" value="Save">
                        <input class="btn rojo mx-3" type="button" value="Cancel" @click="resetForm">
                      </v-container>
                    </v-row>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-row>
    <v-row v-if="contacts.length > 0">
      <v-row wrap class="mx-2">
			<v-col cols="12" sm="6" md="4" lg="3" v-for="contact in contacts" :key="contact.id">
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
                @click="addFavorite(contact.id)"
              >
                <v-icon dark>
                  mdi-heart
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
					<v-card-actions class="text-center align-self-end tabla">
              <v-row class="">
                <v-col cols="6" sm="5">
                  <v-btn
                    tile
                    color="success"
										@click="cargarDatosContactoEditar(contact.id)"
                  >
                    <v-icon left>
                      mdi-pencil
                    </v-icon>
                    Editar
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="7">
                  <v-btn
                    color="error"
										@click="deletedSelect(contact.id)"
                  >
                    <v-icon left>
                      mdi-delete
                    </v-icon>
                    Eliminar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
				</v-card>
			</v-col>
		</v-row>
    </v-row>
    <v-row v-else>
      <NoResults/>
    </v-row>

    <v-row>
        <!-- Modal Eliinar -->
      <template>
        <v-row  justify="center">
          <v-dialog
            v-model="dialogDelete"
            persistent
          >
          <v-container class="main">
            <v-container>
              <span class="text-h5 text-center texto-blanco mt-1">¿Seguro que desea eliminar el contacto?</span>
            </v-container>
            <v-container>
              <v-spacer></v-spacer>
                <v-row>
                  <v-container class="d-flex justify-center">
                    <input class="btn secundario mr-5" type="button" value="Confirmar" @click="deleteContact(true)">
                    <input class="btn rojo " type="button" value="Cancelar" @click="dialogDelete = false">
                  </v-container>
                </v-row>
              </v-container>
            </v-container>
          </v-dialog>
        </v-row>
      </template>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AddButton from '@/components/AddButton.vue';
import CreateContact from '@/components/CreateContact.vue';

import { getData, postData, deleteData, putData } from "@/request/request.js";
import { idUser } from "@/config/auth";

import Swal from 'sweetalert2';
import NoResults from '@/components/NoResults.vue';


export default defineComponent({
  name: 'Contacts',
  data: () => ({
    dialog: false,
    editando: false,
    contacts: [],
    contact: {},
    errors: {},
    deleteId: null,
    dialogDelete: false,
  }),
  inject: ['reload'],
  mounted() {
    //Verifica que el usuario este logeado
    if(!localStorage.getItem('token')) {
      this.$router.push('/auth');
    }
    this.reload()
  },
  methods: {
    //Abre modal de creacion de contacto
    abrirFormCU() {
      this.dialog = true;
      this.editando = false;
      this.getContacts();
    },
    //Verifica el correcto ingreso de los datos en el formulario
    async verificarFormulario() {
      this.errors = {};
      if (!this.contact.name) {
        this.errors.name = "Debe ingresar el nombre del contacto";
      }
      if (Object.keys(this.errors).length == 0) {
        if(this.editando){
          await this.editarContacto();
        } else {
          await this.crearContacto();
        }
        this.resetForm();
      } else{
        console.log(this.errors)
      }
    },
    //establece los valores iniciales de las variables
    resetForm() {
      this.dialog = false;
      this.editando = false;
      this.errors = {};
      this.contact = {};
      this.dialogDelete = false;
      this.deleteId = 0;
      this.editId = 0;
      this.getContacts();
    },
    //Crea contacto con los valores ingresados
    async crearContacto() {
      this.dialog = false;
      let id = idUser();
      this.contact.user_id = id;
      await postData("contacts", this.contact, true)
        .then(res => {
            if(res.success) {
              Swal.fire({
                title: "Contacto creado Exitosamente!",
                text: 'Creado',
                icon: "success",
                confirmButtonText: "Aceptar",
              })
            } else {
              Swal.fire({
                title: "Error creando el contacto!",
                text: res.mess,
                icon: "error",
                confirmButtonText: "Aceptar",
              })
            }
          })
        .catch(error => {
            Swal.fire({
            title: "¡Error al crear el contacto!",
            text: error,
            icon: "error",
            confirmButtonText: "Aceptar",
          }); 
        });
      this.getContacts();
    },
    //Obtiene os vallores e contcto eecciondo y los guarda en la variable
    //contact, abre modal de edicion
    cargarDatosContactoEditar(id) {
      this.dialog = true;
      this.contacts.forEach(contact => {
        if(contact.id == id) {
          this.contact = contact;
        }
      });
      this.editId = id;
      this.editando = true;
    },
    //Edita los valores del contacto seleccionado
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
    //Abre el modal de confirmacion ded elliminaacion y guarda id de contacto selleccionado
    deletedSelect(id) {
      this.deleteId = id;
      this.dialogDelete = true;
    },
    //elllimina el contacto seleccionado 
    async deleteContact(eliminar) {
      if(eliminar){
        await deleteData(`contacts/${this.deleteId}`, this.deleteId, true)
          .then(res => {
              Swal.fire({
              title: "Contacto eliminado Exitosamente!",
              text: res.message,
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          })
          .catch(error => {
              Swal.fire({
              title: "¡Error eliminando el contacto!",
              text: error,
              icon: "error",
              confirmButtonText: "Aceptar",
            }); 
          })
          this.resetForm();
        }
      },
    //Obtiene losss contactos aalmacenadddos por el usuario logeaado y los guarda
    //en la vaariablle contacts
    async getContacts() {
      let id = idUser();
          await getData(`contacts/user/${id}`)
              .then(res => {
                  this.contacts = res.contact;
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
      },
    //Edita atributo favorite de contacto a true 
    async addFavorite(id) {
      this.cargarDatosContactoEditar(id)
      this.dialog = false;
      this.contact.favorite = 1;
      this.editId = this.contact.id;
      await this.editarContacto();
    }
  },
  async created() {
    //Obtiene los contactos del usuario para mostrarlos cuando cargue la vista
    await this.getContacts();
  },
  components: {
    AddButton,
    CreateContact,
    NoResults
  }
})
</script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";
</style>