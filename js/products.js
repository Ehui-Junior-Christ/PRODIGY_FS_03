// Base de données des produits artisanaux pour "Maison Céleste"
const products = [
    {
        id: 1,
        name: "Miel de Thym Sauvage",
        category: "epicerie",
        categoryLabel: "Épicerie Fine",
        price: 14.50,
        rating: 4.9,
        reviewsCount: 24,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89134292?auto=format&fit=crop&w=800&q=80",
        description: "Récolté dans les hauteurs ensoleillées de la garrigue, ce miel de thym brut offre des notes boisées intenses et des propriétés apaisantes exceptionnelles. Pot en verre fumé réutilisable de 350g.",
        details: "Ingrédients : 100% Miel de thym naturel. Origine : France (Occitanie). Extraction à froid.",
        reviews: [
            { author: "Élodie M.", rating: 5, date: "12 Mai 2026", comment: "Un goût incomparable, parfait pour mes infusions du soir !" },
            { author: "Marc D.", rating: 5, date: "04 Mai 2026", comment: "Texture onctueuse et saveur très puissante. Je recommande vivement." }
        ]
    },
    {
        id: 2,
        name: "Huile d'Olive Vierge Extra - Cuvée Réserve",
        category: "epicerie",
        categoryLabel: "Épicerie Fine",
        price: 26.00,
        rating: 4.8,
        reviewsCount: 18,
        image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
        description: "Pressée à froid le jour de la récolte, cette huile monovariétale d'olives Picholine dévoile un fruité vert ardent avec une finale poivrée élégante. Bouteille en céramique de 500ml.",
        details: "Acidité inférieure à 0.2%. Extraction mécanique à froid. Bouteille protectrice anti-UV.",
        reviews: [
            { author: "Jean-Paul K.", rating: 5, date: "15 Mai 2026", comment: "Idéale sur une burrata ou une salade de tomates anciennes. Sublime." },
            { author: "Sophie L.", rating: 4, date: "28 Avr 2026", comment: "Très bon produit, packaging magnifique qui fait son effet sur la table." }
        ]
    },
    {
        id: 3,
        name: "Tasse en Grès Brut - Série Wabi-Sabi",
        category: "ceramique",
        categoryLabel: "Céramiques",
        price: 22.00,
        rating: 5.0,
        reviewsCount: 31,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
        description: "Façonnée à la main dans notre atelier partenaire, chaque tasse possède une texture unique combinant un extérieur brut terreux et un émail intérieur blanc cassé lisse.",
        details: "Matière : Grès chamotté. Contenance : 250ml. Compatible lave-vaisselle et micro-ondes.",
        reviews: [
            { author: "Clara B.", rating: 5, date: "16 Mai 2026", comment: "Le toucher est incroyable. Boire mon café là-dedans est un pur rituel." },
            { author: "Thomas V.", rating: 5, date: "10 Mai 2026", comment: "Artisanat pur. La prise en main est parfaite." }
        ]
    },
    {
        id: 4,
        name: "Thé Vert Blanc - Bourgeons d'Argent",
        category: "thes",
        categoryLabel: "Thés & Infusions",
        price: 18.50,
        rating: 4.7,
        reviewsCount: 15,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        description: "Un thé d'exception composé uniquement de jeunes bourgeons duveteux. Infusion cristalline aux notes florales subtiles et de pêche blanche. Boîte hermétique de 100g.",
        details: "Température d'infusion : 75°C. Temps d'infusion : 4 à 5 minutes. Récolte manuelle de printemps.",
        reviews: [
            { author: "Hélène P.", rating: 5, date: "11 Mai 2026", comment: "D'une finesse absolue. On peut faire 3 à 4 infusions avec les mêmes feuilles." }
        ]
    },
    {
        id: 5,
        name: "Bougie Botanique - Cèdre & Figue Noire",
        category: "bougies",
        categoryLabel: "Bougies Artisanales",
        price: 34.00,
        rating: 4.9,
        reviewsCount: 42,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
        description: "Coulée à la main à la cire de soja biologique avec une mèche en bois crépitante. Parfum profond associant la chaleur du cèdre de l'Atlas à la douceur sucrée de la figue noire.",
        details: "Durée de combustion : ~60 heures. Cire 100% végétale sans OGM. Pot en verre soufflé.",
        reviews: [
            { author: "Antoine R.", rating: 5, date: "14 Mai 2026", comment: "Le crépitement de la mèche en bois crée une ambiance chaleureuse magique." },
            { author: "Juliane F.", rating: 5, date: "02 Mai 2026", comment: "Le parfum embaume tout le salon même sans l'allumer. J'adore." }
        ]
    },
    {
        id: 6,
        name: "Assiette de Présentation en Céramique Émaillée",
        category: "ceramique",
        categoryLabel: "Céramiques",
        price: 29.00,
        rating: 4.6,
        reviewsCount: 12,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
        description: "Une pièce maîtresse pour vos dîners. Son émail réactif vert céladon crée des nuances uniques et profondes sur chaque assiette.",
        details: "Diamètre : 28cm. Céramique haute température. Chaque pièce est unique.",
        reviews: [
            { author: "Béatrice N.", rating: 5, date: "08 Mai 2026", comment: "Les reflets de l'émail sont de toute beauté." }
        ]
    },
    {
        id: 7,
        name: "Infusion Nocturne - Tilleul, Verveine & Lavande",
        category: "thes",
        categoryLabel: "Thés & Infusions",
        price: 12.90,
        rating: 4.8,
        reviewsCount: 19,
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
        description: "Mélange apaisant de plantes issues de l'agriculture biologique locale. Idéal pour préparer le sommeil et relâcher les tensions de la journée. Sachet kraft de 80g.",
        details: "Ingrédients biologiques : Tilleul carpentras, Verveine odorante, Fleurs de lavande fine.",
        reviews: [
            { author: "Christophe L.", rating: 5, date: "05 Mai 2026", comment: "Indispensable avant de dormir. Goût très doux et naturel." }
        ]
    },
    {
        id: 8,
        name: "Fleur de Sel aux Épices Torréfiées",
        category: "epicerie",
        categoryLabel: "Épicerie Fine",
        price: 9.50,
        rating: 4.9,
        reviewsCount: 27,
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
        description: "Récoltée artisanalement à la main, cette fleur de sel croustillante est agrémentée d'un mélange secret d'épices douces torréfiées au feu de bois. Pot en grès de 120g.",
        details: "Origine : Marais salants de Guérande. Épices : Coriandre, fenouil, poivre noir, baies roses.",
        reviews: [
            { author: "Marion G.", rating: 5, date: "17 Mai 2026", comment: "Donne un peps incroyable à un simple filet de poisson ou des légumes rôtis !" }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
