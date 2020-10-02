<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <v-btn text @click="login()"> Login </v-btn>
    <v-btn text @click="apuracao()"> Apuracao </v-btn>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Selecione as Datas
        <small>Marque as datas que você trabalhou ou fez horas extras</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <SelectDates @selectedDates="getSelectedDates"></SelectDates>
        <v-btn color="primary" @click="checkStepOneValid()"> Continuar </v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 2" step="2">
        Selecione o tipo de apontamento
        <small
          >Defina se é reajuste de horas trabalhadas, horas extras ou
          abono.</small
        >
      </v-stepper-step>
      <v-stepper-content step="2">
        <SelectTypes @selectedType="getSelectedType"></SelectTypes>
        <v-btn color="primary" @click="checkStepTwoValid()"> Continuar </v-btn>
        <v-btn text @click="e6 = 1"> Voltar </v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="e6 > 3" step="3">
        Escreva o motivo do reajuste
        <small
          >Explique em poucas palavras o motivo do lançamento destas
          horas.</small
        >
      </v-stepper-step>
      <v-stepper-content step="3">
        <Description @descriptionTyped="getDescription"></Description>
        <v-btn color="primary" @click="checkStepThreeValid()">
          Continuar
        </v-btn>
        <v-btn text @click="e6 = 2"> Voltar </v-btn>
      </v-stepper-content>
      <v-stepper-step step="4">
        Reajustar
        <small
          >Após esta etapa será enviado todos os preenchimentos acima para o
          sistema Ahgora.</small
        >
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-btn color="primary" @click="sendDataToAhgora()">
          Enviar dados
        </v-btn>
        <v-btn text @click="e6 = 3"> Voltar </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SelectDates from '~/components/SelectDates.vue'
import SelectTypes from '~/components/SelectTypes.vue'
import Description from '~/components/Description.vue'

export default {
  name: 'Home',
  components: {
    SelectDates,
    SelectTypes,
    Description,
  },
  data: () => ({
    e6: 1,
    dates: {},
    type: null,
    description: null,
  }),
  methods: {
    ...mapActions(['showSnack']),
    getSelectedDates(dates) {
      this.dates = dates
    },
    getSelectedType(type) {
      this.type = type
    },
    getDescription(description) {
      this.description = description
    },
    checkStepOneValid() {
      if (!this.dates.length) {
        this.showSnack({
          text:
            'Selecione pelo menos um dia para fazer o apontamento de horas.',
          color: 'error',
        })
        return false
      }
      this.e6 = 2
    },
    checkStepTwoValid() {
      if (!this.type) {
        this.showSnack({
          text: 'Selecione um tipo de apontamento para continuar.',
          color: 'error',
        })
        return false
      }
      this.e6 = 3
    },
    checkStepThreeValid() {
      if (!this.description) {
        this.showSnack({
          text: 'Selecione um tipo de apontamento para continuar.',
          color: 'error',
        })
        return false
      }
      this.e6 = 4
    },
    sendDataToAhgora() {
      // eslint-disable-next-line no-console
      console.log(this.dates, this.type, this.description)
      this.dates.forEach((date) => {
        this.$axios.post('/ajuste', {
          referencia: date,
          tipo: this.type,
          justificativa: 'outros',
          mensagem: this.description,
          addPunch: { hora: '09:00', referencia: date },
        })
      })
    },
    login() {
      this.$axios.post('/login', {
        params: {
          matricula: '16543',
          senha: '_P@55W0rlds4',
        },
      })
    },
    apuracao() {
      this.$axios.get('/apuracao', {
        params: {
          matricula: '16543',
          senha: '_P@55W0rlds4',
        },
      })
    },
  },
}
</script>
