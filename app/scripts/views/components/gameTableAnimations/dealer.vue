<template>
<div class="dealingCardsHolder">
    
    <transition name="dealLeftOne" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.leftTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealLeftTwo" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.leftTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealLeftThree" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.leftOne"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <!-- deals Card Up -->
    <transition name="dealUpOne" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.upTwo"

            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealUpTwo" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.upTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealUpThree" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.upOne"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <!-- deals cards Right -->
    <transition name="dealRightOne" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.rightTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealRightTwo" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.rightTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealRightThree" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.rightOne"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <!-- deals cards down -->
    <transition name="dealDownOne" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.downTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealDownTwo" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.downTwo"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
    <transition name="dealDownThree" class="shuffleCard">
        <Card 
            class="shuffleCard"
            :style="cssVars"
            v-if="deal.downOne"
            cardName="back"
        :hidden="hideCard">
        </Card>
    </transition>
</div>
    <!-- deals cards left -->
</template>
<script>
import Card from '../card'
export default {
    name: 'Dealer',
    data() {
        return {
            hideCard: true,
            deal : {
                leftOne:false,
                leftTwo: false,
                rightOne: false,
                rightTwo:false,
                upOne:false,
                upTwo:false,
                downOne:false,
                downTwo:false,        
            },
            cssVars:"--xOffset : 0%; --yOffset: 0%; ",
            dealt: false
        
        }
    },
    props :{
        playerDealing : {type: Number, required:true}
    },
    emits : ['finishedDealing'],
    mounted() {
        if(this.playerDealing == 0){
            this.deal.leftTwo = true
            
            setTimeout(()=>{
                this.deal.leftTwo = false
                this.toggleUpThree()
                
                setTimeout(()=>{
                    this.toggleUpThree()
                    this.deal.rightTwo = true
                    
                    setTimeout(()=>{
                        this.deal.rightTwo = false
                        this.toggleDownThree()
                        
                        setTimeout(()=>{
                            this.toggleDownThree()
                            this.toggleLeftThree()
                            
                            setTimeout(()=>{
                                this.toggleLeftThree()
                                this.deal.upTwo = true
                                
                                setTimeout(()=>{
                                    this.deal.upTwo = false
                                    this.toggleRightThree()
                                    
                                    setTimeout(()=>{
                                        this.toggleRightThree()
                                        this.deal.downTwo = true
                                        
                                        setTimeout(()=>{
                                            this.deal.downTwo = false
                                            
                                            setTimeout(()=>{
                                                this.dealt = true
                                            },500)
                                        },500)
                                    },500)    
                                }, 500)
                            }, 500)
                        },500)
                    },500)
                },500)
            },500)
        }
        if(this.playerDealing == 1){
            this.deal.upTwo = true
            
            setTimeout(()=>{
                this.deal.upTwo = false
                this.toggleRightThree()
                
                setTimeout(()=>{
                    this.toggleRightThree()
                    this.deal.downTwo = true
                    
                    setTimeout(()=>{
                        this.deal.downTwo = false
                        this.toggleLeftThree()
                        
                        setTimeout(()=>{
                            this.toggleLeftThree()
                            this.toggleUpThree()
                            
                            setTimeout(()=>{
                                this.toggleUpThree()
                                this.deal.rightTwo = true
                                
                                setTimeout(()=>{
                                    this.deal.rightTwo = false
                                    this.toggleDownThree()
                                    
                                    setTimeout(()=>{
                                        this.toggleDownThree()
                                        this.deal.leftTwo = true
                                        
                                        setTimeout(()=>{
                                            this.deal.leftTwo = false
                                            
                                            setTimeout(()=>{
                                                this.dealt = true
                                            },500)
                                        },500)
                                    },500)    
                                }, 500)
                            }, 500)
                        },500)
                    },500)
                },500)
            },500)
        }
        if(this.playerDealing == 2){
            this.deal.rightTwo = true
            
            setTimeout(()=>{
                this.deal.rightTwo = false
                this.toggleDownThree()
                
                setTimeout(()=>{
                    this.toggleDownThree()
                    this.deal.leftTwo = true
                    
                    setTimeout(()=>{
                        this.deal.leftTwo = false
                        this.toggleUpThree()
                        
                        setTimeout(()=>{
                            this.toggleUpThree()
                            this.toggleRightThree()
                            
                            setTimeout(()=>{
                                this.toggleRightThree()
                                this.deal.downTwo = true
                                
                                setTimeout(()=>{
                                    this.deal.downTwo = false
                                    this.toggleLeftThree()
                                    
                                    setTimeout(()=>{
                                        this.toggleLeftThree()
                                        this.deal.upTwo = true
                                        
                                        setTimeout(()=>{
                                            this.deal.upTwo = false
                                            
                                            setTimeout(()=>{
                                                this.dealt = true
                                            },500)
                                        },500)
                                    },500)    
                                }, 500)
                            }, 500)
                        },500)
                    },500)
                },500)
            },500)
        }
        if(this.playerDealing == 3){
            this.deal.downTwo = true
            
            setTimeout(()=>{
                this.deal.downTwo = false
                this.toggleLeftThree()
                
                setTimeout(()=>{
                    this.toggleLeftThree()
                    this.deal.upTwo = true
                    
                    setTimeout(()=>{
                        this.deal.upTwo = false
                        this.toggleRightThree()
                        
                        setTimeout(()=>{
                            this.toggleRightThree()
                            this.toggleDownThree()
                            
                            setTimeout(()=>{
                                this.toggleDownThree()
                                this.deal.leftTwo = true
                                
                                setTimeout(()=>{
                                    this.deal.leftTwo = false
                                    this.toggleUpThree()
                                    
                                    setTimeout(()=>{
                                        this.toggleUpThree()
                                        this.deal.rightTwo = true
                                        
                                        setTimeout(()=>{
                                            this.deal.rightTwo = false
                                            
                                            setTimeout(()=>{
                                                this.dealt = true
                                            },500)
                                        },500)
                                    },500)    
                                }, 500)
                            }, 500)
                        },500)
                    },500)
                },500)
            },500)
        }
    
    }, 
    methods : {
        toggleLeftThree() {
            this.deal.leftOne = this.deal.leftOne == true ? false: true
            this.deal.leftTwo = this.deal.leftTwo == true ? false: true
        },
        toggleUpThree() {
            this.deal.upOne = this.deal.upOne == true ? false: true
            this.deal.upTwo = this.deal.upTwo == true ? false: true
        },
        toggleRightThree() {
            this.deal.rightOne = this.deal.rightOne == true ? false: true
            this.deal.rightTwo = this.deal.rightTwo == true ? false: true
        },
        toggleDownThree() {
            this.deal.downOne = this.deal.downOne == true ? false: true
            this.deal.downTwo = this.deal.downTwo == true ? false: true
        }
    },
    watch: {
        dealt() {
            this.$emit("finishedDealing", this.dealt)
        }
    },
    components: {
        Card
    }

}
</script>
<style>
    .dealingCardsHolder {
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .shuffleCard {
        position: absolute;
        transform: translate(var(--xOffset), var(--yOffset))
    }
    .dealLeftOne-leave-active {
        animation: exitLeft1 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealLeftTwo-leave-active {
        animation: exitLeft2 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealLeftThree-leave-active {
        animation: exitLeft3 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }

    @keyframes exitLeft1 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-1200%, -70%) rotate(-85deg);
        }
    }
    @keyframes exitLeft2 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-1200%, -50%) rotate(-100deg);
        }
    }
    @keyframes exitLeft3 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-1200%, -30%) rotate(-115deg);
        }
    }

    .dealUpOne-leave-active {
        animation: exitUp1 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealUpTwo-leave-active {
        animation: exitUp2 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealUpThree-leave-active {
        animation: exitUp3 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }

        @keyframes exitUp1 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-20%, -800%) rotate(-25deg);
        }
    }
    @keyframes exitUp2 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(0%, -800%) rotate(0);
        }
    }
    @keyframes exitUp3 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(20%, -800%) rotate(25deg);
        }
    }

    .dealRightOne-leave-active {
        animation: exitRight1 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealRightTwo-leave-active {
        animation: exitRight2 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealRightThree-leave-active {
        animation: exitRight3 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }

    @keyframes exitRight1 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(1200%, -20%) rotate(85deg);
        }
    }
    @keyframes exitRight2 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(1200%, 0) rotate(100deg);
        }
    }
    @keyframes exitRight3 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(1200%, 20%) rotate(115deg);
        }
    }

    .dealDownOne-leave-active {
        animation: exitDown1 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealDownTwo-leave-active {
        animation: exitDown2 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }
    .dealDownThree-leave-active {
        animation: exitDown3 0.5s;
        transform: translate(var(--xOffset), var(--yOffset));
    }

    @keyframes exitDown1 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(-30%, 800%) rotate(25deg);
        }
    }
    @keyframes exitDown2 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(0%, 800%) rotate(0);
        }
    }
    @keyframes exitDown3 {
        0%{
            transform: translate(var(--xOffset), var(--yOffset)) rotate(0);
        }
        100% {
            transform: translate(20%, 800%) rotate(-25deg);
        }
    }
</style>