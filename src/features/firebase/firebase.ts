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
    const itemsList = itemsSnapshot.docs.map(doc => doc.data());
    return itemsList;
}

export const items = [
    {
        highPrice: 6000000,
        type: "WATER_FEATURES",
        lowPrice: 2000000,
        name: "Fountain"
    },
    {
        type: "STRUCTURES",
        lowPrice: 200000,
        name: "Taj Mahal",
        highPrice: 600000
    },
    {
        name: "16+",
        lowPrice: 150000,
        type: "LIGHTING",
        highPrice: 3000000
    },
    {
        name: "Pool",
        lowPrice: 6000000,
        highPrice: 10000000,
        type: "WATER_FEATURES"
    },
    {
        highPrice: 800000,
        name: "Pavers",
        lowPrice: 400000,
        type: "GROUND_COVER"
    },
    {
        lowPrice: 6000000,
        type: "WATER_FEATURES",
        highPrice: 10000000,
        name: "Pool"
    },
    {
        name: "Redwood",
        highPrice: 1400000,
        type: "DECK_MATERIAL",
        lowPrice: 1200000
    },
    {
        name: "Bamboo Shroud",
        type: "FENCING_AND_PRIVACY",
        highPrice: 500000,
        lowPrice: 300000
    },
    {
        name: "Redwood Fence",
        type: "FENCING_AND_PRIVACY",
        highPrice: 1000000,
        lowPrice: 300000
    },
    {
        highPrice: 1200000,
        lowPrice: 400000,
        type: "DECK_MATERIAL",
        name: "Composite"
    },
    {
        highPrice: 100000,
        type: "LIGHTING",
        lowPrice: 50000,
        name: "3-5"
    },
    {
        type: "GROUND_COVER",
        highPrice: 400000,
        name: "Gravel",
        lowPrice: 200000
    },
    {
        highPrice: 6000000,
        type: "WATER_FEATURES",
        name: "Fountain",
        lowPrice: 2000000
    },
    {
        highPrice: 600000,
        name: "Turf",
        lowPrice: 200000,
        type: "GROUND_COVER"
    },
    {
        name: "Pergola",
        lowPrice: 1200000,
        type: "STRUCTURES",
        highPrice: 3000000
    },
    {
        type: "FENCING_AND_PRIVACY",
        highPrice: 300000,
        lowPrice: 50000,
        name: "Plywood Fence"
    },
    {
        name: "6-15",
        type: "LIGHTING",
        highPrice: 150000,
        lowPrice: 60000
    },
    {
        name: "Gravel",
        lowPrice: 200000,
        type: "GROUND_COVER",
        highPrice: 400000
    },
    {
        lowPrice: 150000,
        type: "LIGHTING",
        highPrice: 3000000,
        name: "16+"
    },
    {
        name: "6-15",
        type: "LIGHTING",
        lowPrice: 60000,
        highPrice: 150000
    },
    {
        highPrice: 1200000,
        type: "STRUCTURES",
        name: "Pirate Ship",
        lowPrice: 400000
    }
];