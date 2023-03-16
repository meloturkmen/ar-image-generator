import create from 'zustand';
import { persist } from 'zustand/middleware';

import { chatSlice, ChatState } from './chatSlice';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface Store extends ChatState { }

const useStore = create<Store>()(

    (...a) => ({
        ...chatSlice(...a),
        // ...productSlice(...a),
    }),

);

// if (process.env.NODE_ENV === 'development') {
//     mountStoreDevtool('store', useStore);
// }
export default useStore;
