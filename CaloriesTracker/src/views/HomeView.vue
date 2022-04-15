<script setup>
import $ from "jquery";
import { createUser,setPassword,setKcal,getKcal,addKcal } from '../DataProvider';
import { ref, onMounted,createApp } from 'vue'


	$(document).ready(function() {
			$('.minus').click(function () {
				var $input = $(this).parent().find('input');
				var count = parseInt($input.val()) - 1;
				count = count < 1 ? 1 : count;
				$input.val(count);
				$input.change();
				return false;
			});
			$('.plus').click(function () {
				var $input = $(this).parent().find('input');
				$input.val(parseInt($input.val()) + 1);
				$input.change();
				return false;
			});
		});
</script>
<script>

export default {
  data() {
    return {
      kcal: 0
    }
  },
  methods : {
 
            // Creating function
            submitKcal: async function(){
				const today = new Date();
				const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				await addKcal("test",40,date)
                this.kcal = await getKcal("test",date);
            }
        }
}
</script>
<template>
  <main>
      <div class="number center">
        <span class="minus">-</span>
        <input type="text" value="1"/>
        <span class="plus">+</span>
      </div>
	   <button class = "center btn btn-secondary" type="button" @click="submitKcal()">Zapisz</button> 
      <img class = "center" src="../assets/plate.png">
	  <h1 class = "center">Kcal: {{kcal}} </h1>
  </main>
</template>
<style>

.center {
	display: flex;
	justify-content: center;
	margin: auto;
}
img {
  width: 200px;
}
	span {cursor:pointer; }
		.number{
			margin:10px;
      display: flex;
      justify-content: center;
		}
		.minus, .plus{
			box-sizing: unset;
			width:20px;
			height:20px;
			background:#f2f2f2;
			border-radius:4px;
			padding:8px 5px 8px 5px;
			border:1px solid #ddd;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
		}
		input{
			height:34px;
      width: 100px;
      text-align: center;
      font-size: 26px;
			border:1px solid #ddd;
			border-radius:4px;
      display: inline-block;
      vertical-align: middle;
	  box-sizing: unset;
    }

</style>

