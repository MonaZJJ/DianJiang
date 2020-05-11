
const payOrder = {
  state: {
    //提货方式 0快递 1自提
    shipType:0,
  },

  mutations: {
    SET_SHIPTYPE: (state, shipType) => {
      state.shipType = shipType
    },
  },

  actions: {

  }
}

export default payOrder
