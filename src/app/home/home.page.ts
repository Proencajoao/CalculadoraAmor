import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome1 = '';
  nome2 = '';
  url = "http://lucasreno.kinghost.net/love-calculator/";
  resultado = 0;
  mensagem = '';
  calculando = false;
  //imagem = false

  constructor(public http: HttpClient) { }

  async enviarDados() {
    let soma = 0;
    //this.imagem = false
    while (soma != 10) {
      this.resultado = Math.floor(Math.random() * 100 + 1);
      this.calculando = true;
      soma += 1;
      await this.delay(75);
    }
    this.calculando = false;

    if(this.nome1 == "" || this.nome2 == ""){
      this.mensagem = "Não tenho bola de cristal, por favor informe os nomes";
      this.resultado = 0;
    }

    this.http.get<any>(this.url + this.nome1 + "/" + this.nome2).subscribe(
      (resposta: any) => {
        this.resultado = resposta;
        if (this.resultado <= 20) this.mensagem = "Você possui chances, mas não com essa pessoa!";
        else if (this.resultado <= 40) this.mensagem = "Para de se iludir, sua carreira é solo!";
        else if (this.resultado <= 60) this.mensagem = "As chances são médias, não desista!";
        else if (this.resultado <= 80) this.mensagem = "Só chegar na cremosa(o), as chances são enormes1";
        else this.mensagem = "Ele(a) está tão na sua!";
        // else this.imagem = true;
      }
    );
  }

  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
