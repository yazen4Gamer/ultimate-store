import { Game, Category } from './types';

export const categories: Category[] = [
  { id: 1, name: 'Action', slug: 'action', description: 'Fast-paced combat games', icon: '⚔️', gameCount: 245, color: 'bg-red-500' },
  { id: 2, name: 'Adventure', slug: 'adventure', description: 'Story-driven exploration games', icon: '🗺️', gameCount: 189, color: 'bg-green-500' },
  { id: 3, name: 'RPG', slug: 'rpg', description: 'Role-playing games with character progression', icon: '🛡️', gameCount: 156, color: 'bg-blue-500' },
  { id: 4, name: 'Shooter', slug: 'shooter', description: 'First-person and third-person shooters', icon: '🎯', gameCount: 278, color: 'bg-orange-500' },
  { id: 5, name: 'Sports', slug: 'sports', description: 'Sports and racing simulations', icon: '⚽', gameCount: 134, color: 'bg-purple-500' },
  { id: 6, name: 'Strategy', slug: 'strategy', description: 'Tactical and strategic games', icon: '♟️', gameCount: 87, color: 'bg-indigo-500' },
  { id: 7, name: 'Puzzle', slug: 'puzzle', description: 'Brain-teasing puzzle games', icon: '🧩', gameCount: 112, color: 'bg-pink-500' },
  { id: 8, name: 'Horror', slug: 'horror', description: 'Suspenseful horror games', icon: '👻', gameCount: 89, color: 'bg-gray-800' },
];

export const games: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    description: 'An open-world, action-adventure RPG set in the megalopolis of Night City.',
    longDescription: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You have complete freedom to customize your character\'s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.',
    price: 49.99,
    discount: 20,
    category: 'Action',
    subcategories: ['RPG', 'Open World', 'Futuristic'],
    rating: 4.5,
    reviews: 12500,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    ],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X'],
    releaseDate: '2020-12-10',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    tags: ['Cyberpunk', 'Open World', 'RPG', 'Futuristic', 'First Person'],
    features: ['Single Player', 'Character Customization', 'Branching Storyline', 'Open World'],
    systemRequirements: {
      minimum: [
        'OS: Windows 7/8/10 64-bit',
        'Processor: Intel Core i5-3570K or AMD FX-8310',
        'Memory: 8 GB RAM',
        'Graphics: NVIDIA GeForce GTX 780 or AMD Radeon RX 470',
        'Storage: 70 GB available space'
      ],
      recommended: [
        'OS: Windows 10 64-bit',
        'Processor: Intel Core i7-4790 or AMD Ryzen 3 3200G',
        'Memory: 12 GB RAM',
        'Graphics: NVIDIA GeForce GTX 1060 or AMD Radeon R9 Fury',
        'Storage: 70 GB SSD'
      ]
    },
    isFeatured: true,
    isOnSale: true,
    isNewRelease: false,
  },
  {
    id: 2,
    title: 'Elden Ring',
    description: 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.',
    longDescription: 'Elden Ring is a fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin. Journey through the Lands Between, a new fantasy world created by Hidetaka Miyazaki, creator of the influential Dark Souls video game series, and George R. R. Martin, author of The New York Times best-selling fantasy series, A Song of Ice and Fire. Unravel the mysteries of the Elden Ring\'s power. Encounter adversaries with profound backgrounds, characters with their own unique motivations for helping or hindering your progress, and fearsome creatures.',
    price: 59.99,
    discount: 0,
    category: 'Action',
    subcategories: ['RPG', 'Fantasy', 'Open World'],
    rating: 4.8,
    reviews: 8900,
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    ],
    platform: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X'],
    releaseDate: '2022-02-25',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco Entertainment',
    tags: ['Fantasy', 'Open World', 'RPG', 'Souls-like', 'Action'],
    features: ['Single Player', 'Multiplayer', 'Character Customization', 'Open World'],
    systemRequirements: {
      minimum: [
        'OS: Windows 10',
        'Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X',
        'Memory: 12 GB RAM',
        'Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB',
        'Storage: 60 GB available space'
      ],
      recommended: [
        'OS: Windows 10/11',
        'Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X',
        'Memory: 16 GB RAM',
        'Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB',
        'Storage: 60 GB SSD'
      ]
    },
    isFeatured: true,
    isOnSale: false,
    isNewRelease: true,
  },
  {
    id: 3,
    title: 'The Witcher 3: Wild Hunt',
    description: 'A story-driven open world RPG set in a dark fantasy universe.',
    longDescription: 'The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.',
    price: 39.99,
    discount: 50,
    category: 'RPG',
    subcategories: ['Fantasy', 'Open World', 'Story Rich'],
    rating: 4.9,
    reviews: 23500,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    ],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
    releaseDate: '2015-05-19',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    tags: ['Fantasy', 'Open World', 'RPG', 'Story Rich', 'Medieval'],
    features: ['Single Player', 'Open World', 'Multiple Endings', 'DLC Available'],
    systemRequirements: {
      minimum: [
        'OS: 64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10',
        'Processor: Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940',
        'Memory: 6 GB RAM',
        'Graphics: Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870',
        'Storage: 35 GB available space'
      ],
      recommended: [
        'OS: 64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10',
        'Processor: Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz',
        'Memory: 8 GB RAM',
        'Graphics: Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290',
        'Storage: 35 GB available space'
      ]
    },
    isFeatured: true,
    isOnSale: true,
    isNewRelease: false,
  },
  {
    id: 4,
    title: 'FIFA 24',
    description: 'The latest installment in the world\'s most popular football simulation series.',
    longDescription: 'EA SPORTS FIFA 24 brings The World\'s Game to the pitch, with HyperMotionV Technology, PlayStyles optimized by Opta, and an enhanced Frostbite Engine delivering football that is more authentic than ever before. Experience the thrill of the world\'s game with the most true-to-life football experience in EA SPORTS FIFA history.',
    price: 69.99,
    discount: 10,
    category: 'Sports',
    subcategories: ['Football', 'Simulation', 'Multiplayer'],
    rating: 4.3,
    reviews: 5600,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&h=600&fit=crop',
    screenshots: [
        'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1509027572446-af8401acfdc3?w=800&h=600&fit=crop',
    ],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X'],
    releaseDate: '2023-09-29',
    developer: 'EA Sports',
    publisher: 'Electronic Arts',
    tags: ['Sports', 'Football', 'Simulation', 'Multiplayer'],
    features: ['Single Player', 'Multiplayer', 'Career Mode', 'Ultimate Team'],
    systemRequirements: {
      minimum: [
        'OS: Windows 10 64-bit',
        'Processor: Intel Core i5-6600K or AMD Ryzen 5 1600',
        'Memory: 8 GB RAM',
        'Graphics: NVIDIA GeForce GTX 1050 Ti or AMD Radeon RX 570',
        'Storage: 100 GB available space'
      ],
      recommended: [
        'OS: Windows 10 64-bit',
        'Processor: Intel Core i7-6700 or AMD Ryzen 7 2700X',
        'Memory: 12 GB RAM',
        'Graphics: NVIDIA GeForce GTX 1660 or AMD Radeon RX 5600 XT',
        'Storage: 100 GB SSD'
      ]
    },
    isFeatured: false,
    isOnSale: true,
    isNewRelease: true,
  },
  {
    id: 5,
    title: 'Call of Duty: Modern Warfare III',
    description: 'The latest installment in the iconic first-person shooter series.',
    longDescription: 'Call of Duty: Modern Warfare III continues the immersive narrative of the Modern Warfare series. The ultimate weapon is back. Team up with your friends in an epic collection of multiplayer maps from the Modern Warfare series, now with new game modes. All your favorite game modes are back, including the return of Zombies, now with the largest Call of Duty Zombies map ever.',
    price: 69.99,
    discount: 0,
    category: 'Shooter',
    subcategories: ['FPS', 'Military', 'Multiplayer'],
    rating: 4.2,
    reviews: 7800,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    ],
    platform: ['PC', 'PlayStation 5', 'Xbox Series X'],
    releaseDate: '2023-11-10',
    developer: 'Infinity Ward',
    publisher: 'Activision',
    tags: ['FPS', 'Military', 'Multiplayer', 'Action', 'Modern'],
    features: ['Single Player', 'Multiplayer', 'Co-op', 'Zombies Mode'],
    systemRequirements: {
      minimum: [
        'OS: Windows 10 64-bit',
        'Processor: Intel Core i5-6600 or AMD Ryzen 5 1400',
        'Memory: 8 GB RAM',
        'Graphics: NVIDIA GeForce GTX 960 or AMD Radeon RX 470',
        'Storage: 125 GB available space'
      ],
      recommended: [
        'OS: Windows 10/11 64-bit',
        'Processor: Intel Core i7-6700K or AMD Ryzen 5 1600X',
        'Memory: 16 GB RAM',
        'Graphics: NVIDIA GeForce GTX 1080 Ti or AMD Radeon RX 5700 XT',
        'Storage: 125 GB SSD'
      ]
    },
    isFeatured: true,
    isOnSale: false,
    isNewRelease: true,
  },
  {
    id: 6,
    title: 'Minecraft',
    description: 'A sandbox game that lets players build with blocks in a 3D procedurally generated world.',
    longDescription: 'Minecraft is a game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles. Play in Creative Mode with unlimited resources or mine deep in Survival Mode, crafting weapons and armor to fend off dangerous mobs. Create, explore and survive alone or with friends on mobile devices or Windows, PlayStation, Xbox and Nintendo Switch.',
    price: 26.95,
    discount: 0,
    category: 'Adventure',
    subcategories: ['Sandbox', 'Building', 'Survival'],
    rating: 4.7,
    reviews: 48900,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop',
    ],
    platform: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Mobile'],
    releaseDate: '2011-11-18',
    developer: 'Mojang Studios',
    publisher: 'Mojang Studios',
    tags: ['Sandbox', 'Building', 'Survival', 'Creative', 'Multiplayer'],
    features: ['Single Player', 'Multiplayer', 'Creative Mode', 'Survival Mode', 'Cross-platform'],
    systemRequirements: {
      minimum: [
        'OS: Windows 7 and up',
        'Processor: Intel Core i3-3210 / AMD A8-7600 APU or equivalent',
        'Memory: 4 GB RAM',
        'Graphics: Integrated: Intel HD Graphics 4000 (Ivy Bridge) or AMD Radeon R5 series (Kaveri line)',
        'Storage: 1 GB available space'
      ],
      recommended: [
        'OS: Windows 10',
        'Processor: Intel Core i5-4690 / AMD A10-7800 or equivalent',
        'Memory: 8 GB RAM',
        'Graphics: GeForce 700 Series or AMD Radeon Rx 200 Series (excluding integrated chipsets)',
        'Storage: 4 GB available space'
      ]
    },
    isFeatured: false,
    isOnSale: false,
    isNewRelease: false,
  },
];