<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-btn v-if="sesion" text :to="{name: 'home'}"><h1>Contacts</h1></v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="pink"
        :to="{name: 'favorites'}" 
        v-if="sesion"
      >
        <v-icon dark>
          mdi-heart
        </v-icon>
      </v-btn>
      <v-btn
        @click="logout"
        target="_blank"
        text
        v-if="sesion"
      >
        <span class="mr-2">logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'App',

  data: () => ({
    sesion: false,
    isRouterAlive: true
  }),
  mounted() {
    if(!localStorage.getItem('token')) {
        this.sesion = false;
      } else {
        this.sesion = true;
      }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      Swal.fire({
        title: "Logout",
        text: 'Loading...',
        icon: "success",
        confirmButtonText: "Aceptar",
      })
      this.$router.push('/auth');
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  }
};
</script>
