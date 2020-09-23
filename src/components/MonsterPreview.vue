<template>
    <div class="monster-preview">
        <div class="inner" :style="{ width: `${squareSize}px`, height: `${squareSize}px` }">
            <img class="image" :src="`/MotivateMonstersToRead/dist/monsters/${name}/${finished ? 'body' : 'face'}.svg`" />
            <img class="name" :src="`/MotivateMonstersToRead/dist/monsters/${name}/name.svg`" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        finished: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            squareSize: 0
        }
    },
    mounted() {
        this.changeSquareSize()
        window.addEventListener('resize', this.changeSquareSize)
    },
    methods: {
        changeSquareSize() {
            this.squareSize =
                window.innerHeight > window.innerWidth ? window.innerWidth * 0.7 : window.innerHeight * 0.5
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.changeSquareSize)
    }
}
</script>

<style lang="scss">
.monster-preview {
    display: flex;
    align-items: center;
    justify-content: center;

    @keyframes tada {
        0% {
            transform: scale(1);
        }
        15%,
        20% {
            transform: scale(0.98) rotate(-3deg);
        }
        30%,
        50%,
        70%,
        90% {
            transform: scale(1.02) rotate(3deg);
        }
        40%,
        60%,
        80%,
        95% {
            transform: scale(1.02) rotate(-3deg);
        }
        100% {
            transform: scale(1) rotate(0);
        }
    }

    .inner {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: url('/MotivateMonstersToRead/dist/circle.svg');
        background-size: cover;
        background-position: center;
        margin-top: -15vh;
        animation: tada 4s infinite;

        .image {
            height: 50%;
        }

        .name {
            position: absolute;
            width: 100%;
            height: 20%;
            bottom: 0;
            left: 0;
            animation: tada 3s infinite;
        }
    }
}
</style>
