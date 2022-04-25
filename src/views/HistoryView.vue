
<script>

import $ from "jquery";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthNum;

export default {
  data() {
    return {
      month: undefined,
      day: undefined,
      year: undefined,
      
    }
  },

  mounted() {
    this.setCurrentDate();
    this.setNumberDays(this.month);
  },

  methods : {
    setNumberDays(month){
      if(month === "February"){
        $('.day29').hide();
        $('.day30').hide();
        $('.day31').hide();
      }
      else if(month === "November" || month === "June" || month === "September" || month === "April"){
        $('.day31').hide();
      }
      else{
        $('.day29').show();
        $('.day30').show();
        $('.day31').show();
      }
    },

    setCurrentDate() {
      const today = new Date();
      this.day = today.getDate();
      monthNum = today.getMonth()
      this.month = months[monthNum];
      this.year = today.getFullYear(this.month);
      $('.day'+this.day)[1].classList.add("active");
    },

    changeMonth(monthModificator){
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
      
      this.month = months[monthNum];
      this.setNumberDays(this.month)
    }
    
  }
}

</script>

<template>
  <div class="history">
    <div class="month">      
  <ul>
    <li @click="changeMonth(-1)">Previous</li>
    <li @click="changeMonth(1)">Next</li>
    <li>
      {{month}}<br>
      <span style="font-size:18px">{{year}}</span>
    </li>
  </ul>
</div>

<ul class="days">  
  <li class="day1"><span class="day1" @click="dayClicked()">1</span></li>
  <li class="day2"><span class="day2" @click="dayClicked()">2</span></li>
  <li class="day3"><span class="day3" @click="dayClicked()">3</span></li>
  <li class="day4"><span class="day4" @click="dayClicked()">4</span></li>
  <li class="day5"><span class="day5" @click="dayClicked()">5</span></li>
  <li class="day6"><span class="day6" @click="dayClicked()">6</span></li>
  <li class="day7"><span class="day7" @click="dayClicked()">7</span></li>
  <li class="day8"><span class="day8" @click="dayClicked()">8</span></li>
  <li class="day9"><span class="day9" @click="dayClicked()">9</span></li>
  <li class="day10"><span class="day10" @click="dayClicked()">10</span></li>
  <li class="day11"><span class="day11" @click="dayClicked()">11</span></li>
  <li class="day12"><span class="day12" @click="dayClicked()">12</span></li>
  <li class="day13"><span class="day13" @click="dayClicked()">13</span></li>
  <li class="day14"><span class="day14" @click="dayClicked()">14</span></li>
  <li class="day15"><span class="day15" @click="dayClicked()">15</span></li>
  <li class="day16"><span class="day16" @click="dayClicked()">16</span></li>
  <li class="day17"><span class="day17" @click="dayClicked()">17</span></li>
  <li class="day18"><span class="day18" @click="dayClicked()">18</span></li>
  <li class="day19"><span class="day19" @click="dayClicked()">19</span></li>
  <li class="day20"><span class="day20" @click="dayClicked()">20</span></li>
  <li class="day21"><span class="day21" @click="dayClicked()">21</span></li>
  <li class="day22"><span class="day22" @click="dayClicked()">22</span></li>
  <li class="day23"><span class="day23" @click="dayClicked()">23</span></li>
  <li class="day24"><span class="day24" @click="dayClicked()">24</span></li>
  <li class="day25"><span class="day25" @click="dayClicked()">25</span></li>
  <li class="day26"><span class="day26" @click="dayClicked()">26</span></li>
  <li class="day27"><span class="day27" @click="dayClicked()">27</span></li>
  <li class="day28"><span class="day28" @click="dayClicked()">28</span></li>
  <li class="day29"><span class="day29" @click="dayClicked()">29</span></li>
  <li class="day30"><span class="day30" @click="dayClicked()">30</span></li>
  <li class="day31"><span class="day31" @click="dayClicked()">31</span></li>
  
</ul>
  </div>
</template>

<style>
* {box-sizing: border-box;}
ul {list-style-type: none;}
body {font-family: Verdana, sans-serif;}

.month {
  padding: 70px 25px;
  width: 100%;
  background: #1abc9c;
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
  background: #1abc9c;
  color: white !important
}

/* Add media queries for smaller screens */
@media screen and (max-width:720px) {
  .weekdays li, .days li {width: 13.1%;}
}

@media screen and (max-width: 420px) {
  .weekdays li, .days li {width: 12.5%;}
  .days li .active {padding: 2px;}
}

@media screen and (max-width: 290px) {
  .weekdays li, .days li {width: 12.2%;}
}
</style>