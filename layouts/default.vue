<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed temporary app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Snackbar></Snackbar>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: { Snackbar },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Apontar',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Relatórios',
          to: '/reports',
        },
      ],
      title: 'Ahgora MeLi',
    }
  },
}
</script>
