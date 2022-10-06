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
            :toggleTopCardPlayerResponseButtons="playerResponses.pickUpOrPassButtonsToggle"
            :toggleTrumpPlayerResponseButtons="playerResponses.trumpButtonsToggle"
            :roundData="animatePlayedCardsData"
            @pickUp="passOutTopCard"
            @presentCards="displayDealtCards"
            @topCardPlayerResponse="topCardHumanPlayerResponseHandler"
            @trumpPlayerResponse="trumpCallHumanPlayerResponseHandler"
            @roundOver="startMiddleRound"
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
    <ui-Button style="z-index: 7;" @click="addCard">
        add Card
    </ui-Button>
    <ui-Button style="z-index: 7;" @click="removeCard">
      remove Card
    </ui-Button>
    <div class="">
      <!-- <ui-card class = "playingCard " id="h9">
        <Card
          :fileName="fileName"
          :hidden="hidden"
        />
      </ui-card> -->
      <Hand 
        v-bind:player1Cards='hands.player1Hand' 
        @playedCard="humanCardHandler"
      />
    </div>
  <Ai
    :ai1Hand="hands.player2Hand"
    :ai2Hand="hands.player3Hand"
    :ai3Hand="hands.player4Hand"
    :topCard="topCard"
    :dealer="dealer"
    :trump="trump"
    :calculateResponseToggle="processToggles.aiTopCard"
    :calculateTrumpCallToggle="processToggles.aiTrumpCall"
    :playedCards="cardsPlayedThisRound"
    :playCard2="processToggles.pickAiCard.player2.toggle"
    :player2Position="processToggles.pickAiCard.player2.position"
    :playCard3="processToggles.pickAiCard.player3.toggle"
    :player3Position="processToggles.pickAiCard.player3.position"
    :playCard4="processToggles.pickAiCard.player4.toggle"
    :player4Position="processToggles.pickAiCard.player4.position"
    @drawPileResponse="topCardTrumpCallToggler"
    @newDealerAiHand="updateDealersHand"
    @trumpCallResponse="trumpCallToggler"
    @firstCardPlayed="aiFirstCardHandler"
    @secondCardPlayed="aiSecondCardHandler"
    @thirdCardPlayed="aiThirdCardHandler"
    @fourthCardPlayed="aiFourthCardHandler"

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
    :roundToggle="processToggles.playRound"
    :roundPt2Toggle="processToggles.playRoundPt2"
    :roundStartingPlayer = "processToggles.startingPlayer"
    @p2ResponseToggle="p2ResponseToggler"
    @p3ResponseToggle="p3ResponseToggler"
    @p4ResponseToggle="p4ResponseToggler"
    @newTrump="setTrump"
    @pickUpOrPassButtonsToggle="togglePickUpOrPassButtons"
    @trumpCallAiRequest="aiTrumpCallInitiator"
    @pickUp="firstRoundOfHandStarter"
    @trumpCalled="firstRoundOfHandStarter"
    @trumpCallButtonsToggle="toggleTrumpButtons"
    @playCard="playACard"
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
      dealer: 0,
      topCardPickedUp:false,
      trump: "",
      playerResponses: {
        position:4,
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
        displayTrumpCallResults: false,
        dealTopCard:false,
        playRound:false,
        playRoundPt2: false,
        startingPlayer: 1,
        pickAiCard: {
          player2 : {
            toggle: false,
            position : 1
          },
          player3 : {
            toggle: false,
            position : 2
          },
          player4 : {
            toggle: false,
            position : 3
          }
        },
      },
      playerCardChoiceExpected: false,
      playerDiscardChoiceExpected:false,
      cardsPlayedThisRound:{
        firstCardPlayed: '',
        secondCardPlayed: '',
        thirdCardPlayed: '',
        fourthCardPlayed: '',
        highestScorePlayed: 0,
        highestScorePlayedPlayerPosition: 0
      },
      animatePlayedCardsData:{
        p1Card:'',
        p1Toggle: false,
        p2Card: '',
        p2Toggle: false,
        p3Card: '',
        p3Toggle: false,
        p4Card: '',
        p4Toggle: false, 
        roundWinner: 0,
      },
      playerTeamRoundsWon: 0,
      roundBeingPlayed: false,
      fullDeck : ['9D','0D','jD','qD','kD','aD','9H','0H','jH','qH','kH',`aH`,`9C`,`0C`,`jC`,`qC`,`kC`,`aC`,`9S`,`0S`, `jS`,`qS`,`kS`,`aS`
      ],
    }
  },
  methods: {
    addCard() {
      this.animatePlayedCardsData.p1Toggle = !this.animatePlayedCardsData.p1Toggle
      this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
      this.animatePlayedCardsData.p3Toggle = !this.animatePlayedCardsData.p3Toggle
      this.animatePlayedCardsData.p4Toggle = !this.animatePlayedCardsData.p4Toggle
      this.animatePlayedCardsData.roundWinner = 4
    },
    removeCard(){
      this.animatePlayedCardsData.roundWinner = 0
      this.animatePlayedCardsData.p1Toggle = !this.animatePlayedCardsData.p1Toggle
      this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
      this.animatePlayedCardsData.p3Toggle = !this.animatePlayedCardsData.p3Toggle
      this.animatePlayedCardsData.p4Toggle = !this.animatePlayedCardsData.p4Toggle

    },
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
      this.aiResponses.player2 = response[0]
      this.aiResponses.player3 = response[1]
      this.aiResponses.player4 = response[2]
      this.processToggles.displayTopCardResults = !this.processToggles.displayTopCardResults
    },  
    firstRoundOfHandStarter(){
      startingPlayer = this.dealer ++
      if(startingPlayer > 3){
        startingPlayer = 0
      }
      this.startRound(startingPlayer)
    },

    topCardButtonsToggler(){
      this.playerResponses.pickUpOrPassButtonsToggle = !this.playerResponses.pickUpOrPassButtonsToggle
    },
    aiTrumpCallInitiator(){
      this.processToggles.aiTrumpCall = !this.processToggles.aiTrumpCall
    },
    trumpCallToggler(response) {
      console.log("trumpCallDisplayStart")
      this.aiResponses.trumpCallArray = response
      this.aiResponses.player2 = response[0]
      this.aiResponses.player3 = response[1]
      this.aiResponses.player4 = response[2]
      this.processToggles.displayTrumpCallResults = !this.processToggles.displayTrumpCallResults
    },
    
    p2ResponseToggler() {
      this.aiResponses.p2ResponseToggle = !this.aiResponses.p2ResponseToggle
    },
    p3ResponseToggler() {
      this.aiResponses.p3ResponseToggle = !this.aiResponses.p3ResponseToggle
      console.log("app")
    },
    p4ResponseToggler() {
      this.aiResponses.p4ResponseToggle = !this.aiResponses.p4ResponseToggle
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
          this.setTrump(this.topCard.split('')[1])
          this.topCardPickedUp = true
          if(this.dealer == 0) {
            this.hands.player1Hand.push(this.topCard)
            console.log('cardPickedUp?')
            this.playerDiscardChoiceExpected = true
          }
          else if(this.dealer == 1) {
            this.hands.player2Hand.push(this.topCard)
          }
          else if(this.dealer == 2) {
            this.hands.player3Hand.push(this.topCard)
          }
          else if(this.dealer == 3) {
            this.hands.player4Hand.push(this.topCard)
          }
          if(this.dealer != 0){
            console.log(this.dealer, this.dealer != 0)
            this.startRound(startingPlayer)
          }
        let startingPlayer = this.dealer ++
        if(startingPlayer > 3){
          startingPlayer = 0
        }
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
        this.processToggles.displayTopCardResults = !this.processToggles.displayTopCardResults
      }
    },
    trumpCallHumanPlayerResponseHandler(res){
      if(res == "pass"){
        if (this.dealer == 0){
          this.processToggles.aiTrumpCall = !this.processToggles.aiTrumpCall
        }
        else if (this.dealer == 1){
          this.processToggles.displayTrumpCallPlayer2Dealp2 = !this.processToggles.displayTrumpCallPlayer2Dealp2
        }
        else if (this.dealer == 2){
          this.processToggles.displayTrumpCallPlayer3Dealp2 = !this.processToggles.displayTrumpCallPlayer3Dealp2
        }
        else if (this.dealer == 3){
          this.processToggles.displayTrumpCallResults = !this.processToggles.displayTopCardResults
        }
      }
      else {
        console.log("trump call human player response handler", res)
        this.setTrump(res)
        let startingPlayer = this.dealer ++
        if(startingPlayer > 3){
          startingPlayer = 0
        }
        this.startRound(startingPlayer)
      }
    },
    setTrump(res){
      console.log("new trump " + res)
      this.trump = res
    },
    togglePickUpOrPassButtons() {
      this.playerResponses.pickUpOrPassButtonsToggle = !this.playerResponses.pickUpOrPassButtonsToggle
    },
    toggleTrumpButtons() {
      this.playerResponses.trumpButtonsToggle = !this.playerResponses.trumpButtonsToggle
    },
    passOutTopCard(){
      this.topCardPickedUp = !this.topCardPickedUp
    },
    humanCardHandler(position) {        
      console.log(this.playerCardChoiceExpected)
      console.log('player card position Chosen: ' + position )
      if(this.playerCardChoiceExpected == true){
        let currentScore = 0
        this.hands.player1Hand[position].split('')[0] == '9'? currentScore+=9 
        : this.hands.player1Hand[position].split('')[0] == '0'
        ? currentScore += 10 
        : this.hands.player1Hand[position].split('')[0] == 'j' 
        ? currentScore+=11 
        : this.hands.player1Hand[position].split('')[0]== 'q'
        ? currentScore+=12 
        :this.hands.player1Hand[position].split('')[0] =='k'
        ? currentScore+=13 
        : currentScore+=14
        if(this.hands.player1Hand[position].split('')[1] == this.trump){
            currentScore += 10
            if(this.hands.player1Hand[position] == 'j'){
                currentScore += 5
              
            } 
        }
        console.log("trump :" + this.trump, "score:" + currentScore, "highest score:"+ this.cardsPlayedThisRound.highestScorePlayed)
        if(this.hands.player1Hand[position].split('')[0] == 'j'){
          if((this.trump == 'S' && this.hands.player1Hand[position].split('')[1] == 'C') || (this.trump == 'C' && this.hands.player1Hand[position].split('')[1] == 'S') || (this.trump == 'D' && this.hands.player1Hand[position].split('')[1] == 'H') || (this.trump == 'H' && this.hands.player1Hand[position].split('')[1] == 'D')){
            currentScore += 14
          }
        }
        if(currentScore > this.cardsPlayedThisRound.highestScorePlayed){
          this.cardsPlayedThisRound.highestScorePlayed = currentScore
          this.cardsPlayedThisRound.highestScorePlayedPlayerPosition = 1
        }
        if(this.playerResponses.position == 1){
          this.cardsPlayedThisRound.firstCardPlayed = this.hands.player1Hand[position]
          this.animatePlayedCardsData.p1Card = this.cardsPlayedThisRound.firstCardPlayed
          this.animatePlayedCardsData.p1Toggle = !this.animatePlayedCardsData.p1Toggle
          
        }
        if(this.playerResponses.position == 2){
          this.cardsPlayedThisRound.secondCardPlayed = this.hands.player1Hand[position]
          this.animatePlayedCardsData.p1Card = this.cardsPlayedThisRound.secondCardPlayed
          this.animatePlayedCardsData.p1Toggle = !this.animatePlayedCardsData.p1Toggle
        }
        if(this.playerResponses.position == 3){
          this.cardsPlayedThisRound.thirdCardPlayed = this.hands.player1Hand[position]
          this.animatePlayedCardsData.p1Card = this.cardsPlayedThisRound.thirdCardPlayed
          this.animatePlayedCardsData.p1Toggle = !this.animatePlayedCardsData.p1Toggle
        }
        if(this.playerResponses.position != 4){
          this.processToggles.playRoundPt2 = !this.processToggles.playRoundPt2
          this.processToggles.pickAiCard.player2.toggle = !this.processToggles.pickAiCard.player2.toggle
          this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
        }
        console.log(this.playerResponses.position)
        if(this.playerResponses.position == 4){
          this.cardsPlayedThisRound.fourthCardPlayed = this.hands.player1Hand[position]
          this.animatePlayedCardsData.p1Card = this.cardsPlayedThisRound.fourthCardPlayed
          this.animatePlayedCardsData.p1Toggle = !this.animatePlayedCardsData.p1Toggle
          console.log('roundEnd', this.cardsPlayedThisRound)
          setTimeout(() => {
            this.endRound()

          }, 500)
        }

        this.hands.player1Hand.splice(position, 1)
        return
      }
      if(this.playerDiscardChoiceExpected){
        this.hands.player1Hand.splice(position, 1)
        this.playerDiscardChoiceExpected = false
        let startingPlayer = this.dealer ++
        if(startingPlayer > 3){
          startingPlayer = 0
        }
        this.startRound(startingPlayer)
      }
    },
    aiFirstCardHandler(responseArray){
      console.log(" firstCard Response :" + responseArray)
      if(responseArray[2] == 2) {
        this.cardsPlayedThisRound.firstCardPlayed = this.hands.player2Hand[responseArray[0]]
        this.animatePlayedCardsData.p2Card = this.cardsPlayedThisRound.firstCardPlayed
        this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
        this.hands.player2Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 3){
        this.cardsPlayedThisRound.firstCardPlayed = this.hands.player3Hand[responseArray[0]]
        this.animatePlayedCardsData.p3Card = this.cardsPlayedThisRound.firstCardPlayed
        this.animatePlayedCardsData.p3Toggle = !this.animatePlayedCardsData.p3Toggle
        this.hands.player3Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 4){
        this.cardsPlayedThisRound.firstCardPlayed = this.hands.player4Hand[responseArray[0]]
        this.animatePlayedCardsData.p4Card = this.cardsPlayedThisRound.firstCardPlayed
        this.animatePlayedCardsData.p4Toggle = !this.animatePlayedCardsData.p4Toggle
        this.hands.player4Hand.splice(responseArray[0], 1)
      }
      this.cardsPlayedThisRound.highestScorePlayed = responseArray[1]
      this.cardsPlayedThisRound.highestScorePlayedPlayerPosition = responseArray[2]
      console.log(responseArray[0], responseArray[1], responseArray[2])
      console.log(this.cardsPlayedThisRound.firstCardPlayed)

    },
    aiSecondCardHandler(responseArray){
      console.log("Second Card REsponse:" + responseArray)
      if(responseArray[2] == 2) {
        this.cardsPlayedThisRound.secondCardPlayed = this.hands.player2Hand[responseArray[0]]
        this.animatePlayedCardsData.p2Card = this.cardsPlayedThisRound.secondCardPlayed
        this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
        this.hands.player2Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 3){
        this.cardsPlayedThisRound.secondCardPlayed = this.hands.player3Hand[responseArray[0]]
        this.animatePlayedCardsData.p3Card = this.cardsPlayedThisRound.secondCardPlayed
        this.animatePlayedCardsData.p3Toggle = !this.animatePlayedCardsData.p3Toggle
        this.hands.player3Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 4){
        this.cardsPlayedThisRound.secondCardPlayed = this.hands.player4Hand[responseArray[0]]
        this.animatePlayedCardsData.p4Card = this.cardsPlayedThisRound.secondCardPlayed
        this.animatePlayedCardsData.p4Toggle = !this.animatePlayedCardsData.p4Toggle
        this.hands.player4Hand.splice(responseArray[0], 1)
      }
      if(this.cardsPlayedThisRound.highestScorePlayed < responseArray[1]){
        this.cardsPlayedThisRound.highestScorePlayed = responseArray[1]
        this.cardsPlayedThisRound.highestScorePlayedPlayerPosition = responseArray[2]
        
      }
      console.log(responseArray[0], responseArray[1], responseArray[2])
      console.log(this.cardsPlayedThisRound.secondCardPlayed)
    },
    aiThirdCardHandler(responseArray){
      console.log(" third Card Response :" + responseArray)
      if(responseArray[2] == 2) {
        this.cardsPlayedThisRound.thirdCardPlayed = this.hands.player2Hand[responseArray[0]]
        this.animatePlayedCardsData.p2Card = this.cardsPlayedThisRound.thirdCardPlayed
        this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
        this.hands.player2Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 3){
        this.cardsPlayedThisRound.thirdCardPlayed = this.hands.player3Hand[responseArray[0]]
        this.animatePlayedCardsData.p3Card = this.cardsPlayedThisRound.thirdCardPlayed
        this.animatePlayedCardsData.p3Toggle = !this.animatePlayedCardsData.p3Toggle
        this.hands.player3Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 4){
        this.cardsPlayedThisRound.thirdCardPlayed = this.hands.player4Hand[responseArray[0]]
        this.animatePlayedCardsData.p4Card = this.cardsPlayedThisRound.thirdCardPlayed
        this.animatePlayedCardsData.p4Toggle = !this.animatePlayedCardsData.p4Toggle
        this.hands.player4Hand.splice(responseArray[0], 1)
      }
      if(this.cardsPlayedThisRound.highestScorePlayed < responseArray[1]){
        this.cardsPlayedThisRound.highestScorePlayed = responseArray[1]
        this.cardsPlayedThisRound.highestScorePlayedPlayerPosition = responseArray[2]

      }
      console.log(responseArray[0], responseArray[1], responseArray[2])
      console.log(this.cardsPlayedThisRound.firstCardPlayed)
      console.log('thirdAiCard', this.cardsPlayedThisRound)
    },
    aiFourthCardHandler(responseArray){
      console.log("fourth Card Response :" + responseArray)
      if(responseArray[2] == 2) {
        this.cardsPlayedThisRound.fourthCardPlayed = this.hands.player2Hand[responseArray[0]]
        this.animatePlayedCardsData.p2Card = this.cardsPlayedThisRound.fourthCardPlayed
        this.animatePlayedCardsData.p2Toggle = !this.animatePlayedCardsData.p2Toggle
        this.hands.player2Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 3){
        this.cardsPlayedThisRound.fourthCardPlayed = this.hands.player3Hand[responseArray[0]]
        this.animatePlayedCardsData.p3Card = this.cardsPlayedThisRound.fourthCardPlayed
        this.animatePlayedCardsData.p3Toggle = !this.animatePlayedCardsData.p3Toggle
        this.hands.player3Hand.splice(responseArray[0], 1)
      }
      if(responseArray[2] == 4){
        this.cardsPlayedThisRound.fourthCardPlayed = this.hands.player4Hand[responseArray[0]]
        this.animatePlayedCardsData.p4Card = this.cardsPlayedThisRound.fourthCardPlayed
        this.animatePlayedCardsData.p4Toggle = !this.animatePlayedCardsData.p4Toggle
        this.hands.player4Hand.splice(responseArray[0], 1)
      }
      if(this.cardsPlayedThisRound.highestScorePlayed < responseArray[1]){
        this.cardsPlayedThisRound.highestScorePlayed = responseArray[1]
        this.cardsPlayedThisRound.highestScorePlayedPlayerPosition = responseArray[2]

      }
      console.log('roundEnd', this.cardsPlayedThisRound)
      setTimeout(() => {
            this.endRound()

      }, 500)
      console.log(responseArray[0], responseArray[1], responseArray[2])
      console.log(this.cardsPlayedThisRound.firstCardPlayed)
    },
    setRoundOrder(startingPlayer){
      if(startingPlayer == 0) {
        this.playerResponses.position = 1
        this.processToggles.pickAiCard.player2.position = 2
        this.processToggles.pickAiCard.player3.position = 3
        this.processToggles.pickAiCard.player4.position = 4
      }
      if(startingPlayer == 1) {
        this.playerResponses.position = 4
        this.processToggles.pickAiCard.player2.position = 1
        this.processToggles.pickAiCard.player3.position = 2
        this.processToggles.pickAiCard.player4.position = 3
      }
      if(startingPlayer == 2) {
        this.playerResponses.position = 3
        this.processToggles.pickAiCard.player2.position = 4
        this.processToggles.pickAiCard.player3.position = 1
        this.processToggles.pickAiCard.player4.position = 2
      }
      if(startingPlayer == 3) {
        this.playerResponses.position = 2
        this.processToggles.pickAiCard.player2.position = 3
        this.processToggles.pickAiCard.player3.position = 4
        this.processToggles.pickAiCard.player4.position = 1
      }
    },
    playACard(player){
      console.log(player)
      if(player == 1){
        this.playerCardChoiceExpected = true
      }
      else if(player == 2){
        console.log(this.processToggles.pickAiCard.player2.toggle)
        this.processToggles.pickAiCard.player2.toggle = !this.processToggles.pickAiCard.player2.toggle 
      }
      else if(player == 3){
        this.processToggles.pickAiCard.player3.toggle = !this.processToggles.pickAiCard.player3.toggle 
      }
      else if(player == 4){
        this.processToggles.pickAiCard.player4.toggle = !this.processToggles.pickAiCard.player4.toggle 
      }
    },
    startRound(startingPlayer) {
      this.setRoundOrder(startingPlayer)
      console.log("player 2 position: " + this.processToggles.pickAiCard.player2.position, "player 3 position: " + this.processToggles.pickAiCard.player3.position, "player 4 position: " + this.processToggles.pickAiCard.player4.position)
      this.processToggles.startingPlayer = startingPlayer
      console.log("starting player for round handler: " + this.processToggles.startingPlayer)
      this.roundBeingPlayed = true
      this.processToggles.playRound = !this.processToggles.playRound
    },
    //calls the next round after the winner card animation stops
    startMiddleRound(winner){
      console.log(winner)
      let startingPlayer = winner - 1
      this.animatePlayedCardsData.roundWinner = 0
      console.log(startingPlayer)
      this.startRound(startingPlayer)

    },
    endRound() {
      console.log('roundEnd', this.cardsPlayedThisRound)
      console.table(this.cardsPlayedThisRound)
        this.cardsPlayedThisRound.firstCardPlayed = ""
        this.cardsPlayedThisRound.secondCardPlayed = ""
        this.cardsPlayedThisRound.thirdCardPlayed = ""
        this.cardsPlayedThisRound.fourthCardPlayed = ""
        if(this.cardsPlayedThisRound.highestScorePlayedPlayerPosition == 0 || this.cardsPlayedThisRound.highestScorePlayedPlayerPosition == 2){
          this.playerTeamRoundsWon ++
        }
        this.animatePlayedCardsData.roundWinner = this.cardsPlayedThisRound.highestScorePlayedPlayerPosition
        console.log(this.cardsPlayedThisRound.highestScorePlayedPlayerPosition)
        this.animatePlayedCardsData.p1Toggle = false
        this.animatePlayedCardsData.p2Toggle = false
        this.animatePlayedCardsData.p3Toggle = false
        this.animatePlayedCardsData.p4Toggle = false
    },

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