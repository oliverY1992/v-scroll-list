<template>
    <div class="scroll-list"
         :class="mapStateToClass"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
         @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined"
    >
        <div class="scroll-inner" :style="translateStyle">
            <div class="refresh-layer" v-if="!!onRefresh">
                <slot name="refresh">
                    <div class="text-down"><span class="refresh-arrow"></span>{{downText}}</div>
                    <div class="text-up"><span class="refresh-arrow"></span>{{upText}}</div>
                    <div class="text-refresh"><span class="loader"></span>{{refreshText}}</div>
                </slot>
            </div>
            <slot></slot>
            <div class="infinite-layer">
                <slot name="infinite">
                    <div><span class="loader"></span>{{infiniteText}}</div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    /**
     * PULL_DOWN:   normal state of Refresh Layer
     * PULL_UP:     when Refresh Layer is hold and unreleased
     * REFRESHING:  when Refresh Layer is released
     * @type {string}
     */
    const PULL_UP = 'PULL_UP',
        PULL_DOWN = 'PULL_DOWN',
        REFRESHING = 'REFRESHING';
    export default {
        props:{
            offset:{
                type:Number,
                default:44
            },
            downText:{
                type:String,
                default:"下拉刷新"
            },
            upText:{
                type:String,
                default:"释放更新"
            },
            refreshText:{
                type:String,
                default:"刷新中..."
            },
            infiniteText:{
                type:String,
                default:"正在加载..."
            },
            onRefresh:{
                type:Function,
                default:undefined,
                required:false
            },
            onInfinite:{
                type:Function,
                default:undefined,
                required:false
            }
        },
        data(){
            return {
                top:0,
                state:PULL_DOWN,
                starY:0,
                touching:false,
                infiniteLoading:false
            }
        },
        computed:{
            mapStateToClass(){
                return {
                    'pull-down':this.state === PULL_DOWN,
                    'pull-up':this.state === PULL_UP,
                    'refreshing':this.state === REFRESHING,
                    'touching':this.touching
                }
            },
            translateStyle(){
                return {
                    transform:`translate3d(0,${this.top}px,0)`,
                    '-webkit-transform':`translate3d(0,${this.top}px,0)`
                }
            }
        },
        methods:{
            touchStart(evt){
                this.startY = evt.targetTouches[0].pageY;
                this.startScroll = this.$el.scrollTop || 0;
                this.touching = true;
            },
            touchMove(evt){
                let diff = evt.targetTouches[0].pageY - this.startY - this.startScroll;
                if (diff > 0) evt.preventDefault();
                //缓冲效果
                this.top = Math.pow(diff, 0.75) + (this.state === REFRESHING ? this.offset : 0);
                if(this.state === REFRESHING) return;
                if(this.top >= this.offset){
                    this.state = PULL_UP;
                }else{
                    this.state = PULL_DOWN;
                }
            },
            touchEnd(evt){
                this.touching = false;
                if(this.state === REFRESHING){
                    this.top = this.offset;
                    return;
                }
                if(this.top >= this.offset){
                    this.refresh();
                }else{
                    this.state = PULL_DOWN;
                    this.top = 0;
                }
            },
            refresh(){
                this.state = REFRESHING;
                this.top = this.offset;
                this.onRefresh(this.refreshDone);
            },
            refreshDone(){
                this.state = PULL_DOWN;
                this.top = 0;
            },
            infinite(){
                this.infiniteLoading = true;
                this.onInfinite(this.infiniteDone)
            },
            infiniteDone(){
                this.infiniteLoading = false;
            },
            onScroll(evt){
                let outerHeight = this.$el.clientHeight;
                let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight;
                let scrollTop = this.$el.scrollTop;
                let refreshLayerHeight = this.onRefresh ? this.$el.querySelector('.refresh-layer').clientHeight : 0;
                let infiniteLayerHeight = this.$el.querySelector('.infinite-layer').clientHeight;
                let bottom = innerHeight - outerHeight - scrollTop - refreshLayerHeight;
                if(bottom < infiniteLayerHeight) this.infinite();
            }
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss">
    @import "./scroll-list";
</style>
