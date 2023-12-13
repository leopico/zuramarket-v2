// Assuming this is the type for the data you provided
export type HashMetadata = {
    TID: number;
    Name: string;
    Attributes: Attribute[];
    IPFS: string;
    Description: string;
};

export type Attribute = {
    trait_type: string;
    value: string | number; // Assuming value can be either string or number based on the data
};

// Example usage:
const hashMetadata: HashMetadata[] = [
    {
        TID: 0,
        Name: "Garuda Prometheus",
        Attributes: [
            {
                trait_type: "House",
                value: "Datura",
            },
            {
                trait_type: "Color",
                value: "Blue",
            },
            {
                trait_type: "Fuel",
                value: 60,
            },
            {
                trait_type: "Speed",
                value: 100,
            },
            {
                trait_type: "Control",
                value: 60,
            },
        ],
        IPFS: "https://bafybeid6tht7ecegrnicq5b46l3vze56bccarofiwn2kdpjphzqaunj474.ipfs.nftstorage.link/Garuda%20Prometheus.mp4",
        Description:
            "Inspired by the mythical 'Lord of Birds', which is generally portrayed as a protector with the power to swiftly travel anywhere...",
    },
    {
        TID: 1,
        Name: "Millennium Horus",
        Attributes: [
            {
                "trait_type": "House",
                "value": "Iboga"
            },
            {
                "trait_type": "Color",
                "value": "Purple"
            },
            {
                "trait_type": "Fuel",
                "value": 60
            },
            {
                "trait_type": "Speed",
                "value": 60
            },
            {
                "trait_type": "Control",
                "value": 100
            }
        ],
        IPFS: "https://bafybeid6tht7ecegrnicq5b46l3vze56bccarofiwn2kdpjphzqaunj474.ipfs.nftstorage.link/Millennium%20Horus.mp4",
        Description: "Inspired by the majestic falcon-headed god of ancient Egyptian mythology, which is generally portrayed with a double crown symbolizing divine protection and power. Glistening in a captivating shade of purple, the Horus Hovership is a beacon of celestial beauty as it gracefully traverses the cosmic expanse.  It is not just a mode of transport; it's a vessel that takes you on a profound and transformative experiences that stretch the limits of imagination, promising an experience that transcends time and space. Prepare to be transported to the farthest reaches of the universe, as you journey through the cosmos on this celestial craft. Your profound odyssey awaits, guided by the divine essence of Horus himself."
    },
    {
        TID: 2,
        Name: "Prey-go-neesh Enterprise",
        Attributes: [
            {
                "trait_type": "House",
                "value": "Peyote"
            },
            {
                "trait_type": "Color",
                "value": "Yellow"
            },
            {
                "trait_type": "Fuel",
                "value": 100
            },
            {
                "trait_type": "Speed",
                "value": 60
            },
            {
                "trait_type": "Control",
                "value": 60
            }
        ],
        IPFS: "https://bafybeid6tht7ecegrnicq5b46l3vze56bccarofiwn2kdpjphzqaunj474.ipfs.nftstorage.link/Prey-go-neesh%20Enterprise.mp4",
        Description: "Taking inspiration from the Condor, also known as 'Wings of the Spirit' are considered sacred birds by many Native American cultures. Condor is a symbol of the sky, embodies the four cardinal virtues of wisdom, justice, goodness, and leadership. Resplendent in its vibrant yellow hue, the Prey-go-neesh stands as a beacon of hope and transformation in the cosmic sea. Illuminating the infinite depths of consciousness that await your exploration. As you soar among the stars, allow the golden light of the Prey-go-neesh to guide your way. This celestial spacecraft is more than just a mode of transportation; it is a conduit for spiritual awakening and cosmic enlightenment."
    },
    {
        TID: 3,
        Name: "Quetzalcoatl Nostromo",
        Attributes: [
            {
                "trait_type": "House",
                "value": "Ayahuasca"
            },
            {
                "trait_type": "Color",
                "value": "Green"
            },
            {
                "trait_type": "Fuel",
                "value": 80
            },
            {
                "trait_type": "Speed",
                "value": 60
            },
            {
                "trait_type": "Control",
                "value": 80
            }
        ],
        IPFS: "https://bafybeid6tht7ecegrnicq5b46l3vze56bccarofiwn2kdpjphzqaunj474.ipfs.nftstorage.link/Quetzalcoatl%20Nostromo.mp4",
        Description: "Inspired by the ancient Mesoamerican God of Wind and Wisdom, 'Kukulcán', also known as the Feathered Serpent. In the vibrant fusion of bird and rattlesnake, Quetzalcoatl emerges as a symbol of profound significance, representing learning, science, agriculture, crafts, and the arts. With its mesmerizing green exterior, the Quetzalcoatl Hovership stands as a testament to the intricate balance between nature and knowledge. Quetzalcoatl invites you to delve deep into the mysteries of the universe, to unravel the secrets of life and wisdom, and to connect with the profound forces of nature."
    },
    {
        TID: 4,
        Name: "SuanNi X-Wing",
        Attributes: [
            {
                "trait_type": "House",
                "value": "Kava"
            },
            {
                "trait_type": "Color",
                "value": "Red"
            },
            {
                "trait_type": "Fuel",
                "value": 60
            },
            {
                "trait_type": "Speed",
                "value": 80
            },
            {
                "trait_type": "Control",
                "value": 80
            }
        ],
        IPFS: "https://bafybeid6tht7ecegrnicq5b46l3vze56bccarofiwn2kdpjphzqaunj474.ipfs.nftstorage.link/SuanNi%20X-Wing.mp4",
        Description: "Inspired by the enigmatic Suanni Dragon, one of the esteemed sons of the Dragon King. This mythical creature, a mesmerizing blend of lion and dragon, is known for its affinity for fire and the ethereal smoke it creates. Beyond its fiery nature, the Suanni Dragon is renowned for its inclination towards restful contemplation and tending to the sacred flames. Cloaked in a captivating shade of red, the SuaNi Hovership embodies the essence of cultural and mystical exploration. Step aboard this extraordinary vessel and prepare to embark on a journey through the vastness of the universe, where the tapestry of diverse cultures and traditions unfolds before your eyes. Prepare for a mystical odyssey guided by the fiery spirit of this remarkable spacecraft."
    }
]

export default hashMetadata;
