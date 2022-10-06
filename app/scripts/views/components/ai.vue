<template></template>
<script>
export default {
    name: 'Ai',
    data() {
        return {
            
        }
    },
    emits: ["drawPileResponse", "newDealerAiHand", "trumpCallResponse", "firstCardPlayed", "secondCardPlayed", "thirdCardPlayed", "fourthCardPlayed"],
    props: {
        ai1Hand: {type:Array},
        ai2Hand: {type:Array},
        ai3Hand: {type:Array},
        topCard: {type:String},
        dealer: {type:Number},
        trump: {type:String},
        calculateResponseToggle: {type:Boolean},
        calculateTrumpCallToggle: {type:Boolean},
        playedCards: {type: Object},
        playCard2: {type: Boolean},
        playCard3: {type: Boolean},
        playCard4: {type: Boolean},
        player2Position: {type: Number},
        player3Position: {type: Number},
        player4Position: {type: Number},
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
            if(highestCallScore > 80){
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
        pickCardToPlay(player, hand, trump, positionInGameRotation){
            console.log("player " + player + " hand", hand)
            //variables for first in rotation
            let highestValue = 0
            let highestOffSuitValue = 0
            let highestPosition = -1
            let highestOffsuitPosition = -1 
            let lowestValue = 100
            let lowestPosition = -1 
            //variables for all others
            let highestHeartPosition = -1
            let highestHeartValue = 0
            let highestDiamondPosition = -1
            let highestDiamondValue = 0
            let highestSpadePosition = -1
            let highestSpadeValue = 0
            let highestClubPosition = -1
            let highestClubValue = 0
            let lowestHeartPosition = -1
            let lowestHeartValue = 100
            let lowestSpadePosition = -1
            let lowestSpadeValue = 100
            let lowestDiamondPosition = -1
            let lowestDiamondValue = 100
            let lowestClubPosition = -1
            let lowestClubValue = 0 
            let highestTrumpValue = 0
            let highestTrumpPosition = -1
            let lowestTrumpValue = 100
            let lowestTrumpPosition = -1
            let hasS = false
            let hasC = false
            let hasH = false
            let hasD = false
            let hasT = false
            let scoreArray = []
            //scores out the hand and assigns values to the above vaiables
            for(let i = 0; i < hand.length; i++){
                let currentScore = 0

                hand[i].split('')[0] == '9'? currentScore+=9 
                : hand[i].split('')[0] == '0'
                ? currentScore += 10 
                : hand[i].split('')[0] == 'j' 
                ? currentScore+=11 
                : hand[i].split('')[0]== 'q'
                ? currentScore+=12 
                :hand[i].split('')[0] =='k'
                ? currentScore+=13 
                : currentScore+=14
                if(hand[i].split('')[1] == trump){
                    currentScore += 10
                    if(hand[i].split('')[0] == 'j'){
                        currentScore += 5
                    } 
                }

                if(currentScore > highestValue){
                    highestValue = currentScore
                    highestPosition = i
                }
                if(!(hand[i].split('')[1] == trump || this.checkIfLeft(trump, hand[i]))){
                    if(currentScore > highestOffSuitValue){
                        highestOffSuitValue = currentScore
                        highestOffsuitPosition = i
                    }
                    if(currentScore < lowestValue){
                        lowestValue = currentScore
                        lowestPosition = i
                    }
                }
                // catches and scores the left as its appropriate suit
                if(this.checkIfLeft(trump, hand[i])){
                    console.log(hand[i])
                    currentScore += 14
                    if(hasT == false){
                            hasT = true    
                        }
                        if(highestTrumpValue < currentScore){
                            highestTrumpValue = currentScore
                            highestTrumpPosition = i
                        }
                        if(lowestTrumpValue > currentScore){
                            lowestTrumpValue = currentScore
                            lowestTrumpPosition = i
                        }
                    if(trump == "S"){
                        hasS = true
                        if(highestSpadeValue < currentScore){
                            highestSpadeValue = currentScore
                            highestSpadePosition = i
                        }
                        if(lowestSpadeValue > currentScore){
                            lowestSpadeValue = currentScore
                            lowestSpadePosition = i
                        }
                    }
                    if(trump == "C"){
                        hasC = true
                        if(highestClubValue < currentScore){
                            highestClubValue = currentScore
                            highestClubPosition = i
                        }
                        if(lowestClubValue > currentScore){
                            lowestClubValue = currentScore
                            lowestClubPosition = i
                        }
                    }
                    if(trump == "H"){
                        hasH = true
                        if(highestHeartValue < currentScore){
                            highestHeartValue = currentScore
                            highestHeartPosition = i
                        }
                        if(lowestHeartValue > currentScore){
                            lowestHeartValue = currentScore
                            lowestHeartPosition = i
                        }
                    }
                    if(trump == "D"){
                        hasD = true
                        if(highestDiamondValue < currentScore){
                            highestDiamondValue = currentScore
                            highestDiamondPosition = i
                        }
                        if(lowestDiamondValue > currentScore){
                            lowestDiamondValue = currentScore
                            lowestDiamondPosition = i
                        }
                    }
                }
                //assigns highest and lowest suits to any other card if its the lowest or highest of its suit currently
                else {
                    if(hand[i].split('')[1 == trump]){
                        if(hasT == false){
                            hasT = true    
                        }
                        if(highestTrumpValue < currentScore){
                            highestTrumpValue = currentScore
                            highestTrumpPosition = i
                        }
                        if(lowestTrumpValue > currentScore){
                            lowestTrumpValue = currentScore
                            lowestTrumpPosition = i
                        }
                        if(trump == "S"){
                            hasS = true
                            if(highestSpadeValue < currentScore){
                                highestSpadeValue = currentScore
                                highestSpadePosition = i
                            }
                            if(lowestSpadeValue > currentScore){
                                lowestSpadeValue = currentScore
                                lowestSpadePosition = i
                            }
                        }
                        if(trump == "C"){
                            hasC = true
                            if(highestClubValue < currentScore){
                                highestClubValue = currentScore
                                highestClubPosition = i
                            }
                            if(lowestClubValue > currentScore){
                                lowestClubValue = currentScore
                                lowestClubPosition = i
                            }
                        }
                        if(trump == "H"){
                            hasH = true
                            if(highestHeartValue < currentScore){
                                highestHeartValue = currentScore
                                highestHeartPosition = i
                            }
                            if(lowestHeartValue > currentScore){
                                lowestHeartValue = currentScore
                                lowestHeartPosition = i
                            }
                        }
                        if(trump == "D"){
                            hasD = true
                            if(highestDiamondValue < currentScore){
                                highestDiamondValue = currentScore
                                highestDiamondPosition = i
                            }
                            if(lowestDiamondValue > currentScore){
                                lowestDiamondValue = currentScore
                                lowestDiamondPosition = i
                            }
                        }   
                    }
                }
                scoreArray.push(currentScore)
            }
                console.log(this.playedCards.firstCardPlayed)
            if(positionInGameRotation == 1 ){
                if(this.checkIfHighestCurrentTrump(highestValue) || hand.length == 1){

                    this.$emit("firstCardPlayed", [highestPosition, highestValue , player])
                    return
                }
                this.$emit("firstCardPlayed", [highestOffsuitPosition, highestOffSuitValue , player])
                return
            }
            else if(positionInGameRotation == 2) {
                if(this.playedCards.firstCardPlayed.split('')[1] == "S" ){
                    if(hasS){
                        console.log(this.playedCards)
                        if(highestSpadeValue > this.playedCards.higestScorePlayed){
                            this.$emit("secondCardPlayed", [highestSpadePosition, highestSpadeValue, player],
                             )
                        }

                        else{
                            this.$emit("secondCardPlayed", [lowestSpadePosition, lowestSpadeValue, player])
                        }

                    }                        
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("secondCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("secondCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        highestValue -= 10
                        if(highestValue > this.playedCards.highestScorePlayed){
                            this.$emit("secondCardPlayed", [highestPosition, highestValue, player])
                        }
                        else {
                            this.$emit("secondCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "C" ) {
                    if(hasC){
                        if(highestClubValue > this.playedCards.highestScorePlayed){
                            this.$emit("secondCardPlayed", [highestClubValue, highestClubPosition, player])
                        }
                        else {
                            this.$emit("secondCardPlayed", [lowestClubPosition, lowestClubValue, player])
                        }
                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("secondCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("secondCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed){
                            this.$emit("secondCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("secondCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "H"){
                    if(hasH){
                        if(highestHeartValue > this.playedCards.higestScorePlayed){
                            this.$emit("secondCardPlayed", [highestHeartPosition, highestHeartValue, player])
                            }
                            this.$emit("secondCardPlayed", [lowestHeartPosition, this.lowestHeartValue, player])

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("secondCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("secondCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed){
                            this.$emit("secondCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("secondCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "D"){
                    if(hasD){
                        if(highestDiamondValue > this.playedCards.higestScorePlayed){
                            this.$emit("secondCardPlayed", [highestDiamondPosition, highestDiamondValue, player])
                            }
                            this.$emit("secondCardPlayed", [lowestDiamondPosition, this.lowestDiamondValue, player])

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("secondCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("secondCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed){
                            this.$emit("secondCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("secondCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                
                // if((this.checkIfHighestCurrentTrump(highestValue) && ((positionInGameRotation == 2) || (position))) || hand.length == 1)
            }
            else if(positionInGameRotation == 3) {
                if(this.playedCards.firstCardPlayed.split('')[1] == "S" ){
                    if(hasS){
                        if(highestSpadeValue > this.playedCards.higestScorePlayed && playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestSpadePosition, highestSpadeValue, player],
                             )
                        }else{
                            this.$emit("thirdCardPlayed", [lowestSpadePosition, lowestSpadeValue, player])
                        }

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("thirdCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("thirdCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("thirdCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "C" ) {
                    if(hasC){
                        if(highestClubValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestClubValue, highestClubPosition, player])
                        }
                        else {
                            this.$emit("thirdCardPlayed", [lowestClubPosition, lowestClubValue, player])
                        }
                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("thirdCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("thirdCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("thirdCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "H"){
                    if(hasH){
                        if(highestHeartValue > this.playedCards.higestScorePlayed && playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestHeartPosition, highestHeartValue, player])
                            }
                            this.$emit("thirdCardPlayed", [lowestHeartPosition, this.lowestHeartValue, player])

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("thirdCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("thirdCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("thirdCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "D"){
                    if(hasD){
                        if(highestDiamondValue > this.playedCards.higestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestDiamondPosition, highestDiamondValue, player])
                            }
                            this.$emit("thirdCardPlayed", [lowestDiamondPosition, this.lowestDiamondValue, player])

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("thirdCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("thirdCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 1){
                            this.$emit("thirdCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("thirdCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
            }
            else if(positionInGameRotation == 4) {
                if(this.playedCards.firstCardPlayed.split('')[1] == "S" ){
                    if(hasS){
                        if(highestSpadeValue > this.playedCards.higestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestSpadePosition, highestSpadeValue, player],
                             )
                        }else{
                            this.$emit("fourthCardPlayed", [lowestSpadePosition, lowestSpadeValue, player])
                        }

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("fourthCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("fourthCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("fourthCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "C" ) {
                    if(hasC){
                        if(highestClubValue > this.playedCards.highestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestClubValue, highestClubPosition, player])
                        }
                        else {
                            this.$emit("fourthCardPlayed", [lowestClubPosition, lowestClubValue, player])
                        }
                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("fourthCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("fourthCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        console.log(this.playedCards)
                        if(highestValue > this.playedCards.highestScorePlayed && playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("fourthCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "H"){
                    if(hasH){
                        if(highestHeartValue > this.playedCards.higestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestHeartPosition, highestHeartValue, player])
                            }
                            this.$emit("fourthCardPlayed", [lowestHeartPosition, this.lowestHeartValue, player])

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("fourthCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("fourthCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("fourthCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
                else if (this.playedCards.firstCardPlayed.split('')[1] == "D"){
                    if(hasD){
                        if(highestDiamondValue > this.playedCards.higestScorePlayed && this.playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestDiamondPosition, highestDiamondValue, player])
                            }
                            this.$emit("fourthCardPlayed", [lowestDiamondPosition, this.lowestDiamondValue, player])

                    }
                    else if(hasT == true){
                            if(lowestTrumpValue > this.playedCards.highestScorePlayed){
                                this.$emit("fourthCardPlayed", [lowestTrumpPosition, lowestTrumpValue, player])
                            }
                            else if(highestTrumpValue > this.playedCards.highestScorePlayed) {
                                this.$emit("fourthCardPlayed", [highestTrumpPosition, highestTrumpValue, player])
                            }
                        }
                    else{
                        if(highestValue > this.playedCards.highestScorePlayed && playedCards.highestScorePlayedPlayerPosition != 2){
                            this.$emit("fourthCardPlayed", [highestPosition, highestPosition, player])
                        }
                        else {
                            this.$emit("fourthCardPlayed", [lowestPosition, lowestValue, player])
                        }

                    } 
                }
            }
        },
        checkIfLeft(trump, card){
            if(card.split('')[0] == 'j'){
                if((trump == 'S' && card.split('')[1] == 'C') || (trump == 'C' && card.split('')[1] == 'S') || (trump == 'D' && card.split('')[1] == 'H') || (trump == 'H' && card.split('')[1] == 'D')){
                    return true
                }
            }
            return false
        },
        checkIfHighestCurrentTrump(score){
            if(score == 26){
                return true
            }
            let numberGreater = 0
            for(let j = 0; j < this.trumpPlayedThisHandScoreArray; j++){
                if(this.trumpPlayedThisHandScoreArray[j] > score){
                    numberGreater ++
                }
            }
            if(score == 25 && numberGreater == 1){
                return true
            }
            if(score == 24 && numberGreater == 2){
                return true
            }
            if(score == 23 && numberGreater == 3){
                return true
            }
            if(score == 22 && numberGreater == 4){
                return true
            }
            if(score == 20 && numberGreater == 5){
                return true
            }
            if(score == 19 && numberGreater == 6){
                return true
            }
            return false
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
            this.trumpPlayedThisHandScoreArray = []
            this.$emit('drawPileResponse', responseArray)
        },       
        calculateTrumpCallToggle(){
            let response1 = this.callTrumpOrPass(this.ai1Hand)
            let response2 = this.callTrumpOrPass(this.ai2Hand)
            let response3 = this.callTrumpOrPass(this.ai3Hand)
            let responseArray = [response1, response2, response3]
            console.log(responseArray)
            this.$emit("trumpCallResponse", responseArray)

        },
        playCard2() {
            if(this.player2Position == 1){
                this.pickCardToPlay(2, this.ai1Hand, this.trump, 1)
            }
            if(this.player2Position == 2){
                this.pickCardToPlay(2, this.ai1Hand, this.trump, 2)
            }
            if(this.player2Position == 3){
                this.pickCardToPlay(2, this.ai1Hand, this.trump, 3)
            }
            if(this.player2Position == 4){
                this.pickCardToPlay(2, this.ai1Hand, this.trump, 4)
            }
            console.log('playertwoposition ', this.player2Position)
        },
        playCard3() {
            if(this.player3Position == 1){
                this.pickCardToPlay(3, this.ai2Hand, this.trump, 1)
            }
            if(this.player3Position == 2){
                this.pickCardToPlay(3, this.ai2Hand, this.trump, 2)
            }
            if(this.player3Position == 3){
                this.pickCardToPlay(3, this.ai2Hand, this.trump, 3)
            }
            if(this.player3Position == 4){
                this.pickCardToPlay(3, this.ai2Hand, this.trump, 4)
            }
        },
        playCard4() {
            if(this.player4Position == 1){
                this.pickCardToPlay(4, this.ai3Hand, this.trump, 1)
            }
            if(this.player4Position == 2){
                this.pickCardToPlay(4, this.ai3Hand, this.trump, 2)
            }
            if(this.player4Position == 3){
                this.pickCardToPlay(4, this.ai3Hand, this.trump, 3)
            }
            if(this.player4Position == 4){
                this.pickCardToPlay(4, this.ai3Hand, this.trump, 4)
            }
        },
    }
}
</script>