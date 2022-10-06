<template>
    <div></div>
</template>
<script>
    export default {
        name:"PlayRoundHandler",
        emits:["pickCard"],
        props: {
            startRoundToggle: {type: Boolean},
            finishRoundToggle: {type: Boolean},
            startingPlayer : {type: Number}
        },
        methods: {
            playRound1StartPt1(){
                this.$emit('pickCard', 1)
            },
            playRound1StartPt2(){
                console.log('in round handler 1 start pt 2')
                    this.$emit('pickCard', 2)
                    setTimeout(()=>{
                        this.$emit('pickCard', 3)
                        setTimeout(()=>{
                            this.$emit('pickCard', 4)
                        }, 1000)
                    }, 1000)
                
            },
            playRound2Start(){
                this.$emit('pickCard', 2)
                setTimeout(()=>{
                    this.$emit('pickCard', 3)
                    setTimeout(()=>{
                        this.$emit('pickCard', 4)
                        setTimeout(()=>{
                            this.$emit('pickCard', 1)
                        }, 1000)
                    }, 1000)
                }, 1000)
            },
            playRound3StartPt1(){
                this.$emit('pickCard', 3)
                setTimeout(()=>{
                    this.$emit('pickCard', 4)
                    setTimeout(()=>{
                        this.$emit('pickCard', 1)
                    }, 1000)
                }, 1000)
            },
            playRound3StartPt2() {
                this.$emit('pickCard', 2)
            },
            playRound4StartPt1(){
                this.$emit('pickCard', 4)
                setTimeout(()=>{
                    this.$emit('pickCard', 1)
                }, 1000)
            },
            playRound4StartPt2(){
                this.$emit('pickCard', 2)
                setTimeout(()=>{
                    this.$emit('pickCard', 3)
                }, 1000)
            }
        },
        watch: {
            startRoundToggle(){
                console.log("round started Player: " + this.startingPlayer + "leads" )
                if(this.startingPlayer == 0) {
                    this.playRound1StartPt1()
                }
                else if(this.startingPlayer == 1){
                    this.playRound2Start()
                    console.log('inhandler')
                }
                else if(this.startingPlayer == 2){
                    this.playRound3StartPt1()
                }
                else if(this.startingPlayer == 3){
                    this.playRound4StartPt1()
                }
            },
            finishRoundToggle(){
                console.log("secondHalf of the round")
                if(this.startingPlayer == 0) {
                    this.playRound1StartPt2()
                }
                else if(this.startingPlayer == 2){
                    this.playRound3StartPt2()
                    console.log('inhandler')
                }
                else if(this.startingPlayer == 3){
                    this.playRound4StartPt2()
                }
            }
        }
    }
</script>