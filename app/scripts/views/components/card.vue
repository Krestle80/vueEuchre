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
             offset : 50
             }
    },
    props: {
            fileName: {type: String, required: true},
            hidden: {type: Boolean, required: true},
            handPosition : {type: Number, required: false},
            handSize : {type: Number}
    },
    computed: {
        src() {
            return `../../../cards/${this.hidden ? "back.png": this.fileName}`
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