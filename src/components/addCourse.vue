<template>
  <div class="container" v-if="visibility">
    <div class="inputGroup">
      <label for="className">课名</label>
      <input type="text" @change="changeValue('name', $event)" :value="data.name" id="className">
    </div>
    <div class="inputGroup">
      <label for="classPlace">教室</label>
      <input type="text" @change="changeValue('place', $event)" :value="data.place" id="classPlace">
    </div>
    <div class="inputGroup">
      <label for="classWeek">周数</label>
      <picker mode="multiSelector" @change="changeWeek($event)" :value="data.week" :range="weekMultiArray" id="classTime">
        <view>{{weekViewText==''?'请选择':weekViewText}}</view>
      </picker>
    </div>
    <div class="inputGroup">
      <label for="classTime">节数</label>
      <picker mode="multiSelector" @change="changeValue('time', $event)" :value="data.time" :range="timeMultiArray" id="classTime">
        <view>{{data.time==''?'请选择':timeMultiArray[0][data.time[0]] +' '+ timeMultiArray[1][data.time[1]] + timeMultiArray[2][data.time[2]]}}</view>
      </picker>
    </div>
    <div class="inputGroup">
      <label for="classTeacher">老师</label>
      <input type="text" @change="changeValue('teacher', $event)" :value="data.teacher" id="classTeacher">
    </div>
    <div class="btnsDiv">
      <span @click="resetData">清空</span>
      <span class="addCourseBtn" @click="addCourse">添加课程</span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      data: {
        name: '',
        place: '',
        week: '',
        time: '',
        teacher: ''
      },
      weekMultiArray: [['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], ['全部', '单周', '双周']],
      timeMultiArray: [['周一', '周二', '周三', '周四', '周五', '周六', '周日'], ['第1节', '第2节', '第3节', '第4节', '第5节', '第6节', '第7节', '第8节', '第9节', '第10节', '第11节'], ['到1节', '到2节', '到3节', '到4节', '到5节', '到6节', '到7节', '到8节', '到9节', '到10节', '到11节']],
      weekViewText: ''
    }
  },

  props: ['visibility'],

  methods: {
    addCourse(){
      let that = this
      console.log(that.data)
      const courses = wx.getStorageSync('courses') || []

      courses.unshift({
        name: that.data.name,
        place: that.data.place,
        week: that.data.week,
        time: that.data.time,
        teacher: that.data.teacher,
      })

      wx.setStorageSync('courses', courses)

      wx.showToast({
        title: '添加课程成功~',
        icon: 'success',
        duration: 2000
      })

      this.$emit('update-courses')
    },
    changeValue(node, e){
      this.data[node] = e.target.value
    },
    resetData(){
      this.data = {
        name: '',
        place: '',
        week: '',
        time: '',
        teacher: ''
      }
    },
    changeWeek(e){
      let that = this

      that.data.week = []
      that.weekViewText = '第'+that.weekMultiArray[0][e.target.value[0]] + '周-第' + that.weekMultiArray[1][e.target.value[1]] + '周 ' + that.weekMultiArray[2][e.target.value[2]]
      if(e.target.value[2] == 0){
        for(let i=e.target.value[0]; i<=e.target.value[1]; i++)
          that.data.week.push(i)
      }
      else if(e.target.value[2] == 1){
        for(let i=e.target.value[0]; i<=e.target.value[1]; i++){
          if(i%2 == 0)
            that.data.week.push(i)
        }
      }
      else{
        for(let i=e.target.value[0]; i<=e.target.value[1]; i++){
          if(i%2 == 1)
            that.data.week.push(i)
        }
      }
    }
  },

  onShow () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>

<style scoped>
.container{
  position: absolute;
  left: 0;
  top: 0;
  width: 94%;
  height: auto;
  margin: 0 3%;
  padding: 10px 2%;
  margin-top: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 9999;
  background-color: #fff;
}

.inputGroup{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  height: 50px;
  margin: 5px 5%;
  border-bottom: 1px solid lightgray;
}
.inputGroup > label{
  color: gray;
}
.inputGroup > input, .inputGroup > picker{
  padding: 0 5px;
  flex: 1 1 auto;
  text-align: right;
}

.btnsDiv{
  width: 90%;
  margin: 5px 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.btnsDiv > span{
  width: auto;
  border: 1px solid lightgray;
  padding: 5px 10px;
  text-align: center;
}
.btnsDiv > .addCourseBtn{
  margin-left: 10px;
  flex: 1 1 auto;
}
</style>
