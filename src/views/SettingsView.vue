<script>
import {getUserEmail, logOut} from '../AuthProvider'
export default {
    data() {
        return {
            user: undefined,
            password: '1234567'
        }
    },
    methods : {
        registerUser(user, password){
            createUserPassword(this.user, this.password)
        },
        loginPassword(user, password){
            loginUserPassword(this.user, this.password)
        },
        loginGoogle(){
            loginWithGoogle()
        },
        getEmail(){
            getUserEmail()
        },
        singOut(){
          logOut()
        }
    
    }
}
</script>

<template>
  <div class="history">
        <button type="submit" @click="getEmail"> Check email</button>
        <button type="submit" @click="singOut"> logout</button> 
  </div>
</template>
