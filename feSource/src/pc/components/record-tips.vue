<template>
    <div class="record-tips">
        <div class="record-tips-wait" v-if="seconds">
            <span class="record-tips-second">{{seconds}}</span>
            <span class="record-tips-text">请将脸部对准框内提示</span>
            <span class="record-tips-text">并朗读验证码</span>
        </div>
        <div class="record-tips-start" v-else>
            开始拍摄
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            seconds: {
                type: Number,
                default: 0
            }
        }
    };
</script>

<style lang="less">
    .record-tips {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 330px;
        height: 212px;
        color: #fff;
        border-radius: 6px;
        background: rgba(0, 0, 0, .7);
        transform: translate(-50%, -50%);
        &-second {
            display: block;
            margin: 40px auto 30px;
            text-align: center;
            font-size: 36px;
        }
        &-text {
            display: block;
            text-align: center;
            font-size: 18px;
        }
        &-start {
            text-align: center;
            font-size: 30px;
            line-height: 212px;
        }
    }
</style>