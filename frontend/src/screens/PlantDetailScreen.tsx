import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { colors } from '../constants/colors';
import { Plant } from '../types';

interface PlantDetailScreenProps {
  route: {
    params: {
      plant: Plant;
    };
  };
}

export const PlantDetailScreen: React.FC<PlantDetailScreenProps> = ({ route }) => {
  const { plant } = route.params;

  const careData = {
    water: '每周2-3次',
    sunlight: '半阴环境',
    humidity: '60-80%',
    temperature: '18-28°C',
    fertilizer: '每月1次，使用通用植物肥',
    other_care: '定期清理叶片，保持通风良好',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>← 返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>植物详情</Text>
        </View>

        <View style={styles.content}>
          {plant.image && (
            <Image source={{ uri: plant.image }} style={styles.plantImage} />
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.scientificName}>{plant.scientificName}</Text>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>养护详情</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>💧 浇水</Text>
                <Text style={styles.infoValue}>{careData.water}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>☀️ 光照</Text>
                <Text style={styles.infoValue}>{careData.sunlight}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>🌡️ 温度</Text>
                <Text style={styles.infoValue}>{careData.temperature}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>💨 湿度</Text>
                <Text style={styles.infoValue}>{careData.humidity}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>🌱 施肥</Text>
                <Text style={styles.infoValue}>{careData.fertilizer}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>📝 其他</Text>
                <Text style={styles.infoValue}>{careData.other_care}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>💬 咨询养护专家</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primary[600],
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  plantImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  scientificName: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[100],
  },
  infoLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  chatButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
