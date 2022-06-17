<template>
  <div class="backgroundHolder"></div>
  <div>

    <ui-icon :size="48" class="icon">account_circle</ui-icon>
    <div v-if="aiResponses.p3ResponseToggle" class="aiResponse" >{{aiResponses.player3}}</div>
  </div>
    <div class="gameHolder">
      <!-- also has left and right players -->
        <div>
          <ui-icon :size="48" class="icon">account_circle</ui-icon>    

        <div v-if="aiResponses.p2ResponseToggle" class="aiResponse" >{{aiResponses.player2}}</div>

        </div>
        <div id="gameTableHolder">
          <GameTable  
            :dealer="dealer"
            :startDeal="processToggles.dealInitiator"
            :topCardName="topCard"
            :togglePlayerResponseButtons="playerResponses.pickUpOrPassButtonsToggle"
            @presentCards="displayDealtCards"
            @topCardPlayerResponse="topCardHumanPlayerResponseHandler"
            @trumpPlayerResponse="trumpCallHumanPlayerResponseHandler"
            >
          </GameTable>
          
        </div>
        <div>

          <ui-button @click="deal" style    ="background-color: aliceblue;">here
          </ui-button>
          <ui-icon :size="48" class="icon">account_circle</ui-icon>
          <div v-if="aiResponses.p4ResponseToggle" class="aiResponse" >{{aiResponses.player4}}</div>  
          
        </div>
    </div>
    <div class="">
      <!-- <ui-card class = "playingCard " id="h9">
        <Card
          :fileName="fileName"
          :hidden="hidden"
        />
      </ui-card> -->
      <Hand 
        v-bind:player1Cards='hands.player1Hand' />
    </div>
  <Ai
    :ai1Hand="hands.player2Hand"
    :ai2Hand="hands.player3Hand"
    :ai3Hand="hands.player4Hand"
    :topCard="topCard"
    :dealer="dealer"
    :calculateResponseToggle="processToggles.aiTopCard"
    :calculateTrumpCallToggle="processToggles.aiTrumpCall"
    @drawPileResponse="topCardTrumpCallToggler"
    @newDealerAiHand="updateDealersHand"
    @trumpCallResponse="trumpCallToggler"
  ></Ai>
  <GameHandler
    :pickUpOrPassToggle="processToggles.displayTopCardResults"
    :pickUpOrPassPlayer2DealPart2Toggle="processToggles.displayTopCardPlayer2Dealp2"
    :pickUpOrPassPlayer3DealPart2Toggle="processToggles.displayTopCardPlayer3Dealp2"
    :trumpCallDisplayToggle="processToggles.displayTrumpCallResults"
    :dealer="dealer"
    :trumpCallPlayer2DealPart2Toggle="processToggles.displayTrumpCallPlayer2Dealp2"
    :trumpCallPlayer3DealPart2Toggle="processToggles.displayTrumpCallPlayer3Dealp2"
    :topCardName="topCard"
    :trump="trump"
    :pickUpOrPassAiResponse="aiResponses.topCardCallArray"
    :pickUpOrPassPlayerResponse="playerResponses.pickUpOrPassResponse"
    :trumpAiResponse="aiResponses.trumpCallArray"
    :trumpPlayerResponse="playerResponses.trumpResponse"
    @newTrump="setTrump"
    @pickUpOrPassButtonsToggle="togglePickUpOrPassButtons"
  ></GameHandler>
</template>

<script>
import Card from '../components/card'
import Hand from '../components/hand'
import GameTable from '../components/gameTable'
import Ai from '../components/ai'
import GameHandler from '../components/game/gameHandler.vue'
export default {
  name: 'App',
  data() {
    return{
      hidden : false,
      hands: {
        player1Hand: [],
        player2Hand: [], 
        player3Hand: [],
        player4Hand: []

      },
      dealer: 1,
      topCardPickedUp:false,
      trump: "",
      playerResponses: {
        chosenCard:'',
        pickUpOrPassButtonsToggle: false,
        pickUpOrPassResponse: "",
        trumpButtonsToggle:false,
        trumpResponse:""
      },
      aiResponses: {
        player2:'',
        player3:'',
        player4:'',
        p2ResponseToggle: false,
        p3ResponseToggle: false,
        p4ResponseToggle: false,
        topCardCallArray: [],
        trumpCallArray: [],
      },
      leftOverPile: [],
      topCard:'jK',
      processToggles: {
        dealInitiator : false,
        aiTopCard: false,
        aiTrumpCall:false,
        displayTopCardResults: false,
        displayTopCardPlayer2Dealp2:false,
        displayTopCardPlayer3Dealp2:false,
        displayTrumpCallResults:false,
        displayTrumpCallPlayer2Dealp2:false,
        displayTrumpCallPlayer3Dealp2:false,
      },
      fullDeck : [
        '9D',
        '0D',
        'jD',
        'qD',
        'kD',
        'aD',
        '9H',
        '0H',
        'jH',
        'qH',
        'kH',
        `aH`,
        `9C`,
        `0C`,
        `jC`,
        `qC`,
        `kC`,
        `aC`,
        `9S`,
        `0S`,
        `jS`,
        `qS`,
        `kS`,
        `aS`
      ],
    }
  },
  methods: {
    deal() {
      this.processToggles.dealInitiator = !this.processToggles.dealInitiator
    },
    displayDealtCards(){
      let shuffleDeck =[ ...this.fullDeck]
      //i == player
      //j == cards 
      for(let j = 0; j < shuffleDeck.length; j ++){
        for(let i = 0; i < 4; i++){
          let randomSpot = Math.floor(Math.random()*shuffleDeck.length)
          if( i === 0){
            this.hands.player1Hand.push(shuffleDeck[randomSpot])
          }
          if( i === 1){
            this.hands.player2Hand.push(shuffleDeck[randomSpot])
          }
          if( i === 2){
            this.hands.player3Hand.push(shuffleDeck[randomSpot])
          }
          if( i === 3){
            this.hands.player4Hand.push(shuffleDeck[randomSpot])
          }
            shuffleDeck.splice(randomSpot, 1)
        }
      }
      console.table(this.hands, shuffleDeck)
      console.table(shuffleDeck)
      console.log(this.fullDeck.length)
      this.leftOverPile = [...shuffleDeck]
      this.topCard= shuffleDeck[0]
      console.log(this.processToggles.aiTopCard)
      this.processToggles.aiTopCard = !this.processToggles.aiTopCard
      console.log(this.processToggles.aiTopCard)
    },

    topCardTrumpCallToggler(response){
      this.aiResponses.topCardCallArray = response
      this.processToggles.displayTopCardResults = !this.processToggles.displayTopCardResults
    },  

    topCardButtonsToggler(){
      this.playerResponses.pickUpOrPassButtonsToggle = !this.playerResponses.pickUpOrPassButtonsToggle
    },
    trumpCallToggler(response) {
      this.aiResponses.trumpCallArray = response
      this.processToggles.displayTrumpCardResults = !this.processToggles.displayTrumpCardResults
    },
    
    
    updateDealersHand(hand){
      if(this.dealer == 0){
        this.hands.player1Hand = hand
      }
      if(this.dealer == 1){
        this.hands.player2Hand = hand
      }
      if(this.dealer == 2){
        this.hands.player3Hand = hand
      }
      if(this.dealer == 3){
        this.hands.player4Hand = hand
      }
    },
    topCardHumanPlayerResponseHandler (response) {
      this.playerResponses.pickUpOrPassButtonsToggle = false
      if(response == 'pickUp'){
        this.topCardPickedUp = true
        this.hands.player1Hand.push(this.topCard)
      } 
      else if (this.dealer == 0){
        this.processToggles.aiTrumpCall = !this.processToggles.aiTrumpCall
      }
      else if (this.dealer == 1){
        this.processToggles.displayTopCardPlayer2Dealp2 = !this.processToggles.displayTopCardPlayer2Dealp2
      }
      else if (this.dealer == 2){
        this.processToggles.displayTopCardPlayer3Dealp2 = !this.processToggles.displayTopCardPlayer3Dealp2
      }
      else if (this.dealer == 3){
        this.processToggles.displayTopCardResultsToggle = !this.processToggles.displayTopCardResultsToggle
      }
    },
    trumpCallHumanPlayerResponseHandler(){

    },
    setTrump(res){
      this.trump = res
    },
    togglePickUpOrPassButtons() {
      this.playerResponses.pickUpOrPassButtonsToggle = !this.playerResponses.pickUpOrPassButtonsToggle
    },
    toggleTrumpButtons() {
      this.playerResponses.trumpButtonsToggle = !this.playerResponses.trumpButtonsToggle
    }

  },
  components: {
    Card, 
    Hand,
    GameTable,
    Ai,
    GameHandler
  },
  // setup() {
  //   return {
  //     logo
  //   };
  // }
};
</script>

<style>
body {
  margin: 0px !important;

}
#app {
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(0,148,80);
  background: radial-gradient(circle, rgba(0,148,80,1) 5%, rgba(0,81,44,1) 48%, rgba(0,40,22,1) 95%);
}
.backgroundHolder {
  position: absolute;
  background-image: url('../../assets/background-1279718.jpg');
  opacity: 0.15;
  width: 100%;
  height: 100%;
}
.icon {
  color:white
}

.aiResponse {
  font-size: 40px;
  color:whitesmoke;
  position: absolute;
  transform: translate(0, 50px);
}

  .gameHolder{
    height: 70%;
    width:100%;
    display:flex;
    align-items: center;
  }
  #gameTableHolder{
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* opacity: 0; */
  }
  .playingCard{
    height:264px;
    width:186px;
    background-color: black;
  }
</style>