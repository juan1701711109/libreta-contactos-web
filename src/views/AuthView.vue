<template>
  
  <div>
    <v-row>
      <div class="wrapper">
          <div class="logo">
              <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="">
          </div>
          <div class="text-center mt-4 name">
              Login
          </div>
          <form @submit.prevent="login" novalidate="true" class="p-3 mt-3">
              <div class="form-field d-flex align-items-center">
                  <span class="far fa-user"></span>
                  <input v-model="user.username" type="text" name="userName" id="userName" placeholder="Username">
              </div>
              <div class="form-field d-flex align-items-center">
                  <span class="fas fa-key"></span>
                  <input v-model="user.password" type="password" name="password" id="pwd" placeholder="Password">
              </div>
              <button type="submit" class="btn mt-3">Login</button>
          </form>
          <div class="text-center fs-6">
              Or you should <a href="#"><v-btn @click="dialog=!dialog" text>Sign up</v-btn></a>
          </div>
      </div>
    </v-row>
    
    <v-row>
      <template>
        <v-row  justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            width="555px"
          >
            <v-card class="main">
              <v-card-title>
                <span class="text-h5 texto-blanco ml-5 mt-1">
                  Register
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <form @submit.prevent="verificarFormulario" novalidate="true">
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <input
                          class="input"
                          v-model="user.username"
                          placeholder="Username"
                          required
                        />
                          <template v-if="errors.username">
                            <p class="errorF">*{{ errors.username }}</p>
                          </template>
                      </v-col>
                      <v-col
                        cols="12"
                        class="mt-3"
                      >
                        <input
                          type="password"
                          class="input"
                          v-model="user.password"
                          placeholder="Password"
                          required
                        />
                        <template v-if="errors.password">
                          <p class="errorF">*{{ errors.password }}</p>
                        </template>
                      </v-col>
                    </v-row>
                    
                    <v-spacer></v-spacer>
                    <v-row class="mt-5">
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
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { postData } from "@/request/request.js";
  import Swal from 'sweetalert2';

  export default defineComponent({
    name: 'Login',
    data: () => ({
      user: {},
      errors: {},
      dialog: false
    }),
    methods: {
      async login() {
        await postData("auth/login", this.user, false)
        .then(res => {
            console.log(res.token)
            if(res.success) {
              localStorage.setItem('token', res.token)
              Swal.fire({
                title: "Sesion Iniciada",
                text: 'Loading...',
                icon: "success",
                confirmButtonText: "Aceptar",
              })
            } else {
              Swal.fire({
                title: "Error iniciando sesion",
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

        this.$router.push('/');
      },
      resetForm() {
        this.dialog = false;
        this.user = {}
      },
      async verificarFormulario() {
        this.errors = {};
        if (!this.user.username) {
          this.errors.username = "Debe ingresar el nombre de usuario";
        }
        if (!this.user.password) {
          this.errors.password = "Debe ingresar la contraseña";
        }
        if (Object.keys(this.errors).length == 0) {
          await this.register();
          this.resetForm();
        } else{
          console.log(this.errors)
        }
      },
      async register() {
        await postData("auth/register", this.user, false)
        .then(res => {
            console.log(res)
            if(res.success) {
              Swal.fire({
                title: res.mess,
                text: 'Loading...',
                icon: "success",
                confirmButtonText: "Aceptar",
              })
            } else {
              Swal.fire({
                title: res.mess,
                text: 'Loading...',
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
        this.$router.push('/');
      },
    }
  })
  </script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";

/* Importing fonts from Google */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Reseting */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: #ecf0f3;
}

.wrapper {
    max-width: 350px;
    min-height: 500px;
    margin: 80px auto;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.logo {
    width: 80px;
    margin: auto;
}

.logo img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #5f5f5f,
        0px 0px 0px 5px #ecf0f3,
        8px 8px 15px #a7aaa7,
        -8px -8px 15px #fff;
}

.wrapper .name {
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: 1.3px;
    padding-left: 10px;
    color: #555;
}

.wrapper .form-field input {
    width: 100%;
    display: block;
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    /* border: 1px solid red; */
}

.wrapper .form-field {
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
    color: #555;
}

.wrapper .btn {
    box-shadow: none;
    width: 100%;
    height: 40px;
    background-color: #03A9F4;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,
        -3px -3px 3px #fff;
    letter-spacing: 1.3px;
}

.wrapper .btn:hover {
    background-color: #039BE5;
}

.wrapper a {
    text-decoration: none;
    font-size: 0.8rem;
    color: #03A9F4;
}

.wrapper a:hover {
    color: #039BE5;
}

@media(max-width: 380px) {
    .wrapper {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}
</style>
