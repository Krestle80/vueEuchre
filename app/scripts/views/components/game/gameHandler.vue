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
</template>
    <!-- <PlayHandHandler
    
    ></PlayHandHandler> -->

<script>
    import PickUpOrPassDisplayHandler from "./PickUpOrPasssDisplayHandler.vue";
    import TrumpCallDisplayHandler from "./trumpCallDisplayHandler.vue";
    import playHandHandler from "./playHandHandler.vue";
    export default {
        name:"GameHandler",
        emits: ["newTrump", "pickUpOrPassButtonsToggle", "trumpCallButtonsToggle",
        "p2ResponseToggle", "p3ResponseToggle", "p4ResponseToggle", "roundWinner", "awaitingPlayerCard", "trumpCallAiRequest"],
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
                }
                else {  
                    this.$emit("trumpCallAiRequest")
                }
            },
            trumpCallButtonsToggleCarrier () {
                this.$emit("trumpCallButtonsToggle")
            }
        },
        components :{
            PickUpOrPassDisplayHandler,
            TrumpCallDisplayHandler,
        }
    }
</script>