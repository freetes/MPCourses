<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="content">
      <h3>关于</h3>
      <p>这是一个课程表小程序，balabala......</p>
    </div>

    <div class="content">
      <h3>使用教程</h3>
      <p>待续......</p>
    </div>

    <div class="content">
      <h3>Future</h3>
      <p>* 多个课表（添加/查看TA的课表）</p>
      <p>* 课程标签</p>
      <p>* 提示语+问候语</p>
    </div>

    <div class="content">
      <h3>更新历史</h3>
      <h5>2018-9-15 左滑/右滑即可查看前一天/后一天的课表</h5>
      <h5>2018-9-14 新增云数据库</h5>
      <p>导航：设置界面->数据设置</p>
      <p>* 麻麻再也不用担心数据丢失啦</p>
      <p>* 可以随便换手机啦</p>
      <h5>2018-9-11 新增设置页面</h5>
      <p>* 可以随意修改APP名称</p>
      <p>* 可以修改第一周第一天的日期，更加人性化~</p>
      <h5>2018-9-10</h5>
      <p>* 将添加课程独立为单独页面</p>
      <p>* 修复了课程分类的bug，并优化了</p>
      <p>* 一些美化</p>
      <h5>2018-9-9</h5>
      <p>* 完成删除课程功能</p>
      <p>* 新增全部课程页，更好的管理课程~</p>
      <p>* 新增关于页，可以看到更新历史啦</p>
      <p>* 小程序上线~（手动烟花）</p>
    </div>

    <div class="content">
      <h3>欢迎反馈~</h3>
    </div>
    <p class="endWords">made with ❤️</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      courses: [],
    }
  },

  methods: {
    clickHandle (msg, ev) {
    },
  },

  onShow(){
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  padding: 0 3%;
  font-weight: lighter;
  font-size: 18px;
}
.content{
  width: 100%;
  margin: 5px 0;
}
.content:last-child{
  border: none;
}
h2{
  margin: 8px 5px;
  font-size: 26px;
  font-weight: bold;  
  border-bottom: 1px solid lightgray;
}
h3{
  margin: 5px;
  font-size: 22px;
  font-weight: normal;
  border-bottom: 1px solid lightgray;
}
h4{
  margin: 5px;
  font-size: 20px;
  font-weight: normal;
}
h5{
  margin: 5px;
  font-weight: normal;
}
p{
  margin: 5px 10px;
}

p.endWords{
  margin: 0;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
