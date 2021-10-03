import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { checkName } from '../validation';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})


export class HeroDetailComponent implements OnInit {
  
  @Input() hero?: Hero;
 
  checkMessage = '';
 
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  // ngAfterViewInit(): void {
  //   this.checkMessage = checkName(this.hero)
  //   console.log(this.checkMessage);
  // }
  
  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  
  goBack():void {
    this.location.back();
  }
  
  save():void {
    if (this.hero) {
      
      this.checkMessage = checkName(this.hero.name);
      
      if (!this.checkMessage)
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
