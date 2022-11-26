<template>
  <v-row>
      <v-col>
        <v-btn
          class="primario btn-normal ml-3 mt-2"
					@click="accionPadre()"
        >
        <v-icon>
			    mdi-plus
        </v-icon>
       </v-btn>
      </v-col>
    </v-row>
</template>

  <script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AddButton',
    data: () => ({
    }),
    methods: {
      accionPadre() {
        this.$emit('abrirModal');
      }
    }
  })
  </script>

<style lang="scss" scoped>
@import "@/scss/variables-globales.scss"
</style>
