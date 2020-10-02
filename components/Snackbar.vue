<template>
  <v-snackbar v-model="show" elevation="24" multi-line top :color="color">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn text fab v-bind="attrs" @click="show = false">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  },
}
</script>
