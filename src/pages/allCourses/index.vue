<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <h2>所有课程</h2>
      <div class="coursesDiv" :key="index" v-for="(items, index) in courses" v-if="items.length!=0">
        <h3>{{weekArray[index]}}</h3>
        <div class="course" :key="courseIndex" v-for="(course, courseIndex) in items" @click="deleteCourse(course.index, index)">
          <span class="courseTime">{{course.time[1]+1}}-{{course.time[2]+1}}</span>
          <div>
            <span class="courseName">{{course.name}}</span>
            <div class="courseInfo">
              <div class="coursePlace">
                <img src="/static/icons/location.png" alt="">
                <span>{{course.place}}</span>
              </div>
              <!-- <span>第{{course.week[0]}}周至第{{course.week[course.week.length]}}周({{course.week}})</span> -->
              <span>{{course.teacher}}</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      courses: [[], [], [], [], [], [], []],
      weekArray: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ]
    }
  },

  methods: {
    clickHandle (msg, ev) {
    },
    getCourses(){
      let that = this
      
      that.courses = [[], [], [], [], [], [], []]

      const info = wx.getStorageSync('info') || {}
      const courses = wx.getStorageSync('courses')

      // 收集课程
      for(let i=0; i<courses.length; i++){
        courses[i].index = i
        that.courses[courses[i].time[0]].push(courses[i])
      }

      for(let item of that.courses){
      // 排序
        item.sort((a, b)=>a.time[1]-b.time[1])
      }
    },
    deleteCourse(index, number){
      let that = this
      const courses = wx.getStorageSync('courses')

      wx.showModal({
        title: '删除课程',
        content: `确定删除 ${courses[index].name} ？`,
        success: function(res) {
          if (res.confirm) {
            courses.splice(index, 1)
            wx.setStorageSync('courses', courses)
            for(let i=0; i<that.courses[number].length; i++){
              if(that.courses[number][i].index == index){
                that.courses[number].splice(i, 1)

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

  onShow(){
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
  font-size: 20px;
  color: gray;
}

.coursesDiv{
  width: 96%;
  height: auto;
  margin: 0 2%;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
}
.coursesDiv:last-child{
  border: none;
}
.course{
  width: 96%;
  margin: 0 2%;
  height: 70px;
  display: flex;
  flex-direction: row;
  float: left;
}
.course > span.courseTime{
  line-height: 90px;
  height: 90px;
  padding: 0 10px;
  width: 50px;
}
.course > div{
  flex: 1 1 auto;
  display: flex;
  padding: 0 5px;
  height: 70px;
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
  height: 20px;
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
  height: 20px;
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
  z-index: 1000;
}
.btnsDiv img{
  width: 40px;
  height: 40px;
}
</style>
