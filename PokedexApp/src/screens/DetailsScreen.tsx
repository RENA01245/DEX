import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Pokemon } from '../types/pokemon';

const { width } = Dimensions.get('window');

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params;

  const getTypeColor = (type: string): string => {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[type] || '#777';
  };

  const primaryType = pokemon.types[0]?.type.name;
  const backgroundColor = getTypeColor(primaryType);

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
      {/* Header com imagem */}
      <View style={styles.header}>
        <View style={styles.headerBackground} />
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        </View>
      </View>

      {/* Detalhes */}
      <View style={styles.details}>
        {/* Tipos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipos</Text>
          <View style={styles.types}>
            {pokemon.types.map((typeInfo, index) => (
              <View 
                key={index} 
                style={[
                  styles.typeBadge, 
                  { backgroundColor: getTypeColor(typeInfo.type.name) }
                ]}
              >
                <Text style={styles.typeText}>
                  {typeInfo.type.name.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
            </View>
          </View>
        </View>

        {/* Habilidades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.abilities}>
            {pokemon.abilities.map((abilityInfo, index) => (
              <View key={index} style={styles.abilityBadge}>
                <Text style={styles.abilityText}>
                  {abilityInfo.ability.name.replace('-', ' ')}
                  {abilityInfo.is_hidden && ' (Oculta)'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.stats}>
            {pokemon.stats.map((statInfo, index) => (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statName}>
                  {statInfo.stat.name.replace('-', ' ')}
                </Text>
                <Text style={styles.statValue}>{statInfo.base_stat}</Text>
                <View style={styles.statBar}>
                  <View 
                    style={[
                      styles.statBarFill,
                      { 
                        width: `${Math.min(statInfo.base_stat, 150) / 150 * 100}%`,
                        backgroundColor: statInfo.base_stat > 80 ? '#4CAF50' : 
                                        statInfo.base_stat > 50 ? '#FFC107' : '#F44336'
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: 200,
    height: 200,
    zIndex: 2,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 10,
    zIndex: 2,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  id: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    marginTop: 5,
  },
  details: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    minHeight: 500,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  typeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    minWidth: 120,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  abilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  abilityBadge: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  abilityText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  stats: {
    marginLeft: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    fontSize: 14,
    color: '#333',
    width: 100,
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 30,
    textAlign: 'right',
    marginRight: 10,
  },
  statBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 5,
  },
});

export default DetailsScreen;