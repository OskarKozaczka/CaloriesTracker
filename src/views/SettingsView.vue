<script>
import { onBeforeUpdate, onMounted } from '@vue/runtime-core'
import {getUserEmail, logOut, getUserId, delete_user} from '../AuthProvider'
import {checkIfUserExists, getTargetKcal, setTargetKcal, deleteUserFromDB} from '../DataProvider'
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
        },
        deleteUser(){
            deleteUserFromDB(getUserId());
            delete_user()
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
            <button class = "button" type="submit" @click="updateTarget"> Zmień </button>
        </div>

        <div class="notify">
            <label class="switch">
            <input type="checkbox" checked>
            <span class="slider round"></span> 
            </label>
            <div class="label">Powiadomienia</div>
        </div>

        <button class="logout" @click="signOut"> Wyloguj </button>
        <button class="delete" @click="deleteUser"> Usuń konto </button>

  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.settings-screen{
    font-family: "Roboto";
    display: flex;
    flex-direction: column;
}
.notify{
    margin: 15px
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
.button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;

  background: #4CAF50;
  background: #212529;


  border: 0;
  padding: 15px;
  min-width: 26%;
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
.delete{
    margin: auto;
    margin-top: 10px;
    width: 60%;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>