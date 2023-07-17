import { defineStore } from "pinia/dist/pinia";

export const useProductStore = defineStore("ProductStore", {
    // options object...
    // state, defined as a function for what is returned(?)
    // ...the state is the central part of store, reason for store
    // ...defines data accessible for components across application
    state: () => {
        return{
            products: [],
        }
    },

    // actions, set of methods used to mutate the store's data
    actions: {
        async fill () {
            // pulling data from static data
            this.products = (await import("../data/products.json")).default;

            // Ex. pulling data from dynamic api fetch
            // this.products = (await axios.get("some/endpoint")).data;
        }
    },

    // getters
})