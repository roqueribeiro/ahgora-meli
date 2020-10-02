<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <v-btn text @click="login()"> Login </v-btn> -->
    <!-- <v-btn text @click="apuracao()"> Apuracao </v-btn> -->
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
        <v-progress-linear
          v-if="sending"
          v-model="progress"
          height="25"
          buffer-value="0"
          stream
          class="mb-5"
        >
          <small>{{ Math.ceil(progress) }}%</small>
        </v-progress-linear>
        <v-btn color="primary" :disabled="sending" @click="sendDataToAhgora()">
          Enviar dados
        </v-btn>
        <v-btn text :disabled="sending" @click="e6 = 3"> Voltar </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
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
    dates: null,
    type: null,
    description: null,
    progress: 0,
    sending: false,
    requestsTotal: 0,
    requestsLength: 0,
  }),
  methods: {
    getSelectedDates(dates) {
      // eslint-disable-next-line no-console
      this.dates = Array.from(dates)
    },
    getSelectedType(type) {
      this.type = type
    },
    getDescription(description) {
      this.description = description
    },
    checkStepOneValid() {
      if (!this.dates || this.dates.length < 1) {
        this.$notifier.showMessage({
          content:
            'Selecione pelo menos um dia para fazer o apontamento de horas.',
          color: 'error',
        })
        return false
      }
      this.e6 = 2
    },
    checkStepTwoValid() {
      if (!this.type) {
        this.$notifier.showMessage({
          content: 'Selecione um tipo de apontamento para continuar.',
          color: 'error',
        })
        return false
      }
      this.e6 = 3
    },
    checkStepThreeValid() {
      if (!this.description) {
        this.$notifier.showMessage({
          content: 'Selecione um tipo de apontamento para continuar.',
          color: 'error',
        })
        return false
      }
      this.e6 = 4
    },
    async axiosSendData(data) {
      return await this.$axios.post('/ajuste', data)
    },
    sendDataToAhgora() {
      // eslint-disable-next-line no-console
      console.log(this.dates, this.type, this.description)

      this.sending = true
      this.requestsTotal = this.dates.length
      this.dates.forEach((date) => {
        this.axiosSendData({
          referencia: date,
          tipo: this.type,
          justificativa: 'outros',
          mensagem: this.description,
          addPunch: { hora: '09:00', referencia: date },
        }).finally(() => {
          this.requestsLength++
          this.progress = (
            (this.requestsLength * 100) /
            this.requestsTotal
          ).toFixed()
          if (Number(this.progress) === 100) {
            this.e6 = 1
            this.dates = null
            this.type = null
            this.description = null
            this.sending = false
            this.$forceUpdate()
            this.$notifier.showMessage({
              content: 'Apontamento finalizado com sucesso!',
              color: 'success',
            })
          }
        })
      })
    },
    login() {
      this.$axios.post('/login', {
        params: {
          matricula: 'matricula',
          senha: 'senha',
        },
      })
    },
    apuracao() {
      this.$axios.get('/apuracao')
    },
  },
}
</script>
