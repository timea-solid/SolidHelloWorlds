
const context = {
  session: {
    store: UI.store,
    logic: UI.solidLogicSingleton
  },
  dom: document,
  getOutliner: () => null,
};

const fetcher = UI.store.fetcher;
