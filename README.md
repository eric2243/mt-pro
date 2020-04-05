### 代码说明
##### webApp  网页应用


##### webapp
* 简介：项目页面逻辑源码
* 运行：


1. 安装依赖：
```
npm install
```


2. dev环境服务启动：
```
npm run start
```

3. build环境服务启动：
```
npm run build
```
*启动build之后，项目打包过后的文件会自动复制到meituanServer的public文件下*

4.后台数据一开始采用express搭建node环境动态获取,由于爬取的真实数据不定时会更改反爬措    施,故之后采用静态数据,dev环境启动后需要在dev目录下新建json文件夹,把项目根目录static/json下文件复制到dev/json目录下