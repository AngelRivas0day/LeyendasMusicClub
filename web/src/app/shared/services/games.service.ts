import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  juegos: any[] = [
    {
      id: 1,
      name: "Zombiecide",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 2,
      name: "Mech and Minions",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 3,
      name: "HATE",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 4,
      name: "FURY",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 5,
      name: "Dark Souls",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 6,
      name: "DOOM",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 7,
      name: "Attack on Titan",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    }
  ];

  baseUrl = environment.baseUrl;

  public setHeadersWithNoToken(){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'Content-Type':'application/json; charset=utf-8',
    });
  }

  constructor(
    private http: HttpClient
  ) { }

  getGames(): any{
    const headers = this.setHeadersWithNoToken();
    return this.http.get(this.baseUrl+"/games/list", {headers}).pipe(
      retry(3)
    )
  }
  
  getGamePerCat(){
    return this.http.get(`${this.baseUrl}/games/listPerCategory/`).pipe(
      retry(3)
    )
  }

  getGame(id: any): any{
    return this.http.get(`${this.baseUrl}/games/list/${id}`).pipe(
      retry(3)
    );
  }

}
