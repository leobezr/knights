export default {
   selling: (goldValue, tierValue, honorLevel) => Math.round((goldValue * tierValue) * (.1 + (honorLevel * .001))),
   buying: (goldValue, tierValue, honorLevel) => Math.round((goldValue * tierValue) / (.1 + (honorLevel * .001)))
}
