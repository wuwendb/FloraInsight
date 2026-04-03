# FloraInsight 快速启动指南

## 5分钟快速开始

### 第一步：准备环境

确保已安装：
- Node.js 18+
- Python 3.9+
- Git

### 第二步：克隆仓库

```bash
cd D:/software/aaa
git clone https://github.com/wuwendb/FloraInsight.git
cd FloraInsight
```

### 第三步：配置后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，填入你的 API Key（可选，默认使用模拟数据）
# OPENAI_API_KEY=your-key-here
# DEEPSEEK_API_KEY=your-key-here
```

### 第四步：启动后端服务

```bash
# 启动 FastAPI 服务
python main.py
```

访问 http://localhost:8000/docs 查看 API 文档

### 第五步：配置前端

```bash
cd frontend

# 安装依赖
npm install
```

### 第六步：启动前端

```bash
# Web 端（推荐用于测试）
npm run web

# 或使用 Expo 扫码体验移动端
npm start
```

## 使用示例

### 1. 使用 Web 端

浏览器访问: http://localhost:19006

### 2. 使用 API

```bash
# 植物识别
curl -X POST http://localhost:8000/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_encoded_image"}'

# 智能问答
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "绿萝怎么浇水？"}'
```

## 测试数据

当前使用模拟数据测试，无需 API Key。

如需真实功能：
1. 注册 OpenAI 或 DeepSeek 账户
2. 获取 API Key
3. 填入 `backend/.env` 文件

## 下一步

1. 阅读完整文档: [DEVELOPMENT.md](./DEVELOPMENT.md)
2. 查看 API 文档: http://localhost:8000/docs
3. 开始开发你的功能

## 常见问题

**Q: 端口被占用怎么办？**

A: 修改 `backend/main.py` 或 `frontend/.env` 中的端口配置。

**Q: 如何配置图片上传？**

A: 参考 `backend/app/api/` 中的文件上传示例。

**Q: 需要数据库吗？**

A: 当前使用模拟数据，如需持久化存储可配置数据库。

## 获取帮助

遇到问题？
1. 查看 GitHub Issues
2. 阅读开发文档
3. 提交新的 Issue
