import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  juegos: any[] = [
    {
      id: 1,
      name: "The Simpsons",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 2,
      name: "Double Dragon",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!",
      imageUrl: "../assets/images/boardgames/zc.jpg",
      noPlayers: "1 a 6",
      recomendedPlayers: "4",
      timePerGame: "40 mins aprox",
      tutorial: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa modi porro, dolores blanditiis quibusdam sint!"
    },
    {
      id: 3,
      name: "Gund and shit",
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

  getGames(): any{
    return this.juegos;
  }

  getProduct(id: any): any{
    return this.juegos.filter(x => x.id == id);
  }

  constructor() { }
}
