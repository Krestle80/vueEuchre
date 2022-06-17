<template></template>
<script>
export default {
    name: 'Ai',
    data() {
        return {

        }
    },
    emits: ["drawPileResponse", "newDealerAiHand", "trumpCallResponse"],
    props: {
        ai1Hand: {type:Array},
        ai2Hand: {type:Array},
        ai3Hand: {type:Array},
        topCard: {type:String},
        dealer: {type:Number},
        calculateResponseToggle: {type:Boolean},
        calculateTrumpCallToggle: {type:Boolean},
    },
    methods: {
        // scoring the ais hand if they choose trump for comparison, also works if they dealt by adding the top card to their hand and removing the lowest value card from it
        scoreHandWithTopCardPickUp(hand, topCard, dealer){
            if(dealer){
                hand.push(topCard)
            }
            let trump = topCard.split('')[1]
            let lowestValue = 30
            let lowestValueHandPosition = 0
            let cardValueArray = []
            let handValue = 0
            for(let i = 0; i< hand.length; i++) {
                let card = hand[i].split('')[0]
                let cardSuit = hand[i].split('')[1]
                let cardValue = 0
                                //checks for Trump and adds 10 if trump, 16 if right bower
                if(cardSuit == trump){
                    cardValue += 10
                    if(card == 'j'){
                        cardValue += 6 
                    }
                }
                //checks for left bower and adds 15
                if(trump == 'c' || trump =='s'){
                    if(trump == 'c' && cardSuit == 's' && card =='j'){
                        cardValue+=15
                    } 
                        
                    if(trump == 's' && cardSuit == 'c' && card =='j'){
                        cardValue+=15
                    }
                }
                else if(trump == 'h' || trump =='d'){
                    if(trump == 'h' && cardSuit == 'd' && card =='j'){  
                        cardValue+=15
                    }
                    if(trump == 'd' && cardSuit == 'h' && card =='j'){ 
                        cardValue+=15
                    }
                }
                //adds value to card based on its number/face
                card == '9'? cardValue+=9 
                : card == '0'
                ? cardValue+=10 
                : card == 'j' 
                ? cardValue+=11 
                : card== 'q'
                ? cardValue+=12 
                :card =='k'
                ? cardValue+=13 
                : cardValue+=14
                //checks against lowest value and adds it if it is, only if dealer
                if(cardValue < lowestValue && dealer){
                    lowestValue = cardValue
                    lowestValueHandPosition = i
                }
                //adds value to hand array
                cardValueArray.push(cardValue)   
            }
            if(dealer){
                cardValueArray.splice(lowestValueHandPosition, 1)
                hand.splice(lowestValueHandPosition, 1)

            }
            cardValueArray.forEach((cardValue)=>{
                handValue+= cardValue
            })
                        console.log(handValue)
            return handValue
        },
        // for scoring any hand given any trump in a game
        scoreHand(hand, trump) {
            let handValue=0
            for(let i = 0; i < hand.length; i++){

                let card = hand[i].split('')[0]
                let cardValue = 0
            
                //checks for Trump and adds 10 if trump, 16 if right bower
                if(hand[i].split('')[1] == trump){
                    cardValue + 10
                    if(card == 'j'){
                        cardValue += 6 
                    }
                }
                //checks for left bower and adds 15
                if(trump == 'c' || trump =='s'){
                    if(trump == 'c' && hand[i].split('')[1] == 's' && card =='j') cardValue+=15
                    if(trump == 's' && hand[i].split('')[1] == 'c' && card =='j') cardValue+=15
                }
                else if(trump == 'h' || trump =='d'){
                    if(trump == 'h' && hand[i].split('')[1] == 'd' && card =='j') cardValue+=15
                    if(trump == 'd' && hand[i].split('')[1] == 'h' && card =='j') cardValue+=15
                }
                
                card == '9'? cardValue+=9 
                : card == '0'
                ? cardValue += 10 
                : card == 'j' 
                ? cardValue+=11 
                : card== 'q'
                ? cardValue+=12 
                :card =='k'
                ? cardValue+=13 
                : cardValue+=14
                handValue += cardValue
            }
            
            return handValue
        }, 
        pickUporPass(hand, dealer) {

            let pickUpHand = 0
            if(dealer == this.dealer){
                pickUpHand = this.scoreHandWithTopCardPickUp(hand, this.topCard, true)
                console.log(hand)
            }
            else{
                pickUpHand = this.scoreHandWithTopCardPickUp(hand, this.topCard, false)
            }
            if(pickUpHand > 100){
                return "pickUp"
            }
            else return "pass"
        }, 
        callTrumpOrPass(hand){
            let response = 'Pass'
            let spades = 0
            let clubs = 0
            let diamonds = 0
            let hearts = 0 
            if(this.topCard.split("")[1] != "S"){
                spades = this.scoreHand(hand, "S")
            }
            if(this.topCard.split("")[1] != "C"){
                clubs = this.scoreHand(hand,"C")
            }
            if(this.topCard.split("")[1] != "D"){
                diamonds = this.scoreHand(hand,"D")
            }
            if(this.topCard.split('')[1] != "H"){
                hearts = this.scoreHand(hand, "H")
            }
            
            let potentialCallArray = [spades, clubs, diamonds, hearts]
            let highestCallScore = 0
            let highestCallScorePosition = 0
            potentialCallArray.forEach((score, index) =>{
                if(score > highestCallScore){
                    highestCallScore= score
                    highestCallScorePosition = index
                }
            })
            if(highestCallScore > 65){
                if(highestCallScorePosition == 0){
                    response = 'Spades!'
                }
                if(highestCallScorePosition == 1){
                    response = 'Clubs!'
                }
                if(highestCallScorePosition == 2){
                    response = 'Diamonds!'
                }
                if(highestCallScorePosition == 3){
                    response = 'Hearts!'
                }
            }
            return response
        },

    },
    watch : {
        calculateResponseToggle() {
            let response1 = this.pickUporPass(this.ai1Hand, 1)
            let response2 = this.pickUporPass(this.ai2Hand, 2)
            let response3 = this.pickUporPass(this.ai3Hand, 3)
            let responseArray = []
            responseArray.push(response1, response2, response3)
            responseArray.forEach((response)=>{
                if(response == 'pickUp'){
                    if(this.dealer == 1){
                        this.$emit('newDealerAiHand', this.ai1Hand)
                    }
                    if(this.dealer == 2){
                        this.$emit('newDealerAiHand', this.ai2Hand)
                    }
                    if(this.dealer == 3){
                        this.$emit('newDealerAiHand', this.ai3Hand)
                    }

                }
            })
            this.$emit('drawPileResponse', responseArray)
        },       
        calculateTrumpCallToggle(){
            let response1 = this.callTrumpOrPass(this.ai1Hand)
            let response2 = this.callTrumpOrPass(this.ai2Hand)
            let response3 = this.callTrumpOrPass(this.ai3Hand)
            let responseArray = [response1, response2, response3]
            console.log(responseArray)
            this.$emit("trumpCallResponse", responseArray)

        }
    }
}
</script>