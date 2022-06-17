<template>  
    <div  v-if="dealing" class="startHandHolder">

        <ui-button 
            v-if="togglePlayerResponseButtons" 
            class="passButton choiceButtons"
            @click="playerResponseHandler('pass')"
                >Pass
            </ui-button>
            <div class="topCardHolder" v-if="topCard">
                <Transition name="flipFront">
                    <Card 
                        class="topCardFront"
                        v-if="topCardFront"
                        :cardName="topCardName"
                        :hidden="hideCard">
                    </Card>
                </Transition>
                <Transition name="flipBack">
                    <Card 
                        class="topCardBack"
                        v-if="!topCardFront"
                        :cardName="topCardName"
                        :hidden="hideCard">
                    </Card>
                </Transition>
            </div>
        <ui-button 
            v-if="togglePlayerResponseButtons" 
            class="pickUpButton choiceButtons"
            @click="playerResponseHandler('pickUp')"
            >Pick Up
        </ui-button>
        <!-- animation components -->
        <div v-if="shuffle" class="handOutHolder">
            <Shuffle
                :pullUp="pullUp"
                @shuffledCards="dealCards"
                >
            </Shuffle>
        </div>
        <div v-if="shuffled" class="handOutholder">
            <Dealer
            :playerDealing="dealer"
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
                topCardFront: true, 
                giveToPlayers: false,
                shuffled: false,
                dealingAnimationToggle: false,
                dealing: true,
                playerDealing: 1,
            }
        },
        props: {
            dealer: {type: Number},
            startDeal: {type:Boolean},
            topCardName: {type:String},
            togglePlayerResponseButtons: {type: Boolean},

            
        },
        emits : ["presentCards", "topCardPlayerResponse"],
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
            },
            playerResponseHandler(choice) {
                console.log(choice)
                this.$emit("topCardPlayerResponse", choice)
            }
        },
        watch: {
            startDeal(){
                this.shuffleCards()
            },
            topCardName(){
                this.hideCard = false
                console.log(this.topCardName)
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
    .topCardHolder{
        height: 284px;
        width:206px;
        position:absolute;

    }
    .topCardFront {
        position: absolute;
        transform-style: preserve-3d;
        transform: translate( 0%,-50%);
    }
    .topCardBack {
        position: absolute;
        transform-style: preserve-3d;
        transform: translate( 0%, -50%) rotateY(180deg);
    }

    .flipFront-leave-active {
        animation: flip 0.5s
    }
    .flipFront-enter-active {
        animation: flip 0.5s
    }
    @keyframes flip {
        0%{
            transform: rotateY(0)
        }
        100% {
            transform: rotateY(180deg);
        }
    }
    .handOutHolder {
        position: absolute;
    }
    .pickUpButton {
        transform: translate(-400%, 0);
    }
    .passButton {
    transform: translate(400%, 0);
    }
    .choiceButtons{
    /* background-color: rgb(179, 255, 179); */
    background-color: rgb(179, 255, 179);
    border: 5px solid rgb(0,81,44);
    color:black;
    font-size: x-large;
    font-weight: 300;
    height:75px;
    width: 145px;
    border-radius: 15px;
    box-shadow: 1px 10px 14px rgba(0,40,22,1);
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