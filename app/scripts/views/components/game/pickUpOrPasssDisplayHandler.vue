<template><div></div></template>
<script>
    export default{
        name: "PickUpOrPassDisplayHandler",
        data(){
            return{
                pickUpOrPassButtonsToggle:false,
                aiResponse2: "",
                aiResponse3: "",
                aiResponse4: "",
                p2ResponseToggle: false,
                p3ResponseToggle: false,
                p4ResponseToggle: false,

                
            }
        },
            emits: ["p2ResponseToggled", "p3ResponseToggled", "p4ResponseToggled", "pickUpOrPassButtons"],
        props: {
            pickUpOrPassAiResponse: {type:Array},
            pickUpOrPassPlayerResponse: {type:String},
            dealer:{type:Number},
            startDisplayToggle:{type:Boolean}
        },
        methods : {
            topCardTrumpCall(responseArray){
                console.log(responseArray)
                this.aiResponse2 = responseArray[0]
                this.aiResponse3 = responseArray[1]
                this.aiResponse4 = responseArray[2]
                if(this.dealer == 0){
                    this.aiTopCardResponseDisplayPlayer1Deal(responseArray)
                }
                if(this.dealer == 1){
                    this.aiTopCardResponseDisplayPlayer2Deal(responseArray)
                }
                if(this.dealer == 2){
                    this.aiTopCardResponseDisplayPlayer3Deal(responseArray)
                }
                if(this.dealer == 3){
                    this.pickUpOrPassButtonsToggle = true
                }
                },
                // two and three have two parts, the other is in the player button function
                aiTopCardResponseDisplayPlayer1Deal(){

                this.p2ResponseToggle = true  
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(this.aiResponse2 == "pickUp"){
                    this.topCardPickedUp = true
                    return
                    }
                    this.p3ResponseToggle = true
                    setTimeout(()=>{
                    this.p3ResponseToggle = false
                    if(this.aiResponse3 == "pickUp"){
                        this.topCardPickedUp = true
                        return
                    }
                    this.p4ResponseToggle = true
                    setTimeout(()=>{
                        this.p4ResponseToggle= false
                        if(this.aiResponse4 == "pickUp"){
                        this.topCardPickedUp = true
                        return
                        }
                        this.pickUpOrPassButtonsToggle =true
                    }, 2000)
                    }, 2000)
                }, 2000)
                },
                aiTopCardResponseDisplayPlayer2Deal(){
                this.p3ResponseToggle = true  
                setTimeout(()=>{
                    this.p3ResponseToggle = false
                    if(this.aiResponse3 == "pickUp"){
                    this.topCardPickedUp = true
                    return
                    }
                    this.p4ResponseToggle = true
                    setTimeout(()=>{
                    this.p4ResponseToggle = false
                    if(this.aiResponse4 == "pickUp"){
                    this.topCardPickedUp = true
                    return
                    }
                    this.pickUpOrPassButtonsToggle =true
                    }, 2000)
                }, 2000)
                },
                aiTopcardResponseDisplayPlayer2DealPart2() {
                this.p2ResponseToggle = true
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    this.processToggles.aiTrumpCall = !this.processToggles.aiTrumpCall
                    console.log(this.processToggles.aiTrumpCall)
                }, 2000)
                },
                aiTopCardResponseDisplayPlayer3Deal(){
                this.p4ResponseToggle = true  
                setTimeout(()=>{
                    this.p4ResponseToggle = false
                    if(this.aiResponse4 == "pickUp"){
                    this.topCardPickedUp = true
                    return
                    }
                    this.pickUpOrPassButtonsToggle = true
                }, 2000)
                },
                aiTopCardResponseDisplayPlayer3DealPart2() {
                this.p2ResponseToggle = true
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(this.aiResponse2 == "pickUp"){
                    this.topCardPickedUp = true
                    return
                    }
                    this.p3ResponseToggle = true
                    setTimeout(()=>{
                    if(this.aiResponse3 == "pickUp"){
                        this.topCardPickedUp = true
                        return
                    }
                    this.p3ResponseToggle = false}, 2000)
                    this.processToggles.aiTrumpCall = !this.processToggles.aiTrumpCall
                }, 2000)
                },
                aiTopCardResponseDisplayPlayer4Deal(){
                this.p2ResponseToggle = true
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(this.aiResponse2 == "pickUp"){
                    this.topCardPickedUp = true
                    return
                    }
                    this.p3ResponseToggle = true
                    setTimeout(()=>{
                    this.p3ResponseToggle = false
                    if(this.aiResponse3 == "pickUp"){
                        this.topCardPickedUp = true
                        return
                    }
                    this.p4ResponseToggle = true
                    setTimeout(()=>{
                        if(this.aiResponse4 == "pickUp"){
                        this.topCardPickedUp = true
                        return
                        }
                        this.p4ResponseToggle = false
                        this.processToggles.aiTrumpCall = !this.processToggles.aiTrumpCall
                    }, 2000)
                    })
                },2000)
            }
        },
        watch: {
            startDisplayToggle() {
                this.topCardTrumpCall(this.pickUpOrPassAiResponse)
            },
            pickUpOrPassButtonsToggle() {
                this.$emit("pickUpOrPassButtons")
            },
            p2ResponseToggle() {
                this.$emit("p2ResponseToggled")
            },
            p3ResponseToggle() {console.log(this)
                this.$emit("p3ResponseToggled",this.p3ResponseToggle)
            },
            p4ResponseToggle() {
                this.$emit("p4ResponseToggled")
            },
        }
    }
</script>