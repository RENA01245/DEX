Pokédex App
Uma aplicação mobile de Pokédex desenvolvida em React Native com TypeScript, consumindo a PokeAPI.

Funcionalidades
Lista paginada de Pokémon com scroll infinito

Cards coloridos baseados no tipo do Pokémon

Tela de detalhes com informações completas

Navegação entre telas

Design responsivo

TypeScript para tipagem forte

🛠 Tecnologias
React Native

TypeScript

Expo

React Navigation

Axios

PokeAPI

🚀 Como Executar
bash
# Instalar dependências
npm install

# Instalar dependências do Expo
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context axios

# Executar projeto
npx expo start
📱 Telas
Tela Inicial
Lista de Pokémon em grid

Loading durante carregamento

Scroll infinito

Cards coloridos por tipo

Tela de Detalhes
Imagem do Pokémon

Informações (altura, peso, tipos)

Habilidades

Estatísticas com barras

Características
Cores baseadas nos tipos Pokémon

Design moderno e responsivo

Header personalizado

Navegação fluida

strutura
text
src/
├── types/pokemon.ts
├── services/pokeApi.ts
├── screens/
│   ├── HomeScreen.tsx
│   └── DetailsScreen.tsx
└── navigation/AppNavigator.tsx
🔧 Desenvolvido por
Renan Jucá