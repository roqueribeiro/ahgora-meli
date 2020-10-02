<template>
  <div name="snackbars">
    <v-snackbar v-model="show" :color="color" :top="'top'">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      color: '',
      text: '',
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHOW_MESSAGE') {
        this.text = state.text
        this.color = state.color
        this.show = true
      }
    })
  },
}
</script>
