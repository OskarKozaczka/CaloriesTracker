<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { current_user } from "./AuthProvider"
</script>

<script>
import {onAuthStateChanged} from "firebase/auth" 
import {auth} from "./AuthProvider"

export default {
  data () {
    return {
      logged_in: false
    }
  },
  methods : {
    check_logged_in(){
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log("user logged in", user)
          this.logged_in = true
          this.$router.push("/home")
          console.log("user email:  ", user.email)
          return user.email
        } else {
          console.log("user logged out", user)
          this.logged_in = false
          this.$router.push("/login")
        }
      })
    }
  },
  beforeMount(){
     this.check_logged_in()
  }
}
</script>

<template>
  <div >
    
      <nav class = "navbar navbar-dark bg-dark" v-if="logged_in === true">
        <RouterLink class = "navbar-brand" to="/home">Strona Główna</RouterLink>
        <RouterLink class = "navbar-brand" to="/history">Historia</RouterLink>
        <RouterLink class = "navbar-brand" to="/settings">Ustawienia</RouterLink>
      </nav>
    <RouterView />
  </div>
</template>

<style>
.navbar-brand{margin: auto;}
</style>
