<template>
        <div>
            <!-- Cards that stay to let the play know what has been played -->
            <transition name="p1Play">
                <Card 
                    v-if="p1DisplayCard"
                    class="playedCard p1Card"                    
                    :cardName="p1CardName" 
                    :hidden="false">
                </Card>
            </transition>
            <transition name="p2Play">
                <Card 
                    v-if="p2DisplayCard"
                    class="playedCard p2Card"                 
                    :cardName="p2CardName"
                    :hidden="false">
                </Card>
            </transition>
            <transition name="p3Play">
                <Card 
                    v-if="p3DisplayCard"
                    class="playedCard p3Card"                    
                    :cardName="p3CardName" 
                    :hidden="false">
                </Card>
            </transition>
            <transition name="p4Play">
                <Card 
                    v-if="p4DisplayCard"
                    class="playedCard p4Card"                    
                    :cardName="p4CardName" 
                    :hidden="false">
                </Card>
            </transition>
            <!-- cards that move to the winning player -->
            <transition name="p1CardP1Win">
                <Card 
                    v-if="p1Win"
                    class="playedCard p1Card"                    
                    :cardName="p1CardName" 
                    :hidden="false">
                </Card>
            </transition>
            <transition name="p2CardP1Win">
                <Card 
                    v-if="p1Win"
                    class="playedCard p2Card"                 
                    :cardName="p2CardName"
                    :hidden="false">
                </Card>
            </transition>
            <transition name="p3CardP1Win">
                <Card 
                    v-if="p1Win"
                    class="playedCard p3Card"                    
                    :cardName="p3CardName" 
                    :hidden="false">
                </Card>              
            </transition>
            <transition name="p4CardP1Win">
                <Card 
                    v-if="p1Win"
                    class="playedCard p4Card"                    
                    :cardName="p4CardName" 
                    :hidden="false">
                </Card>               
            </transition>
            <transition name="p1CardP2Win">
                <Card 
                    v-if="p2Win"
                    class="playedCard p1Card"                    
                    :cardName="p1CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p2CardP2Win">
                <Card 
                    v-if="p2Win"
                    class="playedCard p2Card"                 
                    :cardName="p2CardName"
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p3CardP2Win">
                <Card 
                    v-if="p2Win"
                    class="playedCard p3Card"                    
                    :cardName="p3CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p4CardP2Win">
                <Card 
                    v-if="p2Win"
                    class="playedCard p4Card"                    
                    :cardName="p4CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p1CardP3Win">
                <Card 
                    v-if="p3Win"
                    class="playedCard p3Card"                    
                    :cardName="p3CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p2CardP3Win">
                <Card 
                    v-if="p3Win"
                    class="playedCard p2Card"                 
                    :cardName="p2CardName"
                    :hidden="false">
                </Card>               
            </transition>
            <transition name="p3CardP3Win">
                <Card 
                    v-if="p3Win"
                    class="playedCard p3Card"                    
                    :cardName="p3CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p4CardP3Win">
                <Card 
                    v-if="p3Win"
                    class="playedCard p4Card"                    
                    :cardName="p4CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p1CardP4Win">
                <Card 
                    v-if="p4Win"
                    class="playedCard p1Card"                    
                    :cardName="p1CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p2CardP4Win">
                <Card 
                    v-if="p4Win"
                    class="playedCard p2Card"                 
                    :cardName="p2CardName"
                    :hidden="false">
                </Card>               
            </transition>
            <transition name="p3CardP4Win">
                <Card 
                    v-if="p4Win"
                    class="playedCard p3Card"                    
                    :cardName="p3CardName" 
                    :hidden="false">
                </Card>                
            </transition>
            <transition name="p4CardP4Win">
                <Card 
                    v-if="p4Win"
                    class="playedCard p4Card"                    
                    :cardName="p4CardName" 
                    :hidden="false">
                </Card>               
            </transition>
        </div>
        <div class="glowHolder">
            <transition name="glow">
                <div 
                    v-if="p1Win"    
                    class="p1WinGlow"
                ></div>
            </transition>
            <transition name="glow">
                <div 
                    v-if="p2Win"            
                    class="p2WinGlow"
                ></div>
            </transition>
            <transition name="glow">
                <div 
                    v-if="p3Win"
                    class="p3WinGlow"
                ></div>
            </transition>
            <transition name="glow">
                <div 
                    v-if="p4Win"
                    class="p4WinGlow"
                ></div>
            </transition>
        </div>
</template>
<script>
    import Card from '../card.vue'
    export default {
        name: 'RoundHandler',
        data() {
            return{
                p1Win:false,
                p2Win:false,
                p3Win:false,
                p4Win:false,
            }
        },
        emits: ['cardsDelivered'],
        props: {
            p1CardName: {type:String},
            p1DisplayCard: {type:Boolean},
            p2CardName: {type:String},
            p2DisplayCard: {type:Boolean},
            p3CardName: {type:String},
            p3DisplayCard: {type:Boolean},
            p4CardName: {type:String},
            p4DisplayCard: {type:Boolean},
            roundWinner: {type:Number},
        },
        watch: {
            roundWinner() {
                console.log(this.roundWinner)
                if(this.roundWinner != 0){
                    this.roundWinner == 1
                    ? this.p1Win = true
                    : this.roundWinner == 2
                    ? this.p2Win = true
                    : this.roundWinner == 3
                    ? this.p3Win = true
                    : this.p4Win = true

                    setTimeout(()=>{
                        this.roundWinner == 1
                        ? this.p1Win = false
                        : this.roundWinner == 2
                        ? this.p2Win = false
                        : this.roundWinner == 3
                        ? this.p3Win = false
                        : this.p4Win = false
                        this.$emit('cardsDelivered', this.roundWinner)
                    }, 500)
                }

            }
        },
        components : {
            Card
        },
    }
</script>
<style>
    .playedCard {
        position: absolute;
    }
    .p1Card{
        transform: translate( -50%, 50%);
    }
    .p2Card{
        transform: translate( -150%, -50%);
    }
    .p3Card{
        transform: translate( -50%, -150%);
    }
    .p4Card{
        transform: translate( 50%, -50%);
    }
    .p2Play-enter-active {
        animation: p2Play 0.5s;
        transform: translate(-150%, -50%);
    }
    @keyframes p2Play {
        0%{
            transform: translate(-1200%, -70%) rotate(-85deg);
        }
        100% {
            transform: translate(-150%, -50%), var(-50%) rotate(0);
        }
    }
    .p3Play-enter-active {
        animation: p3Play 0.5s;
        transform: translate( -50%, -150%);
    }
    @keyframes p3Play {
        0%{
            transform: translate(-20%, -1200%) rotate(-25deg);
        }   
        100% {
            transform: translate( -50%, -150%) rotate(0);
        }
    }
    .p4Play-enter-active {
        animation: p4Play 0.5s;
        transform: translate(50%, -50%);
    }
    @keyframes p4Play {
        0%{
            transform: translate(1200%, -20%) rotate(85deg);
        }
        100% {
            transform: translate( 50%, -50%) rotate(0);
        }
    }

    .p1CardP1Win-leave-to,
    .p2CardP1Win-leave-to,
    .p3CardP1Win-leave-to,
    .p4CardP1Win-leave-to {
        transform: translate(-50%, 1200%)
    }
    .p1CardP2Win-leave-to,
    .p2CardP2Win-leave-to,
    .p3CardP2Win-leave-to,
    .p4CardP2Win-leave-to {
        transform: translate(-1200%, -50%) rotate(-85deg)
    }
    .p1CardP3Win-leave-to,
    .p2CardP3Win-leave-to,
    .p3CardP3Win-leave-to,
    .p4CardP3Win-leave-to {
        transform: translate(-50%, -1200%) rotate(-25deg);
    }
    .p1CardP4Win-leave-to,
    .p2CardP4Win-leave-to,
    .p3CardP4Win-leave-to,
    .p4CardP4Win-leave-to {
        transform: translate(1200%, -50%) rotate(85deg);
    }
    .p1CardP1Win-leave-active,
    .p2CardP1Win-leave-active,
    .p3CardP1Win-leave-active,
    .p4CardP1Win-leave-active,
    .p1CardP2Win-leave-active,
    .p2CardP2Win-leave-active,
    .p3CardP2Win-leave-active,
    .p4CardP2Win-leave-active,
    .p1CardP3Win-leave-active,
    .p2CardP2Win-leave-active,
    .p3CardP2Win-leave-active,
    .p4CardP2Win-leave-active,
    .p1CardP4Win-leave-active,
    .p2CardP4Win-leave-active,
    .p3CardP4Win-leave-active,
    .p4CardP4Win-leave-active {
        transition: all 0.5s ease-out;
    }
    

    /* styles for win glow effect */
    .glowHolder {
        position:absolute
    }
    .p1WinGlow,
    .p2WinGlow,
    .p3WinGlow,
    .p4WinGlow {
        position: absolute;
        height: 800px;
        width: 1400px;
        box-shadow: 0px 0px 100px 100px yellow;
        background-color: yellow;
        opacity: 0.20;
        border-radius: 200px;
    }
    .p1WinGlow{
        transform: translate( -50%, 50%);
    }
    .p2WinGlow{
        transform: translate( -120%, -50%);
    }
    .p3WinGlow{
        transform: translate( -50%, -120%);
    }
    .p4WinGlow{
        transform: translate( 30%, -50%);
    }
    .glow-enter-from,
    .glow-leave-to {
        opacity: 0;
    }
    .glow-enter-active,
    .glow-leave-active{
        transition: all 0.3s ease-in
    }
</style>