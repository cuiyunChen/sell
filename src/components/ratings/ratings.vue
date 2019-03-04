<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star class="star" :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star class="star" :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @select="select" @toggleContent="toggleContent"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
                        <div class="avatar">
                            <img :src="rating.avatar" height="28" width="28"/>
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star class="star" :size="24" :score="rating.score"></star>
                                <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend.length">
                                <span class="icon-thumb_up" ></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{formatDate(rating.rateTime)}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import {formatDate} from "../../common/js/date";
    import star from 'components/star/star'
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    const POSITIVE = 0;//正向评价
    const NEGATIVE = 1;//负向评价
    const ALL = 2;//所有评价
    const ERR_OK = 0;

    export default {
        name: "ratings",
        props: {
            seller:{
                type: Object
            }
        },
        data() {
            return {
                ratings: [],
                showFlag: false,
                selectType: ALL,
                onlyContent: true
            }
        },
        components: {
            star,
            split,
            ratingselect
        },
        created() {
          this.$http.get('/api/ratings').then(function (response) {
              response = response.body;
              if(response.errno === ERR_OK) {
                  this.ratings = response.data;
                  this.$nextTick(() => {
                      this.scroll = new BScroll(this.$refs.ratings,{
                          click: true
                      })
                  })

              }
          })
        },
        mounted() {

        },
        methods: {
            toggleContent(only) {
                this.onlyContent = only;
            },
            select(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            needShow(type,text) {
                if(this.onlyContent && !text) {
                    return false;
                }
                if(this.selectType === ALL) {
                    return true;
                }else{
                    return type === this.selectType;
                }
            },
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../common/css/mixin";
    .ratings {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .ratings-content {
            .overview {
                display: flex;
                padding: 18px 0;
                .overview-left {
                    flex: 0 0 137px;
                    width: 137px;
                    border-right: 1px solid rgba(7,17,27,0.1);
                    text-align: center;
                    padding: 6px 0;
                    @media only screen and (max-width:320px) {
                        flex: 0 0 110px;
                        width: 110px;
                    }
                    .score {
                        font-size: 24px;
                        line-height: 28px;
                        color: rgb(255,153,0);
                        margin-bottom: 6px;
                    }
                    .title {
                        line-height: 12px;
                        font-size: 12px;
                        color: rgb(7,17,27);
                        margin-bottom: 8px;
                    }
                    .rank {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }

                }
                .overview-right {
                    flex: 1;
                    padding: 6px 0 6px 24px;
                    @media only screen and (max-width:320px) {
                        padding: 6px 0 6px 6px;
                    }
                    .score-wrapper {
                        line-height: 18px;
                        margin-bottom: 8px;
                        font-size: 0;
                        .title {
                            display: inline-block;
                            font-size: 12px;
                            color: rgb(7,17,27);
                            vertical-align: top;
                        }
                        .star {
                            display: inline-block;
                            margin: 0 12px;
                            vertical-align: top;
                        }
                        .score {
                            display: inline-block;
                            vertical-align: top;
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(255,153,0);
                        }
                    }
                    .delivery-wrapper {
                        font-size: 0;
                        .title {
                            color: rgb(7,17,27);
                            font-size: 12px;
                            vertical-align: top;
                        }
                        .delivery-time {
                            font-size: 12px;
                            color: rgb(147,153,159);
                            margin-left: 12px;
                        }
                    }
                }
            }
            .rating-wrapper {
                padding: 0 18px;
                .rating-item {
                    display: flex;
                    padding: 18px 0;
                    .border-1px(rgba(7,17,27,0.1));
                    .avatar {
                        height: 28px;
                        width: 28px;
                        flex: 0 0 28px;
                        margin-right: 12px;
                        img {
                            border-radius: 50%;
                        }
                    }
                    .content {
                        position: relative;
                        flex: 1;
                        .name {
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(7,17,27);
                            margin-bottom: 4px;
                        }
                        .star-wrapper {
                            font-size: 0;
                            margin-bottom: 6px;
                            .star {
                                display: inline-block;
                                vertical-align: top;
                                margin-right: 6px;
                            }
                            .delivery {
                                vertical-align: top;
                                font-size: 10px;
                                display: inline-block;
                                line-height: 12px;
                                color: rgb(147,153,159);
                            }
                        }
                        .text {
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(7,17,27);
                            margin-bottom: 8px;
                        }
                        .recommend {
                            line-height: 16px;
                            .icon-thumb_up {
                                display: inline-block;
                                color: rgb(0,160,220);
                                margin-bottom: 4px;
                                font-size: 12px;
                                vertical-align: top;
                                margin-top: 4px;
                            }
                            .item {
                                display: inline-block;
                                margin-bottom: 4px;
                                font-size: 9px;
                                padding: 0 6px;
                                border: 1px solid rgba(7,17,27,0.1);
                                border-radius: 1px;
                                margin-right: 8px;
                                background: #fff;
                                line-height: 16px;
                            }
                        }
                        .time {
                            position: absolute;
                            top: 0;
                            right: 0;
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(147,153,159);
                        }
                    }
                }


            }
        }
    }
</style>