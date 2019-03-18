# U-Balda Game

It's a simple pet project to learn more about React, React Native, and MobX. It's an attempt to implement a classic Russian word game ["Balda"](https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D0%B4%D0%B0_(%D0%B8%D0%B3%D1%80%D0%B0)).

The project is developed with the great [Expo](https://expo.io/) toolkit.

## How it looks like

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/113878/54531750-81557580-499f-11e9-86a4-cd9bc46d121d.png"/></td>
    <td><img src="https://user-images.githubusercontent.com/113878/54531751-81557580-499f-11e9-9f1b-2126e649d2c7.png"/></td>
    <td><img src="https://user-images.githubusercontent.com/113878/54531752-81557580-499f-11e9-9c34-a02f1b44eefa.png"/></td>
    <td><img src="https://user-images.githubusercontent.com/113878/54531753-81557580-499f-11e9-99e0-ee5ff7f7acba.png"/></td>
    <td><img src="https://user-images.githubusercontent.com/113878/54531754-81ee0c00-499f-11e9-9e50-dc710dc5868e.png"/></td>
  </tr>
</table>

## How to run it

Clone, install dependencies, run it. You need `node`, `yarn` or `npm` (whichever you prefer) on your development machine, and Expo app installed to your phone (to run it on a real device over the local network, and play with the code if you want).

You can read more about Expo [here](https://expo.io/learn), but basically after you installed prerequisites you can simply run:

```
$ yarn start
```

It will open a browser with development console and QR code. Just open camera, put QR in frame and it will ask you if you want to open it in Expo app.

## Vocabulary and references

I used Russian vocabulary (with usage frequency data) from this [page](http://dict.ruslang.ru/freq.php). During the implementation process I also found other resources, which you can find interesting:

- [dictionaries](http://www.speakrus.ru/dict/)
- RUS [Способы представления словарей для автоматической обработки текстов](https://habr.com/ru/post/190694/)
- RUS [Алгоритм быстрого поиска слов в игре балда](https://habr.com/ru/post/207734/)
- RUS [Алгоритм и тактика поиска слов в игре Балда](https://habr.com/ru/post/211618/)
