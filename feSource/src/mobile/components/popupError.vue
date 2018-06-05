<template>
    <div class="face-mobile-popuperror">
        <div class="face-mobile-popuperror-mask"></div>
        <div class="face-mobile-popuperror-box">
            <div class="face-mobile-popuperror-box-text">安卓版本微信不支持视频上传功能<br />请使用浏览器体验</div>
            <div class="face-mobile-popuperror-box-btn"
                @click="closePopError">知道了</div>
        </div>
    </div>
</template>

<script>
/**
 * @file 人脸活体检测h5 demo容器组件
 * @author v_yangbin02
 */

export default {
    props: {
        showPopupError: Boolean
    },
    mounted() {
    },
    methods: {
        closePopError() {
            this.$emit('update:showPopupError', false);
        }
    }
};
</script>
<style lang="less">
    .face-mobile-popuperror {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;

        .face-mobile-popuperror-mask {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.45;
            background: #000;
            z-index: 1;
            width: 100%;
            height: 100%;
        }

        .face-mobile-popuperror-box {
            position: fixed;
            z-index: 2;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 21.083rem;
            height: 14.666rem;
            background-color: #fff;
            padding: 0 2.833rem .833rem;
        }

        .face-mobile-popuperror-box-text {
            padding-top: 3.8rem;
            text-align: center;
            font-size: 1.4rem;
            color: #333;
            line-height: 2.5rem;
        }

        .face-mobile-popuperror-box-btn {
            margin: 2rem auto 0;
            height: 3.083rem;
            line-height: 3.083rem;
            text-align: center;
            background: #0073eb;
            border-radius: 4px;
            color: #fff;
            display: block;
            width: 20.75rem;
            font-size: 16px;
        }
    }

</style>