from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum

class DiseaseSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Disease(BaseModel):
    name: str
    description: str
    severity: DiseaseSeverity
    treatment: str

class PlantAnalysisResponse(BaseModel):
    plant_type: str = Field(..., description="植物名称")
    confidence: float = Field(..., description="识别置信度 (0-1)")
    has_disease: bool = Field(..., description="是否有病虫害")
    diseases: List[Disease] = Field(default_factory=list, description="病虫害列表")
    recommendation: str = Field(..., description="总体建议")

class CareAdviceResponse(BaseModel):
    water: str = Field(..., description="浇水建议")
    sunlight: str = Field(..., description="光照建议")
    humidity: str = Field(..., description="湿度建议")
    temperature: str = Field(..., description="温度建议")
    fertilizer: str = Field(..., description="施肥建议")
    other_care: str = Field(..., description="其他护理要点")

class ChatRequest(BaseModel):
    message: str = Field(..., description="用户的问题")
    plant_name: Optional[str] = Field(None, description="上下文中提到的植物名称")

class ChatResponse(BaseModel):
    answer: str = Field(..., description="AI的回答")
    plant_advice: Optional[str] = Field(None, description="针对植物的具体建议")
