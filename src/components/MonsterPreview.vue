<template>
    <div class="monster-preview">
        <img :src="`/monsters/${name}/face.svg`" />
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss">
.monster-preview {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 50vw;
        max-width: 320px;
        max-height: 320px;
    }
}
</style>
