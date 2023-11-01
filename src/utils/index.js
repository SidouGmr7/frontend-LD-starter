export function calculatePower(pokemon) {
    const attributes = ['hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed']

    const totalPower = attributes.reduce((total, attribute) => {
        if (attribute in pokemon) {
            return total + pokemon[attribute]
        }
        return total
    }, 0)

    return totalPower
}
