import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors } from '../constants/colors';
import { PlantCard } from '../components/PlantCard';
import { Plant } from '../types';
import { apiService } from '../services/api';

export const TabBar: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'analysis' | 'chat'>('home');

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const data = await apiService.getUserPlants();
      setPlants(data);
    } catch (error) {
      console.error('Failed to load plants:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPlant = ({ item }: { item: Plant }) => (
    <PlantCard plant={item} onPress={() => console.log('Plant pressed', item)} />
  );

  return (
    <View style={styles.container}>
      {activeTab === 'home' && (
        <FlatList
          data={plants}
          renderItem={renderPlant}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>🌱</Text>
              <Text style={styles.emptyTitle}>还没有植物</Text>
              <Text style={styles.emptySubtitle}>
                拍照识别你的第一盆植物吧
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={loadPlants}
        />
      )}

      {activeTab === 'analysis' && (
        <View style={styles.centerContent}>
          <Text style={styles.tabText}>📷 拍照识别</Text>
          <Text style={styles.tabSubtext}>识别植物和病虫害</Text>
        </View>
      )}

      {activeTab === 'chat' && (
        <View style={styles.centerContent}>
          <Text style={styles.tabText}>💬 智能问答</Text>
          <Text style={styles.tabSubtext}>随时询问养护问题</Text>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'analysis' && styles.navItemActive]}
          onPress={() => setActiveTab('analysis')}
        >
          <Text style={[styles.navIcon, activeTab === 'analysis' && styles.navIconActive]}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'chat' && styles.navItemActive]}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.navIcon, activeTab === 'chat' && styles.navIconActive]}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  tabSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.primary[200],
  },
  navItem: {
    padding: 12,
  },
  navItemActive: {
    backgroundColor: colors.primary[100],
    borderRadius: 16,
  },
  navIcon: {
    fontSize: 28,
    color: colors.text.disabled,
  },
  navIconActive: {
    color: colors.primary[600],
  },
});
