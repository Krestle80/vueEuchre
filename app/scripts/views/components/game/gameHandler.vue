<template>
    <PickUpOrPassDisplayHandler
        :pickUpOrPassAiResponse="pickUpOrPassAiResponse"
        :pickUpOrPassPlayerResponse="pickUpOrPassPlayerResponse"
        :dealer="dealer"
        :startDisplayToggle="pickUpOrPassToggle"
        :player2DealingPart2="pickUpOrPassPlayer2DealPart2Toggle"
        :player3DealingPart2="pickUpOrPassPlayer3DealPart2Toggle"
        @p2ResponseToggled="p2ResponseToggleCarrier"
        @p3ResponseToggled="p3ResponseToggleCarrier"
        @p4ResponseToggled="p4ResponseToggleCarrier"
        @togglePickUpOrPassButtons="togglePickUpOrPassButtonsResponseCarrier"
        @result="pickUpOrPassResultHandler"
    ></PickUpOrPassDisplayHandler>
    <TrumpCallDisplayHandler
        :trumpAiResponse="trumpAiResponse"
        :trumpPlayerResponse="trumpPlayerResponse"
        :dealer="dealer"
        :startDisplayToggle="trumpCallDisplayToggle"
        :player2DealingPart2="trumpCallPlayer2DealPart2Toggle"
        :player3DealingPart2="trumpCallPlayer3DealPart2Toggle"
        @p2ResponseToggled="p2ResponseToggleCarrier"
        @p3ResponseToggled="p3ResponseToggleCarrier"
        @p4ResponseToggled="p4ResponseToggleCarrier"
        @trumpCallButtonsToggle=""
        @result="newTrump"
    ></TrumpCallDisplayHandler>
</template>
    <!-- <PlayHandHandler
    
    ></PlayHandHandler> -->

<script>
    import PickUpOrPassDisplayHandler from "./PickUpOrPasssDisplayHandler.vue";
    import TrumpCallDisplayHandler from "./trumpCallDisplayHandler.vue";
    import playHandHandler from "./playHandHandler.vue";
    export default {
        name:"GameHandler",
        emits: ["newTrump", "pickUpOrPassButtonsToggle", "trumpCallButtonsToggle", "roundWinner", "awaitingPlayerCard"],
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

        },
        methods: {
            newTrump(trump){
                this.$emit("newTrump", trump)
            },
            togglePickUpOrPassButtonsResponseCarrier(){
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
                if( response = "pickUp"){
                    this.newTrump(this.topCardName.split('')[1])
                }
                else {  
                    this.trumpCallDisplayToggle = !this.trumpCallDisplayToggle
                }
            }
        },
        components :{
            PickUpOrPassDisplayHandler,
            TrumpCallDisplayHandler,
        }
    }
</script>