<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
@font-face {
    font-family: IRANSansWeb;
    font-style: normal;
    font-weight: normal;
    src: url('/MotivateMonstersToRead/dist/fonts/eot/IRANSansWeb.eot');
    src: url('/MotivateMonstersToRead/dist/fonts/eot/IRANSansWeb.eot?#iefix') format('embedded-opentype'),
        url('/MotivateMonstersToRead/dist/fonts/woff2/IRANSansWeb.woff2') format('woff2'),
        url('/MotivateMonstersToRead/dist/fonts/woff/IRANSansWeb.woff') format('woff'),
        url('/MotivateMonstersToRead/dist/fonts/ttf/IRANSansWeb.ttf') format('truetype');
}

body {
    direction: rtl;
    overflow: hidden;
    font-family: IRANSansWeb !important;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

a {
    text-decoration: none;

    &:visited {
        color: inherit;
    }
}

#app {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>
