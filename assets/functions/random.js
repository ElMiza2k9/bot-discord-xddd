module.exports = {
    /**
     * 
     * @param {Number} min Mínimo valor que puede tomar
     * @param {Number} max Máximo valor que puede tomar
     * @returns Número aleatorio entre los 2 números anteriores.
     */
    select: function randomSelect(min, max) { return Math.floor(Math.random() * (max - min) + min) },

    /**
     * 
     * @param {Number} segundos Tiempo en segundos
     * @returns Retraso de x segundos entre una acción y otra
     * @example await delay(15)
     */
    delay: function delay(segundos) { return new Promise(resolve => { setTimeout(() => { resolve(2) }, segundos * 1000); }) }
}