<template></template>
<script>
    export default{
        name: "TrumpCallDisplayHandler",
        data(){
            return{
                aiResponse2: "",
                aiResponse3: "",
                aiResponse4: "",
                p2ResponseToggle: false,
                p3ResponseToggle: false,
                p4ResponseToggle: false,
                result: '',
                
            }
        },
        emits: ["p2ResponseToggle", "p3ResponseToggle", "p4ResponseToggle", "trumpCallButtonsToggle", "result"],
        props: {
            trumpAiResponse: {type:Array},
            trumpPlayerResponse: {type:String},
            dealer:{type:Number},
            startDisplayToggle:{type:Boolean},
            player2DealingPart2: {type:Boolean},
            player3DealingPart2: {type:Boolean}
        },
        methods : {
            trumpCall(responseArray){
            console.log(responseArray)
            this.aiResponse2 = responseArray[0]
            this.aiResponse3 = responseArray[1]
            this.aiResponse4 = responseArray[2]
            if(this.dealer == 0){
                this.aiTrumpCallResponseDisplayPlayer1Deal(responseArray)
            }
            if(this.dealer == 1){
                this.aiTrumpCallResponseDisplayPlayer2Deal(responseArray)
            }
            if(this.dealer == 2){
                this.aiTrumpCallResponseDisplayPlayer3Deal(responseArray)
            }
            if(this.dealer == 3){
                this.togglePlayerTrumpCallButtons()
            }
            },
            callTheTrump(response){
            if(response == "Spades!"){
                this.result = "S"
            }
            if(response == "Clubs!"){
                this.result = "C" 
            }
            if(response == "Diamonds!"){
                this.result = "D"
            }
            if(response== "Hearts!"){
                this.result = "H"
            }
            if(response == "Pass"){
                return true
            }
            else return false 

            },
            // two and three have two parts, the other is in the player button function
            aiTrumpCallResponseDisplayPlayer1Deal(){

            this.p2ResponseToggle = true  
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse2)) return
                    this.p3ResponseToggle = true
                    setTimeout(()=>{
                    this.p3ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse3)) return
                    this.p4ResponseToggle = true
                    setTimeout(()=>{
                        this.p4ResponseToggle= false
                        if(!this.callTheTrump(this.aiResponse4)) return
                        this.togglePlayerTrumpCallButtons()
                    }, 2000)
                    }, 2000)
            }, 2000)
            },
            aiTrumpCallResponseDisplayPlayer2Deal(){
                this.p3ResponseToggle = true  
                setTimeout(()=>{
                    this.p3ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse3)) return
                    this.p4ResponseToggle = true
                    setTimeout(()=>{
                    this.p4ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse4)) return
                    this.togglePlayerTrumpCallButtons()
                    }, 2000)
                }, 2000)
            },
            aiTrumpCallResponseDisplayPlayer2DealPart2() {
                this.p2ResponseToggle = true
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse2)) return
                }, 2000)
            },
            aiTrumpCallResponseDisplayPlayer3Deal(){
                this.p4ResponseToggle = true  
                setTimeout(()=>{
                    this.p4ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse4)) return
                    this.togglePlayerTrumpCallButtons()
                }, 2000)
            },
            aiTrumpCallResponseDisplayPlayer3DealPart2() {
                this.p2ResponseToggle = true
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse2)) return
                    this.p3ResponseToggle = true
                    setTimeout(()=>{
                    if(!this.callTheTrump(this.aiResponse3)) return
                    this.p3ResponseToggle = false}, 2000)
                }, 2000)
            },
            aiTrumpCallResponseDisplayPlayer4Deal(){
                this.p2ResponseToggle = true
                setTimeout(()=>{
                    this.p2ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse2)) return
                    this.p3ResponseToggle = true
                    setTimeout(()=>{
                    this.p3ResponseToggle = false
                    if(!this.callTheTrump(this.aiResponse3)) return
                    this.p4ResponseToggle = true
                    setTimeout(()=>{
                        if(!this.callTheTrump(this.aiResponse4)) return
                        this.p4ResponseToggle = false
                    }, 2000)
                    })
                },2000)
            },
            togglePlayerTrumpCallButtons(){
                this.$emit('trumpCallButtonsToggle')
            }
        },
        watch : {
            startDisplayToggle() {
                console.log("Starting within the display")
                this.trumpCall(this.trumpAiResponse)
            },
            p2ResponseToggle(){
                this.$emit("p2ResponseToggle")
            },
            p3ResponseToggle(){
                this.$emit("p3ResponseToggle")
            },
            p4ResponseToggle(){
                this.$emit("p4ResponseToggle")
            },
            result(){
                this.$emit("newTrump", this.result)
            }
        }
    }
</script>
        