<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper" >
            <ul v-if="goods">
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food)">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" />
                            </div>
                            <div class="content">
                                <div class="name">{{food.name}}</div>
                                <div class="desc">{{food.description}}</div>
                                <div class="extre">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @cartAdd="cartAdd"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
        <food :food="selectedFood" ref="food" @cartAdd="cartAdd"></food>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';

    const ERR_OK = 0;
    export default {
        name: "goods",
        props: {
            seller: {
                type: Object
            }
        },
        data() {
          return {
              goods: [],
              listHeight: [],
              scrollY: 0,
              selectedFood: {}
          }
        },
        computed: {
          currentIndex() {
              for( let i=0; i<this.listHeight.length; i++) {
                  let height1 = this.listHeight[i];
                  let height2 = this.listHeight[i+1];
                  if( !height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                      return i;
                  }
              }
              return 0;
          },
            selectFoods() {
              let foods = [];
              this.goods.forEach((good) => {
                  good.foods.forEach((food) => {
                    if(food.count) {
                        foods.push(food);
                    }
                  })
              });
                return foods;
            }
        },
        created() {
            this.classMap = ['decrease','discount','special','invoice','guarantee'];
            this.$http.get('api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {//拿到数据以后  dom更新
                        this._initScroll();
                        this._calculateHeight();
                    })
                }
            })
        },
        components: {
            shopcart,
            cartcontrol,
            food
        },
        methods: {
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click: true
                });

                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                    click: true,
                    probeType: 3
                });

                this.foodsScroll.on('scroll',(pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                    // console.log(this.scrollY);
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
                // console.log(foodList);
                // console.log(foodList.length);
                let height = 0;
                this.listHeight.push(height);
                for(let i=0; i<foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                    // console.log(this.listHeight);
                }

            },
            selectMenu(index,event) {
                // if(event._constructed) {//浏览器原生点击事件
                //     return;
                // }
                console.log(index);
                let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el,300);
            },
            cartAdd(target) {
                // console.log(target);
                this._drop(target);
                console.log('click');
            },
            _drop(target) {
                //体验优化，异步执行下落动画
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                })
            },
            selectFood: function (food) {
                this.selectedFood = food;
                this.$refs.food.show();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../common/css/mixin";
    .goods {
        display: flex;
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background-color: #f3f5f7;
            .menu-item {
                display: table;
                height: 54px;
                width: 56px;
                line-height: 14px;
                padding: 0 12px;
                &.current {
                    position: relative;
                    background-color: #fff;
                    font-weight: 700;
                    margin-top: -1px;
                    z-index: 10;
                    .text {
                        .border-none();
                    }
                }
                .icon {
                    display: inline-block;
                    height: 12px;
                    width: 12px;
                    margin-right: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    vertical-align: top;
                    &.decrease {
                        .bg-image('../../components/goods/decrease_3');
                    }
                    &.discount {
                        .bg-image('../../components/goods/discount_3');
                    }
                    &.guarantee {
                        .bg-image('../../components/goods/guarantee_3');
                    }
                    &.invoice {
                        .bg-image('../../components/goods/invoice_3');
                    }
                    &.special {
                        .bg-image('../../components/goods/special_3');
                    }
                }
                .text {
                    font-size: 12px;
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    .border-1px(rgba(7,17,27,0.1));
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            .food-list {
                .title {
                    padding-left: 14px;
                    height: 26px;
                    line-height: 26px;
                    border-left: 2px solid #d9dde1;
                    font-size: 12px;
                    color: rgb(147,153,159);
                    background-color: #f3f5f7;
                }
                .food-item {
                    display: flex;
                    margin: 18px;
                    padding-bottom: 18px;
                    .border-1px(rgba(7,17,27,0.1));
                    &:last-child {
                        .border-none();
                        margin-bottom: 0;
                    }
                    .icon {
                        flex: 0 0 57px;
                        margin-right: 10px;
                    }
                    .content {
                        flex: 1;
                        .name {
                            font-size: 14px;
                            margin: 2px 0 8px 0;
                            line-height: 14px;
                            color: rgb(7,17,27);
                        }
                        .desc {
                            margin-bottom: 8px;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                        .extre {
                            line-height: 10px;
                            font-size: 10px;
                            color: rgb(147,153,159);
                            .count {
                                margin-right: 12px;
                            }
                        }
                        .price {
                            font-weight: 700;
                            line-height: 24px;
                            .now {
                                margin-right: 8px;
                                font-size: 14px;
                                color: rgb(240,20,20);
                            }
                            .old {
                                text-decoration: line-through;
                                font-size: 10px;
                                color: rgb(147,153,159);
                            }
                        }
                        .cartcontrol-wrapper {
                            position: absolute;
                            right: 0;
                            bottom: 12px;
                        }
                    }
                }
            }
        }
    }
</style>