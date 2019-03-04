<template>
    <div class="home">
        <v-header></v-header>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import vheader from "components/vheader/vheader"
    export default {
        name: "home",
        components: {
            "v-header": vheader
        }
    }
</script>

<style scoped lang="less">
    .home {
        .tab {
            display: flex;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            .tab-item {
                flex: 1;
                text-align: center;
                color: rgb(77,85,93);
                &:active {
                    color: rgb(240,20,20);
                }
            }
        }
    }
</style>