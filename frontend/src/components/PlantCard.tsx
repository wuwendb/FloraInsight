import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Plant } from '../types';
import { colors } from '../constants/colors';

interface PlantCardProps {
  plant: Plant;
  onPress: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(plant)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {plant.image ? (
          <Image source={{ uri: plant.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>🌱</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {plant.name}
        </Text>
        <Text style={styles.scientificName} numberOfLines={1}>
          {plant.scientificName}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>已养护: 30天</Text>
          <Text style={styles.infoText}>健康度: 95%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    backgroundColor: colors.primary[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 60,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});
