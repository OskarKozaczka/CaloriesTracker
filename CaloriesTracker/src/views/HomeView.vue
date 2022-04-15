<script setup>
import $ from "jquery";
import { createUser,setPassword,setKcal,getKcal,addKcal } from '../DataProvider';
import { ref, onMounted,createApp } from 'vue'


	$(document).ready(function() {
			$('.minus').click(function () {
				var $input = $(this).parent().find('input');
				var count = parseInt($input.val()) - 1;
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
      kcal: undefined,
	  today: undefined,
	  image: ''
    }
  },
  methods : {
	  onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
		},
		createImage(file) {
			var image = new Image();
			var reader = new FileReader();
			var vm = this;

			reader.onload = (e) => {
				vm.image = e.target.result;
			};
			reader.readAsDataURL(file);
			},
        submitKcal: async function(){
			var kcalValue = document.getElementById("kcal").value
			await addKcal("test", kcalValue, this.today)
			this.kcal = await getKcal("test", this.today);
            }
        },
		async beforeMount() {
			const today = new Date();
			const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			this.today = date
			this.kcal = await getKcal("test",this.today)
			
		}
}
</script>
<template>
  <main>
      <div class="number center">
        <span class="minus">-</span>
        <input id = "kcal" type="text" value="0"/>
        <span class="plus">+</span>
      </div>
	   <button class = "center btn btn-secondary" type="button" @click="submitKcal()">Zapisz</button> 
      <img class = "center" src="../assets/plate.png">
	  <h1 class = "center">Kcal: {{kcal}} </h1>
	<div class = "center">
		<input type="file" @change="onFileChange">
		<img :src="image" />
	</div>
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
		#kcal{
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

