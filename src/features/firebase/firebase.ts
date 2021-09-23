import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
    authDomain: "yardzen-demo.firebaseapp.com",
    databaseURL: "https://yardzen-demo.firebaseio.com",
    projectId: "yardzen-demo",
    storageBucket: "yardzen-demo.appspot.com",
    messagingSenderId: "509183652730",
    appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
};

export interface Item {
    type: string;
    highPrice: number;
    lowPrice: number;
    name: string;
}

export class Firebase {
    app = initializeApp(firebaseConfig);
    db = getFirestore(this.app)
    async getItems() {
        const itemsCol = collection(this.db, 'items');
        const itemsSnapshot = await getDocs(itemsCol);
        const itemsList = itemsSnapshot.docs.map(doc => doc.data())

        // dedupe (y'all tricky)
        return itemsList.filter((item, index, self) =>
            index === self.findIndex(i =>
                (i.type === item.type && i.name === item.name)
            )
        );
    }

    /**
     * NOTE: This method is only here, along with the items array below,
     * so that when this challenge is complete I can revert to "offline" mode.
     *
     * That way if the firebase collection is ever removed I'll still have data to display.
     *  */
    async simulateGetItems() {
        await new Promise((resolve, reject) => { setTimeout(() => resolve(undefined), 500) });
        return this.items;
    }

    items: Item[] = [
        { type: "WATER_FEATURES", name: "Fountain", lowPrice: 2000000, highPrice: 6000000 },
        { type: "STRUCTURES", name: "Taj Mahal", lowPrice: 200000, highPrice: 600000 },
        { type: "LIGHTING", name: "16+", lowPrice: 150000, highPrice: 3000000 },
        { type: "WATER_FEATURES", name: "Pool", lowPrice: 6000000, highPrice: 10000000 },
        { type: "GROUND_COVER", name: "Pavers", lowPrice: 400000, highPrice: 800000 },
        { type: "DECK_MATERIAL", name: "Redwood", lowPrice: 1200000, highPrice: 1400000 },
        { type: "FENCING_AND_PRIVACY", name: "Bamboo Shroud", lowPrice: 300000, highPrice: 500000 },
        { type: "FENCING_AND_PRIVACY", name: "Redwood Fence", lowPrice: 300000, highPrice: 1000000 },
        { type: "DECK_MATERIAL", name: "Composite", lowPrice: 400000, highPrice: 1200000 },
        { type: "LIGHTING", name: "3-5", lowPrice: 50000, highPrice: 100000 },
        { type: "GROUND_COVER", name: "Gravel", lowPrice: 200000, highPrice: 400000 },
        { type: "GROUND_COVER", name: "Turf", lowPrice: 200000, highPrice: 600000 },
        { type: "STRUCTURES", name: "Pergola", lowPrice: 1200000, highPrice: 3000000 },
        { type: "FENCING_AND_PRIVACY", name: "Plywood Fence", lowPrice: 50000, highPrice: 300000 },
        { type: "LIGHTING", name: "6-15", lowPrice: 60000, highPrice: 150000 },
        { type: "STRUCTURES", name: "Pirate Ship", lowPrice: 400000, highPrice: 1200000  }
    ]
}

const firebase = new Firebase();
export default firebase; // singleton
