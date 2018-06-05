<template>
    <div class="result">
        <div class="result-box" v-if="videoResultDetail">
            <span class="result-box-pic">
                <span class="result-box-pic-icon icon-top"></span>
                <span class="result-box-pic-icon icon-right"></span>
                <span class="result-box-pic-icon icon-bottom"></span>
                <span class="result-box-pic-icon icon-left"></span>
                <img class="result-box-return-img" :src="imgsrc"/>
            </span>
            <span class="result-box-text">活体检测
                <span class="result-box-color"
                      :class="errcode === 0 ? 'resulr-color-green' : 'resulr-color-red'">{{errcode === 0 ? '成功' : '失败'}}</span>
                <span class="result-box-failcolor"
                      v-if="errcode !== 0">{{errcode|getErrorText}}</span>
            </span>
            <div class="result-box-value">
                <span class="result-box-value-text">检测分值:{{(errcode === 0 && result.score) ? result.score : 0}}
                </span>
                <span class="result-box-value-text">应读数字:{{(errcode === 0 && result.code.create) ? result.code.create : 0}}
                </span>
                <span class="result-box-value-text">检测数字:{{(errcode === 0 && result.code.identify) ? result.code.identify : 0}}
                </span>
            </div>
        </div>
        <div class="result-option">
            <span class="result-option-btn result-option-btn-ok"
                @click="finish">完成</span>
            <span class="result-option-btn result-option-btn-again"
                  @click="restart">重拍</span>
        </div>
    </div>
</template>

<script>
    /**
     * @file 人脸活体检测h5 结果页
     * @author v_yangbin02
     */

    const defaultImg = require('../../../images/pic_default.png');
    export default{
        props: {
            videoResultDetail: {
                type: Object,
                default: {}
            },
            showResult: Boolean
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

        computed: {
            imgsrc() {
                return this.videoResultDetail.err_no === 0
                    ? 'data:image/jpeg;base64,' + this.videoResultDetail.result.pic_list[0].pic
                    : defaultImg;
            },
            errcode() {
                return this.videoResultDetail.err_no;
            },
            result() {
                return this.videoResultDetail.result;
            }
        },

        watch: {
            videoResultDetail: {
                handler(curVal, oldVal) {
                },
                deep: true
            }
        },

        methods: {
            restart() {
                this.$emit('restart');
            },
            finish() {
                this.$emit('update:showResult', false);
            }
        }
    };
</script>

<style lang="less">
    @color-9: #999;
    @color-white: #fff;
    @color-blue: #0073eb;

    .result {
        background: #e1e1e1;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 1.25rem;

        &-box {
            background: @color-white;
            box-shadow: 0 -4px 10px 0 #e8e8e8;
            padding: 3.333rem 5.75rem 4rem;
            margin-bottom: 1.25rem;

            &-pic {
                display: block;
                width: 17.25rem;
                height: 17.25rem;
                margin: 0 auto 2.333rem;
                position: relative;
                text-align: center;

                &-icon {
                    position: absolute;
                    width: 1.677rem;
                    height: 1.677rem;
                }

                .icon-top {
                    left: 0;
                    top: 0;
                    background: url(../../../images/icon_left_top.png) 0 0 no-repeat;
                    background-size: 50% 50%;
                }

                .icon-right {
                    right: 0;
                    top: 0;
                    background: url(../../../images/icon_right_top.png) .833rem 0 no-repeat;
                    background-size: 50% 50%;
                }

                .icon-bottom {
                    right: 0;
                    bottom: 0;
                    background: url(../../../images/icon_right_bottom.png) .833rem .833rem no-repeat;
                    background-size: 50% 50%;
                }

                .icon-left {
                    left: 0;
                    bottom: 0;
                    background: url(../../../images/icon_left_bottom.png) 0 .833rem no-repeat;
                    background-size: 50% 50%;
                }

                .result-box-return-img {
                    width: 10.25rem;
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &-text {
                font-size: 1.5rem;
                color: #00002d;
                display: block;
                text-align: center;
                height: 4rem;
                margin-bottom: 3.542rem;
            }

            &-color {
                margin-bottom: 2rem;

                &.resulr-color-red {
                    color: #f30;
                }

                &.resulr-color-green {
                    color: #30ac69;
                }
            }
            
            &-failcolor {
                color: @color-9;
                font-size: 1.166rem;
                display: block;
                text-align: center;
            }

            &-value {
                width: 15rem;
                margin: 0 auto;

                &-text {
                    color: @color-9;
                    font-size: 1.333rem;
                    margin-bottom: 1.25rem;
                    display: block;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }

        &-option {
            display: flex;

            &-btn {
                border-radius: 4px;
                text-align: center;
                flex: 1;
                height: 4.083rem;
                line-height: 4.083rem;
                font-size: 1.333rem;

                &.result-option-btn-ok {
                    background: @color-blue;
                    color: @color-white;
                    border: 1px solid @color-blue;
                    margin-right: 1.25rem;
                }

                &.result-option-btn-again {
                    color: @color-blue;
                    background: #f5f5f5;
                    border: 1px solid @color-blue;
                }
            }
        }
    }
</style>