<script setup>
import $ from "jquery";
import { createUser,  getKcal, getUserImages, addRecord, getTargetKcal, checkIfUserExists} from '../DataProvider';
import { ref, onMounted,createApp } from 'vue'
import {getUserId} from '../AuthProvider';
 


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

		navigator.serviceWorker.register('sw.js');
		Notification.requestPermission()
</script>
<script>

export default {
  data() {
    return {
      kcal: 0,
	  targetKcal: undefined,
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
		setChartValue(current, max){
			var value = current/max * 100 || 0 
			document.querySelector('.chart').style.setProperty("--value", value+"%");
		},
		async getImages(){
			this.images = await getUserImages(getUserId(),this.today)
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
		push(kcal) {			
				navigator.serviceWorker.ready.then(function(registration) {
					registration.showNotification('Dodano wpis', {
						body: `Kalorie: ${kcal}`,
						vibrate: [200],
					});
				});
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
			this.push(kcalValue)
			var uploadElem = document.getElementById("upload")
			var file = uploadElem.files[0] || null
			uploadElem.value = null
			await addRecord(getUserId(), this.today, kcalValue, file)
			navigator.vibrate(200)
			await this.getImages()
			
		},
	},
	async beforeMount() {
		const today = new Date();
		const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		this.today = date
		await this.getImages()
		this.kcal = await getKcal(getUserId(),this.today)
		this.targetKcal = await getTargetKcal('test')
		this.setChartValue(this.kcal,this.targetKcal)
		
	},
	async onMounted(){
		
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
	<!-- <div class="center">
		<div class="circle-border">
			<div class="circle">
				<img  class = "plate" src="../assets/plate.png">
			</div>
		</div>
	</div> -->

	<div class="chart">
  <img  class = "plate" src="../assets/plate.png">
</div>
      
	  <h1 class = "center">Kcal: {{kcal}} </h1>
		
			<input class = "center btn btn-dark" id="upload" type="file" accept="image/*;capture=camera" @change="onFileChange">
			<button class = "center btn btn-dark" type="button" @click="send()">Zapisz</button> 
			
		<div  id = "userImages">
			<img class = "center foodImage" :src="image1" />
			<img class = "center foodImage" :src="image2" />
			<img class = "center foodImage" :src="image3" />
			<img class = "center foodImage" :src="image4" />
			<img class = "center foodImage" :src="image5" />
			<img class = "center foodImage" :src="image6" />
			<img class = "center foodImage" :src="image7" />
			<img class = "center foodImage" :src="image8" />
			<img class = "center foodImage" :src="image9" />
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

.plate{
	position: relative;
}
.circle {
  position: relative;
  top: 5px;
  left: 5px;
  text-align: center;
  width: 300px;
  height: 300px;
  border-radius: 100%;
  background-color: #ffffff;
}

.circle-border {
  position: relative;
  text-align: center;
  width: 310px;
  height: 310px;
  border-radius: 100%;
  background-color: #E53B3B;
  background: linear-gradient(270deg, black 50%, transparent 50%), linear-gradient(0deg, black 50%, lightgray 50%)
}

:root {
  --size: 100px;
  --bord: 10px;
}

.chart {
  width: var(--size);
    position: relative;
  top: 5px;
  left: 5px;
  text-align: center;
  width: 300px;
  height: 300px;
  margin: 1em auto;
  border-radius: 50%;
  background-image: conic-gradient(rgb(47, 212, 17) var(--value), lightgrey var(--value));
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - var(--bord));
  height: calc(100% - var(--bord));

  border-radius: inherit;
}

p {
  position: relative;
  z-index: 1;
  font-size: 2em;
}

.x-60 {
  --value: 60%;
}

</style>

