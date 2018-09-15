<template>
  <div class="container">
    <h3>通用设置</h3>
    <div class="inputGroup">
      <label for="title">标题</label>
      <input type="text" @change="changeValue('title', $event)" :value="data.title" id="title">
    </div>

    <h3>课表设置</h3>
    <div class="inputGroup">
      <label for="classWeek">第一周日期</label>
      <picker mode="date" fields="day" @change="changeValue('week', $event)" :value="data.week" id="classWeek">
        <view>{{data.week==''?'请选择':data.week}}</view>
      </picker>
    </div>

    <div class="btnsDiv">
      <span @click="resetData">重置</span>
      <span @click="changeInfo">确定修改</span>
    </div>

    <h3>数据设置</h3>
    <div class="btnsDiv">
      <span @click="pullFromCloud">拉取数据</span>
      <span @click="updateToCloud">上传数据至云</span>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database()

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
      let that = this

      that.data = {
        title: '香香的课程表',
        week: '2018-9-3'
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

      wx.setNavigationBarTitle({
        title: info.title
      })
      wx.setStorageSync('info', info)

      wx.setNavigationBarTitle({
        title: info.title
      })
    },
    updateToCloud(){
      wx.showModal({
        title: '上传数据',
        content: `确定上传本地数据到云服务器？`,
        success: function(res) {
          if (res.confirm) {
            // 获取openid
            wx.cloud.callFunction({
              // 云函数名称
              name: 'test',
              success: function(res) {
                const openid = res.result.openId

                // 获取数据
                db.collection('courses').where({
                  _openid: openid,
                })
                .get({
                  success: function(res) {
                    let courses = wx.getStorageSync('courses')
                    console.log(res.data)

                    if(res.data.length == 0){

                      // 保存至数据库
                      db.collection('courses').add({
                        data: {
                          courses,
                          date: new Date(Date.now()),
                        },
                        success: function(res) {
                          wx.showToast({
                            title: '第一次上传到云数据成功~',
                            icon: 'success',
                            duration: 2000
                          })
                        }
                      })
                    }
                    else{
                      db.collection('courses').doc(res.data[0]._id).update({
                        data: {
                          courses,
                          date: new Date(Date.now()),
                        },
                        success: function(res) {
                          wx.showToast({
                            title: '更新云数据成功~',
                            icon: 'success',
                            duration: 2000
                          })
                        }
                      })
                    }
                  }
                })
              }
            })
          } 
          else if (res.cancel) {
          }
        }
      })
    },
    pullFromCloud(){
      // 获取openid
      wx.cloud.callFunction({
        // 云函数名称
        name: 'test',
        success: function(res) {
          const openid = res.result.openId

          db.collection('courses').where({
            _openid: openid,
          })
          .get({
            success: function(res) {
              if(res.data.length == 0){
                wx.showToast({
                  title: '我这里没有你的数据额。。。请先上传',
                  icon: 'none',
                  duration: 2000
                })
              }
              else{
                let data = res.data[0]

                wx.showModal({
                  title: '替换数据',
                  content: `确定替换掉本地数据？`,
                  success: function(res) {
                    if (res.confirm) {
                      wx.setStorageSync('courses', data.courses)
                      wx.showToast({
                        title: '替换成功~',
                        icon: 'success',
                        duration: 2000
                      })
                    } 
                    else if (res.cancel) {
                    }
                  }
                })          
              }
            }
          })
        }
      })
    }
  },

  onShow () {
    const info = wx.getStorageSync('info')

    this.data = {
      title: info.title || '',
      week: info.week.date || '',
    }
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
