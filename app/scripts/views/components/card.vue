<template>
    <div class= "cardBack" :style="tiltStyle">
        <img id="card" :src="src" @click="playCard(index)"/>
    </div>
</template>

<script>
import { thisTypeAnnotation } from '@babel/types'


export default {
    name: 'Card',
    data() {
        
        return{
             offset : 50,
             cardFileEndings:[
                'Diamonds/9D.png',
                'Diamonds/10D.png',
                'Diamonds/jD.png',
                'Diamonds/qD.png',
                'Diamonds/kD.png',
                'Diamonds/aD.png',
                'hearts/9H.png',
                'hearts/10H.png',
                'hearts/jH.png',
                'hearts/qH.png',
                'hearts/kH.png',
                `hearts/aH.png`,
                `clubs/9C.png`,
                `clubs/10C.png`,
                `clubs/jC.png`,
                `clubs/qC.png`,
                `clubs/kC.png`,
                `clubs/aC.png`,
                `spades/9S.png`,
                `spades/10S.png`,
                `spades/jS.png`,
                `spades/qS.png`,
                `spades/kS.png`,
                `spades/aS.png`
            ],
            fileName:''

             }
    },
    props: {
            cardName: {type: String, required: true},
            hidden: {type: Boolean, required: true},
            handPosition : {type: Number, required: false},
            handSize : {type: Number},
            
    },
    emits:["cardPlayed"],
    computed: {
        src() {
            this.setFileName()
            return `../../../scripts/assets/cards/${this.hidden ? "back.png": this.fileName}`
        },
        //adds transform styling to each card if its in a hand
        tiltStyle() {
            return `transform: translate(0,${
                    this.handSize <= 2
                        ?  0 
                    :this.handSize == 3
                        ? this.handPosition == 0 
                        ? 0
                        : this.handPosition == 1 
                        ? -12
                        : 0
                    :this.handSize == 4 
                        ? this.handPosition == 0
                        ? 0
                        : this.handPosition == 1
                        ? -12
                        :this.handPosition == 2
                        ? -12
                        : 0
                    :this.handSize == 5
                        ?this.handPosition <= 2
                        ?this.handPosition <2
                        ?Number(this.handPosition)*-27
                        :this.handPosition*-20
                        : (Number(this.handPosition) - 4 )*27
                    //starts hand size of six
                    :this.handPosition <= 2
                        ? this.handPosition*-12
                        :(this.handPosition-5)*12
                }%) 
                rotate(${
                        this.handSize == 1
                            ?0 
                        :this.handSize == 2 
                            ? this.handPosition == 0 
                            ? -6
                            :6
                        :this.handSize == 3
                            ? this.handPosition == 0
                            ? -8
                            : this.handPosition == 1
                            ? 0
                            : 8
                        :this.handSize == 4 
                            ? this.handPosition == 0 
                            ? -8
                            :this.handPosition == 1 
                            ? -4
                            :this.handPosition == 2 
                            ? 4
                            : 8 
                        :this.handSize == 5
                            ?this.handPosition <= 2
                            ? (Number(this.handPosition)-2)*12
                            :this.handPosition >2 
                            ?(Number(this.handPosition)-2)*12
                            :0
                        :this.handPosition <= 2
                            ?(this.handPosition-5)*2
                            : this.handPosition*2
                        
                }deg)`
        }
    },
    methods : {
        setFileName() {
            if(this.cardName.split('')[1] === "D"){
                this.fileName= `Diamonds/${this.cardName}.png`
            }
            if(this.cardName.split('')[1] === "H"){
                this.fileName= `Hearts/${this.cardName}.png`
            }
            if(this.cardName.split('')[1] === "C"){
                this.fileName= `Clubs/${this.cardName}.png`
            }
            if(this.cardName.split('')[1] === "S"){
                this.fileName= `Spades/${this.cardName}.png`
            }
        },
        playCard() {
            if(this.handPosition || this.handPosition == 0){
                this.$emit('cardPlayed', this.handPosition)
            }
        }
    }
}

</script>

<style>
    .cardBack {
        height: 264px;
        width:186px;
        padding:10px;
        border-radius: 15px;
        background-color: white;
        box-shadow: 5px 5px 10px black;
        transition-duration: 00.5s;
    }
    .cardBack:hover {
       background-color: wheat;
    }
    #card {
        box-shadow: 0px 0px 10px rgba(0,0,0, 0.3);
    }
</style>