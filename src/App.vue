<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const info = wx.getStorageSync('info')||{}

    if(!info.title){
      info.title = '香香课程表'
      info.week = {
        date: '2018-9-3',
        count: 1
      }
      wx.setStorageSync('info', info)
    }

    wx.setNavigationBarTitle({
      title: info.title
    })

    // 连接云开发
    wx.cloud.init({
      env: 'freetes'
    })

    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'test',
    //   success: function(res) {
    //     console.log(res.result.openId)
    //   }
    // })
  }
}
</script>

<style>

page{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "Gamja Flower","Microsoft YaHei","黑体","宋体",sans-serif;
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
}

button{
  background-color: #fff;
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
