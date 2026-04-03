from openai import OpenAI
from typing import Optional
import os
from .config import get_settings

settings = get_settings()

class AIService:
    def __init__(self):
        self.client = None
        self._initialize_client()

    def _initialize_client(self):
        """Initialize AI client based on configured provider"""
        provider = settings.DEFAULT_AI_PROVIDER.lower()

        if provider == "deepseek":
            self.client = OpenAI(
                api_key=settings.DEEPSEEK_API_KEY,
                base_url="https://api.deepseek.com"
            )
        else:  # default to OpenAI
            self.client = OpenAI(api_key=settings.OPENAI_API_KEY)

    async def analyze_plant(self, image_description: str) -> dict:
        """
        Analyze plant image and detect diseases
        """
        if not self.client:
            self._initialize_client()

        prompt = f"""你是一个专业的植物学家和园艺专家。请分析以下植物特征并识别：

植物特征：{image_description}

请提供以下信息：
1. 植物名称（中文）
2. 置信度（0-100）
3. 是否有病虫害
4. 病虫害描述和严重程度（如果有）
5. 建议的处理方法

返回 JSON 格式：
{{
    "plant_type": "植物名称",
    "confidence": 0.95,
    "has_disease": false,
    "diseases": [],
    "recommendation": "建议"
}}"""

        try:
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "你是一个专业的植物学家和园艺专家，擅长植物识别和病虫害诊断。"},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.3
            )

            return {
                "success": True,
                "data": eval(response.choices[0].message.content)
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    async def get_care_advice(self, plant_info: str) -> dict:
        """
        Get personalized plant care advice
        """
        if not self.client:
            self._initialize_client()

        prompt = f"""作为专业的植物养护专家，请根据以下植物信息提供详细的养护建议：

植物信息：{plant_info}

请提供：
1. 浇水频率（每周几次）
2. 阳光需求（全日照/半阴/喜阴）
3. 温度要求（摄氏度）
4. 湿度要求
5. 施肥建议
6. 其他特殊护理要点

返回 JSON 格式：
{{
    "water": "每周2-3次",
    "sunlight": "半阴环境",
    "humidity": "60-80%",
    "temperature": "18-28°C",
    "fertilizer": "每月1次，使用通用植物肥",
    "other_care": "其他建议"
}}"""

        try:
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "你是一个专业的植物养护专家，擅长为植物提供个性化的养护建议。"},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.4
            )

            return {
                "success": True,
                "data": eval(response.choices[0].message.content)
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    async def chat_with_plant(self, message: str, context: Optional[dict] = None) -> dict:
        """
        Chat with the AI about plant care
        """
        if not self.client:
            self._initialize_client()

        plant_context = ""
        if context and context.get("plant_name"):
            plant_context = f"你正在与一个叫 '{context['plant_name']}' 的植物对话，这个植物通常有以下特征："

        prompt = f"""{plant_context}
用户正在询问关于植物养护的问题：
"{message}"

请用亲切、专业、易懂的语气回答，就像在和一个真正的朋友聊天一样。
如果用户提到具体的植物，请根据植物养护知识提供准确的建议。
不要用过于专业的术语，要让普通用户也能轻松理解。"""

        try:
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "你是一个亲切、专业的植物养护助手，擅长用通俗易懂的语言解答植物养护问题。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )

            return {
                "success": True,
                "answer": response.choices[0].message.content
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

# Singleton instance
ai_service = AIService()
