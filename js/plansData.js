/**
 * ========================================
 * NEOVEX HOSTING V2 - PLANS DATA SYSTEM
 * Sistema profesional de gestión de planes
 * ========================================
 */

// Constantes del sistema
const SYSTEM_CONFIG = {
  VERSION: '2.0.0',
  CURRENCY: 'USD',
  DEFAULT_TIER: 'budget',
  ANTI_DDOS: '10Tb/s Tunnel GRE',
  NETWORK_SPEED: '1Gb/s',
  BACKUP_RETENTION: '30 días'
};

// Iconos/Imágenes de juegos (rutas a imágenes reales)
const GAME_IMAGES = {
  minecraft: 'img/games/minecraft.png',
  hytale: 'img/games/hytale.png',
  ark: 'img/games/ARK.png',
  fivem: 'img/games/fivem.png',
  rust: 'img/games/rust.png',
  unturned: 'img/games/unturned.png',
  vps: 'img/games/vps.png',
  discord: 'img/games/discord.png'
};

// Iconos SVG solo para tiers
const ICONS = {
  tiers: {
    budget: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
      <path d="M2 17L12 22L22 17"/>
      <path d="M2 12L12 17L22 12"/>
    </svg>`,
    performance: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>`,
    extreme: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
      <path d="M2 17L12 22L22 17"/>
      <path d="M2 12L12 17L22 12"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>`
  }
};

// Metadata de tiers
const tiersConfig = {
  budget: {
    icon: ICONS.tiers.budget,
    name: 'Budget',
    cpu: 'Ryzen 5 5600X'
  },
  performance: {
    icon: ICONS.tiers.performance,
    name: 'Performance',
    cpu: 'Ryzen 7 7700X'
  },
  extreme: {
    icon: ICONS.tiers.extreme,
    name: 'Extreme',
    cpu: 'Ryzen 9 9950X'
  }
};

// Metadata de juegos
const gamesData = [
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: `<img src="${GAME_IMAGES.minecraft}" alt="Minecraft" />`,
    description: 'Hosting optimizado para Minecraft con soporte para mods, plugins y cualquier versión',
    priceFrom: 2.99,
    featured: true,
    page: 'minecraft.html'
  },
  {
    id: 'hytale',
    name: 'Hytale',
    icon: `<img src="${GAME_IMAGES.hytale}" alt="Hytale" />`,
    description: 'Servidores preparados para Hytale con la mejor infraestructura cuando lance',
    priceFrom: 3.99,
    featured: true,
    page: 'hytale.html'
  },
  {
    id: 'ark',
    name: 'ARK',
    icon: `<img src="${GAME_IMAGES.ark}" alt="ARK" />`,
    description: 'Servidores de alto rendimiento para ARK Survival Evolved y ARK Ascended',
    priceFrom: 5.99,
    featured: false,
    page: 'ark.html'
  },
  {
    id: 'fivem',
    name: 'FiveM',
    icon: `<img src="${GAME_IMAGES.fivem}" alt="FiveM" />`,
    description: 'Hosting especializado para servidores de GTA V RP con FiveM',
    priceFrom: 7.99,
    featured: false,
    page: 'fivem.html'
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: `<img src="${GAME_IMAGES.rust}" alt="Rust" />`,
    description: 'Servidores optimizados para Rust con protección DDoS y máxima estabilidad',
    priceFrom: 6.99,
    featured: false,
    page: 'rust.html'
  },
  {
    id: 'unturned',
    name: 'Unturned',
    icon: `<img src="${GAME_IMAGES.unturned}" alt="Unturned" />`,
    description: 'Hosting para servidores de Unturned con panel fácil de usar',
    priceFrom: 3.99,
    featured: false,
    page: 'unturned.html'
  },
  {
    id: 'vps',
    name: 'VPS',
    icon: `<img src="${GAME_IMAGES.vps}" alt="VPS" />`,
    description: 'Servidores VPS con acceso root completo y recursos dedicados',
    priceFrom: 9.99,
    featured: false,
    page: 'vps.html'
  },
  {
    id: 'discord',
    name: 'Discord Bot',
    icon: `<img src="${GAME_IMAGES.discord}" alt="Discord Bot" />`,
    description: 'Hosting 24/7 para tu bot de Discord con Node.js y Python',
    priceFrom: 1.99,
    featured: false,
    page: 'discord-bot.html'
  }
];

// Planes por juego y tier
const plansData = {
  minecraft: {
    budget: [
      {
        name: 'Starter',
        subtitle: 'Ideal para servidores pequeños',
        ram: '2GB',
        cpu: '2 vCores',
        storage: '10GB NVMe',
        price: 2.99,
        originalPrice: 4.99,
        discount: '40%',
        features: [
          '2GB RAM DDR5',
          '2 vCores Ryzen 5 5600X',
          '10GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Subdominios gratis',
          'Anti-DDoS 10Tb/s',
          'Backups automáticos',
          'Soporte 24/7'
        ],
        link: '#'
      },
      {
        name: 'Basic',
        subtitle: 'Perfecto para comenzar',
        ram: '4GB',
        cpu: '3 vCores',
        storage: '20GB NVMe',
        price: 4.99,
        originalPrice: 7.99,
        discount: '38%',
        features: [
          '4GB RAM DDR5',
          '3 vCores Ryzen 5 5600X',
          '20GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Subdominios gratis',
          'Anti-DDoS 10Tb/s',
          'Backups automáticos',
          'Soporte prioritario 24/7'
        ],
        featured: true,
        link: '#'
      },
      {
        name: 'Advanced',
        subtitle: 'Para comunidades en crecimiento',
        ram: '6GB',
        cpu: '4 vCores',
        storage: '30GB NVMe',
        price: 6.99,
        originalPrice: 10.99,
        discount: '36%',
        features: [
          '6GB RAM DDR5',
          '4 vCores Ryzen 5 5600X',
          '30GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Subdominios gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 6 horas',
          'Soporte prioritario 24/7'
        ],
        link: '#'
      }
    ],
    performance: [
      {
        name: 'Pro',
        subtitle: 'Alto rendimiento garantizado',
        ram: '8GB',
        cpu: '4 vCores',
        storage: '40GB NVMe',
        price: 9.99,
        originalPrice: 14.99,
        discount: '33%',
        features: [
          '8GB RAM DDR5',
          '4 vCores Ryzen 7 7700X',
          '40GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 6 horas',
          'Soporte VIP 24/7'
        ],
        link: '#'
      },
      {
        name: 'Ultimate',
        subtitle: 'Máximo rendimiento',
        ram: '12GB',
        cpu: '6 vCores',
        storage: '60GB NVMe',
        price: 14.99,
        originalPrice: 21.99,
        discount: '32%',
        features: [
          '12GB RAM DDR5',
          '6 vCores Ryzen 7 7700X',
          '60GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 3 horas',
          'Soporte VIP 24/7'
        ],
        featured: true,
        link: '#'
      },
      {
        name: 'Extreme',
        subtitle: 'Para grandes comunidades',
        ram: '16GB',
        cpu: '8 vCores',
        storage: '80GB NVMe',
        price: 19.99,
        originalPrice: 28.99,
        discount: '31%',
        features: [
          '16GB RAM DDR5',
          '8 vCores Ryzen 7 7700X',
          '80GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 3 horas',
          'Soporte VIP 24/7'
        ],
        link: '#'
      }
    ],
    extreme: [
      {
        name: 'Monster',
        subtitle: 'Potencia extrema',
        ram: '24GB',
        cpu: '10 vCores',
        storage: '120GB NVMe',
        price: 29.99,
        originalPrice: 41.99,
        discount: '29%',
        features: [
          '24GB RAM DDR5',
          '10 vCores Ryzen 9 9950X',
          '120GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada hora',
          'Soporte dedicado 24/7'
        ],
        link: '#'
      },
      {
        name: 'Titan',
        subtitle: 'Sin límites',
        ram: '32GB',
        cpu: '14 vCores',
        storage: '160GB NVMe',
        price: 39.99,
        originalPrice: 54.99,
        discount: '27%',
        features: [
          '32GB RAM DDR5',
          '14 vCores Ryzen 9 9950X',
          '160GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada hora',
          'Soporte dedicado 24/7'
        ],
        featured: true,
        link: '#'
      },
      {
        name: 'Legendary',
        subtitle: 'El más poderoso',
        ram: '64GB',
        cpu: '16 vCores',
        storage: '200GB NVMe',
        price: 59.99,
        originalPrice: 79.99,
        discount: '25%',
        features: [
          '64GB RAM DDR5',
          '16 vCores Ryzen 9 9950X',
          '200GB Almacenamiento NVMe',
          'Bases de datos ilimitadas',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada hora',
          'Soporte dedicado 24/7'
        ],
        link: '#'
      }
    ]
  },
  hytale: {
    budget: [
      {
        name: 'Starter',
        subtitle: 'Ideal para comenzar',
        ram: '2GB',
        cpu: '2 vCores',
        storage: '15GB NVMe',
        price: 3.99,
        originalPrice: 6.99,
        discount: '43%',
        features: [
          '2GB RAM DDR5',
          '2 vCores Ryzen 5 5600X',
          '15GB Almacenamiento NVMe',
          'Panel Pterodactyl',
          'Subdominios gratis',
          'Anti-DDoS 10Tb/s',
          'Backups automáticos',
          'Soporte 24/7'
        ],
        link: '#'
      },
      {
        name: 'Basic',
        subtitle: 'Recomendado para iniciar',
        ram: '4GB',
        cpu: '3 vCores',
        storage: '25GB NVMe',
        price: 5.99,
        originalPrice: 9.99,
        discount: '40%',
        features: [
          '4GB RAM DDR5',
          '3 vCores Ryzen 5 5600X',
          '25GB Almacenamiento NVMe',
          'Panel Pterodactyl',
          'Subdominios gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 12 horas',
          'Soporte prioritario 24/7'
        ],
        featured: true,
        link: '#'
      },
      {
        name: 'Advanced',
        subtitle: 'Para comunidades medianas',
        ram: '6GB',
        cpu: '4 vCores',
        storage: '35GB NVMe',
        price: 8.99,
        originalPrice: 13.99,
        discount: '36%',
        features: [
          '6GB RAM DDR5',
          '4 vCores Ryzen 5 5600X',
          '35GB Almacenamiento NVMe',
          'Panel Pterodactyl',
          'Subdominios gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 6 horas',
          'Soporte prioritario 24/7'
        ],
        link: '#'
      }
    ],
    performance: [
      {
        name: 'Pro',
        subtitle: 'Alto rendimiento',
        ram: '8GB',
        cpu: '4 vCores',
        storage: '50GB NVMe',
        price: 11.99,
        originalPrice: 17.99,
        discount: '33%',
        features: [
          '8GB RAM DDR5',
          '4 vCores Ryzen 7 7700X',
          '50GB Almacenamiento NVMe',
          'Panel Premium',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 6 horas',
          'Soporte VIP 24/7'
        ],
        link: '#'
      },
      {
        name: 'Ultimate',
        subtitle: 'Máxima potencia',
        ram: '12GB',
        cpu: '6 vCores',
        storage: '70GB NVMe',
        price: 16.99,
        originalPrice: 24.99,
        discount: '32%',
        features: [
          '12GB RAM DDR5',
          '6 vCores Ryzen 7 7700X',
          '70GB Almacenamiento NVMe',
          'Panel Premium',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 3 horas',
          'Soporte VIP 24/7'
        ],
        featured: true,
        link: '#'
      },
      {
        name: 'Extreme',
        subtitle: 'Sin compromisos',
        ram: '16GB',
        cpu: '8 vCores',
        storage: '90GB NVMe',
        price: 21.99,
        originalPrice: 31.99,
        discount: '31%',
        features: [
          '16GB RAM DDR5',
          '8 vCores Ryzen 7 7700X',
          '90GB Almacenamiento NVMe',
          'Panel Premium',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada 3 horas',
          'Soporte VIP 24/7'
        ],
        link: '#'
      }
    ],
    extreme: [
      {
        name: 'Monster',
        subtitle: 'Poder absoluto',
        ram: '24GB',
        cpu: '10 vCores',
        storage: '130GB NVMe',
        price: 32.99,
        originalPrice: 45.99,
        discount: '28%',
        features: [
          '24GB RAM DDR5',
          '10 vCores Ryzen 9 9950X',
          '130GB Almacenamiento NVMe',
          'Panel Dedicado',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada hora',
          'Soporte dedicado 24/7'
        ],
        link: '#'
      },
      {
        name: 'Titan',
        subtitle: 'Rendimiento supremo',
        ram: '32GB',
        cpu: '14 vCores',
        storage: '170GB NVMe',
        price: 42.99,
        originalPrice: 59.99,
        discount: '28%',
        features: [
          '32GB RAM DDR5',
          '14 vCores Ryzen 9 9950X',
          '170GB Almacenamiento NVMe',
          'Panel Dedicado',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada hora',
          'Soporte dedicado 24/7'
        ],
        featured: true,
        link: '#'
      },
      {
        name: 'Legendary',
        subtitle: 'El definitivo',
        ram: '64GB',
        cpu: '16 vCores',
        storage: '220GB NVMe',
        price: 64.99,
        originalPrice: 84.99,
        discount: '24%',
        features: [
          '64GB RAM DDR5',
          '16 vCores Ryzen 9 9950X',
          '220GB Almacenamiento NVMe',
          'Panel Dedicado',
          'Dominio gratis',
          'Anti-DDoS 10Tb/s',
          'Backups cada hora',
          'Soporte dedicado 24/7'
        ],
        link: '#'
      }
    ]
  }
};

// Utilidades
const PlanUtils = {
  // Calcular descuento
  calculateDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
  },

  // Formatear precio
  formatPrice(price, currency = SYSTEM_CONFIG.CURRENCY) {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  },

  // Obtener plan por ID
  getPlanById(gameId, tierId, planIndex) {
    return plansData[gameId]?.[tierId]?.[planIndex];
  },

  // Obtener todos los planes de un juego
  getGamePlans(gameId) {
    return plansData[gameId] || {};
  },

  // Obtener planes por tier
  getTierPlans(gameId, tierId) {
    return plansData[gameId]?.[tierId] || [];
  },

  // Obtener juego por ID
  getGameById(gameId) {
    return gamesData.find(game => game.id === gameId);
  },

  // Filtrar juegos destacados
  getFeaturedGames() {
    return gamesData.filter(game => game.featured);
  },

  // Obtener información de tier
  getTierInfo(tierId) {
    return tiersConfig[tierId];
  }
};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SYSTEM_CONFIG,
    GAME_IMAGES,
    ICONS,
    gamesData,
    tiersConfig,
    plansData,
    PlanUtils
  };
}