<template>
    <div class="page-index">
        <div class="index-container" v-if="isSupport">
            <div class="index-intro">
                <div class="index-intro-pic">
                    <img src="../../../images/index-correct.png" width="200">
                    <div class="index-intro-pic-text">正面平视摄像头、保证光线充足</div>
                </div>
                <div class="index-intro-pic">
                    <img src="../../../images/index-error.png" width="200">
                    <div class="index-intro-pic-text">请勿遮挡面部</div>
                </div>
            </div>
            <div class="index-steps">
                <div class="index-step" v-for="(item, index) in steps">
                    <span class="step-order">{{index + 1}}</span>
                    <span class="step-text">{{item.text}}</span>
                    <span class="step-border" v-if="item.border"></span>
                </div>
            </div>
            <button class="index-confirm" @click="stepNext">确认开始验证</button>

        </div>
        <div class="index-not-support" v-if="!isSupport">
            非常抱歉，该浏览器不支持此功能，推荐使用chrome或firefox体验。
        </div>
        <footer class="pc-face-footer">推荐相关：
            <a class="pc-face-footer-link" target="_blank" href="https://ai.baidu.com/solution/faceprint">人脸核身解决方案</a>
            <span class="pc-face-footer-border">|</span>
            <a class="pc-face-footer-link" target="_blank" href="https://ai.baidu.com/docs#/FacePrint/top">人脸核身技术文档</a>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSupport: true,
                steps: [{
                    text: '请开启摄像头，开始录制视频',
                    border: true
                }, {
                    text: '使用普通话，朗读提示数字',
                    border: true
                }, {
                    text: '完成录制，显示验证结果',
                    border: false
                }]
            };
        },
        mounted() {
            this.isSupported();
        },
        methods: {
            isSupported() {
                const flag = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
                if (!flag) {
                    this.isSupport = false;
                }
            },
            stepNext() {
                this.$emit('update:show', false);
            }
        }
    };

</script>

<style lang="less">
    @color-blue: #0073eb;

    .page-index {
        position: relative;
        height: 100%;
    }
    .index-container {
        margin: 20px auto 0;
        width: 650px;
    }
    .index-intro {
        height: 340px;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        background: rgba(215, 226, 232, .15);
        padding-top: 30px;
        text-align: center;

        &-pic {
            width: 320px;
            text-align: center;
            display: inline-block;
        }

        .index-intro-pic-text {
            margin-top: 20px;
            font-size: 16px;
            color: #666;
        }
    }
    .index-steps {
        margin-top: 40px;
        color: #333;
    }
    .index-step {
        margin-left: 204px;
    }
    .step-order,
    .step-text {
        display: inline-block;
        vertical-align: middle;
    }
    .step-order {
        margin-right: 20px;
        width: 32px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid @color-blue;
        font-size: 22px;
        color: @color-blue;
        line-height: 28px;
        text-align: center;
    }
    .step-border {
        display: block;
        margin: 10px auto 10px 15px;
        height: 6px;
        border-left: 2px dotted @color-blue;
    }
    .index-confirm {
        display: block;
        margin: 40px auto 80px;
        width: 260px;
        font-size: 20px;
        line-height: 60px;
        color: #fff;
        background: @color-blue;
        border: none;
        outline: none;
        padding: 0;
        cursor: pointer;

        &:hover {
            background-color: #3b85f5;
        }
    }
    .index-not-support {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 926px;
        font-size: 16px;
        text-align: center;
        line-height: 306px;
        transform: translate(-50%, -50%);
    }

    .pc-face-footer {
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        color: #333;
        text-align: center;
        background-color: #fafbfd;
        font-size: 14px;

        &-link {
            text-decoration: none;
            color: #666;

            &:hover {
                color: #3f3f3f;
            }
        }

        &-border {
            color: #3f3f3f;
            margin: 0 10px;
        }
    }
</style>