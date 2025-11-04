import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { pokeApi } from '../services/pokeApi';
import { Pokemon } from '../types/pokemon';

type NavigationProps = {
  navigate: (screen: string, params: { pokemon: Pokemon }) => void;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async (): Promise<void> => {
    try {
      const data = await pokeApi.getPokemons();
      
      const pokemonDetails = await Promise.all(
        data.results.map(pokemon => pokeApi.getPokemonDetails(pokemon.url))
      );
      
      setPokemons(pokemonDetails);
      setNextUrl(data.next);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pokémons');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (): Promise<void> => {
    if (nextUrl && !loadingMore) {
      try {
        setLoadingMore(true);
        const data = await pokeApi.getPokemons(pokemons.length);
        
        const morePokemonDetails = await Promise.all(
          data.results.map(pokemon => pokeApi.getPokemonDetails(pokemon.url))
        );
        
        setPokemons(prev => [...prev, ...morePokemonDetails]);
        setNextUrl(data.next);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar mais pokémons');
      } finally {
        setLoadingMore(false);
      }
    }
  };

  // Função para cor baseada no tipo principal
  const getTypeColor = (types: any[]): string => {
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
    return typeColors[types[0]?.type?.name] || '#777';
  };

  const renderPokemonCard = ({ item }: { item: Pokemon }) => {
    const backgroundColor = getTypeColor(item.types);
    
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => navigation.navigate('Details', { pokemon: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.id}>#{item.id.toString().padStart(3, '0')}</Text>
        </View>
        
        <Image
          source={{ uri: item.sprites.front_default }}
          style={styles.image}
        />
        
        <View style={styles.cardFooter}>
          <Text style={styles.name}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          
          <View style={styles.typesContainer}>
            {item.types.map((typeInfo, index) => (
              <View key={index} style={styles.typeBadge}>
                <Text style={styles.typeText}>
                  {typeInfo.type.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#FF0000" />
        <Text style={styles.loadingMoreText}>Carregando mais...</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
          style={styles.loadingImage}
        />
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.loadingText}>Carregando Pokémons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Encontre seu Pokémon favorito!</Text>
      </View>
      
      <FlatList
        data={pokemons}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#DC0A2D',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 140,
  },
  cardHeader: {
    alignSelf: 'flex-end',
  },
  id: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    marginVertical: 8,
  },
  cardFooter: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  typeBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginHorizontal: 1,
  },
  typeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingMoreText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;