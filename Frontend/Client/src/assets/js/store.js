// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    searchQuery: '',
    filteredItems: [],
  },
  mutations: {
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setFilteredItems(state, items) {
      state.filteredItems = items;
    },
  },
});

export default store;
