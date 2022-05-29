<template>  
    <div  v-if="dealing" class="startHandHolder">
        <div v-if="shuffle" class="handOutHolder">
            <Shuffle
                :pullUp="pullUp"
                @shuffledCards="dealCards"
                >
            </Shuffle>
        </div>
        <Card 
            class="topCard"
            v-if="topCard"
            fileName="back"
            :hidden="hideCard">
        </Card>
        <div v-if="shuffled" class="handOutholder">
            <Dealer
            :playerDealing="playerDealing"
            @finishedDealing="handOutCards"
            >
            </Dealer>
        </div>
    </div>
</template>

<script>
    import Card from './card'
    import Shuffle from './shuffle'
    import Dealer from './dealer'
    export default {
        name:'gameTable',
        data(){
            return{
                shuffle:true,
                hideCard: true,
                pullUp: false,
                cardShuffling:false,
                topCard:false,
                giveToPlayers: false,
                shuffled: false,
                dealingAnimationToggle: false,
                dealing: true,
                playerDealing: 1,
            }
        },
        props: {
            dealer: {type: Number},
            startDeal: {type:Boolean}   
            
        },
        emits : ["presentCards"],
        methods: {
            shuffleCards() {
                console.log(this.cardShuffling)
                this.pullUp = true
                this.$forceUpdate
                setTimeout(() => {
                    this.pullUp = false
                    this.topCard = true
                    this.$forceUpdate
                }, 1000)

            },
            dealCards(shuffled){
                this.shuffled= true
            },
            handOutCards() {
                this.shuffled= false
                this.$emit("presentCards", true)
            }
        },
        watch: {
            startDeal(){
                this.shuffleCards()
            }
        },
        components: {
            Card,
            Shuffle,
            Dealer
        }
    }
</script>

<style>
    .startHandHolder {
        display: flex;
        justify-content: center;
    }
    .topCard {
        position: absolute;
        transform: translate( 0%,-50%);
    }
    .handOutHolder {
        position: absolute;
    }
    /* .dealTwoLeft-enter-active {
        animation: ;
    } */

    /* .pullUpCard {
        animation: pullUpCard 2s ease-out 0s  1 normal;
        transform: translate3d(0,0,0)

    }
    @keyframes pullUpCard {
        0% {
            transform: translate3d(0,100,-100px);
        }
        100% {
            transform: translate3d(0,-100,100px)
        }
    } */

</style>