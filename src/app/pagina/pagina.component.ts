import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { templatemail } from '../model/templatemail';
import { EnviaEmailService } from './../service/envia-email.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {


  Templatemail = new templatemail();
  retornoCadastro: string = '';
  mensagemRetorno: string = '';

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private service: EnviaEmailService
  ) { }

  ngAfterViewInit() {
    const goTopButton = this.elRef.nativeElement.querySelector('#goTop');
    const headerHeight = this.elRef.nativeElement.querySelector('header').offsetHeight;

    this.renderer.listen('document', 'scroll', () => {
      if (window.scrollY > headerHeight) {
        this.renderer.setStyle(goTopButton, 'opacity', '1');
        this.renderer.setStyle(goTopButton, 'pointer-events', 'auto');
      } else {
        this.renderer.setStyle(goTopButton, 'opacity', '0');
        this.renderer.setStyle(goTopButton, 'pointer-events', 'none');
      }
    });

    // Adicionando o segundo bloco de código
    const btnAbrirMenu = document.getElementById('btn-menu') as HTMLElement;
    const btnFecharMenu = document.querySelector('.btn-fechar') as HTMLElement;
    const menuMobile = document.getElementById('menu-mobile') as HTMLElement;

    menuMobile.style.display = 'none';

    // Abrir menu mobile
    btnAbrirMenu.addEventListener('click', () => {
      menuMobile.style.display = 'block';
    });

    // Fechar menu mobile
    btnFecharMenu.addEventListener('click', () => {
      menuMobile.style.display = 'none';
    });

    // Adicionar evento de clique aos itens da lista no menu mobile
    const itemsMenuMobile = document.querySelectorAll('.menu-mobile nav ul li a');

    itemsMenuMobile.forEach((item: Element) => {
      item.addEventListener('click', () => {
        // Obter o destino do link (href) e suavizar a rolagem
        const hrefAttribute = item.getAttribute('href');
        if (hrefAttribute) {
          const targetId = hrefAttribute.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });

            // Fechar o menu após o clique em um item
            menuMobile.style.display = 'none';
          }
        }
      });
    });
  }



  onEnvioDeEmail() {
    if (!this.Templatemail.email || this.Templatemail.email.trim() === '') {

      this.retornoCadastro = 'error';
      this.mensagemRetorno = 'Preencha todos os campos.';
      return;
    }




    this.service.enviar(this.Templatemail).subscribe(
      (res: boolean) => {
        this.Templatemail = new templatemail();
        this.retornoCadastro = 'success';
        this.mensagemRetorno = 'Obrigado por entrar em contato, retornarei o mais rápido possível!';
        console.log(res);
      },
      (error) => {
        this.retornoCadastro = 'error';
        this.mensagemRetorno = 'Nosso servidor esta em manutenção , tente novamente mais';

        console.error(error);
      }
    );
  }

}
