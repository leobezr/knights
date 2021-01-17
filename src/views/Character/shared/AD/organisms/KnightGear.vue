<template>
    <div id="knightGear" class="inventory">
        <CardBody title="Inventory" index="2">
            <CharacterInventory />
        </CardBody>
    </div>
</template>

<script>
import CardBody from "@/shared/components/AD/atoms/CardBody.vue";
import CharacterInventory from "@/views/Character/shared/AD/molecules/CharacterInventory.vue";
import "@/shared/scss/_knightGearInventory.scss";

export default {
    name: "KnightGear",
    components: {
        CardBody,
        CharacterInventory
    }
}
</script>