<template>
<div class="pc-record-main">
    <div class="page-record">
        <div class="page-record-main"
            v-if="noresult">
            <div class="page-record-container" v-if="canUse">
                <div class="page-record-code">
                    <div class="page-record-code-title"
                        v-if="isShowText">请使用普通话朗读下方验证码</div>
                    <div class="page-record-code-text">
                        <span class="page-record-code-text-item" v-for="item in code">{{item}}</span>
                    </div>
                </div>
                <div class="page-record-video">
                    <video ref="cameraVideo" class="page-record-video-obj" autoplay muted></video>
                    <img-corner></img-corner>
                    <div class="page-record-video-focus">
                        <img class="page-record-video-focus-img"
                            :src="startScan ? focusImg : focusReady"
                            :style="{'height': imgHeight}"
                            alt=""/>
                    </div>
                    <record-tips :seconds="countDown"
                                v-if="recordTipsShow"></record-tips>
                    <div class="page-record-checking" v-if="isChecking">
                        <img class="page-record-checking-icon" src="../../../images/loading.png" alt="" />
                        <span class="page-record-checking-text">检测中...</span>
                    </div>
                </div>
                <div class="page-record-progress" v-if="showProgress">
                    <div class="page-record-progress-bar"
                        :style="{'width': progressWidth}"
                        :class="{'progress-warn' : progressWarn}"></div>
                </div>
                <div class="page-record-action"
                    v-if="countDown === -1">
                    <button class="page-record-action-button page-record-action-submit"
                            @click="stopVideo">完成并提交</button>
                    <button class="page-record-action-button page-record-action-retry"
                            @click="retry">重试</button>
                </div>
            </div>
            <div class="page-record-not-permission" v-else>
                <div class="not-permission-pic">
                    <img class="not-permission-pic-img" src="../../../images/check-fail.png">
                    <div class="not-permission-pic-text">未获取到摄像头、麦克风</div>
                </div>
                <div class="not-permission-explain">
                    <div class="not-permission-explain-text">请允许网站使用您的摄像头、麦克风</div>
                    <div class="not-permission-explain-restart">若已经允许，请点击<a class="restart-link" href="javascript:void(0)" onclick="location.reload()">刷新页面</a></div>
                </div>
            </div>
        </div>
       <div class="page-record-result" v-else>
           <div class="page-record-result-pic">
                <img class="page-record-result-pic-imgdefault"
                    :src="imgsrc"
                    :width="imgWidth"/>
           </div>
           <div class="page-record-result-content">
               <div class="con-title">活体检测
                   <span :class="errcode === 0 ? 'con-title-color-green' : 'con-title-color-red'">{{errcode === 0 ? '成功' : '失败'}}</span>
               </div>
               <div class="con-fail-text"
                    v-if="errcode !== 0">{{errcode|getErrorText}}</div>
               <div class="con-result">
                   <span class="con-result-text con-result-text0">
                       检测分值:{{(errcode === 0 && result.score) ? result.score : 0}}
                   </span>
                   <span class="con-result-text con-result-text1">
                       应读数字:{{(errcode === 0 && result.code.create) ? result.code.create : 0}}
                   </span>
                   <span class="con-result-text con-result-text2">
                       检测数字:{{(errcode === 0 && result.code.identify) ? result.code.identify : 0}}
                   </span>
               </div>
               <div class="con-btn">
                    <span class="con-btn-finish"
                        @click="resultFinish">完成</span>
                    <span class="con-btn-restart"
                        @click="resultRestart">重试</span>
               </div>
           </div>
       </div>
    </div>
    <face-popup v-if="popupShow"
        :popupOption="popupOption"
        @pcFaceFinish="onFaceFinish"
        @pcFaceCancel="onFaceCancel"></face-popup>
</div>
</template>

<script>
    /**
     * @file pc录制视频
     */

    import request from 'superagent';
    import RecordVideo from '../../common/RecordVideo';

    import imgCorner from '../components/img-corner';
    import recordTips from '../components/record-tips';
    import facePopup from '../components/face-popup';

    const focusReady = require('../../../images/focus-ready.png');
    const focusImg = require('../../../images/focus.png');
    const READY_SIZE = '311px';
    const DEFAULT_SIZE = '278px';
    const defaultImg = require('../../../images/check-fail.png');
    const noticeNum = 6;
    const proBarNum = 21;
    const tipsShowNum = -1;

    /* eslint-disable fecs-camelcase */
    export default {
        data() {
            return {
                // 视频录制对象
                videoObj: null,
                // session_id
                sessionId: '',
                // 验证码
                code: [],
                // video转base64
                video_base64: '',
                // 摄像头、麦克风是否可用
                canUse: true,
                // 3秒倒计时
                countDown: 3,
                // 录制视频倒计时
                videoCountDown: 21,
                countDownId: null,
                videoCountDownId: null,
                // 是否显示进度条
                showProgress: false,
                // 是否开始检测视频
                startScan: false,
                // 3秒倒计时默认图片
                focusReady: focusReady,
                // 视频录制时焦点图片
                focusImg: focusImg,
                // 是否显示录制提示
                recordTipsShow: false,
                // 视频是否在验证中
                isChecking: false,
                // 是否显示检测结果
                showResult: false,
                // 存在检测结果，摄像头部分代码隐藏
                noresult: true,
                // 展示弹窗
                popupShow: false,
                // 弹窗的参数opt
                popupOption: {},
                // 结果页数据
                videoResult: {},
                // 展示'请用普通话复述'
                isShowText: false
            };
        },
        filters: {
            getErrorText(text) {
                switch (text) {
                    case 216501:
                        return '没有找到人脸';
                    case 216434:
                        return '活体检测失败';
                    case 216507:
                        return '视频中有多张脸';
                    default:
                        return '服务器异常';
                }
            }
        },
        mounted() {
            if (this.noresult) {
                this.getVideo();
            }
        },
        methods: {

            /**
             * 开始录制
             */
            startVideo() {
                this.videoObj.startRecord();
            },

            /**
             * 停止录录制
             */
            stopVideo() {
                this.videoObj.stopRecord();
            },

            checkVideo() {
                const blob = new Blob(this.videoObj.chunks, {
                    type: 'video/webm'
                });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.addEventListener('loadend', () => {
                    this.video_base64 = reader.result.split(',')[1];
                    clearTimeout(this.videoCountDownId);
                    this.videoCountDownId = null;
                    this.verifyVideo();
                });
            },

            /**
             * 验证视频
             */
            verifyVideo() {
                this.showProgress = false;
                this.isChecking = true;
                let formdata = {
                    type: 'faceliveness_verify',
                    apiType: 'faceliveness',
                    session_id: this.sessionId,
                    video_base64: this.video_base64
                };
                request
                    .post('/aidemo')
                    .type('form')
                    .send(formdata)
                    .then(({body}) => {
                        const {err_no, data} = body;
                        this.videoResult = data;
                        this.isChecking = false;
                        this.noresult = false;
                    })
                    .catch(err => {
                        // todo 异常处理
                        this.isChecking = false;
                    });
            },

            /**
             * 获取sessionid和code
             */
            getSessionCode() {
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
                        if (errno) {
                            this.codeGetFail();

                            return;
                        }

                        if (data.err_no === 0) {
                            this.sessionId = data.result.session_id;
                            this.code = data.result.code.split('');
                            this.isShowText = true;
                            this.showCameraTip();
                        }
                        else {
                            this.codeGetFail();
                        }
                    })
                    .catch(error => {
                        this.codeGetFail();
                    });
            },

            /**
             * 三秒倒计时显示
             */
            showCameraTip() {
                this.recordTipsShow = true;
                this.countDownId = setTimeout(() => {
                    if (--this.countDown === tipsShowNum) {
                        // todo 超过20秒弹窗处理
                        this.startScan = true;

                        this.countDownId = null;
                        this.startVideo();
                        this.showVideoTip();
                        this.recordTipsShow = false;
                        this.showProgress = true;
                        return;
                    }

                    this.showCameraTip();
                }, 1000);
            },

            /**
             * 二十秒录制倒计时
             */
            showVideoTip() {
                this.videoCountDownId = setTimeout(() => {
                    if (--this.videoCountDown === 0) {
                        this.videoCountDownId = null;
                        this.popupShow = true;
                        this.popupOption = {
                            title: '视频长度已达到最长限制',
                            detail: '是否使用该视频?',
                            btnFinish: '使用',
                            btnCancel: '重拍',
                            type: 'video'
                        };

                        return;
                    }

                    this.showVideoTip();
                }, 1000);
            },

            /**
             * 重置页面参数
             */
            reset() {
                this.countDown = 3;
                this.videoCountDown = 21;
                this.startScan = false;
                this.showProgress = false;
                this.isChecking = false;
                this.clearTimer();
            },

            /**
             * 重新录制
             */
            retry() {
                this.reset();
                this.getSessionCode();
            },

            /**
             * 清空页面所有的setTimeout和setInterval
             */
            clearTimer() {
                clearTimeout(this.countDownId);
                this.countDownId = null;
                clearTimeout(this.videoCountDownId);
                this.videoCountDownId = null;
            },

            /**
             * 弹窗完成时候点击操作，分为验证码(code),验证视频(video)
            */
            onFaceFinish() {
                if (this.popupOption.type === 'code') {
                    this.popupShow = false;
                    this.retry();
                }
                else if (this.popupOption.type === 'video') {
                    this.stopVideo();
                    this.popupShow = false;
                }
            },

            /**
             * 弹窗取消时候点击操作，分为验证码(code),验证视频(video)
            */
            onFaceCancel() {
                if (this.popupOption.type === 'code') {
                    this.resultFinish();
                }
                else if (this.popupOption.type === 'video') {
                    this.retry();
                    this.popupShow = false;
                }
            },

            /**
             * 获取验证码失败
            */
            codeGetFail() {
                this.popupShow = true;
                this.popupOption = {
                    title: '获取验证码失败',
                    detail: '请检查网络，再重新获取',
                    btnFinish: '重新获取',
                    btnCancel: '退出',
                    type: 'code'
                };
            },

            /**
             * 结果页完成按钮
            */
            resultFinish() {
                if (window.location.hash !== '') {
                    history.replaceState(null, '', location.pathname + location.search);
                }

            },

            /**
             * 结果页重拍按钮
            */
            resultRestart() {
                this.noresult = true;
                this.reset();
                this.$nextTick(this.getVideo);
            },

            /**
             * 获取摄像头操作
            */
            getVideo() {
                this.videoObj = new RecordVideo(this.$refs.cameraVideo);
                const videoPromise = this.videoObj.init();
                videoPromise
                    .then(() => {
                        this.videoObj.mediaRecorder.addEventListener('stop', this.checkVideo, false);
                        this.getSessionCode();
                    })
                    .catch(err => {
                        this.canUse = false;
                    });
            }
        },
        computed: {
            imgHeight() {
                return this.startScan ? DEFAULT_SIZE : READY_SIZE;
            },
            progressWidth() {
                if ((proBarNum - this.videoCountDown) * 5 > 100) {
                    return '100%';
                }
                return `${(proBarNum - this.videoCountDown) * 5}%`;
            },
            progressWarn() {
                return this.videoCountDown < noticeNum;
            },
            errcode() {
                return this.videoResult.err_no;
            },
            result() {
                return this.videoResult.result;
            },
            imgsrc() {
                return this.videoResult.err_no === 0
                    ? 'data:image/jpeg;base64,' + this.videoResult.result.pic_list[0].pic
                    : defaultImg;
            },
            imgWidth() {
                return (this.videoResult.err_no === 0
                    && this.videoResult.result.pic_list.length
                    && this.videoResult.result.pic_list[0].pic) ? '100%' : '40%';
            }
        },
        components: {
            imgCorner,
            recordTips,
            facePopup
        },
        beforeDestroy() {
            this.clearTimer();
        }
    };
    /* eslint-enable fecs-camelcase */
</script>

<style lang="less">
    @prefix: page-record;
    @keyframes loadImg {
        0% {
            transform: rotate(0);
        }
        to {
            transform: rotate(359deg);
        }
    }

    .@{prefix} {
        position: relative;
        height: 100%;
        width: 500px;
        margin: 0 auto;
    }
    .@{prefix}-code {
        text-align: center;
        padding: 22px 0;  
        height: 130px;      

        &-title {
            margin: 0 auto 20px;
            font-size: 24px;
            line-height: 24px;
            color: #333;
        }
        &-text {
            margin: 0 auto;
            &-item {
                display: inline-block;
                margin: 0 4px;
                width: 60px;
                box-sizing: border-box;
                border: 1px solid #e1e1e1;
                font-size: 50px;
                line-height: 80px;
                -moz-line-height: 80px;
            }
        }
    }
    .@{prefix}-video {
        position: relative;
        overflow: hidden;
        width: 500px;
        margin: 0 auto;

        &-obj {
            display: block;
            margin: 0 auto;
            width: 500px;
            height: 400px;
            object-fit: cover;
        }
        &-focus {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: transparent;
            &-img {
                display: block;
            }
        }
    }
    .@{prefix}-progress {
        height: 3px;
        width: 500px;
        overflow: hidden;
        margin: 0 auto;

        &-bar {
            height: 3px;
            transition: width 1s linear;
            background: #30ac69;
            &.progress-warn {
                background: #ee6723;
            }
        }
    }
     .@{prefix}-action {
        margin-top: 20px;
        text-align: center;
        width: 500px;
        overflow: hidden;
        &-button {
            width: 200px;
            font-size: 20px;
            line-height: 50px;
            border: 1px solid #0073eb;
            outline: none;
            cursor: pointer;
        }
        &-submit {
            color: #fff;
            background: #0073eb;
            margin-right: 30px;

            &:hover {
                background-color: #3b85f5;
            }
            
        }
        &-retry {
            color: #0073eb;
            background: #fff;
            
            &:hover {
                background-color: #3b85f5;
                color: #fff;
            }
        }
    }
    .@{prefix}-checking {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 330px;
        height: 212px;
        color: #fff;
        border-radius: 6px;
        background: rgba(0, 0, 0, .7);
        transform: translate(-50%, -50%);
        &-icon {
            display: block;
            margin: 67px auto 20px;
            height: 41px;
            animation: loadImg 1.5s linear infinite;
        }
        &-text {
            display: block;
            text-align: center;
        }
    }

    .@{prefix}-not-permission {
        margin-top: 50px;

        .not-permission-pic {
            width: 498px;
            height: 398px;
            background: rgba(215, 226, 232, .15);
            border: 1px solid #e1e1e1;
            text-align: center;
            margin-bottom: 50px;
        }

        .not-permission-pic-img {
            width: 30%;
            margin: 80px 0 60px 0;
        }

        .not-permission-pic-text {
            font-size: 18px;
            color: #666;
        }

        .not-permission-explain {
            text-align: center;
        }

        .not-permission-explain-text {
            font-size: 20px;
            color: #333;
            margin-bottom: 20px;
        }

        .not-permission-explain-restart {
            font-size: 18px;
            color: #999;

            .restart-link {
                color: #0073eb;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .@{prefix}-result {
        
        &-pic {
            width: 500px;
            height: 400px;
            text-align: center;
            background-color: #f9fbfc;
            border: 1px solid #e1e1e1;
            line-height: 570px;
            margin-bottom: 30px;
            margin-top: 20px;
        }

        &-content {
            
            .con-title {
                height: 24px;
                font-size: 24px;
                line-height: 24px;
                color: #333;
                text-align: center;
            }

            .con-title-color-green {
                color: #30ac69;
            }

            .con-title-color-red {
                color: #ff3030;
            }

            .con-fail-text {
                height: 18px;
                line-height: 18px;
                font-size: 18px;
                margin-top: 20px;
                color: #999;
                text-align: center;
            }

            .con-result {
                margin-top: 30px;
                
                .con-result-text {
                    display: inline-block;
                    overflow: hidden;
                    height: 18px;
                    line-height: 18px;
                    font-size: 16px;
                    color: #666;
                }

                .con-result-text0 {
                    width: 180px;
                }

                .con-result-text1,.con-result-text2 {
                    width: 140px;
                }
                
            }

            .con-btn {
                margin-top: 30px;
                display: flex;

                .con-btn-finish {
                    flex: 1;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    background-color: #0073eb;
                    font-size: 22px;
                    color: #fff;
                    border: 1px solid #0073eb;
                    margin-right: 40px;
                }

                .con-btn-restart {
                    flex: 1;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    background-color: #fff;
                    font-size: 22px;
                    color: #0073eb;
                    border: 1px solid #0073eb;
                }
            }
        }
    }
</style>