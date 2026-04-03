import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { colors } from '../constants/colors';
import { PlantAnalysisResponse } from '../types';
import { apiService } from '../services/api';

export const AnalysisScreen: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PlantAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    // 模拟图片分析
    setAnalyzing(true);
    setError(null);

    try {
      // 这里应该调用真实API，先使用模拟数据
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟结果
      const mockResult: PlantAnalysisResponse = {
        plant_type: '绿萝',
        confidence: 0.96,
        has_disease: false,
        diseases: [],
        recommendation: '绿萝生长健康，建议保持适宜的光照和湿度。'
      };

      setResult(mockResult);
    } catch (err: any) {
      setError(err.message || '分析失败');
    } finally {
      setAnalyzing(false);
    }
  };

  const renderDisease = (disease: any, index: number) => (
    <View key={index} style={styles.diseaseCard}>
      <View style={styles.diseaseHeader}>
        <Text style={styles.diseaseTitle}>{disease.name}</Text>
        <View style={[
          styles.severityBadge,
          disease.severity === 'high' && styles.severityHigh,
          disease.severity === 'medium' && styles.severityMedium,
        ]}>
          <Text style={styles.severityText}>
            {disease.severity === 'high' ? '严重' : disease.severity === 'medium' ? '中等' : '轻微'}
          </Text>
        </View>
      </View>
      <Text style={styles.diseaseDescription}>{disease.description}</Text>
      <View style={styles.diseaseTreatment}>
        <Text style={styles.treatmentLabel}>治疗方法:</Text>
        <Text style={styles.treatmentText}>{disease.treatment}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {!analyzing && !result && !error && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={styles.emptyTitle}>植物识别</Text>
            <Text style={styles.emptySubtitle}>
              拍照识别植物品种和病虫害
            </Text>
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={handleAnalyze}
            >
              <Text style={styles.analyzeButtonText}>开始识别</Text>
            </TouchableOpacity>
          </View>
        )}

        {analyzing && (
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color={colors.primary[600]} />
            <Text style={styles.loadingText}>正在分析图片...</Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>{result.plant_type}</Text>
              <Text style={styles.confidence}>
                置信度: {(result.confidence * 100).toFixed(1)}%
              </Text>
            </View>

            {result.has_disease && result.diseases && result.diseases.length > 0 && (
              <View style={styles.diseasesSection}>
                <Text style={styles.sectionTitle}>检测到病虫害</Text>
                {result.diseases.map((disease, index) => renderDisease(disease, index))}
              </View>
            )}

            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>养护建议</Text>
              <Text style={styles.recommendation}>{result.recommendation}</Text>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                setResult(null);
                setError(null);
              }}
            >
              <Text style={styles.saveButtonText}>保存植物</Text>
            </TouchableOpacity>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                setError(null);
                setResult(null);
              }}
            >
              <Text style={styles.retryButtonText}>重试</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  analyzeButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.secondary,
  },
  resultContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[200],
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  confidence: {
    fontSize: 14,
    color: colors.primary[600],
    fontWeight: '600',
  },
  diseasesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  diseaseCard: {
    backgroundColor: colors.danger[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diseaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  severityHigh: {
    backgroundColor: colors.danger[100],
  },
  severityMedium: {
    backgroundColor: colors.warning[100],
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.danger[700],
  },
  diseaseDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  diseaseTreatment: {
    backgroundColor: colors.primary[50],
    padding: 12,
    borderRadius: 8,
  },
  treatmentLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary[700],
    marginBottom: 4,
  },
  treatmentText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  resultSection: {
    marginBottom: 20,
  },
  recommendation: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: colors.secondary[600],
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: colors.danger[50],
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: colors.danger[700],
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.danger[600],
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
