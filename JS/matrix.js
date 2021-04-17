/// <reference path="../typings/globals/jquery/index.d.ts" />
var rows, cols, matrices, mat1, mat2, selectedOption;
var arr1 = [];
var arr2 = [];

//Check Rows and Columns
function rowcolscheck(){
    if(RowsCheck() && ColsCheck()){
        OkButton();
    }
}

function setMatrices(){
    if(matrices == 1){
            document.getElementById('1mat').innerHTML = '<h3>MATRIX</h3>';
            for(var i = 1; i<=rows; i++){
                document.getElementById('1mat').innerHTML += '<input id="row_'+i+ '"type="number"class="form-control-sm">' ;
                for(var j = 1; j<cols; j++){
                    document.getElementById('1mat').innerHTML += '<input id="col_'+i+j+'" type="number"class="form-control-sm">';
                }
                document.getElementById('1mat').innerHTML += '<br/>' ;
                
            }
            document.getElementById('1mat').innerHTML += '<br/>';
            selectedOption = $('#100').val();
            if(selectedOption == 'add' || selectedOption == 'multiply' || selectedOption == 'subtract'){
                document.getElementById('1mat').innerHTML += 'Enter a scalar number to add/multiply/subtract '
                 + '<input id="scalar" type="number"class="form-control-sm">';
                 document.getElementById('1mat').innerHTML += '<br/>';
                 
            }
            document.getElementById('1mat').innerHTML += '<span class="btn btn-success" onclick="matOps()">Calculate</span>';
    }
    else if(matrices == 2){
        document.getElementById('1mat').innerHTML = '<h3>MATRIX 1</h3>';
        for(var i = 1; i<=rows; i++){
            document.getElementById('1mat').innerHTML += '<input id="row_'+i+ '" type="number"class="form-control-sm">' ;
            for(var j = 1; j<cols; j++){
                document.getElementById('1mat').innerHTML += '<input id="col_'+i+j+'" type="number"class="form-control-sm">';
            }
            document.getElementById('1mat').innerHTML += '<br/>' ;
        }
        document.getElementById('1mat').innerHTML += '<h3>MATRIX 2</h3>';
        for(var i = 1; i<=rows; i++){
            document.getElementById('1mat').innerHTML += '<input id="row_'+(i*10)+ '"  type="number"class="form-control-sm">' ;
            for(var j = 1; j<cols; j++){
                document.getElementById('1mat').innerHTML += '<input id="col_'+i+(j*10)+ '" type="number"class="form-control-sm">';
            }
            document.getElementById('1mat').innerHTML += '<br/>' ;
        }
        document.getElementById('1mat').innerHTML += '<br/>' ;
        document.getElementById('1mat').innerHTML += '<span class="btn btn-success" onclick="matOps()">Calculate</span>';

    }
}
function OkButton() {
        $('#1mat').html('<span class="btn btn-success" onclick="setMatrices()">Set Matrices</span>');
}
function RowsCheck(){
    rows = $('#row').val();
    if (rows < 2 || rows > 5) {
        $('#rowLabel').html("rows cannot be greater than 5 or less than 2");
        $('#rowLabel').addClass('error');
        $('#row').addClass('invalid');
        return false;
    }
    else {
        $('#rowLabel').html("");
        $('#row').removeClass('invalid');
        return true;
    }
}
function ColsCheck(){
    cols = $('#col').val();
    if (cols < 2 || cols > 5) {
        $('#colLabel').html("columns cannot be greater than 5 or less than 2");
        $('#colLabel').addClass('error');
        $('#col').addClass('invalid');
        return false;
    }
    else {
        $('#colLabel').html("");
        $('#col').removeClass('invalid');
        return true;
    }
}
function numberOfMatrices(){
    matrices = $('#num').val();
    if(matrices > 2){
        $('#matLabel').html("Number of Matrices should not be greater than 2");
        $('#matLabel').addClass('error');
        $('#num').addClass('invalid');
        $('#numOfRows').html('');
        $('#numOfCols').html('');
    }
    else {
        
        $('#num').removeClass('invalid');
        $('#matLabel').html("");

        $('#numOfRows').html('Number Of Rows (2-5) :' + '<input id="row" oninput="RowsCheck()" class="form-control" type="number" min="2" max="5">'
         + '<label id="rowLabel" for="row"></label>');

        $('#numOfCols').html('Number Of Columns (2-5) :' + '<input id="col" oninput="ColsCheck()" onfocusout="rowcolscheck()" class="form-control" type="number" min="2" max="5">'
         + '<label id="colLabel" for="col"></label>');
         if(matrices == 2){
                $('.01').addClass('hidden');
            }
        
    }
}
//Matrix Operations
function matOps(){
    if(matrices == 1){
        for(var i = 1; i<=rows; i++){
            arr1.push($('#row_'+i).val());
            for(var j = 1; j<cols; j++){
                arr1.push($('#col_'+i+j).val())
            }
        }
    
        console.log(arr1);
        var tempMat = math.matrix(arr1);
        mat1 = math.reshape(tempMat, [rows, cols]);
        console.log(mat1);
        selectedOption = $('#100').val();
        //select box options
        if(selectedOption == 'transpose'){
            var transpose = math.transpose(mat1._data)
            var transMatrix = math.matrix(transpose);
            document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + transMatrix;
        }
        else if(selectedOption == 'determinant'){
            deter(mat1);
        }
        else if(selectedOption == 'inverse'){
            inverse(mat1);
        }
        else if(selectedOption == 'add'){
            addScalar(mat1);
        }
        else if(selectedOption == 'multiply'){
            multiplyScalar(mat1);
        }
        else if(selectedOption == 'subtract'){
            subtractScalar(mat1);
        }
    }
    else if(matrices == 2){
        //1st array
        for(var i = 1; i<=rows; i++){
            arr1.push($('#row_'+i).val());
            for(var j = 1; j<cols; j++){
                arr1.push($('#col_'+i+j).val())
            }
        }
        //2nd array
        for(var i = 1; i<=rows; i++){
            arr2.push($('#row_'+(i*10)).val());
            for(var j = 1; j<cols; j++){
                arr2.push($('#col_'+i+(j*10)).val())
            }
        }
        console.log(arr1);
        console.log(arr2);
        var tempMat1 = math.matrix(arr1);
        var tempMat2 = math.matrix(arr2);
        mat1 = math.reshape(tempMat1, [rows, cols]);
        mat2 = math.reshape(tempMat2, [rows, cols]);
        selectedOption = $('#100').val();
        if(selectedOption == 'add'){
            addMatrix(mat1, mat2);

        }
        if(selectedOption == 'subtract'){
            subtractMatrix(mat1, mat2);
        }
        if(selectedOption == 'multiply'){
            multiplyMatrix(mat1, mat2);
        }
    }
}
function deter(matrix){
    if(rows != cols){
        document.getElementById('Result').innerHTML = '<label class="error">Suqare Matrix is necessary for Determinant';
    }
    else {
        var determinant = math.det(matrix._data);
        console.log(matrix);
        console.log(determinant);
        document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + determinant;
    }
}
function inverse(matrix){
    if(rows != cols){
        document.getElementById('Result').innerHTML = '<label class="error">Suqare Matrix is necessary for Inverse';
    }
    else {
        var inv = math.inv(matrix._data);
        var invMatrix = math.matrix(inv);
        document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + invMatrix;
    }
}
function addScalar(matrix){
    var scalarAddition = math.matrix(math.add(matrix._data, parseInt($('#scalar').val())));
    document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + scalarAddition;
}
function multiplyScalar(matrix){
    var scalarMultiplication = math.matrix(math.multiply(matrix._data, parseInt($('#scalar').val())));
    document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + scalarMultiplication;
}
function subtractScalar(matrix){
    var scalarSubtraction = math.matrix(math.subtract(matrix._data, parseInt($('#scalar').val())));
    document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + scalarSubtraction;
}
function addMatrix(matrix1, matrix2){
    var matrixAddition = math.matrix(math.add(matrix1._data, matrix2._data ));
    document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + matrixAddition;
}
function multiplyMatrix(matrix1, matrix2){
    var matrixMultiplication = math.matrix(math.multiply(matrix1._data, matrix2._data ));
    document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + matrixMultiplication;
}
function subtractMatrix(matrix1, matrix2){
    var matrixSubtraction = math.matrix(math.subtract(matrix1._data, matrix2._data ));
    document.getElementById('Result').innerHTML = '<h4>Result is : </h4> ' + matrixSubtraction;
}