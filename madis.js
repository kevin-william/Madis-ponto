const meses = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

class Madis {

    getRequestBody(idPessoa: number, DataInicio: Date, DataFim: Date, datasParaIgnorar: Array<Date> = []) {
        var quantidadeDias = this.calculaIntervaloDias(DataInicio, DataFim);
        return {
            "IdPessoa": idPessoa,
            "DataInicio": this.getApontamentoDateFull(DataInicio),
            "DataFim": this.getApontamentoDateFull(DataFim),
            "DiaApontamento": this.getDiaApontamento(DataInicio, DataFim, datasParaIgnorar),
            "Vinculacoes":[] ,
            "Desvinculacoes":[] ,
            "De":"" ,
            "Ate":"" ,
            "DeHoras":"" ,
            "AteHoras":"" ,
            "IdObra":"0" ,
            "DesvinculaObraIntervalo": "false" ,
            "IsFolga": this.getIsFolga(quantidadeDias) ,
            "EscalasHorario": this.getEscalasHorario(quantidadeDias) ,
        }
    }

    private getDiaApontamento(dataInicio: Date, dataFim: Date, datasParaIgnorar: Array<Date>): 
        Array<{IdDiaApontamento:number,
            ApontamentoDate: string,
            ApontamentoDateFull: string,
            TipoMarcacao:string,
            Apontamento: Array<{
                idApontamento: number;
                hora: string;
                justificativa: string;
                Indevido: boolean;
                position: number;
        }>}> {
            
        var dataIndex = dataInicio;
        var index = 0;
        var DiaApontamento = [];
        while(dataIndex <= dataFim){
            var isDiaValido = true
            if ((datasParaIgnorar.filter(e => e.valueOf() === dataIndex.valueOf()).length > 0) || dataIndex.getDay() == 0 || dataIndex.getDay() == 6 ) {
                isDiaValido = false;
            }
            DiaApontamento.push(this.baseApontamento(dataIndex, isDiaValido, index));            
            dataIndex.setDate(dataIndex.getDate()+1);
            console.log(dataIndex);
            index++;
        }   
        return DiaApontamento;
    }    

    private getIsFolga(quantidade: number) {
        var IsFolga = [];
        for(var i =0;i<quantidade; i++ ){
            IsFolga.push("false");
        }
        return IsFolga;
    }

    private getEscalasHorario(quantidade: number) {
        var EscalasHorario = [];
        for(var i =0;i<quantidade; i++ ){
            EscalasHorario.push({IdEscalaHorario: "0", IdHorario: "0"});
        }
        return EscalasHorario;
    }

    private apontamentoDiaTrabalho(){
        var dezenaMinutoChegada = this.getRandomNumber(17);
        var dezenaMinutoChegadaAsString = (dezenaMinutoChegada < 10) ? "0"+dezenaMinutoChegada : dezenaMinutoChegada.toString();
        var dezenaMinutoSaida = dezenaMinutoChegada+this.getRandomNumber(4);
        var dezenaMinutoSaidaAsString = (dezenaMinutoSaida < 10) ? "0"+dezenaMinutoSaida : dezenaMinutoSaida.toString();
        var dezenaMinutoAlmoco = this.getRandomNumber(34);
        var dezenaMinutoAlmocoAsString = (dezenaMinutoAlmoco < 10) ? "0"+dezenaMinutoAlmoco : dezenaMinutoAlmoco.toString();
        return [{"idApontamento":0,"hora":"09:"+dezenaMinutoChegadaAsString,"justificativa":"Esqueceu de marcar","Indevido":false,"position":0},
        {"idApontamento":0,"hora":"12:"+dezenaMinutoAlmocoAsString,"justificativa":"Esqueceu de marcar","Indevido":false,"position":1},{"idApontamento":0,
        "hora":"13:"+dezenaMinutoAlmocoAsString,"justificativa":"Esqueceu de marcar","Indevido":false,"position":2},{"idApontamento":0,"hora":"18:"+dezenaMinutoSaidaAsString,
        "justificativa":"Esqueceu de marcar","Indevido":false,"position":3}];
    }

    private baseApontamento(data: Date, isDiaValido: boolean, IdDiaApontamento: number){

        var arrayApontamento = (isDiaValido) ? this.apontamentoDiaTrabalho() : [];
        return {
			"IdDiaApontamento": IdDiaApontamento,
			"ApontamentoDate": this.getApontamentoDate(data),
			"ApontamentoDateFull": this.getApontamentoDateFull(data),
			"TipoMarcacao":"E",
            "Apontamento": arrayApontamento};
    }

    private getApontamentoDate(data: Date){
        var dia = (data.getUTCDate() < 10) ? "0"+data.getUTCDate() : data.getUTCDate();       
        return dia+"/"+meses[data.getUTCMonth()];
    }

    private getApontamentoDateFull(data: Date){
        var dia = data.getDate();
        var mes = data.getMonth()+1;
        var ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    private calculaIntervaloDias(DataInicio: Date, DataFim: Date){
        var diff = Math.abs(DataFim.getTime() - DataInicio.getTime());
        return Math.ceil(diff / (1000 * 60 * 60 * 24))+1;
    }

    private getRandomNumber(quantidade: number, index: number = 0){        
        return Math.floor(Math.random() * (quantidade+1)) + index;
    }    

}

enum MesesEnum{
	JAN =0 ,
	FEV,
	MAR,
	ABR,
	MAI,
	JUN,
	JUL,
	AGO,
	SET,
	OUT,
	NOV,
	DEZ,
}

var madis = new Madis();

console.log(madis.getRequestBody(84,new Date(2020,10,25,0,0,0,0), new Date(2020,11,1,0,0,0,0),[]));
