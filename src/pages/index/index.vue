<template>
  <div class="container">
    <h2>{{week}}</h2>
    <h3>第{{count}}周</h3>
    <div class="coursesDiv">
      <div class="course" :key="index" v-for="(course, index) in courses" @longtap="deleteCourse(course.index)">
        <span class="courseTime">{{course.time[1]+1}}-{{course.time[2]+1}}</span>
        <div>
          <span class="courseName">{{course.name}}</span>
          <div class="courseInfo">
            <div class="coursePlace">
              <img src="/static/icons/location.png" alt="">
              <span>{{course.place}}</span>
            </div>
            <span>{{course.teacher}}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="btnsDiv">
      <div v-show="showMenu">
        <img @click="gotoPage('/pages/about/main')" src="/static/icons/about.png">
      </div>
      <div v-show="showMenu">
        <img @click="gotoPage('/pages/setting/main')" src="/static/icons/setting.png">
      </div>
      <div v-show="showMenu">
        <img @click="gotoPage('/pages/addCourse/main')" src="/static/icons/add.png">
      </div>
      <div v-show="showMenu">
        <img @click="gotoPage('/pages/allCourses/main')" src="/static/icons/all.png">
      </div>
      <img @click="showMenu=!showMenu" src="/static/icons/menu.png">
    </div>
  </div>
</template>

<script>
import dateUtil from '@/utils/date'
import addCourseCard from '@/components/addCourse'

export default {
  data () {
    return {
      week: '',
      count: '',
      courses: [],
      showMenu: false
    }
  },

  methods: {
    gotoPage(url){
      wx.navigateTo({url})
    },
    getCourses(){
      let that = this
      
      this.showAddCourse = false
      this.courses = []

      const info = wx.getStorageSync('info') || {}
      const courses = wx.getStorageSync('courses')

      that.count = parseInt((new Date(Date.now()) - new Date(info.week.date))/1000/60/60/24/7) + info.week.count
      that.week = dateUtil.getWeek(Date.now())

      // 收集课程
      for(let i=0; i<courses.length; i++){
        // 判断是否在周数内和是否是今天
        courses[i].time[0]++
        courses[i].time[0] == 7?courses[i].time[0]=0:''
        
        if(courses[i].week.indexOf(that.count-1)!=-1 && courses[i].time[0] == new Date(Date.now()).getDay()){
          courses[i].index = i
          that.courses.push(courses[i])
        }
      }

      // 排序
      this.courses.sort((a, b)=>a.time[1]-b.time[1])
    },
    deleteCourse(index){
      let that = this
      const courses = wx.getStorageSync('courses')

      wx.showModal({
        title: '删除课程',
        content: `确定删除 ${courses[index].name} ？`,
        success: function(res) {
          if (res.confirm) {
            courses.splice(index, 1)
            wx.setStorageSync('courses', courses)
            for(let i=0; i<that.courses.length; i++){
              if(that.courses[i].index == index){
                that.courses.splice(i, 1)

                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          } 
          else if (res.cancel) {
          }
        }
      })
    }
  },

  onShow () {
    this.getCourses()
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  padding: 0 3%;
}
h2{
  margin: 8px 5px;
  font-size: 26px;
  font-weight: bold;  
}
h3{
  margin: 5px;
  margin-top: 0;
  font-size: 18px;
  color: gray;
}

.coursesDiv{
  width: 96%;
  margin: 0 2%;
}
.course{
  width: 96%;
  margin: 0 2%;
  height: 80px;
  display: flex;
  flex-direction: row;
  float: left;
}
.course > span.courseTime{
  line-height: 80px;
  height: 80px;
  padding: 0 10px;
  width: 50px;
}
.course > div{
  flex: 1 1 auto;
  display: flex;
  padding: 5px 5px;
  height: 80px;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid lightgray;
}
.coursesDiv > .course:last-child > div{
  border: none;
}
.course > div > span.courseName{
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
.course > div > div.courseInfo{
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #8a8a8a;
  font-size: 16px;
}
.course > div > div.courseInfo > div.coursePlace{
  display: flex;
  flex-direction: row;
  height: 30px;
  justify-content: flex-start;
  align-items: center;
}
.course > div > div.courseInfo > div.coursePlace > img{
  width: 20px;
  height: 20px;
}

.btnsDiv{
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  display: flex;
  flex-direction: column;
  z-index: 9999;
}
.btnsDiv img{
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
}
</style>
