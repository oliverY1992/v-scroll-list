import {expect} from 'chai';
import Vue from 'vue';
import ScrollList from '../src/scroll-list.vue';
import 'babel-polyfill';

describe("Vue component => scroll-list", () => {
    let listData = new Array(50).fill('');
    let vm;
    const List = Vue.extend({
        data(){
            return {
                listData
            }
        },
        methods:{
            onInfinite(done){
                return new Promise(resolve => {
                    setTimeout(()=>{
                        this.listData = this.listData.concat(new Array(10).fill(''));
                        resolve();
                    },1000);
                })
            }
        },
        components:{
            'scroll-list':ScrollList
        },
        template:'<scroll-list :onInfinite="onInfinite"><ul><li v-for="item in listData">{{item}}</li></ul></scroll-list>'
    });
    beforeEach(() => {
        vm = new List().$mount();
    });
    afterEach(() => {
        vm = null;
    });
    it('render list data', () => {
        expect(vm.$el.querySelectorAll('li').length).to.be.equal(50);
    });
    it('when infinite layer loaded', async () => {
        await vm.onInfinite();
        expect(vm.$el.querySelectorAll('li').length).to.be.equal(60);
    });
});