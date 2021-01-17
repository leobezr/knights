import { items } from "@/service/endpoints";

export default {
    actions: {
        async getItemsGallery({ commit }) {
            const ITEM_LIST = await items.getGallery();

            commit("updateItemGallery", ITEM_LIST.data.items);
        }
    },
    mutations: {
        updateItemGallery(state, itemList) {
            state.gallery = itemList;
        }
    },
    state: {
        gallery: []
    },
    getters: {

    }
}
