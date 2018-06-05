<template>
    <div class="loading">
        <div class="loading-icon"></div>
        <span class="loading-text">验证中...</span>
    </div>
</template>

<script>

</script>

<style lang="less">

    @keyframes loadImg {
        0% {
            transform: translateX(-50%) rotate(0);
        }
        to {
            transform: translateX(-50%) rotate(359deg);
        }
    }

    .loading {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .45);
        z-index: 10;

        &-icon {
            display: block;
            width: 3rem;
            height: 3rem;
            background: url(../../../images/loading.png) center 0 no-repeat;
            background-size: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            text-align: center;
            line-height: 8rem;
            animation: loadImg 1.5s linear infinite;
        }

        &-text {
            position: absolute;
            top: 57%;
            left: 50%;
            font-size: 1.166rem;
            transform: translateX(-50%);
            color: #fff;
        }
    }
</style>
