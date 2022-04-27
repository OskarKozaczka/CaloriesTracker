<script>
import {getUserEmail, logOut, getUserId} from '../AuthProvider'
import {checkIfUserExists} from '../DataProvider'
export default {
    data() {
        return {
            user: undefined,
            user_email: "jazda",
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
        signOut(){
          logOut()
        },
        checkForUser(){
            checkIfUserExists("123")
        },
        getUsersId(){
            getUserId()
        }
    },
    beforeMount(){
        this.user_email = getUserEmail()
        console.log(getUserEmail())
    }

}
</script>

<template>
  <div class="settings-screen">
        <b class="title">Ustawienia</b>
        <div class="konto"> Konto: {{ user_email }} </div>

        <button class="submit" @click="signOut"> wyloguj </button>
        <button class="submit" @click="getUsersId"> user </button>

  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.settings-screen{
    font-family: "Roboto";
}

.title {
    text-align: right;
    float: right;
    font-size: 40px
}
</style>