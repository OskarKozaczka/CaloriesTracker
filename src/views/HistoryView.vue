
<script>

import $ from "jquery";
import { getHistory, getUserImages, getSingleImage, getTargetKcal} from '../DataProvider';
import {getUserId} from '../AuthProvider';

const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
var monthNum;
var today = new Date();
var history

export default {
  data() {
    return {
      month: undefined,
      day: undefined,
      year: undefined,
      image: undefined,
      user: undefined,
      target: undefined,
    }
  },

  mounted() {
    this.setCurrentDate();
    this.setNumberDays(this.month);
    this.user = getUserId();
    this.fillCalendar(0,0);
  },

  methods : {
    setNumberDays(month){
      if(month === "Luty"){
        $('.day29').hide();
        $('.day30').hide();
        $('.day31').hide();
      }
      else if(month === "Listopad" || month === "Czerwiec" || month === "Wrzesień" || month === "Kwiecień"){
        $('.day31').hide();
      }
      else{
        $('.day29').show();
        $('.day30').show();
        $('.day31').show();
      }
    },

    async fillCalendar(){
      //this.target = await getTargetKcal(this.user)
      history = await getHistory(this.user);
      const dateToday = (today.getFullYear())+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.showRows(dateToday);
    },

    async checkConsumption(date){
      this.target = getTargetKcal(this.user)
      console.log(date)
      var dayNum = date[0].slice(date[0].length-2)
      if(dayNum < 0){dayNum = date[0].slice(date[0].length-1)}
      var dayEntries = Object.entries(date[1])
      var sum = 0; 
      for(var i = 0; i < dayEntries.length; i++){
        sum += dayEntries[i][1].kcal
      }

      if(date[0][5] == monthNum+1){
        if(sum > await this.target){
        $('.day'+dayNum)[1].classList.remove("under");
        $('.day'+dayNum)[1].classList.add("over");
      }
      else{
        $('.day'+dayNum)[1].classList.add("under");
      }
      }
      
    },

    async showRows(simpleDate){
      
      //this.images = await getUserImages("test", simpleDate)
      //console.log(this.images)
      console.log(history)
      history.forEach( async date => {
        this.checkConsumption(date)
        if(date[0] === simpleDate){
          var dayEntries = Object.entries(date[1])
          for(var i = 0; i < dayEntries.length; i++){
            
            this.image = await getSingleImage(dayEntries[i][1].image)
            var hour = dayEntries[i][0].slice(0,5)
            if(hour[4] === ":"){hour = hour.slice(0,-1)}
            var kcal = dayEntries[i][1].kcal
            await this.addImage(kcal, i, hour)
          }
        }
      });
    },

    async addImage(kcal, i, hour){
      $("#userRows").append("<tr id='row"+i+"'> <td>"+hour+"</td><td>"+kcal+"</td><td><img src='"+this.image+"' /></td></tr>");},

    dayClicked(num){
      $("#userRows").empty()
      const dateClicked = this.year+'-'+(monthNum+1)+'-'+num;
      this.showRows(dateClicked);
    },

    setCurrentDate() {
      this.day = today.getDate();
      monthNum = today.getMonth()
      this.month = months[monthNum];
      this.year = today.getFullYear(this.month);
      $('.day'+this.day)[1].classList.add("active");
    },

    changeMonth(monthModificator){
      $("#userRows").empty()
      for(var i = 1; i <= 31; i++){
        $('.day'+i)[1].classList.remove("over");
        $('.day'+i)[1].classList.remove("under");
      }
      
      $('.day'+this.day)[1].classList.remove("active");
      if(monthNum === 11 && monthModificator === 1){
        monthNum = 0;
        this.year++;
      }
      else if(monthNum === 0 && monthModificator === -1){
        monthNum = 11;
        this.year--;
      }
      else{
        monthNum = monthNum + monthModificator
      }
      this.showRows(this.year+"-"+(monthNum+1)+"-"+this.day)
      this.month = months[monthNum];
      this.setNumberDays(this.month)
      //checkConsumption(date)
    }
    
  }
}

</script>

<template>
<main>
  <div class="history">
    <div class="month">      
  <ul>
    <li @click="changeMonth(-1)">Poprzedni</li>
    <li @click="changeMonth(1)">Następny</li>
    <li>
      {{month}}<br>
      <span style="font-size:18px">{{year}}</span>
    </li>
  </ul>
</div>

<ul class="days">  
  <li class="day1"><span class="day1" @click="dayClicked('1')">1</span></li>
  <li class="day2"><span class="day2" @click="dayClicked('2')">2</span></li>
  <li class="day3"><span class="day3" @click="dayClicked('3')">3</span></li>
  <li class="day4"><span class="day4" @click="dayClicked('4')">4</span></li>
  <li class="day5"><span class="day5" @click="dayClicked('5')">5</span></li>
  <li class="day6"><span class="day6" @click="dayClicked('6')">6</span></li>
  <li class="day7"><span class="day7" @click="dayClicked('7')">7</span></li>
  <li class="day8"><span class="day8" @click="dayClicked('8')">8</span></li>
  <li class="day9"><span class="day9" @click="dayClicked('9')">9</span></li>
  <li class="day10"><span class="day10" @click="dayClicked('10')">10</span></li>
  <li class="day11"><span class="day11" @click="dayClicked('11')">11</span></li>
  <li class="day12"><span class="day12" @click="dayClicked('12')">12</span></li>
  <li class="day13"><span class="day13" @click="dayClicked('13')">13</span></li>
  <li class="day14"><span class="day14" @click="dayClicked('14')">14</span></li>
  <li class="day15"><span class="day15" @click="dayClicked('15')">15</span></li>
  <li class="day16"><span class="day16" @click="dayClicked('16')">16</span></li>
  <li class="day17"><span class="day17" @click="dayClicked('17')">17</span></li>
  <li class="day18"><span class="day18" @click="dayClicked('18')">18</span></li>
  <li class="day19"><span class="day19" @click="dayClicked('19')">19</span></li>
  <li class="day20"><span class="day20" @click="dayClicked('20')">20</span></li>
  <li class="day21"><span class="day21" @click="dayClicked('21')">21</span></li>
  <li class="day22"><span class="day22" @click="dayClicked('22')">22</span></li>
  <li class="day23"><span class="day23" @click="dayClicked('23')">23</span></li>
  <li class="day24"><span class="day24" @click="dayClicked('24')">24</span></li>
  <li class="day25"><span class="day25" @click="dayClicked('25')">25</span></li>
  <li class="day26"><span class="day26" @click="dayClicked('26')">26</span></li>
  <li class="day27"><span class="day27" @click="dayClicked('27')">27</span></li>
  <li class="day28"><span class="day28" @click="dayClicked('28')">28</span></li>
  <li class="day29"><span class="day29" @click="dayClicked('29')">29</span></li>
  <li class="day30"><span class="day30" @click="dayClicked('30')">30</span></li>
  <li class="day31"><span class="day31" @click="dayClicked('31')">31</span></li>
  
</ul>
  </div>
  <table class = "centerH" id="userRows">
    
  </table>
</main>
</template>

<style>
* {box-sizing: border-box;}
ul {list-style-type: none;}
body {font-family: Verdana, sans-serif;}

.row {
   float:left;
}
.imagee {
  width: 100%;
}

table{
  border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

tr{
     display: flex;
  background-color: #202228;
    color: #ffffff;
    text-align: left;
}

td{
  padding: 12px 15px;
  margin: auto;
}

.centerH {
  display: grid;
	margin: auto;
	margin-top:5px;
}
.month {
  padding: 70px 25px;
  width: 100%;
  background: #202228;
  text-align: center;
}

.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.month .prev {
  float: left;
  padding-top: 10px;
}

.month .next {
  float: right;
  padding-top: 10px;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #ddd;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  color: #666;
  text-align: center;
}

.days {
  padding: 10px 0;
  background: #eee;
  margin: 0;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 13.6%;
  text-align: center;
  margin-bottom: 5px;
  font-size:12px;
  color: #777;
}

.days li .active {
  padding: 5px;
  background: #202228 !important;
  color: white !important
}

.days li .over {
  padding: 5px;
  background: red;
  color: black
}

.days li .under {
  padding: 5px;
  background: green;
  color: white
}

/* Add media queries for smaller screens */
@media screen and (max-width:720px) {
  .row .weekdays li, .days li {width: 13.1%;}
}

@media screen and (max-width: 420px) {
  .row .weekdays li, .days li {width: 12.5%;}
  .row .days li .active {padding: 2px;}
}

@media screen and (max-width: 290px) {
  .row .weekdays li, .days li {width: 12.2%;}
}
</style>