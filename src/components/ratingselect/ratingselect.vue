<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{'active':type===2}" @click="select(2)">{{desc.all}}<span class="count">47</span></span>
            <span class="block positive" :class="{'active':type===0}" @click="select(0)">{{desc.positive}}<span class="count">47</span></span>
            <span class="block negative" :class="{'active':type===1}" @click="select(1)">{{desc.negative}}<span class="count">47</span></span>
        </div>
        <div class="switch" :class="{'on':only}" @click="toggleContent">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0;//正向评价
    const NEGATIVE = 1;//负向评价
    const ALL = 2;//所有评价

    export default {
        name: "ratingselect",
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {//只看有内容的
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        data() {
          return {
              type: this.selectType,
              only: this.onlyContent
          }
        },
        methods: {
            select(type) {
                this.type = type;
                this.$emit('select',type);
            },
            toggleContent() {
                this.only = !this.only;
                this.$emit('toggleContent',this.only);
            }

        }
    }
</script>

<style scoped lang="less">
    @import "../../common/css/mixin";

    .ratingselect {
        .rating-type {
            padding: 18px 0;
            margin: 0 18px;
            .border-1px(rgba(7,17,27,0.1));
            font-size: 0;
            .block {
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
                color: rgb(77,85,93);
                font-size: 12px;
                line-height: 16px;
                &.active {
                    color: #fff;
                }
                &.positive {
                    background: rgba(0,160,220,0.2);
                    &.active {
                        background: rgb(0,160,220);
                    }
                }
                &.negative {
                    background: rgba(77,85,93,0.2);
                    &.active {
                        background: rgb(77,85,93);
                    }
                }
                .count {
                    font-size: 8px;
                    margin-left: 2px;
                }
            }
        }
        .switch {
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            color: rgb(147,153,159);
            font-size: 0;
            &.on {
                .icon-check_circle {
                    color: #00c850;
                }
            }
            .icon-check_circle {
                margin-right: 4px;
                font-size: 24px;
                display: inline-block;
                vertical-align: top;
            }
            .text {
                font-size: 12px;
                display: inline-block;
                vertical-align: top;
            }
        }
    }
</style>