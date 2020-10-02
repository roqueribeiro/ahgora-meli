<template>
  <v-select
    v-model="select"
    :items="types"
    item-text="text"
    item-value="value"
    label="Selecione"
    outlined
  ></v-select>
</template>
<script>
export default {
  data: () => ({
    select: null,
    types: [
      { text: 'Inclusão de Batida', value: 'addPunch' },
      { text: 'Guardia', value: 'guardia' },
      { text: 'Deploy', value: 'deploy' },
    ],
  }),
  watch: {
    select: {
      handler(data) {
        this.selectType(data)
      },
      deep: true,
    },
  },
  methods: {
    selectType(type) {
      this.$emit('selectedType', type)
    },
  },
}
</script>
