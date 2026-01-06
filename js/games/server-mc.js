const MC_CONFIG = {
  GAME_ID: 'minecraft',
  GAME_NAME: 'Minecraft',
  GAME_IMAGE: '../img/games/minecraft.png',
  CURRENCY: 'USD',
  ANTI_DDOS: '10Tb/s Tunnel GRE',
  NETWORK_SPEED: '1Gb/s'
};

const basicServers = [
  {
    id: 'mc-basic-1',
    name: 'Starter',
    category: 'basic',
    subtitle: 'Ideal para servidores pequeños',
    specs: {
      ram: '2GB DDR4',
      cpu: 'Compartido',
      storage: '10GB NVMe',
      slots: '~20 jugadores'
    },
    pricing: {
      monthly: 2.99,
      original: 4.99,
      discount: '40%'
    },
    features: [
      '2GB RAM DDR4',
      'CPU Compartido',
      '10GB Almacenamiento NVMe',
      'Panel Pterodactyl',
      'MySQL Database',
      'Subdominios gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups diarios',
      'Soporte 24/7',
      'Activación instantánea'
    ],
    popular: false,
    link: '#checkout/mc-basic-1'
  },
  {
    id: 'mc-basic-2',
    name: 'Basic',
    category: 'basic',
    subtitle: 'Perfecto para comenzar',
    specs: {
      ram: '4GB DDR4',
      cpu: 'Compartido',
      storage: '20GB NVMe',
      slots: '~40 jugadores'
    },
    pricing: {
      monthly: 4.99,
      original: 7.99,
      discount: '38%'
    },
    features: [
      '4GB RAM DDR4',
      'CPU Compartido',
      '20GB Almacenamiento NVMe',
      'Panel Pterodactyl',
      'MySQL Database',
      'Subdominios gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups diarios',
      'Soporte 24/7',
      'Activación instantánea'
    ],
    popular: true,
    link: '#checkout/mc-basic-2'
  },
  {
    id: 'mc-basic-3',
    name: 'Standard',
    category: 'basic',
    subtitle: 'Para comunidades creciendo',
    specs: {
      ram: '6GB DDR4',
      cpu: 'Compartido',
      storage: '30GB NVMe',
      slots: '~60 jugadores'
    },
    pricing: {
      monthly: 6.99,
      original: 10.99,
      discount: '36%'
    },
    features: [
      '6GB RAM DDR4',
      'CPU Compartido',
      '30GB Almacenamiento NVMe',
      'Panel Pterodactyl',
      'MySQL Database',
      'Subdominios gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada 12 horas',
      'Soporte prioritario 24/7',
      'Activación instantánea'
    ],
    popular: false,
    link: '#checkout/mc-basic-3'
  },
  {
    id: 'mc-basic-4',
    name: 'Advanced',
    category: 'basic',
    subtitle: 'Mayor capacidad',
    specs: {
      ram: '8GB DDR4',
      cpu: 'Compartido',
      storage: '40GB NVMe',
      slots: '~80 jugadores'
    },
    pricing: {
      monthly: 9.99,
      original: 14.99,
      discount: '33%'
    },
    features: [
      '8GB RAM DDR4',
      'CPU Compartido',
      '40GB Almacenamiento NVMe',
      'Panel Pterodactyl',
      'MySQL Database',
      'Subdominios gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada 12 horas',
      'Soporte prioritario 24/7',
      'Activación instantánea'
    ],
    popular: false,
    link: '#checkout/mc-basic-4'
  }
];

const normalServers = [
  {
    id: 'mc-normal-1',
    name: 'Pro',
    category: 'normal',
    subtitle: 'Rendimiento garantizado',
    specs: {
      ram: '8GB DDR5',
      cpu: '4 vCores',
      storage: '50GB NVMe',
      slots: '~100 jugadores'
    },
    pricing: {
      monthly: 12.99,
      original: 18.99,
      discount: '32%'
    },
    features: [
      '8GB RAM DDR5',
      '4 vCores dedicados',
      '50GB Almacenamiento NVMe',
      'Panel Pterodactyl Premium',
      'MySQL Database',
      '1 Dominio gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada 6 horas',
      'Soporte VIP 24/7',
      'Activación instantánea',
      'Optimización incluida'
    ],
    popular: false,
    link: '#checkout/mc-normal-1'
  },
  {
    id: 'mc-normal-2',
    name: 'Ultimate',
    category: 'normal',
    subtitle: 'Alta capacidad',
    specs: {
      ram: '12GB DDR5',
      cpu: '6 vCores',
      storage: '75GB NVMe',
      slots: '~150 jugadores'
    },
    pricing: {
      monthly: 17.99,
      original: 25.99,
      discount: '31%'
    },
    features: [
      '12GB RAM DDR5',
      '6 vCores dedicados',
      '75GB Almacenamiento NVMe',
      'Panel Pterodactyl Premium',
      'MySQL Database',
      '1 Dominio gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada 6 horas',
      'Soporte VIP 24/7',
      'Activación instantánea',
      'Optimización incluida'
    ],
    popular: true,
    link: '#checkout/mc-normal-2'
  },
  {
    id: 'mc-normal-3',
    name: 'Extreme',
    category: 'normal',
    subtitle: 'Máximo rendimiento',
    specs: {
      ram: '16GB DDR5',
      cpu: '8 vCores',
      storage: '100GB NVMe',
      slots: '~200 jugadores'
    },
    pricing: {
      monthly: 24.99,
      original: 34.99,
      discount: '29%'
    },
    features: [
      '16GB RAM DDR5',
      '8 vCores dedicados',
      '100GB Almacenamiento NVMe',
      'Panel Pterodactyl Premium',
      'MySQL Database ilimitadas',
      '2 Dominios gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada 3 horas',
      'Soporte VIP 24/7',
      'Activación instantánea',
      'Optimización personalizada'
    ],
    popular: false,
    link: '#checkout/mc-normal-3'
  },
  {
    id: 'mc-normal-4',
    name: 'Master',
    category: 'normal',
    subtitle: 'Sin límites',
    specs: {
      ram: '24GB DDR5',
      cpu: '12 vCores',
      storage: '150GB NVMe',
      slots: '~300 jugadores'
    },
    pricing: {
      monthly: 34.99,
      original: 47.99,
      discount: '27%'
    },
    features: [
      '24GB RAM DDR5',
      '12 vCores dedicados',
      '150GB Almacenamiento NVMe',
      'Panel Pterodactyl Premium',
      'MySQL Database ilimitadas',
      '3 Dominios gratis',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada 3 horas',
      'Soporte VIP 24/7',
      'Activación instantánea',
      'Optimización personalizada',
      'Migración asistida gratis'
    ],
    popular: false,
    link: '#checkout/mc-normal-4'
  }
];


const dedicatedServers = [
  {
    id: 'mc-dedicated-1',
    name: 'Monster',
    category: 'dedicated',
    subtitle: 'Servidor dedicado completo',
    specs: {
      ram: '32GB DDR5',
      cpu: '16 vCores',
      storage: '250GB NVMe',
      slots: '~500 jugadores'
    },
    pricing: {
      monthly: 49.99,
      original: 69.99,
      discount: '29%'
    },
    features: [
      '32GB RAM DDR5',
      '16 vCores dedicados',
      '250GB Almacenamiento NVMe',
      'Panel dedicado personalizado',
      'MySQL Database ilimitadas',
      'Dominios ilimitados',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada hora',
      'Soporte dedicado 24/7',
      'Activación inmediata',
      'Optimización avanzada',
      'Migración asistida gratis',
      'IP dedicada'
    ],
    popular: false,
    link: '#checkout/mc-dedicated-1'
  },
  {
    id: 'mc-dedicated-2',
    name: 'Titan',
    category: 'dedicated',
    subtitle: 'Poder sin precedentes',
    specs: {
      ram: '64GB DDR5',
      cpu: '24 vCores',
      storage: '500GB NVMe',
      slots: '~1000 jugadores'
    },
    pricing: {
      monthly: 79.99,
      original: 109.99,
      discount: '27%'
    },
    features: [
      '64GB RAM DDR5',
      '24 vCores dedicados',
      '500GB Almacenamiento NVMe',
      'Panel dedicado personalizado',
      'MySQL Database ilimitadas',
      'Dominios ilimitados',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups cada hora',
      'Soporte dedicado 24/7',
      'Activación inmediata',
      'Optimización avanzada',
      'Migración asistida gratis',
      'IPs dedicadas múltiples',
      'Acceso root'
    ],
    popular: true,
    link: '#checkout/mc-dedicated-2'
  },
  {
    id: 'mc-dedicated-3',
    name: 'Legendary',
    category: 'dedicated',
    subtitle: 'El más poderoso',
    specs: {
      ram: '128GB DDR5',
      cpu: '32 vCores',
      storage: '1TB NVMe',
      slots: 'Ilimitado'
    },
    pricing: {
      monthly: 129.99,
      original: 179.99,
      discount: '28%'
    },
    features: [
      '128GB RAM DDR5',
      '32 vCores dedicados',
      '1TB Almacenamiento NVMe',
      'Panel dedicado personalizado',
      'MySQL Database ilimitadas',
      'Dominios ilimitados',
      'Anti-DDoS 10Tb/s Tunnel GRE',
      'Backups en tiempo real',
      'Soporte dedicado premium 24/7',
      'Activación inmediata',
      'Optimización máxima',
      'Migración asistida gratis',
      'IPs dedicadas múltiples',
      'Acceso root completo',
      'Infraestructura exclusiva'
    ],
    popular: false,
    link: '#checkout/mc-dedicated-3'
  }
];


const minecraftServers = {
  basic: basicServers,
  normal: normalServers,
  dedicated: dedicatedServers
};


const categoriesConfig = {
  basic: {
    id: 'basic',
    name: 'Básicos',
    description: 'Servidores económicos para comenzar',
    icon: '⚡',
    color: '#FFE600'
  },
  normal: {
    id: 'normal',
    name: 'Normales',
    description: 'Rendimiento equilibrado y profesional',
    icon: '🚀',
    color: '#9F53FF'
  },
  dedicated: {
    id: 'dedicated',
    name: 'Dedicados',
    description: 'Máxima potencia y recursos exclusivos',
    icon: '👑',
    color: '#B981FF'
  }
};


const MinecraftUtils = {

  getAllServers() {
    return minecraftServers;
  },

  getServersByCategory(category) {
    return minecraftServers[category] || [];
  },

  getServerById(serverId) {
    for (const category in minecraftServers) {
      const server = minecraftServers[category].find(s => s.id === serverId);
      if (server) return server;
    }
    return null;
  },

  getPopularServers() {
    const popular = [];
    for (const category in minecraftServers) {
      popular.push(...minecraftServers[category].filter(s => s.popular));
    }
    return popular;
  },

  formatPrice(price, currency = MC_CONFIG.CURRENCY) {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  },

  getCategoryInfo(categoryId) {
    return categoriesConfig[categoryId];
  },

  calculateSavings(original, monthly) {
    return (original - monthly).toFixed(2);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MC_CONFIG,
    minecraftServers,
    categoriesConfig,
    MinecraftUtils
  };
}