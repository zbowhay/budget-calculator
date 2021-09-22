import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
    authDomain: "yardzen-demo.firebaseapp.com",
    databaseURL: "https://yardzen-demo.firebaseio.com",
    projectId: "yardzen-demo",
    storageBucket: "yardzen-demo.appspot.com",
    messagingSenderId: "509183652730",
    appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export async function getItems(db: Firestore) {
    const itemsCol = collection(db, 'items');
    const itemsSnapshot = await getDocs(itemsCol);
    const itemsList = itemsSnapshot.docs.map(doc => doc.data())
    // dedupe
    return itemsList.filter((item, index, self) =>
        index === self.findIndex(i =>
            (i.type === item.type && i.name === item.name)
        )
    );
}

// (async () => {
//     console.log(await getItems(db));
// })();

export interface Item {
    type: string;
    highPrice: number;
    lowPrice: number;
    name: string;
}

export const items: Item[] = [
    {
        highPrice: 6000000,
        lowPrice: 2000000,
        name: "Fountain",
        type: "WATER_FEATURES"
    },
    {
        type: "STRUCTURES",
        highPrice: 600000,
        name: "Taj Mahal",
        lowPrice: 200000
    },
    {
        lowPrice: 150000,
        name: "16+",
        highPrice: 3000000,
        type: "LIGHTING"
    },
    {
        lowPrice: 6000000,
        name: "Pool",
        highPrice: 10000000,
        type: "WATER_FEATURES"
    },
    {
        highPrice: 800000,
        type: "GROUND_COVER",
        lowPrice: 400000,
        name: "Pavers"
    },
    {
        type: "DECK_MATERIAL",
        name: "Redwood",
        highPrice: 1400000,
        lowPrice: 1200000
    },
    {
        lowPrice: 300000,
        name: "Bamboo Shroud",
        highPrice: 500000,
        type: "FENCING_AND_PRIVACY"
    },
    {
        lowPrice: 300000,
        type: "FENCING_AND_PRIVACY",
        name: "Redwood Fence",
        highPrice: 1000000
    },
    {
        name: "Composite",
        highPrice: 1200000,
        lowPrice: 400000,
        type: "DECK_MATERIAL"
    },
    {
        type: "LIGHTING",
        lowPrice: 50000,
        name: "3-5",
        highPrice: 100000
    },
    {
        highPrice: 400000,
        name: "Gravel",
        lowPrice: 200000,
        type: "GROUND_COVER"
    },
    {
        type: "GROUND_COVER",
        lowPrice: 200000,
        name: "Turf",
        highPrice: 600000
    },
    {
        name: "Pergola",
        lowPrice: 1200000,
        highPrice: 3000000,
        type: "STRUCTURES"
    },
    {
        lowPrice: 50000,
        highPrice: 300000,
        name: "Plywood Fence",
        type: "FENCING_AND_PRIVACY"
    },
    {
        lowPrice: 60000,
        type: "LIGHTING",
        highPrice: 150000,
        name: "6-15"
    },
    {
        name: "Pirate Ship",
        lowPrice: 400000,
        type: "STRUCTURES",
        highPrice: 1200000
    }
];