# 教学项目脚手架 — Node.js + Vue3 + MySQL

本示例提供最小可运行的全栈教学示例（用户注册/登录、课程 CRUD、前端登录与课程列表），便于课堂教学与扩展练习。

快速启动（本地 Docker）：
1. 复制 .env.example 为 .env 并调整（如需）。
2. docker-compose up --build
3. 后端 API: http://localhost:3000/api
4. 前端: http://localhost:5173

注意：
- MySQL 数据库初始化脚本位于 db/init.sql（docker compose 会在第一次启动后手动导入，或你也可以手动导入）。
- 这是教学 scaffold，生产请加更多安全、日志、错误处理与配置。
