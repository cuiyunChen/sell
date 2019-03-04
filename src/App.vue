<template>
  <div id="app">
      <v-header :seller="seller"></v-header>
      <div class="tab border-1px-scal">
          <div class="tab-item">
              <router-link to="/goods">商品</router-link>
          </div>
          <div class="tab-item">
              <router-link to="/ratings">评论</router-link>
          </div>


          <div class="tab-item">
              <router-link to="/seller">商家</router-link>
          </div>
	<div class="tab-item">
              <router-link to="/seller">商家</router-link>
          </div>
      </div>
    <router-view :seller="seller"/>
  </div>
</template>

<script type="text/ecmascript-6">
    import vheader from "components/vheader/vheader"
    const ERR_OK = 0;

export default {
    name: 'App',
    data() {//函数
      return {//对象
          seller: {}
      }
    },
    components: {
        "v-header": vheader
    },
    created: function() {
        this.$router.push('/goods');
        this.$http.get('/api/seller').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.seller = response.data;
                console.log(this.seller);
            }
        })
    },
    mounted: function () {

    },
    methods: {

    }


}
</script>

<style lang="less" scoped>
    @import "./common/css/mixin.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        .border-1px(rgba(7,17,27,0.1));
        .tab-item {
            flex: 1;
            text-align: center;
            color: rgb(77,85,93);
            & > a {
                display: block;
            }
            .router-link-active {
                color: rgb(240,20,20);
            }
        }
    }

}
</style>
