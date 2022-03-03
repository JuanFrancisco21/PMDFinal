import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from 'src/app/Model/work';
import { AuthService } from 'src/app/Services/auth.service';
import { LocalstorageService } from 'src/app/Services/localstorage.service';

@Component({
  selector: 'app-listworker',
  templateUrl: './listworker.page.html',
  styleUrls: ['./listworker.page.scss'],
})
export class ListworkerPage implements OnInit {
  public datacoming:any;
  public work:Work;

  constructor(private router:Router,
    private route:ActivatedRoute) {
      this.datacoming=this.route.snapshot.params['data'];
      if (this.datacoming) {
        try {
          this.work=JSON.parse(this.datacoming);
        } catch (err) {
          console.log(err);
        }
      }
  }


  ngOnInit() {
    console.log(this.work);
  }
  
  /**
   * Método para cambiar de vista a la principal
   */
   goBack() {
    this.router.navigate(['/main/tabs/tab1'])
  }

}
