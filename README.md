# ZiJin
vue+mongodb后台管理

npm init     -- 项目初始化
cnpm i gravatar   -- 全球公认头像，注册用

----------------------------以下命令不需执行，为开发时的备注------------------------------------------------------------------------
npm install express
npm install mongoose    
npm install body-parser
npm i bcrypt-nodejs   -- https://www.npmjs.com/package/bcrypt-nodejs
cnpm i gravatar
cnpm i jsonwebtoken  -- https://www.npmjs.com/package/jsonwebtoken
----191225
cnpm install  passport-jwt passport

--------后端接口搭建完成后，更改原项目的文件夹名 node-app ==> node-vue-ele-app ,然后打开文件夹，输入命令行
vue create client
选择第二项：Manually select features
       安装模块，选择 第一个babel，router， vuex
运行测试后，
       选择Y  --> mode for router 
选择In package.json

cnpm install concurrently   -- 将多个终端启动的项目绑定到一块，连载

cd client   cnpm i element-ui -S

--2020-02-28
cd client  cnpm install axios -S
cd client  cnpm install jwt-decode


拷贝文件,如果版本没有加 -S 还需执行如下
cnpm install  passport-jwt passport passport-strategy jsonwebtoken  jws  -D -S
