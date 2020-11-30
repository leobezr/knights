export default function (options) {
   options = options || {};

   if (!options.name) {
      throw new Error("Invalid name");
   }

   return {
      name: options.name || "",
      birthday: Date.now(),
      sprite: options.sprite || 0,
      gender: options.gender || "female"
   }
}
