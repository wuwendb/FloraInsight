# FloraInsight 开发文档

## 项目架构

```
FloraInsight/
├── frontend/                 # React Native 前端
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── screens/         # 页面组件
│   │   ├── navigation/      # 导航配置
│   │   ├── services/        # API 服务
│   │   ├── types/           # TypeScript 类型定义
│   │   ├── constants/       # 常量配置
│   │   └── config/          # 环境配置
│   └── package.json
├── backend/                  # Python 后端
│   ├── app/
│   │   ├── api/             # API 路由
│   │   ├── core/            # 核心配置
│   │   ├── models/          # 数据模型
│   │   ├── schemas/         # Pydantic 模式
│   │   ├── services/        # 业务逻辑
│   │   └── utils/           # 工具函数
│   ├── main.py
│   └── requirements.txt
├── ai/                       # AI 服务
│   ├── cv/                  # 计算机视觉
│   └── llm/                 # 大语言模型
└── docs/                     # 文档
```

## 技术栈

### 前端
- **框架**: React Native + React Native Web
- **UI**: NativeWind (Tailwind CSS)
- **导航**: React Navigation
- **HTTP**: Axios
- **语言**: TypeScript

### 后端
- **框架**: FastAPI
- **语言**: Python 3.9+
- **数据验证**: Pydantic
- **数据库**: SQLite (可扩展)
- **异步**: Async/Await

### AI 服务
- **模型**: OpenAI / DeepSeek Cloud API
- **功能**: 植物识别、病虫害检测、养护建议、智能问答

## 开发环境配置

### 前端环境

1. **安装依赖**:
```bash
cd frontend
npm install
```

2. **配置环境变量**:
```bash
cp .env.example .env.local
```

3. **启动开发服务器**:
```bash
# Web 端
npm run web

# Android
npm run android

# iOS
npm run ios
```

### 后端环境

1. **创建虚拟环境**:
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

2. **安装依赖**:
```bash
pip install -r requirements.txt
```

3. **配置环境变量**:
```bash
cp .env.example .env
# 编辑 .env 文件，填入 API Key
```

4. **启动服务**:
```bash
# 开发模式
python main.py

# 生产模式
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

5. **访问 API 文档**:
```
http://localhost:8000/docs
```

## API 接口设计

### 1. 植物分析
```
POST /api/analysis/analyze
Content-Type: application/json

Request:
{
  "image": "base64_encoded_image"
}

Response:
{
  "plant_type": "绿萝",
  "confidence": 0.96,
  "has_disease": false,
  "diseases": [],
  "recommendation": "..."
}
```

### 2. 养护建议
```
GET /api/care/advice/{plant_id}
```

### 3. 智能问答
```
POST /api/chat
Content-Type: application/json

Request:
{
  "message": "怎么浇水？",
  "plant_name": "绿萝"
}

Response:
{
  "answer": "建议...",
  "plant_advice": "..."
}
```

### 4. 用户植物
```
GET    /api/plants           # 获取用户所有植物
POST   /api/plants           # 添加植物
PUT    /api/plants/{id}      # 更新植物
DELETE /api/plants/{id}      # 删除植物
```

## 部署计划

### 前端部署
1. 构建生产版本
2. 部署到 Vercel / Netlify / GitHub Pages
3. 配置环境变量

### 后端部署
1. 使用 Docker 容器化
2. 部署到云服务器
3. 配置 Nginx 反向代理
4. 使用 Gunicorn + Uvicorn

### 数据库
1. 使用 SQLite (开发)
2. 迁移到 PostgreSQL (生产)
3. 配置数据库备份

## 功能开发进度

### ✅ 已完成
- [x] 项目架构搭建
- [x] 前端基础框架
- [x] 后端 API 框架
- [x] AI 服务接口
- [x] 基础页面组件

### 🚧 进行中
- [ ] 完善植物识别功能
- [ ] 数据库模型完善
- [ ] 用户认证系统
- [ ] 图片上传功能

### 📋 待开发
- [ ] 智能浇水提醒
- [ ] 植物收藏功能
- [ ] 社区分享
- [ ] 多语言支持
- [ ] 暗黑模式

## 开发规范

### Git 提交规范
```
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具相关
```

### 代码风格
- 前端: ESLint + Prettier
- 后端: Black + Flake8

## 常见问题

### 1. 如何切换 AI 提供商？
编辑 `backend/.env` 文件，修改 `DEFAULT_AI_PROVIDER` 变量。

### 2. 如何配置图片识别？
需要集成计算机视觉模型（YOLO、EfficientDet 等）。

### 3. 如何添加新的 API 端点？
在 `backend/app/api/` 下创建新的路由文件，并在 `main.py` 中注册。

## 联系方式

- 项目地址: https://github.com/wuwendb/FloraInsight
- 问题反馈: 提交 GitHub Issue
