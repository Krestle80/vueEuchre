<template>
  <div class="backgroundHolder"></div>
    <ui-icon :size="48" class="icon">account_circle</ui-icon>
    <div class="gameHolder">
      <!-- also has left and right players -->
        <ui-icon :size="48" class="icon">account_circle</ui-icon>
        <div id="gameTableHolder">
          <GameTable  
            :dealer="dealer"
            :startDeal="dealInitiator"
            @presentCards="displayDealtCards"
            >
          </GameTable>
          
        </div>
          <ui-button @click="deal" style    ="background-color: aliceblue;">here
          </ui-button>
        <ui-icon :size="48" class="icon">account_circle</ui-icon>
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
  
</template>

<script>
import Card from '../components/card'
import Hand from '../components/hand'
import GameTable from '../components/gameTable'
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
      dealInitiator : false,
      fullDeck : [
        'Diamonds/9D.png',
        'Diamonds/10D.png',
        'Diamonds/jD.png',
        'Diamonds/qD.png',
        'Diamonds/kD.png',
        'Diamonds/aD.png',
        'hearts/9H.png',
        'hearts/10H.png',
        'hearts/jH.png',
        'hearts/qH.png',
        'hearts/kH.png',
        `hearts/aH.png`,
        `clubs/9C.png`,
        `clubs/10C.png`,
        `clubs/jC.png`,
        `clubs/qC.png`,
        `clubs/kC.png`,
        `clubs/aC.png`,
        `spades/9S.png`,
        `spades/10S.png`,
        `spades/jS.png`,
        `spades/qS.png`,
        `spades/kS.png`,
        `spades/aS.png`
      ]
    }
  },
  methods: {
    deal() {
      this.dealInitiator = !this.dealInitiator
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
    }
  },
  components: {
    Card, 
    Hand,
    GameTable
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