<template>
    <div class="modal-layer">
        <div class="modal-layer-mask"></div>
        <div class="modal-layer-popup">
            <div class="modal-layer-success"
                 v-if="!videoFail">
                <div class="modal-layer-popup-title">请牢记以下验证码</div>
                <div class="modal-layer-popup-content">此验证码将于<span>{{refreshTime}}</span>秒后过期<br />用普通话朗读数字，视频时长<span>3-8</span>秒最佳</div>
                <div class="modal-layer-popup-number">
                    <span v-for="items in codeResult">{{items}}</span>
                </div>
                <div class="modal-wrapper"
                    :class="{'modal-point': btnPoint}">
                    <span class="modal-confirm-btn"
                            :disabled="timeHaveToStay > 0">
                        {{timeHaveToStay | confirmBtnText}}
                    </span>
                    <input type="file"
                        class="camera-input"
                        @change="iptChange($event)"
                        ref="cameraInput"
                        accept="video/*"
                        capture="camcorder" />
                </div>
            </div>
            <div class="modal-layer-fail"
                 v-if="videoFail">
                <div class="modal-layer-fail-icon"></div>
                <div class="modal-layer-fail-title">{{videoFailText.title}}</div>
                <div class="modal-layer-fail-detail">{{videoFailText.detail}}</div>
                <div class="modal-layer-fail-restart"
                    @click="videoRestart">重新获取</div>
            </div>
            <span class="modal-layer-close"
                   @click="closePopup()">
            </span>
        </div>

        
    </div>
</template>

<script>
    /**
     * @file 人脸活体检测h5 弹层
     * @author v_yangbin02
     */

    import request from 'superagent';

    export default {
        props: {
            videoFail: {
                type: Boolean,
                default: false
            },
            videoFailText: {
                type: Object,
                default: {
                    title: '视频无法上传',
                    detail: '您录制的视频时间过长,请重新录制'
                }
            }
        },
        data() {
            return {
                // 需要等待的时间
                timeHaveToStay: 3,
                refreshTime: 60,
                btnPoint: false,
                codeResult: '',
                sessionId: '',
                stayTimer: null,
                startTimeMinute: null
            };
        },
        created() {
            this.getVerifyCodeModal();
        },
        filters: {
            confirmBtnText(timeHaveToStay) {
                if (timeHaveToStay > 0) {
                    return `记住了，开始录制(${timeHaveToStay}s)`;
                }

                return '记住了，开始录制';
            }
        },
        methods: {
            closePopup() {
                this.clearTimer();
                this.$emit('cancel');
            },

            clearTimer() {
                this.stayTimer && clearTimeout(this.stayTimer);
                this.startTimeMinute && clearTimeout(this.startTimeMinute);

                this.stayTimer = null;
                this.startTimeMinute = null;
            },

            stayTimerF() {
                this.stayTimer = setTimeout(
                    () => {
                        if (--this.timeHaveToStay === 0) {
                            this.stayTimer = null;
                            this.btnPoint = true;
                            return;
                        }
                        this.stayTimerF();
                    },
                    1000
                );
            },

            getVerifyCodeModal() {
                let formdata = {
                    type: 'faceliveness_sessioncode',
                    apiType: 'faceliveness'
                };

                request
                    .post('/aidemo')
                    .type('form')
                    .send(formdata)
                    .then(({body}) => {
                        const {errno, data} = body;
                        let res = data.result;
                        if (res) {
                            this.codeResult = res.code;
                            this.sessionId = res.session_id;
                            this.timeHaveToStay = 3;
                            this.stayTimerF();
                            this.btnPoint = false;
                        }
                        else {
                            this.errorContent();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorContent();
                    });

                this.refreshTime = 60;
                this.timeout();
            },

            timeout() {
                // 60秒倒计时
                this.startTimeMinute = setTimeout(
                    () => {
                        if (--this.refreshTime === 0) {
                            this.getVerifyCodeModal();
                            this.startTimeMinute = null;
                            return;
                        }
                        this.timeout();
                    },
                    1000
                );
            },

            videoRestart() {
                this.$emit('update:videoFail', false);
                this.$emit('update:videoFailText', {});
                this.clearTimer();
                this.getVerifyCodeModal();
            },

            errorContent() {
                this.$emit('update:videoFail', true);
                this.$emit('update:videoFailText', {
                    title: '获取验证码失败',
                    detail: '请重新获取验证码'
                });
            },

            iptChange(event) {
                if (this.timeHaveToStay === 0) {
                    this.$emit('videoResult', event, this.sessionId);
                    this.clearTimer();
                }
            }
        },
        mounted() {
            // 弹出弹窗后，开始计时，3秒后用户可以开始录制视频
            // this.$refs.cameraInput.addEventListener('change', event => {
            //     this.$emit('videoResult', event, this.sessionId);
            //     this.clearTimer();
            // });
        },
        beforeDestroy() {
            this.clearTimer();
        }
    };
</script>

<style lang="less">
    @color-white: #fff;
    @color-3: #333;

    .modal-layer {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        &-mask {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            opacity: 0.45;
            background: #000;
            z-index: 1;
        }

        &-popup {
            width: 24.083rem;
            height: 22.666rem;
            background-color: @color-white;
            padding: 0 0.833rem 0.833rem;
            position: fixed;
            left: 50%;
            top: 10.666rem;
            margin-left: -12.85rem;
            z-index: 2;

            &-title {
                font-size: 16px;
                color: @color-3;
                height: 1.333rem;
                line-height: 1.333rem;
                text-align: center;
                margin: 3.083rem 0 1.25rem 0;
            }

            &-content {
                font-size: 1.166rem;
                color: #666;
                text-align: center;
                margin-bottom: 1.71rem;
                letter-spacing: 0;

                span {
                    color: #f00;
                }
            }

            &-number {
                font-size: 0;
                text-align: center;

                span {
                    font-size: 40px;
                    color: @color-3;
                    display: inline-block;
                    width: 3.65rem;
                    height: 5rem;
                    line-height: 5rem;
                    margin-right: 0.43rem;
                    border: 1px solid #e1e1e1;
                    border-radius: 10px;
                    text-align: center;
                    box-sizing: border-box;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }

        &-close {
            outline: none;
            position: absolute;
            width: 3.666rem;
            height: 3.666rem;
            left: 50%;
            bottom: -9.875rem;
            margin-left: -1.833rem;
            background: url(../../../images/icon_close.png) 0 0 no-repeat;
            background-size: 100% auto;
        }

        &-fail {

            &-icon {
                width: 3.192rem;
                height: 2.74rem;
                margin: 2.096rem auto 2.925rem;
                background: url(../../../images/icon_fail.png) 0 0 no-repeat;
                background-size: 100% auto;
            }

            &-title {
                text-align: center;
                font-size: 1.5rem;
                color: @color-3;
                margin-bottom: .6rem;
            }

            &-detail {
                font-size: 1.166rem;
                color: #666;
                text-align: center;
            }

            &-restart {
                height: 4.083rem;
                text-align: center;
                background: #0073eb;
                border-radius: 4px;
                line-height: 4.083rem;
                position: absolute;
                width: 24rem;
                bottom: .84rem;
                font-size: 1.333rem;
                color: @color-white;
            }
        }

        .modal-wrapper {
            height: 4.083rem;
            text-align: center;
            background: #bcd2eb;
            border-radius: 4px;
            line-height: 4.083rem;
            position: absolute;
            width: 24rem;
            bottom: .84rem;

            &.modal-point {
                background: #0073eb;
            }
        }

        .modal-confirm-btn {
            font-size: 16px;
            color: @color-white;
            width: 100%;
            height: 100%;
        }

        .camera-input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>
