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
  <div id="login" v-if="logged_in == true">
    <RouterLink to="/login">Zalogowany</RouterLink>
  </div>
  <div >
      <nav v-if="logged_in === true">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/history">History</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
    <RouterView />
  </div>
</template>

<style>

</style>
