import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from '../../services/login/login.service';
import { LoginData } from '../../interfaces/login/login.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  
})

export class LoginComponent{
  formLogin: FormGroup = new FormGroup({});
  data: any[] = [];
  onChecked: boolean = false;
  @ViewChild('username') username?: ElementRef;
  @ViewChild('password') password?: ElementRef;


  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService   
  ) { }
  

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      passw: ['', Validators.required],
      acceso: ['', Validators.required]
    });
  }


  
  funcLogin() {
      const logindata: LoginData={
      user:this.formLogin.value.user,        
      clave:this.formLogin.value.passw         
    }

    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      for (const key in this.formLogin.controls) {
        this.formLogin.controls[key].markAsDirty();
      }
      return;
    }
    
    this.loginService.funcRetornaUsuario(logindata.user, logindata.clave).subscribe(resp =>{
      const myObj = JSON.stringify(resp);
      const dataObj = JSON.parse(myObj);      
      for (let index = 0; index < dataObj.length; index++) {
        const element = dataObj[index];        
      }            
      
      if (dataObj.status == 200) {
        if (this.onChecked == false) {
          localStorage.setItem('user',dataObj.result.user); 
          localStorage.setItem('token',dataObj.toke);            
          this.router.navigate(['/menu']);
        } else {
          localStorage.setItem('user',dataObj.result.user); 
          localStorage.setItem('token',dataObj.toke);            
          this.router.navigate(['/movimientos']);
        }       
      }  
      this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Credenciales incorrectas' });
      return;      
    })
    
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {      
      this.password?.nativeElement.focus();
    }
  }

  onCheckboxChange(event: any) { 
    if (event.checked == true) {
      this.onChecked = true;
    } else {
      this.onChecked = false;      
    } 
  }

}
