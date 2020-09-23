<template>
    <div class="light" :style="{ width: `${size}px`, height: `${size}px` }"></div>
</template>

<script>
export default {
    data() {
        return {
            size: 0
        }
    },
    mounted() {
        this.changeSize()
        window.addEventListener('resize', this.changeSize)
    },
    methods: {
        changeSize() {
            this.size = (window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth) * 1.5
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.changeSize)
    }
}
</script>

<style lang="scss">
@keyframes light {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.light {
    position: absolute;
    width: 0;
    height: 0;
    background: url('/light.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    animation: light 60s linear infinite;
}
</style>
