<template>
  <v-textarea
    v-model="description"
    outlined
    class="ma-2"
    name="input-7-4"
    label="Motivo do Reajuste"
  ></v-textarea>
</template>
<script>
export default {
  data: () => ({
    description: '',
  }),
  watch: {
    description: {
      handler(data) {
        this.descriptionTyped(data)
      },
      deep: true,
    },
  },
  methods: {
    descriptionTyped(data) {
      this.$emit('descriptionTyped', data)
    },
  },
}
</script>
