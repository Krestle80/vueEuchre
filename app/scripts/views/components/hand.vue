<template>
    <div className="hand">
        <div v-for="card, index  in Player1Hand.cards">

            <Card
                :fileName="card"
                :hidden="hidden"
                :handPosition="index"
                :handSize = "Player1Hand.length"
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
            player1Cards: {type: Array, required: true}
        },
        get() {

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
</style>