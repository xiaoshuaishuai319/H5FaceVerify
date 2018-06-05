<template>
    <div class="img-corner">
        <span class="img-corner-corner"
              v-for="(item, index) in iconArray"
              :class="[`img-corner-corner-${index}`]"></span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                iconArray: [0, 1, 2, 3]
            };
        }
    };
</script>

<style lang="less">
    .img-corner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        &-corner {
            display: block;
            position: absolute;
            z-index: 2;
            width: 20px;
            height: 20px;
            background: url('../../../images/icon2.png') no-repeat;
            background-size: cover;
        }
        &-corner-0 {
            left: 20px;
            top: 20px;
            transform: rotate(-90deg);
        }
        &-corner-1 {
            right: 20px;
            top: 20px;
        }
        &-corner-2 {
            left: 20px;
            bottom: 20px;
            transform: rotate(180deg);
        }
        &-corner-3 {
            right: 20px;
            bottom: 20px;
            transform: rotate(90deg);
        }
    }
</style>