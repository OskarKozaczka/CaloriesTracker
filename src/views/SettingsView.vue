<script>
import { onBeforeUpdate, onMounted } from '@vue/runtime-core'
import {getUserEmail, logOut, getUserId} from '../AuthProvider'
import {checkIfUserExists, getTargetKcal, setTargetKcal} from '../DataProvider'
export default {
    data() {
        return {
            user: undefined,
            target: undefined,
        }
    },
    methods : {
        getEmail(){
            getUserEmail()
        },
        signOut(){
          logOut()
        },
        getUsersId(){
            getUserId()
        },
        async updateTarget(){
            setTargetKcal(getUserId(), this.target)
        }
    },
    async beforeMount(){
        this.user_email = getUserEmail()
        this.target = await getTargetKcal(getUserId())
    },
    async updated(){
    }

}
</script>

<template>
  <div class="settings-screen">
        <b class="title">Ustawienia</b>
        <div class="konto"> Konto: {{ user_email }} </div>


        <div class="target">
            <div class=""> Dzienny cel kaloryczny</div>
            <input type="number" v-model="target">
            <button type="submit" @click="updateTarget"> Zmień </button>
        </div>

        <button class="logout" @click="signOut"> wyloguj </button>
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.settings-screen{
    font-family: "Roboto";
    display: flex;
    flex-direction: column;
}

.title {
    float: right;
    font-size: 40px
}

.konto {
    clear: center;
    float: center;
}
.settings-screen{

  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 500px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

}
.target{
    margin-top: 10%;
}
.target input{
    width: 30%;
    line-height: 20%;
    padding: 13px 10px
    
}

.target input button {
    margin:10px;
}
button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #212529;
  width: 20%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.logout{
    margin: auto;
    margin-top: 50px;
    width: 60%;
}
</style>