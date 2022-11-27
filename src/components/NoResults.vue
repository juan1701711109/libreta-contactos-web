<template>
  <div class="medidas">
      <v-row class="centrar">
          <v-col cols="12" class="d-flex justify-center">
              <img class="imagen mx-auto " src="https://payload310.cargocollective.com/1/2/84402/8502824/Customise_9_720.gif" alt="">
          </v-col>
          <v-col cols="12">
              <h1 class="text-center texto-azul tamaño-letra">No se encontraron resultados</h1>
          </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
    name: 'NoResults'
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";

.medidas {
    width: 100vw;
    height: 80vh;
    display: flex;
}

.imagen {
    width: 40vw;
    height: 25vh;
    margin: 0 auto;
}

.centrar {
    margin: auto;
}

@media screen and (max-width: 800px) {
  .tamaño-letra {
    font-size: 18px;
  }
} 
</style>