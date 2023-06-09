![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709394-2cabee80-571f-11eb-9518-ea6a794e558e.png)


# Modele i schematy

Modele i schematy to twory, które umożliwiają zróżnicowane, kontrolowane interakcje z bazą danych, wraz z możliwością wykonywania 
walidacji i skomplikowanych zapytań.

Schematy pozwalają na zdefiniowanie sposobów walidacji oraz interakcji z dokumentami.
Modele to instancje schematów, powiązane z konkretnymi kolekcjami.

**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` aby przygotować biblioteki przed rozpoczęciem pracy!**

## Baza danych użytkowników - schemat użytkownika

Czas porównać operacje pomiędzy MongoDB i Mongoose. Twoim zadaniem jest przygotować kod, który stworzy dwa schematy walidacji -
schemat `Joi` oraz schemat `Mongoose`:

- raz dla MongoDB i Joi w pliku `mongo.js`, uruchamianym skryptem `npm run start-mongo`
- raz dla Mongoose w pliku `mongoose.js`, uruchamianym skryptem `npm run start-mongoose`

Użyj poniższego kształtu obiektu w schematach:

```typescript
import { ObjectID } from 'mongoose';

interface User {
  _id: ObjectID; // This will be autogenerated - you can skip it
  firstName: string;
  lastName: string;
  loginCount: number;
  registerDate: Date;
  commentsAmount: number;
}
```

W obu przypadkach przeprowadź następujące operacje:

1. Przygotuj schemat walidacji według wyższego zarysu obiektu (wszystkie pola poza `_id` są wymagane!)
2. Przekaż schemat do odpowiedniej funkcji `runAssertionsX`, która przetestuje jego działanie


# Wymagalność pól

Opcja `required` Pozwala opisywać warunki wymagalności pól za pomocą zmiennej boolowskiej bądź funkcji.

**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` aby przygotować biblioteki przed rozpoczęciem pracy!**

**Zadanie uruchomisz skryptem `npm start`. Kod zadania znajduje się w pliku `task.js`.**

## Serwer aktualizacji

Aktualizujesz kod aplikacji serwera aktualizacji, który ma za zadanie sprawdzić wersję aplikacji u klientów, a w razie
potrzeby - wysłać informację o nowej wersji. 

Zauważasz, iż w danych w bazie występuje nieścisłość - flaga `shouldUpdate` występuje bez informacji o wersji aplikacji,
wobec czego serwer nie wie, jaka wersja powinna być zainstalowana. Dodatkowo data `lastChecked` powinna być aktualizowana
zawsze wtedy, kiedy pole `shouldUpdate` jest modyfikowane (dla uproszczenia - przyjmujemy, że powinna ona występować,
gdy pole to jest równe `true`).

Dodaj w pliku schemat Mongoose, który ma następujący kształt:

```typescript
interface App {
  version: string;
  shouldUpdate: boolean;
  size: number;
  installationLocation: string;
  lastChecked: Date;
}
```

Następnie dodaj walidatory w postaci funkcji. Pola `version` oraz `lastChecked` powinny być zdefiniowane, kiedy
flaga `shouldUpdate` równa jest `true`

**PODPOWIEDŹ**

*Kontekst `this` metody przekazanej w opcji `required` wskazuje na cały dokument, zaś argument w niej przekazany to aktualna wartość pola.
Pamiętaj, że opcja `required` musi zwrócić wartość boolowską.*



# Wartości domyślne

Opcja wartości domyślnych - `default` - pozwala na stworzenie domyślnej wartości danego pola, jeśli jego
wartość nie została ustawiona.

**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` aby przygotować biblioteki przed rozpoczęciem pracy!**

**Zadanie uruchomisz skryptem `npm start`. Kod zadania znajduje się w pliku `task.js`.**

## Dane giełdowe - agregator

Budujesz aplikację, będącą agregatorem danych z różnych giełd. Dane spływają poprzez specjalny interfejs API 
i często brakuje w nich wartości, jeśli mogą one zostać pominięte.

Chcesz zachować spójność w bazie danych, wobec czego chcesz dla takich pól ustawić domyślne wartości, znając 
przypadki, w których zewnętrzne API pomijają te dane.

Każdy dokument reprezentowany powinien być następującym kształtem:

```typescript
interface Transaction {
  code: string;
  currentVal: number;
  amount: number;
  transactionDate: Date;
  boughtBy: number;
}
```

Stwórz schemat, w którym:

- wszystkie pola, poza `amount` i `transactionDate` będą wymagane
- pole `amount`, w przypadku braku danych będzie ustawiane na `10` - pomijaną w oryginalnej odpowiedzi wartość (użyj prostej wartości w opcji)
- pole `transactionDate` ustawione na moment stworzenia obiektu, który będzie walidowany (czyli np. momentu
walidacji), używając `new Date().getTime()` - użyj funkcji


# Walidacja i funkcje

Mongoose pozwala na tworzenie zaawansowanych (a nawet - asynchronicznie wywoływanych) walidacji dla 
pól schematu. Funkcjonalność ta tworzy niemal nieograniczone możliwości walidacji.

**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` aby przygotować biblioteki przed rozpoczęciem pracy!**

**Zadanie uruchomisz skryptem `npm start`. Kod zadania znajduje się w pliku `task.js`.**

## Baza gier

Tworzysz repozytorium gier, które pozwala na zapis i przeglądanie gier, a także publikowanie statystyk graczy - używane 
jest ono przez graczy do zarówno recenzowania ich, jak i szukania nowości.

Aby jednak API było niezawodne i solidne, chcesz stworzyć schemat, który zagwarantuje, 
iż wszystkie dane podczas wstawiania do bazy będą zawierać niezbędne pola. 

Przygotuj schemat o następującym kształcie:

```typescript
interface Game {
  title: string;
  publisher: string;
  releaseDate: Date;
  meanRating: number;
  tags: string[];
  retailPrice: number;
  comments: string[];
}
```

Następnie, po przygotowaniu typów pól dodaj walidacje:

- pola `title`, `publisher`, `releaseDate` powinny być zawsze wymagane i używać domyślnych walidatorów
- pola `tags` i `comments` powinny mieć co najmniej jeden element
- pole `tags` powinno zawierać jedynie wartości z listy:
    - `action`, `rpg`, `mmo`, `fps` (inne pomijamy dla uproszczenia) - użyj opcji `enum` pola schematu
- pole `retailPrice` musi być większe od 0 (możesz użyć albo funkcji albo `min`)
- pole `meanRating` powinno zawierać się pomiędzy `1` a `10` - podobnie, jak `retailPrice` możesz je opisać funkcją bądź
    ograniczeniami `min` i `max`
    
Teraz, dodaj niestandardowe wiadomości walidacji do wybranych walidatorów 
(preferowana forma to użycie tablicy z walidatorem i wiadomością):

- do pola `tags` dodaj wiadomość `Tags should be represented by at least one tag`
- do pola `comments` dodaj wiadomość `Comments cannot be empty`
- do pola `retailPrice` dodaj wiadomość informujące o przekroczeniu dopuszczalnego zakresu:
 `Retail price should be bigger or equal to 0, is: {VALUE}`, wykorzystując szablon **VALUE** (który zostanie automatycznie zastąpiony wartością)
- do pola `meanRating` dodaj wiadomość informujące o przekroczeniu dopuszczalnego zakresu:
 `Mean rating should be between 1 and 10, is: {VALUE}`, wykorzystując szablon **VALUE** (który zostanie automatycznie zastąpiony wartością)

**UWAGA!**

*Mongoose domyślnie zastępuje zmienne schematu będące tablicami, a których wartość nie została przekazana do dokumentu
pustymi tablicami - dzięki temu nigdy nie spotkasz w polu będącym tablicą wartości niezdefiniowanej (i możesz założyć,
iż wszystkie metody tablic będą na nim zawsze dostępne). W tym zadaniu jest to zachowanie pożądane. Informacje, jak wyłączyć
takie zachowanie znajdziesz w artykule o schematach.*

**PODPOWIEDŹ 1**

*Wykorzystaj wbudowane w wiadomości walidacji pole szablonu - `{VALUE}`, które zostanie zastąpione aktualną wartością pola, 
aby wyświetlić odpowiednią wiadomość w kontekście błędu walidacji.*

**PODPOWIEDŹ 2**

*Schemat możesz zdefiniować w jednym kroku bądź używając definicji pola schematu i ich metod (zwracanego przez `schema.path()`), 
np:*

```javascript
gameSchema.path('tags').validate([function () { /** your validation code here **/}, 'Your custom validation message here']).;
```



# Gettery i settery

Gettery i settery pozwalają na przekształcenia wartości przed ich ustawianiem bądź zwracaniem.

**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` aby przygotować biblioteki przed rozpoczęciem pracy!**

**Zadanie uruchomisz skryptem `npm start`. Kod zadania znajduje się w pliku `task.js`.**

## Tracker giełdowy - poprawki w systemie

Wraz zespołem pracujecie nad oprogramowaniem śledzącym ruchy na największych giełdach na świecie. Zauważyliście, że
do danych wkradł się jednak pewien błąd - w wyniku dzielenia liczb typu `float` (spróbuj podzielić w JavaScript 2/3
a dostaniesz długi rezultat...) do bazy dostały się dane, które mają niepotrzebnie wiele cyfr po przecinku, np.
`0.6666666666666666`.

Postanowiliście, iż problem rozwiążecie na poziomie schematu bazy danych. Stwórz schemat według poniższego kształtu:

```typescript
interface StockTransaction {
  price: number;
  amount: number;
  market: string;
  symbol: string;
  industry: string;
}
```

A następnie dodaj:

- wymagalność na wszystkie pola schematu (`{ required: true}`)
- getter i setter, który zmieni przekazaną wartość `price` tak, aby zawierała jedynie dwie cyfry po przecinku

Dzięki temu przy każdym odczycie **a także zapisie** (dzięki setter-owi), w bazie znajdzie się poprawna wartość.

**Aby zaokrąglić liczbę do dwóch miejsc po przecinku, możesz wykorzystać następującą funkcję pomocniczą:**

```javascript
const roundToTwoDecimals = val => Math.round(val * 100) / 100;
```


# Modele - zapytania

Modele są tworami Mongoose najbliższymi kolekcjom, znanym z MongoDB. To z ich użyciem możesz odpytywać bazę danych,
a także budować nowe instancje modeli, które mogą być modyfikowane i zapisane do bazy.

**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` aby przygotować biblioteki przed rozpoczęciem pracy!**

**Zadanie uruchomisz skryptem `npm start`. Kod zadania znajduje się w pliku `task.js`.**

## Lokalne wycieczki

Utrzymujesz portal z lokalnymi wycieczkami (Kalifornia!), gdzie turyści mogą znaleźć informacje o miejscach na łonie natury,
które są warte odwiedzenia w tym stanie i obecnie przepisujecie kod aplikacji na nowo z użyciem Mongoose.

Chcesz sprawdzić działanie nowych skryptów oraz przygotować nowy schemat dla wpisów dotyczących poszczególnych wycieczek.
Przygotuj schemat według następujących zasad i nazwij go `tripSchema`:

```typescript
interface Trip {
  packageType: string;
  title: string;
  blurb: string;
  description: string;
  difficulty: string;
  length: number;
  price: number;
}
```

Następnie dodaj następujące walidacje:

- pola `title`, `description`, `difficulty`, `length` są wymagane
- pole `price` powinno mieć wartość większą bądź równą od 0

Następnie przygotuj model `Trip` na bazie schematu i użyj go do wyszukania wszystkich wycieczek, które trwają co najmniej **4 dni**. 
Rezultaty przekaż do asercji.

*Na tym etapie jedna z asercji - sprawdzanie wartości `region` - się nie powiedzie. Wynika to z faktu, iż **pola nieuwzględnione
w schemacie są domyślnie usuwane z instancji modelu**. 
Spróbuj dodać to pole do schematu i sprawdź asercję ponownie (zauważ, iż nie ma to nic wspólnego z jego rzeczywistą wartością w bazie danych).*

**UWAGA**

*Pamiętaj, że wyniki w konsoli (wyświetlane dzięki metodzie `toString()` Mongoose, automatycznie wywoływanej gdy uruchamiasz `console.log()`
na obiekcie Mongoose) różnią się od rzeczywistych obiektów Mongoose - z tego powodu w konsoli możesz zobaczyć wartości pól spoza schematu, 
których nie będziesz mogła/mógł odczytać bezpośrednio!*

**PODPOWIEDŹ**

*Pamiętaj o użyciu `exec()` na końcu zapytania do bazy danych!*


# Dokumenty - instancje modelu


**Pamiętaj o uruchomieniu `npm install` oraz `npm run populate` 
aby przygotować biblioteki i bazę danych przed rozpoczęciem pracy!**

**Zadanie uruchomisz skryptem `npm start`. Kod zadania znajduje się w pliku `task.js`.**

## Portal kulinarny - baza składników

W bazie danych znajduje się wycinek tabeli składników z potencjalnego portalu kulinarnego. Przygotuj schemat, który
opisze każdy ze składników według zadanych zasad:

```typescript
interface Tag {
  Tag: string;
}

interface FlavorValue {
  SOUR: number;
  SALT: number;
  ACID: number;
  SWEET: number;
  FAT: number;
  UMAMI: number;
}

interface Portion {
  SMALL: number;
  MEDIUM: number;
  LARGE: number;
}

interface Ingredient {
  Name: string;
  Calories: number;
  CookingTime: number;
  Tags: [Tag]; 
  Portions: Portion;
  FlavorValues: FlavorValue;
}
```

Przełóż powyższy zapis na odpowiednie schematy - użyj możliwości zagnieżdżania schematów w sobie - a następnie dodaj następujące
walidacje:

- `Name`, `Calories` i `CookingTime` są wymagane
- `FlavorValues`, jeśli w ogóle nieprzekazane (brak pola na poziomie głównego schematu), ustawiane jest na wartości równe 0: `{SOUR: 0, SALT: 0, ACIT: 0, SWEET: 0, FAT: 0, UMAMI: 0}`
- `Portions` ma walidację wewnątrz schematu, która gwarantuje, że każda z trzech wartości jest większa od 0 (użyj `min` równe **1**) i **jest wymagana**
- pole `Tags` pozostaje opcjonalne

Następnie dodaj do bazy nowy składnik:

```javascript
const newIngredient = {
 Name: 'Tomato',
 Calories: 30,
 CookingTime: 480,
 Tags: {
   Tag: 'Vegetables'
  },
 Portions: {
   SMALL: 15,
   LARGE: 200
  }
};
```

Skonstruuj nowy dokument, używając modelu, a następnie spróbuj zapisać dokument do bazy używając metody `save()` dokumentu. 
W dokumencie brakuje jednego pola - sprawdź błąd walidacji, a następnie ustaw wartość tego pola na `75`. Przekaż skonstruowany
dokument pomidora do walidacji.
