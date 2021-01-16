<template>
  <div id="characterStatus" class="mt-3">
    <strong>Character Status</strong>

    <div class="table-grid mt-2">
      <div class="table-stats">
          <div class="line">
          <strong>HIT</strong>
          <span>0</span>
        </div>
        <div class="line">
          <strong>ATK</strong>
          <span>0</span>
        </div>
        <div class="line">
          <strong>DEF</strong>
          <span>0</span>
        </div>
        <div class="line">
          <strong>HP</strong>
          <span>0 / 10</span>
        </div>
      </div>

      <div class="table-stats">
        <div class="line">
          <strong>STR</strong>
          <span>0</span>
        </div>
        <div class="line">
          <strong>VIT</strong>
          <span>0</span>
        </div>
        <div class="line">
          <strong>AGI</strong>
          <span>0</span>
        </div>
        <div class="line">
          <strong>LUK</strong>
          <span>0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterStatus",
};
</script>