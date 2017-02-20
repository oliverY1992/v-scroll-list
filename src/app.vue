<template>
    <scroll-list :onRefresh="onRefresh" :onInfinite="onInfinite">
        <ul>
            <li v-for="item in listData">{{item}}</li>
        </ul>
    </scroll-list>
</template>
<style>
    body,ul{
        margin: 0;
        padding: 0;
    }
</style>
<script>
    import Scroller from './scroll-list.vue';
    let i = 1000;
    export default {
        components:{
            'scroll-list':Scroller
        },
        data(){
            return {
                listData:new Array(100).fill(i)
            }
        },
        methods:{
            onRefresh(done){
                setTimeout(done, 2000);
            },
            onInfinite(done){
                setTimeout(() => {
                    this.listData = this.listData.concat(new Array(10).fill(i));
                },2000);
                done();
            }
        }
    }
</script>
