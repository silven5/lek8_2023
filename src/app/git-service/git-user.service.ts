import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class GitUserService {
  data: any = [];
  name: string[] = [];
  //об'єкт для очікування
  loading: any;
  //Функція для отримання даних з GitHub
  //Вхід нікнейм користувача
  //вихід перетворений у JSON результат запиту
  async getUsersRepsFromAPI(username: any) {
    //створюємо новий контролер

    // Present the loading controller
    // if (typeof username === 'string') {
    const url = `https://api.github.com/users/${username}/repos`;
    console.log("User=" + username);
    fetch(url).then(res => res.json())
      .then(json => {
        this.data = json;
        this.name = [];
        this.getName();
      });
    // }

  }
  getName() {
    for (let i = 0; i < this.data.length; i++) {
      this.name.push(this.data[i]["name"]);

    }
    return this.name;
  }
  constructor() { }
}
