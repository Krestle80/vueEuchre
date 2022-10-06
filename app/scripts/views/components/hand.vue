<template>
    <div className="hand">
        <div v-for="card, index  in Player1Hand.cards">

            <Card
                :cardName="card"
                :hidden="hidden"
                :handPosition="index"
                :handSize = "player1Cards.length"
                @cardPlayed = "carryPlayedCard"
                />
            
        </div>
    </div>
</template>

<script>
    import Card from './card'
    export default {
        name: 'Hand',
        data() {
            return {
                Player1Hand: {cards :this.player1Cards},
                hidden: false
            }
        },
        props : {
            player1Cards: {type: Array, required: true},
            hideHandToggle: {type: Boolean}
        },
        emits: ["playedCard"],
        methods : {
            carryPlayedCard(position){
                this.$emit('playedCard', position)
            }

        },
        components: {
            Card
        }

    }
</script>

<style>
    .hand {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .handCard {
        transition-duration: 0.5s;
    }
</style>