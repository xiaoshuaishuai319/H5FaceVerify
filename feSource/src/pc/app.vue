<template>
    <div id="app">
        <keep-alive>
            <index-page v-if="show"
                        :show.sync="show"></index-page>
        </keep-alive>
        <record-page v-if="!show"
                    :show.sync="show"></record-page>
    </div>
</template>

<script>
    import indexPage from './views/index';
    import recordPage from './views/record';
    export default {
        name: 'app',
        data() {
            return {
                show: true
            };
        },
        components: {
            indexPage,
            recordPage
        },
        methods: {
            addEventListener() {
                window.addEventListener('hashchange', this.changeHash, false);
            },
            removeEventListener() {
                window.addEventListener('hashchange', this.changeHash, false);
            },
            changeHash() {
                this.show = location.hash.indexOf('record') === -1;
            }
        },
        mounted() {
            if (window.location.hash.indexOf('record') !== -1) {
                this.show = false;
            }
            // 监听hash改变
            this.addEventListener();
        },
        watch: {
            show(val) {
                if (!val) {
                    window.location.hash = 'record';
                }
            }
        },
        beforeDestroy() {
            this.removeEventListener();
        }
    };

</script>

<style lang="less">
    html,
    body {
        min-height: 100%;
        margin: 0;
        padding: 0;
    }
    #app {
        height: 100%;
    } 
</style>