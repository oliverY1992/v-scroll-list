# v-scroll-list 0.1.0
A vue component that pull down to refresh and scroll to load more in mobile 
## Basic Usage
```
import Vue from 'vue';
import scroller from 'v-scroll-list';
 new Vue({
    props:{
      listData:Array
    },
    components:{
      scroller
    },
    methods:{
      onRefresh(done){
        /**
          your code: triggered when list is refreshing
        */
        //done() will cease refreshing
        done();
      },
      onInfinite(done){
        /**
          your code: triggered when list is on end of current list
        */
        done();
      }
    },
    template:'<scroller><ul><li v-for="item in listData"></li></ul></scroller>'
 })
```
## Props
|     prop      |   type    |   default   |           description             |
|---------------|:----------|:------------|:----------------------------------|
|    offset     |  Number   |     44      | the threshold of refreshing layer |
|   downText    |  String   |  '下拉刷新' |  the tip of pulling                |
|   uptext      |  String   |  '释放刷新' |  the tip of holding                |
|  refreshText  |  String   |  '刷新中...'|  the tip of refreshing             |
|   onRefresh   |  Function |  undefined  |                                   |
|   onInfinite  |  Function |  undefined  |                                   |  
