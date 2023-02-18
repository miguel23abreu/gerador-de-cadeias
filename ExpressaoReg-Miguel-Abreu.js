function Cadeia(expr){
    let len = expr.length; //tamanho da expressão
    let exprA = new Array(); //Vetor da qual conterá toda a expressão armazenada de modo que funcione gere as cadeias finais
    let exprV = new Array(); //Vetor da qual armazenará os elementos que podem ser "vazios" ou repetidas infinitas vezes
    let exprP = new Array(); //Vetor da qual armazena os elementos dentro de "()"
    let exprM = new Array(); //Vetor da qual armazenará os elementos que devem ser apresentados ao menos uma vez ou repetidas infinitas vezes
    let contV = 0; //contador da qual indicará o indice correto dentro do vetor exprV
    let contM = 0; //contador da qual indicará o indice correto dentro do vetor exprM
    let ind = 0; //indice de exprA
    let i = len-1; //indice da qual percorrerá a expressão
    while(i >= 0){ //aqui será percorrido a expressão mostrada
        if(expr[i] == '*'){ //aqui será verificado se no indice i tem o valor de '*'
            if(expr[i-1] != ')'){ //verificando se o valor do proximo indice é um conjunto de caracteres
                exprV[contV++] = expr[i-1]; //armazenando o caractere no vetor exprV
                exprA[ind++] = expr[i]; //armazenando o caractere '*' 
                i-=2; //pulando para o proximo indice
            }
            else{
                let p = i-2; //criando uma variavel p que vai pecorrer todos os caracteres que estiverem dentro de ( )
                let c = 0; //indice do vetor exprP
                while(expr[p] != '('){
                    exprP[c] = expr[p];
                    c++;
                    p--; 
                }
                exprV[contV++] = exprP.reverse().join(''); //aqui ocorre a integração do conjunto de caracteres em exprV, revertindo a posição dos elementos e tirando a ,
                exprA[ind++] = expr[i]; 
                i -= c+3; //pulando para o proximo indice
            }
        }
        else if(expr[i] == '+' && expr[i-1] =='^'){ //verificando se o indice i e o i-1 são ^+, a partir daqui ocorre um processo de armazenamento parecido com a diferença de que exprA vai capturar ^
            if(expr[i-2] != ')'){
                exprM[contM++] = expr[i-2];
                exprA[ind++] = expr[i-1];
                i -= 3;
            }
            else{
                let p = i-3;
                let c = 0;
                while(expr[p] != '('){
                    exprP[c] = expr[p];
                    c++;
                    p--;
                }
                exprM[contM++] = exprP.reverse().join('');
                exprA[ind++] = expr[i-1];
                i -= c+4;
            }
        }
        else if(expr[i] == ')'){ //verificando se não há ( ) desnecessários na expressão
            if(i == 0){
                break;
            }
            else{
                i--;
            }
        }
        else if(expr[i] == '('){
            if(i == 0){
                break;
            }
            else{
                i--;
            }
        }
        else{ //armazenado caracteres que serão reproduzidos apenas 1 vez
            exprA[ind++] = expr[i];
            i--;
        } 
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////    
    contV = 0;
    contM = 1;
    exprA.reverse().join('');
    exprV.reverse().join('');
    exprM.reverse().join('');
    let exprT = new Array(); //este será o vetor da qual armazenará a cadeia e ira imprimi-la 
    let iv = 0; //indice da qual percorre o vetor exprV
    let im = 0; //indice da qual percorre o vetor exprM
    let c = 0; //indice de exprT
    i = 0; //indice da qual vai percorrer o vetor exprA
    var al = 0; //variavel usada para casos de concatenação na expressão
    console.log("abaixo esta as expressões com *:")
    console.log(exprV);
    console.log("abaixo está as expressão com ^+:")
    console.log(exprM);
    console.log("abaixo está a expressão fornecida:")
    console.log(expr);
    console.log("abaixo está a expressão que será usada para a impressão das cadeias:")
    console.log(exprA);
    console.log("abaixo está as impressões:")
    for(var a = 0; a <= 3; a++){ //aqui serão impridos 4 cadeias geradas pelo vetor exprT
        while(i < exprA.length){
            if(exprA[i+1] == '+'){
                if(al % 2 == 0){
                    exprT[c] = exprA[i];
                }
                else{
                    exprT[c] = exprA[i+2];
                }
                i += 3;
                c++
            }
            if(exprA[i] == '*'){
                if(contV > 0){
                    for(var b = c; b < c+contV; b++){
                        exprT[b] = exprV[iv];
                    }   
                }
                iv++;
                i++;
                c += contV;
            }
            else if(exprA[i] == '^'){
                for(var b = c; b < c+contM; b++){
                    exprT[b] = exprM[im];
                }
                im++;
                i++;
                c += contM;
            }
            else{
                exprT[c++] = exprA[i];
                i++;
            }
        }
        al++;
        contV++;
        contM++;
        i = 0;
        c = 0;
        iv = 0;
        im = 0;
        console.log(exprT.join(''));
    }
}

Cadeia('11+0(0110)^+(10)*1*1'); //função sendo ativada

