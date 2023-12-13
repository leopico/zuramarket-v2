// metadata.ts

export type Attribute = {
  trait_type: string;
  value: string;
};

export type HouseMetadata = {
  TID: number;
  Name: string;
  Attributes: Attribute;
  IPFS: string;
  Description: string;
};

const houseMetadata: HouseMetadata[] = [
  {
    TID: 0,
    Name: "Datura",
    Attributes: {
      trait_type: "color",
      value: "Blue",
    },
    IPFS: "https://bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link/1.jpg",
    Description:
      "A tranquil haven promoting calm, dependability, and thoughtfulness. Ideal for those who value a peaceful atmosphere, seek reliability, structure, and enjoy deep introspection—a blue house for a serene and contemplative life. Daturathustars are the philosophers of the universe.",
  },
  {
    TID: 1,
    Name: "Iboga",
    Attributes: {
      trait_type: "color",
      value: "Pruple"
    },
    IPFS: "https://bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link/2.jpg",
    Description: "A unique retreat celebrating individuality, fostering creativity, and an enigmatic charm. If you embrace uniqueness, value creativity, and enjoy an air of mystery, the purple house is your distinctive retreat. Ibogans are the dreamers of the universe."
  },
  {
    TID: 2,
    Name: "Peyote",
    Attributes: {
      trait_type: "color",
      value: "Yellow"
    },
    IPFS: "https://bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link/3.jpg",
    Description: "An optimistic retreat, a bright and sunny space for those with a cheerful disposition and a love for creativity, offering a warm and welcoming atmosphere to find joy in everyday life. Peyotics are the Optimists of the universe."
  },
  {
    TID: 3,
    Name: "Ayahuasca",
    Attributes: {
      trait_type: "color",
      value: "Green"
    },
    IPFS: "https://bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link/4.jpg",
    Description: "A nature oasis, surrounded by lush greenery, this house is ideal for nature lovers who value eco-friendly living, seek balance, and appreciate a nurturing environment, offering a perfect space for those with a deep connection to the outdoors. Ayahuascans are the Stewards of the Nature."
  },
  {
    TID: 4,
    Name: "Kava",
    Attributes: {
      trait_type: "color",
      value: "Red"
    },
    IPFS: "https://bafybeieupfzol44kx3ruwdnvrisbqp6putm45rcdjxaknh6ixbmhehierq.ipfs.nftstorage.link/5.jpg",
    Description: "An energetic haven for thrill-seekers who thrive on challenges and embrace a dynamic, fast-paced lifestyle in a lively space. Kaivics are the Adventurers of the universe."
  }


];

export default houseMetadata;
