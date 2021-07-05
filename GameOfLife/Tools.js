class Tools {
    static create2DArray(row, col) {
        let array = new Array(row);
        for (let i = 0; i < row; i++) {
            array[i] = new Array(col);
        }
        
        return array;
    }
}