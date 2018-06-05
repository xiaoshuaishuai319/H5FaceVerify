<template>
  <div class="popup">
      <div class="popup-mask"></div>
      <div class="popup-content">
          <div class="popup-content-title">{{popupOption.title}}</div>
          <div class="popup-content-detail">{{popupOption.detail}}</div>
          <div class="popup-button">
                <span class="popup-button-finish"
                    @click="finish">{{popupOption.btnFinish}}</span>
                <span class="popup-button-cancel"
                    @click="cancel">{{popupOption.btnCancel}}</span>
          </div>
      </div>
  </div>
</template>

<script>
    /**
     * @file pc弹窗
     */
    export default {
        props: {
            popupOption: Object
        },

        methods: {
            finish() {
                this.$emit('pcFaceFinish');
            },
            cancel() {
                this.$emit('pcFaceCancel');
            }
        }
    };
</script>
<style lang="less">
    .popup {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 10;

        &-mask {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: #000;
            opacity: .6;
        }

        &-content {
            width: 400px;
            padding: 60px 0;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            z-index: 10;
        }

        .popup-content-title {
            font-size: 18px;
            color: #333;
            text-align: center;
            height: 24px;
            line-height: 24px;
            margin-bottom: 10px;
        }

        .popup-content-detail {
            font-size: 18px;
            color: #333;
            height: 16px;
            line-height: 16px;
            margin-bottom: 44px;
            text-align: center;
        }

        .popup-button {
            width: 250px;
            margin: 0 auto;
            display: flex;
            cursor: pointer;

            .popup-button-finish {
                flex: 1;
                margin-right: 10px;
                height: 38px;
                text-align: center;
                line-height: 38px;
                background-color: #0073eb;
                font-size: 16px;
                color: #fff;
                border: 1px solid #0073eb;

                &:hover {
                    background-color: #3b85f5;
                }
            }

            .popup-button-cancel {
                flex: 1;
                height: 38px;
                text-align: center;
                line-height: 38px;
                background-color: #fff;
                font-size: 16px;
                color: #0073eb;
                border: 1px solid #0073eb;

                &:hover {
                    background-color: #3b85f5;
                    color: #fff;
                }
            }
        }
    }
</style>

