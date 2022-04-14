<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import $ from "jquery";

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

<template>
  <main>
      <div class="number">
        <span class="minus">-</span>
        <input type="text" value="1"/>
        <span class="plus">+</span>
      </div>
      <img src="@/components/icons/Pizza_Pepperoni.svg">

    <TheWelcome />
  </main>
</template>
<style>
img {
  display: flex;
  justify-content: center;
  margin: auto;
}
	span {cursor:pointer; }
		.number{
			margin:10px;
      display: flex;
      justify-content: center;
		}
		.minus, .plus{
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
    }

</style>
