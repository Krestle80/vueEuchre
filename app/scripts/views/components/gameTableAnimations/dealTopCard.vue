<template>
    <transition name="dealLeft" class="topCard">
        <Card 
            class="topCard"
            :style="cssVars"
            v-if="dealLeft"
            :cardName="topCard"
            :hidden="false">
        </Card>
    </transition>
    <transition name="dealUp" class="topCard">
        <Card 
            class="topCard"
            :style="cssVars"
            v-if="dealUp"
            :cardName="topCard"
            :hidden="false">
        </Card>
    </transition>
    <transition name="dealRight" class="topCard">
        <Card 
            class="topCard"
            :style="cssVars"
            v-if="dealRight"
            :cardName="topCard"
            :hidden="false"> 
        </Card>
    </transition>
    <transition name="dealDown" class="topCard">
        <Card 
            class="topCard"
            :style="cssVars"
            v-if="dealDown"
            :cardName="topCard"
            :hidden="false">
        </Card>
    </transition>
</template>

<script>
    import Card from "../card"
    export default {
        name: "DealTopCard",
        data() {
            return {
                dealLeft: false,
                dealUp: false,
                dealRight: false,
                dealDown: false,
                cssVars:"--xOffset : 0%; --yOffset: 0%; ",
                
            }
        },
        props: {
            topCardName : {type:String},
            dealer:{type:Number}
        },
        emits: ["topCardDealt"],
        mounted() {
            if(this.dealer == 0){
                this.dealDown = !this.dealDown

            }
            if(this.dealer == 1){
                this.dealLeft = !this.dealLeft
                this.dealLeft = !this.dealLeft
            }
            if(this.dealer = 2) {
                this.dealUp = !this.dealUp
                this.dealUp = !this.dealUp
            }
            if(this.dealer == 3) {
                this.dealRight = !this.dealRight
                this.dealRight = !this.dealRight
            }
        },

    }
</script>
<style>
    .topCard {
        position: absolute;
        transform: translate(var(--xOffset), var(--yOffset))
    }
    .dealLeft-leave-active {
        animation: dealOutLeft 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    @keyframes dealOutLeft {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-1200%, -70%) rotate(-85deg);
        }
    }
    .dealUp-leave-active {
        animation: exitUp 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    @keyframes exitUp {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-20%, -800%) rotate(-25deg);
        }
    }
    .dealRight-leave-active {
        animation: exitRight 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    @keyframes exitRight {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(1200%, -20%) rotate(85deg);
        }
    }
</style>