<template>
        <transition name="pullingUp" >
            <Card 
                class="dealCard"
                v-if="pullUp"
                cardName="back"
            :hidden="hideCard"></Card>
        </transition>
        <transition name="shuffling0" >
            <Card 
                class="dealCard"
                v-if="cardShuffling"
                cardName="back"
            :hidden="hideCard"></Card>
        </transition>
        <transition 
            name="shuffling1" 
            @leave="onFullShuffle"
        >
            <Card 
                class="dealCard"
                v-if="cardShuffling"
                cardName="back"
            :hidden="hideCard"></Card>
        </transition>
        <transition name="shuffling2" >
            <Card 
                class="dealCard"
                v-if="cardShuffling"
                cardName="back"
            :hidden="hideCard"></Card>
        </transition>
        <transition name="shuffling3" >
            <Card 
                class="dealCard"
                v-if="cardShuffling"
                cardName="back"
            :hidden="hideCard"></Card>
        </transition>
</template>
<script>
    import Card from './card'
    export default {
        name:'Shuffle',
        data(){
            return{
                hideCard: true,
                cardShuffling: false,
            }
        },
        props: {
            pullUp: {type:Boolean, required: true},
            
        },
        emits : ['shuffledCards'],
        watch : {
            pullUp() {
                setTimeout(()=>{ 
                    this.cardShuffling = true
                    setTimeout(()=>{
                        this.cardShuffling= false
                        this.$forceUpdate
                        }, 2000)
                    }, 1000)
            }
        },  
        methods: {
            onFullShuffle(event) {
                this.cardShuffling= false
                this.$forceUpdate
                this.$emit('shuffledCards', true)
            },
            test() {
                console.log(this.cardShuffling)
            }
        },
        components : {
            Card
        }
    }
</script>

<style>
    .dealCard {
        position: absolute;
        transform: translate( -50%,-50%);
    }
    .pullingUp-enter-active {
        animation: pullUp 0.5s ease-out;
        transform: translate( -50%,-50%);
    }
    .shuffling0-enter-active {
        animation: shuffle0 2s;
        transform: translate( -50%,-50%);
    }
    .shuffling1-enter-active {
        animation: shuffle1 2s;
        transform: translate( -50%,-50%);
    }
    .shuffling2-enter-active {
        animation: shuffle2 2s;
        transform: translate( -50%,-50%);
    }
    .shuffling3-enter-active {
        animation: shuffle3 2s;
        transform: translate( -50%,-50%);
    }
    @keyframes pullUp {
        0% {
            transform: translateY(500%);
        }
        100% {
            transform: translate( -50%,-50%);
        }
    }
    /* right, down left up */
    @keyframes shuffle0 {
        0% {
            transform: translate( -50%,-50%);
        }
        20% {
            transform: translate(65%,-50%);
        }
        40% {
            transform: translate(-50%, 65%);
        }
        60% {
            transform: translate(-165%, -50%);
        }
        80% {
            transform: translate( -50%, -165%)
        }
        100%{
            transform: translate( -50%,-50%);
        }
    }
    /* down left up right */
    @keyframes shuffle1 {
        0% {
            transform: translate( -50%,-50%);
        }
        20% {
            transform: translate(-50%, 65%);
        }
        40% {
            transform: translate(-165%, -50%);
        }
        60% {
            transform: translate( -50%, -165%)
        }
        80% {
            transform: translate(65%,-50%);
        }
        100%{
            transform: translate( -50%,-50%);
        }
    }
    /* left up right down */
    @keyframes shuffle2 {
        0% {
            transform: translate(-50%,-50%);
        }
        20% {
            transform: translate(-165%, -50%);
            
        }
        40% {
            transform: translate( -50%, -165%)
        }
        60% {
            transform: translate(65%,-50%);
        }
        80% {
            transform: translate(-50%, 65%);
        }
        100%{
            transform: translate( -50%,-50%);
        }
    }
    /* up right down left */
    @keyframes shuffle3 {
        0% {
            transform: translate( -50%,-50%);
        }
        20% {
            transform: translate( -50%, -165%)
        }
        40% {
            transform: translate(65%, -50%);
        }
        60% {
            transform: translate(-50%, 65%);
        }
        80% {
            transform: translate(-165%, -50%);
        }
        100%{
            transform: translate( -50%,-50%);
        }
    }
</style>