一个小工具
用来检测当前JS代码是否是最新的

原理：
代码打包后，会动态生成一个version.json文件，格式如下：
{
  "hash": "3c8d8462372fece2a35e",
  "date": "2018-11-23 19:21:25"
}
checkVersion.js会fetch这个json文件，拿得到的hash值跟当前main.js的hash值比较，如果一致就认为代码是最新的，如果不一致就认为代码是老的，需要强刷页面更新(用来治疗有些浏览器很强的缓存机制)


本地运行：
1. 执行npm i安装包文件
2. 执行npm start运行，监听8080端口

打包：
执行npm run build，生成dist文件夹用来上线


