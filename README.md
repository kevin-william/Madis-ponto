# Madis Preenchedor de ponto via api request

Projeto para preencher ponto de trabalho via api

## Installation

O Site pra lançar as horas é meio burocrático quando vc quer inserir mais de uma semana de uma vez. Eu tentei fazer um script pra preencher os campos das horas, mas teria que passar de semana por semana. Fiz de uma forma que dá pra lançar tudo de uma vez. Você precisará do Postman. Além disso, precisa instalar o plugin de captura de cookies.

[breve tutorial de como instalar cookie interceptor](https://learning.postman.com/docs/sending-requests/capturing-request-data/interceptor/)

[extensão para o chrome](https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo/related?hl=en)


## Usage

abra o mdcomune e Faça login. Deixe a página aberta. feito isso vc precisa rodar o script e pegar o response dele e passar como parametro do body da requisição.é preciso informar apenasID do usuario (o ID do seu usuario aparece na URL da página do mdcomune)a data de início a data finaluma lista com datas para ignoraro script já remove sabados e domingos. é necessário informar apenas feriados e/ou dias não trabalhados. No exemplo abaixo eu passo 123 como id, 1º de outubro como inicio (é outubro pq o mês nesse formato começa em 0) e termina dia 28 do mesmo mês e adiciono um dia para remover. 

```javascript
var madis = new Madis();
console.log(madis.getRequestBody(123,new Date(2020,9,1,0,0,0,0), 
   new Date(2020,9,28,0,0,0,0),[new Date(2020,9,12,0,0,0,0)]));
```



## License
[MIT](https://choosealicense.com/licenses/mit/)