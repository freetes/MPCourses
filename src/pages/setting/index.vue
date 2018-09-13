<template>
  <div class="container">
    <h3>通用设置</h3>
    <div class="inputGroup">
      <label for="title">标题</label>
      <input type="text" @change="changeValue('title', $event)" :value="data.title" id="title">
    </div>
    <!-- <div class="inputGroup">
      <label for="classColor">顶部颜色</label>
      <input type="text" @change="changeValue('color', $event)" :value="data.color" id="classColor">
      <div :style="{width: '20px', height: '20px', backgroundColor: data.color}"></div>
    </div> -->

    <h3>课表设置</h3>
    <div class="inputGroup">
      <label for="classWeek">第一周日期</label>
      <picker mode="date" fields="day" @change="changeValue('week', $event)" :value="data.week" id="classWeek">
        <view>{{data.week==''?'请选择':data.week}}</view>
      </picker>
    </div>
    <div class="btnsDiv">
      <span @click="resetData">重置</span>
      <span class="submit" @click="changeInfo">确定修改</span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      data: {
        title: '',
        week: '',
      },
    }
  },

  methods: {
    changeValue(node, e){
      this.data[node] = e.target.value
    },
    resetData(){
      const info = wx.getStorageSync('info')
      let that = this

      that.data = {
        title: info.title || '',
        week: info.week.date || '',
      }
    },
    changeInfo(){
      let that = this

      let info = {
        title: that.data.title,
        week: {
          date: that.data.week,
          count: 1
        }
      }

      console.log(info)
      wx.setNavigationBarTitle({
        title: info.title
      })
      wx.setStorageSync('info', info)

      wx.setNavigationBarTitle({
        title: info.title
      })
    }
  },

  onShow () {
    // 调用应用实例的方法获取全局数据
    this.resetData()
  }
}
</script>

<style scoped>
.container{
  position: absolute;
  left: 0;
  top: 0;
  width: 96%;
  height: auto;
  margin: 0 2%;
  padding: 10px 2%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 9999;
  background-color: #fff;
}

h3{
  margin-top: 5px;
  color: gray;
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
.btnsDiv > .submit{
  margin-left: 10px;
  flex: 1 1 auto;
}
</style>
