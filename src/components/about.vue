<template>
  <div class="about">
    <loading :isOpen="isOpen"></loading>
    <header>
      <select v-model="selected" @change="changeCity">
        <option v-for="city in cityList" :value="city.id">{{city.name}}</option>
      </select>
      <select v-model="mType" @change="changeType">
        <option value="in_theaters">正在上映</option>
        <option value="coming_soon">即将上映</option>
      </select>&nbsp;&nbsp;共{{total}}个
    </header>
    <div class="m-wrap">
      <div v-for="m in arr">
        <a :href="m.alt">
          <img :src="m.images.medium" alt="">
          <div class="right">
            <h3 class="m-title">{{m.title}}</h3>
            <span :class="{'high' : m.rating.average >= 8, 'low' : m.rating.average <= 6}">{{m.rating.average | handleNoStar}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import loading from './Loading'
  export default {
    name: 'about',
    components:{loading},
    data() {
      return {
        isOpen:true,
        selected: localStorage.city || 108288,
        cityList:[],
        total:0,
        mType: localStorage.mType || 'in_theaters',
        arr:[]
      }
    },
    mounted(){
      this.loadCityList();
      this.loadData(this.selected,this.mType);
    },
    methods:{
      loadCityList() {
        this.$http.jsonp('https://api.douban.com/v2/loc/list',{
          params:{count:48}
        })
        .then(function(res){
          this.cityList = res.body.locs;
          // console.log(res.body.locs)
        })
      },
      loadData(cityId,type){
        this.isOpen = true;
        this.$http.jsonp('https://api.douban.com/v2/movie/'+type,{params:{
             city:cityId,
             count:100
        }})
        .then(function(res){
          let data = res.body;
          this.arr = this.handleData(data.subjects,type);
          this.isOpen= false;
          console.log(data.subjects)
        })
      },
      handleData(data,type){
        var filterArr = [];
        if (type === 'in_theaters') {
            filterArr = data.sort(function(a,b){
              return b.rating.average - a.rating.average
            })
        } else {
          filterArr = data;
        }
        this.total = filterArr.length;
        return filterArr;
      },
      changeCity() {
        this.loadData(this.selected,this.mType);
        localStorage.city = this.selected;
      },
      changeType() {
        this.loadData(this.selected,this.mType);
        localStorage.mType = this.mType;
      }
    },
    filters: {
      handleNoStar(v){
        if(v === 0){
          return '暂无评分'
        } else {
          return v
        }
      }
    }
  }
</script>


<style scoped>
.about {
  overflow: hidden;
}
header {
  text-align: center;
  padding: 1rem 0;
  background: #34495E;
  color: #fff;
  letter-spacing: 1px;
  position: fixed;
  width:100%;
}
select {
  appearance:none;
  -webkit-appearance:none;
  -webkit-appearance: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  outline:none；
}
.m-wrap {
  margin: 3.3rem 0;
}
.m-wrap div a {
  display: block;
  overflow: hidden;
  padding: 1rem 1rem 1rem 0;
  text-decoration: none;
  border-bottom: 1px solid #BDC3C7;
  background: #ECF0F1;
}
.m-wrap div a img {
  display: inline-block;
  float: left;
  margin:0 2rem;
  width: 30%;
}
.m-wrap div .right {
  color: #2C3E50;
}
.high {
  color:#FF4949;
}
.low {
  color: #13CE66;
}
.right span {
  font-size: 1.4rem;
}
</style>