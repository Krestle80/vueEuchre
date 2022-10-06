<template>
    <PickUpOrPassDisplayHandler
        :pickUpOrPassAiResponse="pickUpOrPassAiResponse"
        :pickUpOrPassPlayerResponse="pickUpOrPassPlayerResponse"
        :dealer="dealer"
        :startDisplayToggle="pickUpOrPassToggle"
        :player2DealPart2Toggle="pickUpOrPassPlayer2DealPart2Toggle"
        :player3DealPart2Toggle="pickUpOrPassPlayer3DealPart2Toggle"
        @p2ResponseToggle="p2ResponseToggleCarrier"
        @p3ResponseToggle="p3ResponseToggleCarrier"
        @p4ResponseToggle="p4ResponseToggleCarrier"
        @pickUpOrPassButtons="togglePickUpOrPassButtonsResponseCarrier"
        @result="pickUpOrPassResultHandler"
    ></PickUpOrPassDisplayHandler>
    <TrumpCallDisplayHandler
        :trumpAiResponse="trumpAiResponse"
        :trumpPlayerResponse="trumpPlayerResponse"
        :dealer="dealer"
        :startDisplayToggle="trumpCallDisplayToggle"
        :player2DealingPart2="trumpCallPlayer2DealPart2Toggle"
        :player3DealingPart2="trumpCallPlayer3DealPart2Toggle"
        @p2ResponseToggle="p2ResponseToggleCarrier"
        @p3ResponseToggle="p3ResponseToggleCarrier"
        @p4ResponseToggle="p4ResponseToggleCarrier"
        @trumpCallButtonsToggle="trumpCallButtonsToggleCarrier"
        @result="newTrump"
    ></TrumpCallDisplayHandler>
    <PlayRoundHandler
        :startRoundToggle="roundToggle"
        :finishRoundToggle="roundPt2Toggle"
        :startingPlayer="roundStartingPlayer"
        @pickCard="playCard"
    ></PlayRoundHandler>
</template>

<script>
    import PickUpOrPassDisplayHandler from "./PickUpOrPasssDisplayHandler.vue";
    import TrumpCallDisplayHandler from "./trumpCallDisplayHandler.vue";
    import PlayRoundHandler from "./playRoundHandler.vue";
    export default {
        name:"GameHandler",
        emits: ["newTrump", "pickUpOrPassButtonsToggle", "trumpCallButtonsToggle",
        "p2ResponseToggle", "p3ResponseToggle", "p4ResponseToggle", "pickUp", "trumpCallAiRequest", "roundWinner", "awaitingPlayerCard", "trumpCalled", "playCard"],
        props: {
            pickUpOrPassToggle:{type:Boolean},
            pickUpOrPassPlayer2DealPart2Toggle:{type:Boolean},
            pickUpOrPassPlayer3DealPart2Toggle:{type:Boolean},
            trumpCallDisplayToggle:{type:Boolean},
            trumpCallPlayer2DealPart2Toggle:{type:Boolean},
            trumpCallPlayer3DealPart2Toggle:{type:Boolean},
            dealer:{type:Number},
            topCardName:{type:String},
            trump:{type:String},
            pickUpOrPassAiResponse:{type:Array},
            pickUpOrPassPlayerResponse:{type:String},
            trumpAiResponse:{type:Array},
            trumpPlayerResponse:{type:String},
            roundToggle:{type:Boolean},
            roundPt2Toggle:{type:Boolean},
            roundStartingPlayer:{type:Number}

        },
        methods: {
            newTrump(trump){
                this.$emit("newTrump", trump)
            },
            togglePickUpOrPassButtonsResponseCarrier(){
                console.log(this)
                this.$emit("pickUpOrPassButtonsToggle")
            },
            p2ResponseToggleCarrier(){
                this.$emit("p2ResponseToggle")
            },
            p3ResponseToggleCarrier(){
                this.$emit("p3ResponseToggle")
            },
            p4ResponseToggleCarrier(){
                this.$emit("p4ResponseToggle")
            },
            pickUpOrPassResultHandler(response){
                console.log(response)
                if( response == "pickUp"){
                    this.newTrump(this.topCardName.split('')[1])
                    this.$emit("pickUp")
                }
                else {  
                    this.$emit("trumpCallAiRequest")
                }
            },
            trumpCallButtonsToggleCarrier () {
                this.$emit("trumpCallButtonsToggle")
            },
            trumpCallResultHandler(res){
                this.newTrump(res)
                this.$emit("trumpCalled")
            },
            playCard(player){
                this.$emit("playCard", player)
            }
        },
        components :{
            PickUpOrPassDisplayHandler,
            TrumpCallDisplayHandler,
            PlayRoundHandler
        }
    }
</script>