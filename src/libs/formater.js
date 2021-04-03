
class Formater {

    /**
     * Format adding thousand separators to value
     */
    static formatWithThousandsSeparator = (valor) => {

        valor = Math.trunc(valor) // Remove decimal


        const valorString = valor.toString();
        var num = valorString.replace(/\./g, '');
        if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            console.log('son separador de mil', num);
            return num;
        }
    }

}

export default Formater;