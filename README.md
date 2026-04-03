# 慧眼识植 (FloraInsight) - AI 智能植株管家

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

针对现代都市人群"想养花但养不活"的痛点，开发一款基于移动端（App/H5/小程序）+ 计算机视觉 (CV) + 大语言模型 (LLM) 的智能应用。

## 核心功能

- 📷 **拍照识别植物**：一键识别植物品种
- 🦠 **病害诊断**：自动检测植物病虫害
- 💧 **养护建议**：个性化的植物护理指南
- 💬 **智能问答**：随时咨询养护专家
- ⏰ **浇水提醒**：智能浇水提醒服务

## 技术栈

### 前端
- **框架**: React Native + React Native Web
- **UI**: NativeWind (Tailwind CSS)
- **导航**: React Navigation
- **语言**: TypeScript

### 后端
- **框架**: FastAPI (Python)
- **数据验证**: Pydantic
- **数据库**: SQLite
- **异步**: Async/Await

### AI 服务
- **模型**: OpenAI / DeepSeek Cloud API
- **功能**:
  - 植物识别与分类
  - 病虫害检测
  - 养护知识问答
  - 个性化建议生成

## 项目架构

```
FloraInsight/
├── frontend/                 # React Native 前端
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── screens/         # 页面组件
│   │   ├── navigation/      # 导航配置
│   │   ├── services/        # API 服务
│   │   ├── types/           # TypeScript 类型
│   │   ├── constants/       # 常量配置
│   │   └── config/          # 环境配置
│   ├── package.json
│   └── tailwind.config.js
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
├── ai/                       # AI 服务配置
├── docs/                     # 开发文档
├── scripts/                  # 工具脚本
└── README.md
```

## 快速开始

### 环境要求

- Node.js 18+
- Python 3.9+
- Git

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/wuwendb/FloraInsight.git
cd FloraInsight
```

#### 2. 启动后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 启动服务
python main.py
```

访问 http://localhost:8000/docs 查看 API 文档

#### 3. 启动前端

```bash
cd frontend

# 安装依赖
npm install

# 启动 Web 端
npm run web
```

浏览器访问 http://localhost:19006

## API 接口

### 植物识别
```
POST /api/analysis/analyze
```

### 养护建议
```
GET /api/care/advice/{plant_id}
```

### 智能问答
```
POST /api/chat
```

### 用户植物
```
GET    /api/plants
POST   /api/plants
PUT    /api/plants/{id}
DELETE /api/plants/{id}
```

详细文档请查看 [开发文档](docs/DEVELOPMENT.md)

## 功能开发进度

### ✅ 已完成
- [x] 项目架构搭建
- [x] 前端基础框架
- [x] 后端 API 框架
- [x] AI 服务接口
- [x] 基础页面组件
- [x] 项目文档

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

## 配置 AI 提供商

项目支持两个 AI 提供商：OpenAI 和 DeepSeek

### 使用 OpenAI

编辑 `backend/.env`:
```env
DEFAULT_AI_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview
```

### 使用 DeepSeek

编辑 `backend/.env`:
```env
DEFAULT_AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=your-deepseek-api-key
DEEPSEEK_MODEL=deepseek-chat
```

## 开发指南

详细的开发文档和规范请查看 [DEVELOPMENT.md](docs/DEVELOPMENT.md)

### 提交规范

```
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建
```

## 许可证

[MIT](LICENSE)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- 项目地址: https://github.com/wuwendb/FloraInsight
- 问题反馈: [GitHub Issues](https://github.com/wuwendb/FloraInsight/issues)
