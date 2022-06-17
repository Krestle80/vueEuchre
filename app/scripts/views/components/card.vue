<template>
    <div class= "cardBack" :style="tiltStyle">
        <img id="card" :src="src" />
    </div>
</template>

<script>

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
    computed: {
        src() {
            this.setFileName()
            return `../../../scripts/assets/cards/${this.hidden ? "back.png": this.fileName}`
        },
        tiltStyle() {
            return `transform: translate(0,${
                this.handPosition <= 2
                ?this.handPosition <2
                ?Number(this.handPosition)*-63
                :this.handPosition*-49
                : (Number(this.handPosition) - 4 )*63}px) 
                rotate(${this.handPosition <= 2? (Number(this.handPosition)-2)*10: (Number(this.handPosition)-2)*10}deg) 
                `
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
    }
    .cardBack:hover {
       background-color: wheat;
    }
    #card {
        box-shadow: 0px 0px 10px rgba(0,0,0, 0.3);
    }
</style>