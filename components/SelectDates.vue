<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="mb-5" @click="apllyWorkingDays()">
            Selecionar Dias Úteis
          </v-btn>
          <v-combobox
            v-model="dates"
            multiple
            chips
            small-chips
            label="Selecionar Dias"
            prepend-icon="mdi-calendar"
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-combobox>
        </template>
        <v-date-picker v-model="dates" multiple scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Fechar </v-btn>
          <v-btn text color="primary" @click="selectDates(dates)"> Ok </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import * as moment from 'moment/moment'
export default {
  data: () => ({
    dates: [],
    menu: false,
  }),
  methods: {
    apllyWorkingDays() {
      // eslint-disable-next-line no-console
      console.log(moment().daysInMonth())
      // eslint-disable-next-line no-console
      console.log(moment().isoWeekday())
    },
    selectDates(dates) {
      this.$refs.menu.save(dates)
      this.$emit('selectedDates', this.dates)
    },
  },
}
</script>
