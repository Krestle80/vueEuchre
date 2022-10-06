<template>  
    <div  v-if="dealing" class="startHandHolder">

        <ui-button 
            v-if="toggleTopCardPlayerResponseButtons" 
            class="passButton choiceButtons"
            @click="topCardPlayerResponseHandler('pass')"
                >Pass
        </ui-button>
        <ui-button 
            v-if="toggleTrumpPlayerResponseButtons" 
            class="spadeButton choiceButtons"
            @click="trumpPlayerResponseHandler('s')"
                >
                <div>
                    <img :src="spade" class="spade suitIcon" />
                    </div>
        </ui-button>
        <ui-button 
            v-if="toggleTrumpPlayerResponseButtons" 
            class="clubButton choiceButtons"
            @click="trumpPlayerResponseHandler('c')"
                >
                <div>
                    <img :src="club" class="club suitIcon" />
                    </div>
        </ui-button>
        <div class="topCardHolder" v-if="topCard">
            <div
            class = "topCard"
            v-bind:class="{ back: topCardSide == 'back' }"
            >
            
                    <Card 
                        class="topCardBack"
                        cardName="topCardName"
                        :hidden="true">
                    </Card>
                    <Card 
                            class="topCardFront"
                            :cardName="topCardName"
                            :hidden="false">
                    </Card>
            </div>
        </div>
        <ui-button 
            v-if="toggleTopCardPlayerResponseButtons" 
            class="pickUpButton choiceButtons"
            @click="topCardPlayerResponseHandler('pickUp')"
            >Pick Up
        </ui-button>

        <ui-button 
            v-if="toggleTrumpPlayerResponseButtons" 
            class="diamondButton choiceButtons"
            @click="trumpPlayerResponseHandler('d')"
                >
                <div>
                    <img :src="diamond" class="diamond suitIcon" />
                </div>
        </ui-button>
        <ui-button 
            v-if="toggleTrumpPlayerResponseButtons" 
            class="heartButton choiceButtons"
            @click="trumpPlayerResponseHandler('h')"
                >
                <div>
                    <img :src="heart" class="heart suitIcon" />
                </div>
        </ui-button>
        <ui-button 
            v-if="toggleTrumpPlayerResponseButtons" 
            class="trumpPassButton choiceButtons"
            @click="trumpPlayerResponseHandler('p')"
            >
                Pass
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
        <div v-if="startTopCardPassOut" class="handOutHolder">
            <DealTopCard
                :topCardName="topCardName"
                :dealer="dealer"
                class="handOutHolder"
                >
            </DealTopCard>
        </div>
        <RoundHandler
            :p1CardName="roundData.p1Card"
            :p1DisplayCard="roundData.p1Toggle"
            :p2CardName="roundData.p2Card"
            :p2DisplayCard="roundData.p2Toggle"
            :p3CardName="roundData.p3Card"
            :p3DisplayCard="roundData.p3Toggle"
            :p4CardName="roundData.p4Card"
            :p4DisplayCard="roundData.p4Toggle"
            :roundWinner="roundData.roundWinner"
            @cardsDelivered="carryRoundOver"
        >
        </RoundHandler>
    </div>
</template>

<script>
    import Card from './card'
    import Shuffle from './gameTableAnimations/shuffle'
    import Dealer from './gameTableAnimations/dealer'
    import DealTopCard from './gameTableAnimations/dealTopCard'
    import RoundHandler from './gameTableAnimations/roundHandler.vue'
    import spade from '../../../scripts/assets/suits/spade.png'
    import club from '../../../scripts/assets/suits/club.png'
    import diamond from '../../../scripts/assets/suits/diamond.png'
    import heart from '../../../scripts/assets/suits/heart.png'
    export default {
        name:'gameTable',
        data(){
            return{
                shuffle:true,
                hideCard: true,
                pullUp: false,
                cardShuffling:false,
                topCard:false,
                topCardSide: "back",
                topCardFront: true, 
                giveToPlayers: false,
                shuffled: false,
                dealingAnimationToggle: false,
                dealing: true,
                playerDealing: 1,
                spade: spade,
                club: club,
                diamond:diamond,
                heart:heart,
                startTopCardPassOut: false
            }
        },
        props: {
            dealer: {type: Number},
            startDeal: {type:Boolean},
            topCardName: {type:String},
            toggleTopCardPlayerResponseButtons: {type: Boolean},
            toggleTrumpPlayerResponseButtons: {type: Boolean},
            pickedUp:{type:Boolean},
            roundData:{type:Object}
            
        },
        emits : ["presentCards", "topCardPlayerResponse", "trumpPlayerResponse", "roundOver"],
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
                console.log(shuffled)
                this.shuffled= true
            },
            handOutCards() {
                this.shuffled= false
                this.topCardSide = "front"
                this.$emit("presentCards", true)
            },
            topCardPlayerResponseHandler(choice) {
                console.log(choice)
                this.$emit("topCardPlayerResponse", choice)
                if(choice == "pickUp"){
                    this.topCard = false
                }
            },
            trumpPlayerResponseHandler(choice){
                console.log(choice)
                this.$emit("trumpPlayerResponse", choice)
            },
            carryRoundOver(winner){
                this.$emit('roundOver', winner)
            }
        },
        watch: {
            startDeal(){
                this.shuffleCards()
            },
            topCardName(){
                this.hideCard = false
                console.log(this.topCardName)
            },
            pickedUp() {
                this.startTopCardPassOut = !this.topCardPassOut
            }
        },
        components: {
            Card,
            Shuffle,
            Dealer,
            DealTopCard,
            RoundHandler
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
        perspective: 1200px;
        transform: translate(0%, -50%);
    }
    .topCard{
        height: 100%;
        width: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
        position:absolute;  
    }
    .topCardFront {
        position: absolute;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        
    }
    .topCardBack {
        position: absolute;
        transform-style: preserve-3d;
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }

    .back {
        transform: rotateY(180deg);
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
    .spadeButton {
        transform: translate(-400%, -120%);
    }
    .clubButton {
        transform: translate(-400%, 120%);
    }
    .diamondButton {
        transform: translate(400%, -120%);
    }
    .heartButton {
        transform: translate(400%, 120%);
    }
    .trumpPassButton {
        transform: translate(0, -400%);
    }
    .spade{
        transform: translate(0, 7%) scale(1.4);
    }
    .club{
        transform: translate(-2%, 10%) scale(1.4);
    }
    .diamond{
        transform: translate(-1%, 0) scale(1.4);
    }
    .heart{
        transform: scale(1.4);
    }

    .choiceButtons{
    position: absolute;
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