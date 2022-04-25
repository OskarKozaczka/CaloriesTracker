<script setup>
import $ from "jquery";
import { createUser,  getKcal, getUserImages, addRecord} from '../DataProvider';
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
	  image: '',
	  images: [],
	  image1: null,
	  image2: null,
	  image3: null,
	  image4: null,
	  image5: null,
	  image6: null,
	  image7: null,
	  image8: null,
	  image9: null,
    }
  },
	methods : {
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
		},
		async getImages(){
			this.images = await getUserImages("test",this.today)
			this.image1 = this.images[0]
			this.image2 = this.images[1]
			this.image3 = this.images[2]
			this.image4 = this.images[3]
			this.image5 = this.images[4]
			this.image6 = this.images[5]
			this.image7 = this.images[6]
			this.image8 = this.images[7]
			this.image9 = this.images[8]
			this.image10 = this.images[9]
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
		async send() {
			var kcalValue = document.getElementById("kcal").value
			var uploadElem = document.getElementById("upload")
			var file = uploadElem.files[0] || null
			uploadElem.value = null
			await addRecord("test", this.today, kcalValue, file)
			navigator.vibrate(200)
			await this.getImages()
		},
	},
	async beforeMount() {
		const today = new Date();
		const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		this.today = date
		await this.getImages()
		this.kcal = await getKcal("test",this.today)

	},
}
</script>
<template> 
  <main>
      <div class="number center">
        <span class="minus">-</span>
        <input id = "kcal" type="text" value="0"/>
        <span class="plus">+</span>
      </div>
      <img class = "center" src="../assets/plate.png">
	  <h1 class = "center">Kcal: {{kcal}} </h1>
		
			<input class = "center btn btn-dark" id="upload" type="file" accept="image/*;capture=camera" @change="onFileChange">
			<button class = "center btn btn-dark" type="button" @click="send()">Zapisz</button> 
			
		<div id = "userImages">
			<img :src="image1" />
			<img :src="image2" />
			<img :src="image3" />
			<img :src="image4" />
			<img :src="image5" />
			<img :src="image6" />
			<img :src="image7" />
			<img :src="image8" />
			<img :src="image9" />
		</div>
  </main>
</template>
<style>



.center {
	display: flex;
	justify-content: center;
	margin: auto;
	margin-top:5px
}
img {
  height: 200px
}
#userImages{
	margin:15px
}

button, input {
	width:40%
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

