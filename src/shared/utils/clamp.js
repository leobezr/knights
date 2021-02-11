export default function (clickX, clickY, playerX, playerY, radius) {

   let clickVerX = clickX - playerX;
   let clickVerY = clickY - playerY;

   let distanceToCenter = Math.sqrt(clickVerX * clickVerX + clickVerY * clickVerY);

   let clampedX = playerX + clickVerX * (radius / distanceToCenter);
   let clampedY = playerY + clickVerY * (radius / distanceToCenter);

   return {
      x: clampedX,
      y: clampedY
   }
};
