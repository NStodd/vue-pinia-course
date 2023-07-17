import { defineStore } from "pinia/dist/pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
    // state
    state: () => {
        return {
            items: []
        }
    },
    // actions
    // pushing the button emits 'addToCart' event w/ 'count' arg
    actions: {
        checkout () {
            const authUserStore = useAuthUserStore();
            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.totalPrice}.`)
        },
        addItems (count, item) {
            count = parseInt(count)
            // before adding items, we need to clone the item reference to be a new instance
            for (let i = 0; i < count; i++) {
                this.items.push({...item}); //spread item into its own object to do this
            }
        },
        clearGroup (itemName) {
            this.items = this.items.filter(item => item.name != itemName)

        },
        setItemCount (item, count) {
            // removes or adds one instance of a particular item, based on the $event value. I think.
            //clear items first
            this.clearGroup(item.name)
            this.addItems(count, item)
        }
    },

    // getters
    getters: {
        // alternative syntax using arrow functions
        //      'state' is default argument and represents 'this'
        // count: (state) => state.items.length
        // isEmpty: (state) => state.count === 0
        // grouped : (state) => groupBy(state.items, (item) => item.name)

        count () {
            return this.items.length;
        },
        isEmpty () {
            return this.count === 0;
        },
        // grouped: (state) => groupBy(state.items, (item) => item.name)
        grouped () {
            const groups = groupBy(this.items, (item) => item.name)

            const sortedGroups = Object.keys(groups).sort()

            let inOrder = {}

            sortedGroups.forEach(key => inOrder[key] = groups[key])

            return inOrder;
        },

        groupCount: (state) => (name) => state.grouped[name].length,
        // I don't know how to do groupCount in the other way.
        // groupCount (name) {
        //     return this.grouped[name].length
        // }

        //ALT, using 'reduce' 
        //total: (state) => state.items.reduce((p, c) => p + c.price, 0)
        totalPrice: (state) => {
            let total = 0;
            for (let i = 0; i < state.items.length; i++){
                total = total + state.items[i].price 
                console.log(state.items[i].price)
            }
            return total
        }
    }
})