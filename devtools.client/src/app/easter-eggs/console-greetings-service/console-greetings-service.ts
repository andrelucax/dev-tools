import { Injectable } from '@angular/core';
import { Constants } from '../../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class ConsoleGreetingsService {

  init() {
    console.log(
       "%c  ____             _____           _      \n" +
       " |  _ \\  _____   _|_   _|__   ___ | |___  \n" +
       " | | | |/ _ \\ \\ / / | |/ _ \\ / _ \\| / __| \n" +
       " | |_| |  __/\\ V /  | | (_) | (_) | \\__ \\ \n" +
       " |____/ \\___| \\_/   |_|\\___/ \\___/|_|___/ \n" +
       "                                          \n",
       "background:#111;color:#0f0;font-size:14px;font-weight:bold;"
    );

    console.log(`Hello there! If you are interested in the code you can check it out on ${Constants.AppGit}`);
  }
}
