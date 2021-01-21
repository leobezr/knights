export default function (level, itemTier) {
   return level < Math.round(itemTier * (itemTier - 1) + ((itemTier - 1) / .3));
}
