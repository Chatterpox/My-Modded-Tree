addLayer("p", {
    name: "Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0b369c",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of prestige currency
    baseResource: "Cosmic Potential", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Matter.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
    upgrades: {
        11: {
            title: "Small Bang",
            description: "Double your Cosmic Potential gain.",
            cost: new Decimal(0),
        },
        12: {
            title: "Stardust",
            description: "Increases Cosmic Potential gain based on Matter.",
            cost: new Decimal(0),
            effect(){
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Particles",
            description: "Matter gain is boosted by Cosmic Potential.",
            cost: new Decimal(0),
            effect(){
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        0: {
            requirementDescription: "20 Matter",
            effectDescription: "Increase Cosmic Potential gain by 1.5, unlock 3 new Matter upgrades.",
            done() { return player.p.points >= (20) }
        },
    },
})

