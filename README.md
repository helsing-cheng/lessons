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

本地（不使用 Docker）运行说明（Node + 本地 MySQL）

如果你希望在本机直接用 Node.js 启动后端、前端，并使用本地安装的 MySQL，可以按下列步骤操作：

1) 准备 MySQL
- 确保已安装并运行 MySQL（推荐 8.x）。
- 在 MySQL shell 中或用你的数据库工具执行：

  CREATE DATABASE teaching CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  CREATE USER 'teach'@'localhost' IDENTIFIED BY 'teachpass';
  GRANT ALL PRIVILEGES ON teaching.* TO 'teach'@'localhost';
  FLUSH PRIVILEGES;

- 导入建表脚本（项目根目录下）：
  mysql -u root -p teaching < db/init.sql
  或（使用 teach 用户）：
  mysql -u teach -pteachpass teaching < db/init.sql

2) 配置项目环境变量
- 复制并编辑文件：
  cp .env.example .env
- 确保 .env 中 DB_HOST=localhost，DB_USER/DB_PASS/DB_NAME 与上面一致，设置 JWT_SECRET

3) 启动后端（开发模式）
- 进入 backend 目录并安装依赖：
  cd backend
  npm install
- 启动服务（开发用 nodemon）：
  npm run dev
- 后端默认监听： http://localhost:3000

说明：开发环境下，后端会自动同步 Sequelize 模型到数据库以方便演示（不会在生产环境打开）。

4) 启动前端
- 在另一个终端：
  cd frontend
  npm install
  npm run dev
- 前端默认： http://localhost:5173

5) 测试
- 打开浏览器访问 http://localhost:5173，或使用 Postman 测试后端 API（例如 POST http://localhost:3000/api/auth/register）

脚本帮助
- 本仓库新增了 scripts/init-db.sh，可用于通过 mysql 客户端导入 db/init.sql（需要本机已安装 mysql 客户端并提供用户名/密码）。

常见问题
- 如果前端无法请求后端，请检查 frontend/src/api/http.js 的 baseURL 或在启动前设置 VITE_API_BASE 环境变量为 http://localhost:3000/api
- 若你想使用 sqlite 进行快速开发，请告诉我，我可以把项目改成可选 sqlite 存储。
